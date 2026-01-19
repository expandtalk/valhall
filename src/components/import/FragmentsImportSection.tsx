
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useFragmentsImport } from '@/hooks/import/useFragmentsImport';
import { FragmentsHeader, FragmentsDataInput, FragmentsUsageInfo, FragmentsActionButtons, FragmentsResultDisplay } from './fragments';

export const FragmentsImportSection: React.FC = () => {
  const [importData, setImportData] = useState('');
  const { isImporting, importResult, importFragments, setImportResult } = useFragmentsImport();

  const handleImport = () => {
    importFragments(importData);
  };

  const handleCloseResult = () => {
    setImportResult(null);
    if (importResult?.success) {
      setImportData('');
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <FragmentsHeader />
      <CardContent className="p-6 space-y-6">
        <FragmentsUsageInfo />
        {!importResult ? (
          <>
            <FragmentsDataInput 
              importData={importData}
              onChange={setImportData}
              disabled={isImporting}
            />
            <FragmentsActionButtons
              onImport={handleImport}
              isImporting={isImporting}
              hasData={importData.trim().length > 0}
            />
          </>
        ) : (
          <FragmentsResultDisplay
            importResult={importResult}
            onClose={handleCloseResult}
          />
        )}
      </CardContent>
    </Card>
  );
};
