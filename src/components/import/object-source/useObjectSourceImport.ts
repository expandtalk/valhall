
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { MySQLObjectSourceRecord, ObjectSourceImportResult } from './types';
import { parseObjectSourceSQL } from './parseObjectSourceSQL';
import { importObjectSourceRecords } from './importObjectSourceRecords';

export const useObjectSourceImport = () => {
  const { toast } = useToast();
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLObjectSourceRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<ObjectSourceImportResult | null>(null);

  const handleParseSql = () => {
    try {
      const records = parseObjectSourceSQL(sqlData);
      setParsedRecords(records);
      setImportResult(null);
      toast({
        title: "SQL-analys klar",
        description: `${records.length} poster hittades och är redo för import.`,
      });
    } catch (error) {
      console.error("Failed to parse SQL:", error);
      toast({
        title: "Fel vid SQL-analys",
        description: error instanceof Error ? error.message : "Ett okänt fel inträffade.",
        variant: "destructive",
      });
    }
  };

  const handleImportRecords = async () => {
    if (parsedRecords.length === 0) {
      toast({
        title: "Inga poster att importera",
        description: "Analysera en SQL-fil först.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      const result = await importObjectSourceRecords(parsedRecords, setImportProgress);
      setImportResult(result);
      toast({
        title: "Importen är klar",
        description: `Resultat: ${result.success} lyckade, ${result.errors} fel.`,
      });
    } catch (error) {
      console.error("Failed to import records:", error);
      toast({
        title: "Fel vid import",
        description: error instanceof Error ? error.message : "Ett okänt fel inträffade.",
        variant: "destructive",
      });
      setImportResult({
        success: 0,
        errors: parsedRecords.length,
        skipped: 0,
        errorMessages: ["Ett kritiskt fel inträffade under importprocessen."],
      });
    } finally {
      setIsImporting(false);
    }
  };

  return {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  };
};
