
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useDanishParishImport } from '@/hooks/import/useDanishParishImport';
import { 
  DanishParishesHeader, 
  DanishParishesDataInput, 
  DanishParishesUsageInfo, 
  DanishParishesActionButtons, 
  DanishParishesResultDisplay 
} from './danish-parishes';

export const DanishParishesImportSection: React.FC = () => {
  const [importData, setImportData] = useState('');
  const { isImporting, importResult, importDanishParishes, setImportResult } = useDanishParishImport();

  const handleImport = () => {
    if (importData.trim().length > 0) {
      importDanishParishes(importData);
    }
  };
  
  const handleCloseResult = () => {
    setImportResult(null);
    if (importResult?.success) {
      setImportData('');
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
      <DanishParishesHeader />
      <CardContent className="p-6 space-y-4">
        <DanishParishesUsageInfo />
        <DanishParishesDataInput
          importData={importData}
          onChange={setImportData}
          disabled={isImporting}
        />
        <DanishParishesActionButtons
          onImport={handleImport}
          isImporting={isImporting}
          hasData={importData.trim().length > 0}
        />
        {importResult && (
          <DanishParishesResultDisplay
            importResult={importResult}
            onClose={handleCloseResult}
          />
        )}
      </CardContent>
    </Card>
  );
};
