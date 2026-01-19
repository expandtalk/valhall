
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { parseDatingSourceSQL } from './parseDatingSourceSQL';
import { importDatingSourceRecords } from './importDatingSourceRecords';
import { MySQLDatingSourceRecord, DatingSourceImportResult } from './types';

export const useDatingSourceImport = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLDatingSourceRecord[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<DatingSourceImportResult | null>(null);
  const { toast } = useToast();

  const handleParseSql = () => {
    setIsParsing(true);
    setImportResult(null);
    try {
      const records = parseDatingSourceSQL(sqlData);
      setParsedRecords(records);
      toast({
        title: "SQL Parsed",
        description: `Found ${records.length} dating source links.`,
      });
    } catch (error) {
      console.error("Error parsing SQL:", error);
      toast({
        variant: "destructive",
        title: "Parsing Failed",
        description: "Could not parse SQL data. Check console for errors.",
      });
    } finally {
      setIsParsing(false);
    }
  };

  const handleImportRecords = async () => {
    if (parsedRecords.length === 0) return;

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      const result = await importDatingSourceRecords(parsedRecords, setImportProgress);
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
    isParsing,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  };
};
