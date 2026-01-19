
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Upload, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseCoordinatesSQL, importCoordinates, MySQLCoordinateRecord } from "@/utils/import/coordinatesImporter";

export const CoordinatesImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedCoordinates, setParsedCoordinates] = useState<MySQLCoordinateRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    errors: number;
    updated: number;
    errorMessages: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleParseSql = () => {
    try {
      const coordinates = parseCoordinatesSQL(sqlData);
      setParsedCoordinates(coordinates);
      
      toast({
        title: "SQL parsad framgångsrikt",
        description: `Hittade ${coordinates.length} koordinater att importera`,
      });
    } catch (error) {
      console.error('Error parsing SQL:', error);
      toast({
        title: "Fel vid parsning av SQL",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    }
  };

  const handleImportCoordinates = async () => {
    if (parsedCoordinates.length === 0) {
      toast({
        title: "Ingen data att importera",
        description: "Parsa SQL-data först",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      // Import in batches to show progress
      const batchSize = 10;
      let totalSuccess = 0;
      let totalErrors = 0;
      let totalUpdated = 0;
      let allErrorMessages: string[] = [];

      for (let i = 0; i < parsedCoordinates.length; i += batchSize) {
        const batch = parsedCoordinates.slice(i, i + batchSize);
        const result = await importCoordinates(batch);
        
        totalSuccess += result.success;
        totalErrors += result.errors;
        totalUpdated += result.updated;
        allErrorMessages.push(...result.errorMessages);
        
        setImportProgress(((i + batch.length) / parsedCoordinates.length) * 100);
      }

      const finalResult = {
        success: totalSuccess,
        errors: totalErrors,
        updated: totalUpdated,
        errorMessages: allErrorMessages
      };

      setImportResult(finalResult);

      toast({
        title: "Import slutförd",
        description: `${finalResult.success} nya, ${finalResult.updated} uppdaterade, ${finalResult.errors} fel`,
        variant: finalResult.errors > 0 ? "destructive" : "default"
      });

    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Importfel",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-400" />
          <CardTitle className="text-white">Coordinates Import</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Importera koordinater från MySQL coordinates-tabellen. Koordinaterna sparas direkt och kan senare kopplas till inskrifter.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            MySQL Export Data
          </label>
          <Textarea
            value={sqlData}
            onChange={(e) => setSqlData(e.target.value)}
            placeholder="Klistra in MySQL INSERT statement för coordinates-tabellen här..."
            className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder-white/50 font-mono text-sm"
            disabled={isImporting}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleParseSql}
            disabled={!sqlData.trim() || isImporting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Info className="h-4 w-4 mr-2" />
            Parsa SQL
          </Button>

          <Button
            onClick={handleImportCoordinates}
            disabled={parsedCoordinates.length === 0 || isImporting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importera Koordinater
          </Button>
        </div>

        {parsedCoordinates.length > 0 && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">📍 Parsad data:</h4>
            <Badge className="bg-green-500 text-white border-0 mb-2">
              {parsedCoordinates.length} koordinater hittade
            </Badge>
            
            <div className="text-sm text-slate-300 space-y-1 max-h-32 overflow-y-auto">
              {parsedCoordinates.slice(0, 5).map((coord, index) => (
                <div key={index} className="bg-black/30 rounded p-2">
                  <div className="text-green-400">Lat: {coord.latitude}, Lng: {coord.longitude}</div>
                  <div className="text-slate-300 text-xs">
                    Object: {coord.objectid} {coord.current === 1 ? '(nuvarande)' : '(historisk)'}
                  </div>
                </div>
              ))}
              {parsedCoordinates.length > 5 && (
                <div className="text-slate-400 text-center">
                  ...och {parsedCoordinates.length - 5} till
                </div>
              )}
            </div>
          </div>
        )}

        {isImporting && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">Importerar...</h4>
            <Progress value={importProgress} className="mb-2" />
            <div className="text-sm text-slate-300">
              {Math.round(importProgress)}% slutfört
            </div>
          </div>
        )}

        {importResult && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Importresultat
            </h4>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Badge className="bg-green-500 text-white border-0">
                {importResult.success} nya
              </Badge>
              <Badge className="bg-blue-500 text-white border-0">
                {importResult.updated} uppdaterade
              </Badge>
              <Badge className="bg-red-500 text-white border-0">
                {importResult.errors} fel
              </Badge>
            </div>

            {importResult.errorMessages.length > 0 && (
              <div className="mt-3">
                <h5 className="text-red-400 font-semibold mb-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Felmeddelanden:
                </h5>
                <div className="text-xs text-red-300 max-h-32 overflow-y-auto space-y-1">
                  {importResult.errorMessages.slice(0, 10).map((msg, index) => (
                    <div key={index} className="bg-red-500/10 rounded p-1">
                      {msg}
                    </div>
                  ))}
                  {importResult.errorMessages.length > 10 && (
                    <div className="text-red-400">
                      ...och {importResult.errorMessages.length - 10} fler fel
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
