
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { parseUrisSQL } from './parseUrisSQL';
import { importUrisRecords } from './importUrisRecords';
import { MySQLUriRecord, UriImportResult } from './types';

export const useUrisImport = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLUriRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<UriImportResult | null>(null);
  const { toast } = useToast();

  const handleParseSql = () => {
    setImportResult(null);
    try {
      const records = parseUrisSQL(sqlData);
      setParsedRecords(records);
      toast({
        title: "SQL Parsed",
        description: `Found ${records.length} URI records.`,
      });
    } catch (error) {
      console.error("Error parsing SQL:", error);
      toast({
        variant: "destructive",
        title: "Parsing Failed",
        description: "Could not parse SQL data. Check console for errors.",
      });
    }
  };

  const handleImportRecords = async () => {
    if (parsedRecords.length === 0) return;

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      const result = await importUrisRecords(parsedRecords, setImportProgress);
      setImportResult(result);
      toast({
        title: "Import Complete",
        description: `${result.success} succeeded, ${result.errors} failed, ${result.skipped} skipped.`,
      });
    } catch (error) {
      console.error("Error importing records:", error);
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "An unexpected error occurred during import.",
      });
      setImportResult({ success: 0, errors: parsedRecords.length, skipped: 0, errorMessages: ['An unexpected error occurred.'] });
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
