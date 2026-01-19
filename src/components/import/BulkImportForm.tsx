
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { ImportSettings } from "./ImportSettings";
import { ImportResultDisplay } from "./ImportResultDisplay";
import { BulkImportDatasetWarning } from "./BulkImportDatasetWarning";
import { BulkImportValidationInfo } from "./BulkImportValidationInfo";
import { BulkImportControls } from "./BulkImportControls";
import { ImportSettings as ImportSettingsType, ImportResult } from "@/types/import";

interface BulkImportFormProps {
  sourceDatabase: string;
  setSourceDatabase: (value: string) => void;
  settings: ImportSettingsType;
  setSettings: (settings: ImportSettingsType) => void;
  importData: string;
  setImportData: (data: string) => void;
  lineCount: number;
  isLargeDataset: boolean;
  isVeryLargeDataset?: boolean;
  isImporting: boolean;
  importResult: ImportResult | null;
  onTestImport: () => void;
  onFullImport: () => void;
}

export const BulkImportForm: React.FC<BulkImportFormProps> = ({
  sourceDatabase,
  setSourceDatabase,
  settings,
  setSettings,
  importData,
  setImportData,
  lineCount,
  isLargeDataset,
  isVeryLargeDataset = false,
  isImporting,
  importResult,
  onTestImport,
  onFullImport
}) => {
  console.log('BulkImportForm: Rendering form component');

  return (
    <CardContent className="space-y-4 relative z-0" style={{ pointerEvents: 'auto' }}>
      {isLargeDataset && (
        <BulkImportDatasetWarning lineCount={lineCount} />
      )}

      <BulkImportValidationInfo />

      <BulkImportControls
        sourceDatabase={sourceDatabase}
        setSourceDatabase={setSourceDatabase}
        settings={settings}
        setSettings={setSettings}
        importData={importData}
        setImportData={setImportData}
        lineCount={lineCount}
        isLargeDataset={isLargeDataset}
        isVeryLargeDataset={isVeryLargeDataset}
        isImporting={isImporting}
        onTestImport={onTestImport}
        onFullImport={onFullImport}
      />

      <ImportSettings 
        settings={settings} 
        onSettingsChange={setSettings}
      />

      {importResult && (
        <ImportResultDisplay result={importResult} />
      )}
    </CardContent>
  );
};
