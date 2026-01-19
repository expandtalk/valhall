
import React from 'react';
import { ImportSettings as ImportSettingsType } from "@/types/import";
import { BulkImportSourceSettings } from "./BulkImportSourceSettings";
import { BulkImportDataInput } from "./BulkImportDataInput";
import { BulkImportActionButtons } from "./BulkImportActionButtons";
import { BulkImportWarnings } from "./BulkImportWarnings";

interface BulkImportControlsProps {
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
  onTestImport: () => void;
  onFullImport: () => void;
}

export const BulkImportControls: React.FC<BulkImportControlsProps> = ({
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
  onTestImport,
  onFullImport
}) => {
  // Add click debugging
  React.useEffect(() => {
    console.log('🔧 BulkImportControls mounted with props:', {
      lineCount,
      isLargeDataset,
      isVeryLargeDataset,
      isImporting,
      hasImportData: !!importData.trim(),
      onTestImportType: typeof onTestImport,
      onFullImportType: typeof onFullImport
    });
  }, [lineCount, isLargeDataset, isVeryLargeDataset, isImporting, importData, onTestImport, onFullImport]);

  return (
    <div className="space-y-4 relative z-20" style={{ pointerEvents: 'auto' }}>
      <BulkImportSourceSettings
        sourceDatabase={sourceDatabase}
        setSourceDatabase={setSourceDatabase}
        settings={settings}
        setSettings={setSettings}
      />

      <BulkImportDataInput
        sourceDatabase={sourceDatabase}
        importData={importData}
        setImportData={setImportData}
        lineCount={lineCount}
        isLargeDataset={isLargeDataset}
        isVeryLargeDataset={isVeryLargeDataset}
        isImporting={isImporting}
      />

      <BulkImportWarnings lineCount={lineCount} />

      <div className="relative z-30" style={{ pointerEvents: 'auto' }}>
        <BulkImportActionButtons
          isImporting={isImporting}
          importData={importData}
          lineCount={lineCount}
          onTestImport={onTestImport}
          onFullImport={onFullImport}
        />
      </div>
    </div>
  );
};
