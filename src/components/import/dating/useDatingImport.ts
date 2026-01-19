
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { MySQLDatingRecord, DatingImportResult } from './types';
import { parseDatingSQL } from './parseDatingSQL';
import { importDatingRecords } from './importDatingRecords';

export const useDatingImport = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLDatingRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<DatingImportResult | null>(null);
  const { toast } = useToast();

  const handleParseSql = () => {
    try {
      console.log('🎯 Starting SQL parsing...');
      const records = parseDatingSQL(sqlData);
      setParsedRecords(records);
      
      toast({
        title: "SQL parsad framgångsrikt",
        description: `Hittade ${records.length} dateringar att importera`,
      });
    } catch (error) {
      console.error('💥 Error parsing SQL:', error);
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
      console.log('🚀 Starting import of dating data...');
      
      const result = await importDatingRecords(parsedRecords, setImportProgress);
      
      setImportResult(result);
      setImportProgress(100);

      toast({
        title: "Import slutförd",
        description: `${result.success} importerade, ${result.errors} fel, ${result.skipped} överhoppade`,
        variant: result.errors > 0 ? "destructive" : "default"
      });

    } catch (error) {
      console.error('💥 Import error:', error);
      toast({
        title: "Importfel",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
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
    handleImportRecords
  };
};
