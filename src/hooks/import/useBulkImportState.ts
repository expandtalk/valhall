
import { useState } from 'react';
import { ImportSettings, ImportResult } from "@/types/import";

export const useBulkImportState = () => {
  const [importData, setImportData] = useState('');
  const [sourceDatabase, setSourceDatabase] = useState('rundata');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [settings, setSettings] = useState<ImportSettings>({
    autoResolveSimpleConflicts: false,
    gpsToleranceMeters: 100,
    signumNormalization: 'preserve',
    duplicateHandling: 'staging'
  });

  const lineCount = importData.split('\n').filter(line => line.trim()).length;
  const isLargeDataset = lineCount > 1000;
  const isVeryLargeDataset = lineCount > 100000;

  return {
    importData,
    setImportData,
    sourceDatabase,
    setSourceDatabase,
    isImporting,
    setIsImporting,
    importResult,
    setImportResult,
    settings,
    setSettings,
    lineCount,
    isLargeDataset,
    isVeryLargeDataset
  };
};
