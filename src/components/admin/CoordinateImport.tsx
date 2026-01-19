import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CoordinateRecord {
  signum: string;
  latitude: number;
  longitude: number;
  status?: string;
}

export const CoordinateImport: React.FC = () => {
  const [csvData, setCsvData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    successful: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const { toast } = useToast();

  const parseCSV = (csvText: string): CoordinateRecord[] => {
    const lines = csvText.trim().split('\n');
    const records: CoordinateRecord[] = [];
    
    // Skip header if exists
    const startIndex = lines[0].toLowerCase().includes('signum') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Parse CSV (handle both comma and semicolon separators)
      const parts = line.split(/[,;]/).map(part => part.trim().replace(/^["']|["']$/g, ''));
      
      if (parts.length >= 3) {
        const signum = parts[0];
        const lat = parseFloat(parts[1]);
        const lng = parseFloat(parts[2]);
        
        if (signum && !isNaN(lat) && !isNaN(lng)) {
          records.push({
            signum,
            latitude: lat,
            longitude: lng
          });
        }
      }
    }
    
    return records;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvData(text);
    };
    reader.readAsText(file);
  };

  const importCoordinates = async () => {
    if (!csvData.trim()) {
      toast({
        title: "Fel",
        description: "Inga data att importera",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    const records = parseCSV(csvData);
    
    if (records.length === 0) {
      toast({
        title: "Fel",
        description: "Kunde inte parsa några giltiga koordinater från datan",
        variant: "destructive",
      });
      setIsImporting(false);
      return;
    }

    let successful = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const record of records) {
      try {
        // Update coordinates for the inscription
        const { error } = await supabase
          .from('runic_inscriptions')
          .update({
            coordinates: `(${record.longitude},${record.latitude})`
          })
          .eq('signum', record.signum);

        if (error) {
          failed++;
          errors.push(`${record.signum}: ${error.message}`);
        } else {
          successful++;
        }
      } catch (err) {
        failed++;
        errors.push(`${record.signum}: ${err instanceof Error ? err.message : 'Okänt fel'}`);
      }
    }

    setImportResults({ successful, failed, errors });
    setIsImporting(false);

    toast({
      title: "Import slutförd",
      description: `${successful} koordinater importerade, ${failed} misslyckades`,
      variant: successful > 0 ? "default" : "destructive",
    });
  };

  const exampleCSV = `signum,latitude,longitude
U 287,59.8586,17.6389
U 344,59.6515,17.9298
BN 79,56.8374,16.7415`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Importera koordinatdata
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File upload */}
          <div className="space-y-2">
            <Label htmlFor="csv-file">Ladda upp CSV-fil</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>

          {/* Manual input */}
          <div className="space-y-2">
            <Label htmlFor="csv-data">Eller klistra in CSV-data manuellt</Label>
            <Textarea
              id="csv-data"
              placeholder="Klistra in CSV-data här..."
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          {/* Example format */}
          <div className="p-3 bg-slate-50 rounded-lg border">
            <Label className="text-sm font-medium">Exempel på format:</Label>
            <pre className="text-xs mt-1 text-slate-600">{exampleCSV}</pre>
            <p className="text-xs text-slate-500 mt-2">
              Format: signum,latitude,longitude (kan också använda semikolon som separator)
            </p>
          </div>

          {/* Import button */}
          <Button
            onClick={importCoordinates}
            disabled={isImporting || !csvData.trim()}
            className="w-full"
          >
            {isImporting ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Importerar...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Importera koordinater
              </span>
            )}
          </Button>

          {/* Results */}
          {importResults && (
            <div className="space-y-3 mt-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Importresultat:</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-green-600">
                  ✅ Lyckade: {importResults.successful}
                </div>
                <div className="text-red-600">
                  ❌ Misslyckade: {importResults.failed}
                </div>
              </div>

              {importResults.errors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Fel:</span>
                  </div>
                  <div className="max-h-32 overflow-y-auto">
                    {importResults.errors.map((error, index) => (
                      <div key={index} className="text-xs text-red-600 font-mono">
                        {error}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};