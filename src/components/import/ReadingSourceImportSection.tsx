
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, Upload, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseReadingSourceSQL, importReadingSources, MySQLReadingSourceRecord } from "@/utils/import/readingSourceImporter";

export const ReadingSourceImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLReadingSourceRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    errors: number;
    skipped: number;
    errorMessages: string[];
  } | null>(null);
  const { toast } = useToast();

  const handleParseSql = () => {
    try {
      const records = parseReadingSourceSQL(sqlData);
      setParsedRecords(records);
      toast({
        title: "SQL parsad framgångsrikt",
        description: `Hittade ${records.length} kopplingar att importera`,
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

  const handleImport = async () => {
    if (parsedRecords.length === 0) {
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
      const batchSize = 100;
      let totalSuccess = 0;
      let totalErrors = 0;
      let totalSkipped = 0;
      let allErrorMessages: string[] = [];

      for (let i = 0; i < parsedRecords.length; i += batchSize) {
        const batch = parsedRecords.slice(i, i + batchSize);
        const result = await importReadingSources(batch);
        
        totalSuccess += result.success;
        totalErrors += result.errors;
        totalSkipped += result.skipped;
        allErrorMessages.push(...result.errorMessages);
        
        setImportProgress(((i + batch.length) / parsedRecords.length) * 100);
      }

      const finalResult = {
        success: totalSuccess,
        errors: totalErrors,
        skipped: totalSkipped,
        errorMessages: allErrorMessages
      };

      setImportResult(finalResult);

      toast({
        title: "Import slutförd",
        description: `${finalResult.success} importerade, ${finalResult.errors} fel, ${finalResult.skipped} överhoppade`,
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
          <Link className="h-5 w-5 text-purple-400" />
          <CardTitle className="text-white">Reading-Source Links Import</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Importera kopplingar mellan läsningar och källor från MySQL.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            MySQL Export Data (reading_source)
          </label>
          <Textarea
            value={sqlData}
            onChange={(e) => setSqlData(e.target.value)}
            placeholder="Klistra in MySQL INSERT statement för reading_source-tabellen här..."
            className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder-white/50 font-mono text-sm"
            disabled={isImporting}
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={handleParseSql} disabled={!sqlData.trim() || isImporting}>
            <Info className="h-4 w-4 mr-2" />
            Parsa SQL
          </Button>

          <Button
            onClick={handleImport}
            disabled={parsedRecords.length === 0 || isImporting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importera Kopplingar
          </Button>
        </div>

        {parsedRecords.length > 0 && !isImporting && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">📋 Parsad data:</h4>
            <Badge className="bg-blue-500 text-white border-0 mb-2">
              {parsedRecords.length} kopplingar hittade
            </Badge>
          </div>
        )}

        {isImporting && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">Importerar...</h4>
            <Progress value={importProgress} className="mb-2" />
          </div>
        )}

        {importResult && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Importresultat
            </h4>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Badge className="bg-green-500 text-white border-0">{importResult.success} lyckade</Badge>
              <Badge className="bg-red-500 text-white border-0">{importResult.errors} fel</Badge>
              <Badge className="bg-yellow-500 text-white border-0">{importResult.skipped} överhoppade</Badge>
            </div>
            {importResult.errorMessages.length > 0 && (
              <div className="mt-3">
                <h5 className="text-red-400 font-semibold mb-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Fel/Varningar:
                </h5>
                <div className="text-xs text-red-300 max-h-32 overflow-y-auto space-y-1">
                  {importResult.errorMessages.slice(0, 10).map((msg, index) => (
                    <div key={index} className="bg-red-500/10 rounded p-1">{msg}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
