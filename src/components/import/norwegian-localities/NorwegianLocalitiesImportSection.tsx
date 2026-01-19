
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNorwegianLocalityImport } from '@/hooks/import/useNorwegianLocalityImport';
import { 
  NorwegianLocalitiesHeader, 
  NorwegianLocalitiesDataInput, 
  NorwegianLocalitiesUsageInfo, 
  NorwegianLocalitiesActionButtons, 
  NorwegianLocalitiesResultDisplay 
} from './';

export const NorwegianLocalitiesImportSection: React.FC = () => {
  const [importData, setImportData] = useState('');
  const { isImporting, importResult, importNorwegianLocalities, setImportResult } = useNorwegianLocalityImport();

  const handleImport = () => {
    if (importData.trim().length > 0) {
      importNorwegianLocalities(importData);
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
      <NorwegianLocalitiesHeader />
      <CardContent className="p-6 space-y-4">
        <NorwegianLocalitiesUsageInfo />
        <NorwegianLocalitiesDataInput
          importData={importData}
          onChange={setImportData}
          disabled={isImporting}
        />
        <NorwegianLocalitiesActionButtons
          onImport={handleImport}
          isImporting={isImporting}
          hasData={importData.trim().length > 0}
        />
        {importResult && (
          <NorwegianLocalitiesResultDisplay
            importResult={importResult}
            onClose={handleCloseResult}
          />
        )}
      </CardContent>
    </Card>
  );
};
