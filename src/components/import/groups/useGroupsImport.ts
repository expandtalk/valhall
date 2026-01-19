
import { useState } from 'react';
import { toast } from "sonner";
import { MySQLGroupRecord, GroupImportResult } from './types';
import { parseGroupsSQL } from './parseGroupsSQL';
import { importGroupsRecords } from './importGroupsRecords';

export const useGroupsImport = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLGroupRecord[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<GroupImportResult | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleParse = () => {
    setIsParsing(true);
    setParsedRecords([]);
    setImportResult(null);
    setStatus('idle');
    try {
      const records = parseGroupsSQL(sqlData);
      setParsedRecords(records);
      if (records.length > 0) {
        toast.success(`${records.length} grupper hittades och är redo för import.`);
      } else {
        toast.warning('Inga grupper hittades i den angivna SQL-datan.');
      }
    } catch (error) {
      console.error('Error parsing groups SQL:', error);
      toast.error('Kunde inte tolka SQL-datan. Kontrollera konsolen för fel.');
      setStatus('error');
    } finally {
      setIsParsing(false);
    }
  };

  const handleImport = async () => {
    if (parsedRecords.length === 0) {
      toast.warning('Inga grupper att importera.');
      return;
    }
    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);
    setStatus('idle');

    try {
      const result = await importGroupsRecords(parsedRecords, setImportProgress);
      setImportResult(result);
      setStatus(result.errors > 0 ? 'error' : 'success');
      if (result.errors > 0) {
        toast.error(`Importen slutfördes med ${result.errors} fel.`);
      } else {
        toast.success(`Importerade ${result.success} grupper.`);
      }
    } catch (error) {
      console.error('Error importing groups:', error);
      toast.error('Ett fel uppstod under importen.');
      setStatus('error');
    } finally {
      setIsImporting(false);
      setParsedRecords([]);
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
    status,
    handleParse,
    handleImport,
  };
};
