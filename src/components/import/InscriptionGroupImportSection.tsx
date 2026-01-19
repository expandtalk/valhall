
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Upload, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { parseInscriptionGroupSQL, importInscriptionGroups, MySQLInscriptionGroupRecord } from "@/utils/import/inscriptionGroupImporter";

export const InscriptionGroupImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLInscriptionGroupRecord[]>([]);
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
      const records = parseInscriptionGroupSQL(sqlData);
      setParsedRecords(records);
      
      toast({
        title: "SQL parsad framgångsrikt",
        description: `Hittade ${records.length} inskrift-grupp-kopplingar att importera`,
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

  const handleImportRecords = async () => {
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
      const result = await importInscriptionGroups(parsedRecords, (progress) => {
        setImportProgress(progress);
      });
      setImportResult(result);

      toast({
        title: "Import slutförd",
        description: `${result.success} importerade, ${result.errors} fel`,
        variant: result.errors > 0 ? "destructive" : "default"
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
          <Users className="h-5 w-5 text-orange-400" />
          <CardTitle className="text-white">Inskrift-Grupp-koppling Import</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Importera kopplingar mellan inskrifter och grupper från MySQL-export (inscription_group-tabellen).
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
            placeholder="Klistra in MySQL INSERT statement för inscription_group-tabellen här..."
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
            onClick={handleImportRecords}
            disabled={parsedRecords.length === 0 || isImporting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importera till inscription_group
          </Button>
        </div>

        {parsedRecords.length > 0 && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">📋 Parsad data:</h4>
            <Badge className="bg-cyan-500 text-white border-0 mb-2">
              {parsedRecords.length} kopplingar hittade
            </Badge>
            
            <div className="text-sm text-slate-300 space-y-1 max-h-32 overflow-y-auto">
              {parsedRecords.slice(0, 10).map((record, index) => (
                <div key={index} className="bg-black/30 rounded p-2 text-xs grid grid-cols-2 gap-x-2">
                  <div className="truncate">
                    <span className="text-slate-400">Inskrift ID: </span>
                    <span className="text-cyan-400">{record.inscriptionid}</span>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400">Grupp ID: </span>
                    <span className="text-amber-400">{record.groupid}</span>
                  </div>
                </div>
              ))}
              {parsedRecords.length > 10 && (
                <div className="text-slate-400 text-center">
                  ...och {parsedRecords.length - 10} till
                </div>
              )}
            </div>
          </div>
        )}

        {isImporting && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">Importerar kopplingar...</h4>
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
              Importresultat - inscription_group-tabellen
            </h4>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <Badge className="bg-green-500 text-white border-0">
                {importResult.success} lyckade
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
