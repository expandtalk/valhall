
import React from 'react';
import { Card } from "@/components/ui/card";
import { BulkImportHeader } from "./BulkImportHeader";
import { BulkImportForm } from "./BulkImportForm";
import { useBulkImportLogic } from "@/hooks/useBulkImportLogic";

export const BulkImportSection: React.FC = () => {
  console.log('BulkImportSection: Component rendering...');
  
  const {
    importData,
    setImportData,
    sourceDatabase,
    setSourceDatabase,
    isImporting,
    importResult,
    settings,
    setSettings,
    lineCount,
    isLargeDataset,
    isVeryLargeDataset,
    handleTestImport,
    handleFullImport
  } = useBulkImportLogic();

  console.log('BulkImportSection: About to render component');

  try {
    return (
      <div className="space-y-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <BulkImportHeader />
          
          <BulkImportForm
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
            importResult={importResult}
            onTestImport={handleTestImport}
            onFullImport={handleFullImport}
          />
        </Card>
      </div>
    );
  } catch (error) {
    console.error('BulkImportSection: Render error:', error);
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
        <h3 className="text-red-400 font-semibold">Komponentfel</h3>
        <p className="text-red-300 text-sm">Ett fel uppstod när komponenten skulle renderas: {error instanceof Error ? error.message : 'Okänt fel'}</p>
      </div>
    );
  }
};
