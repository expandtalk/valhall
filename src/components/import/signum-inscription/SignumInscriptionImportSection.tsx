
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useSignumInscriptionImport } from '@/hooks/import/useSignumInscriptionImport';
import { SignumInscriptionHeader } from './SignumInscriptionHeader';
import { SignumInscriptionDataInput } from './SignumInscriptionDataInput';
import { SignumInscriptionUsageInfo } from './SignumInscriptionUsageInfo';
import { SignumInscriptionActionButtons } from './SignumInscriptionActionButtons';
import { SignumInscriptionResultDisplay } from './SignumInscriptionResultDisplay';

export const SignumInscriptionImportSection: React.FC = () => {
  const [importData, setImportData] = useState('');
  const { isImporting, importResult, importSignumInscriptionLinks, setImportResult } = useSignumInscriptionImport();

  const handleImport = () => {
    if (importData.trim().length > 0) {
      importSignumInscriptionLinks(importData);
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
      <SignumInscriptionHeader />
      <CardContent className="space-y-4">
        <SignumInscriptionUsageInfo />
        <SignumInscriptionDataInput
          importData={importData}
          onChange={setImportData}
          disabled={isImporting}
        />
        <SignumInscriptionActionButtons
          onImport={handleImport}
          isImporting={isImporting}
          hasData={importData.trim().length > 0}
        />
        {importResult && (
          <SignumInscriptionResultDisplay
            importResult={importResult}
            onClose={handleCloseResult}
          />
        )}
      </CardContent>
    </Card>
  );
};
