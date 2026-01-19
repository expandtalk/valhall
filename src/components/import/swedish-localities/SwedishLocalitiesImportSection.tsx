
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useSwedishLocalityImport } from '@/hooks/import/useSwedishLocalityImport';
import { 
  SwedishLocalitiesHeader, 
  SwedishLocalitiesDataInput, 
  SwedishLocalitiesUsageInfo, 
  SwedishLocalitiesActionButtons, 
  SwedishLocalitiesResultDisplay 
} from './';

export const SwedishLocalitiesImportSection: React.FC = () => {
  const [importData, setImportData] = useState('');
  const { isImporting, importResult, importSwedishLocalities, setImportResult } = useSwedishLocalityImport();

  const handleImport = () => {
    if (importData.trim().length > 0) {
      importSwedishLocalities(importData);
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
      <SwedishLocalitiesHeader />
      <CardContent className="p-6 space-y-4">
        <SwedishLocalitiesUsageInfo />
        <SwedishLocalitiesDataInput
          importData={importData}
          onChange={setImportData}
          disabled={isImporting}
        />
        <SwedishLocalitiesActionButtons
          onImport={handleImport}
          isImporting={isImporting}
          hasData={importData.trim().length > 0}
        />
        {importResult && (
          <SwedishLocalitiesResultDisplay
            importResult={importResult}
            onClose={handleCloseResult}
          />
        )}
      </CardContent>
    </Card>
  );
};
