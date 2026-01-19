
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { MySQLTranslationRecord, TranslationImportResult } from './types';
import { parseTranslationsSQL } from './parseTranslationsSQL';
import { importTranslationsRecords } from './importTranslationsRecords';

export const useTranslationsImport = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLTranslationRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<TranslationImportResult | null>(null);
  const { toast } = useToast();

  const handleParseSql = () => {
    try {
      const records = parseTranslationsSQL(sqlData);
      setParsedRecords(records);
      toast({
        title: "SQL Parsed Successfully",
        description: `Found ${records.length} translation records to import.`,
      });
    } catch (error) {
      console.error("Error parsing SQL:", error);
      toast({
        title: "Parsing Failed",
        description: "Could not parse the SQL data. Check console for details.",
        variant: "destructive",
      });
    }
  };

  const handleImportRecords = async () => {
    if (parsedRecords.length === 0) {
      toast({
        title: "No Records to Import",
        description: "Please parse the SQL data first.",
        variant: "destructive",
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      const result = await importTranslationsRecords(parsedRecords, setImportProgress);
      setImportResult(result);
      toast({
        title: "Import Complete",
        description: `Successfully imported ${result.success} records.`,
      });
    } catch (error) {
      console.error("Error importing records:", error);
      toast({
        title: "Import Failed",
        description: "An error occurred during import. Check console for details.",
        variant: "destructive",
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
