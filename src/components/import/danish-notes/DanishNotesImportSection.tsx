
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useDanishNotesImport } from '@/hooks/import/useDanishNotesImport';
import { DanishNotesHeader } from './DanishNotesHeader';
import { DanishNotesDataInput } from './DanishNotesDataInput';
import { DanishNotesUsageInfo } from './DanishNotesUsageInfo';
import { DanishNotesActionButtons } from './DanishNotesActionButtons';
import { DanishNotesResultDisplay } from './DanishNotesResultDisplay';

export const DanishNotesImportSection: React.FC = () => {
  const [importData, setImportData] = useState('');
  const { isImporting, importResult, importDanishNotes, setImportResult } = useDanishNotesImport();

  const handleImport = () => {
    if (importData.trim().length > 0) {
      importDanishNotes(importData);
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
      <DanishNotesHeader />
      <CardContent className="space-y-4">
        <DanishNotesUsageInfo />
        <DanishNotesDataInput
          importData={importData}
          onChange={setImportData}
          disabled={isImporting}
        />
        <DanishNotesActionButtons
          onImport={handleImport}
          isImporting={isImporting}
          hasData={importData.trim().length > 0}
        />
        {importResult && (
          <DanishNotesResultDisplay
            importResult={importResult}
            onClose={handleCloseResult}
          />
        )}
      </CardContent>
    </Card>
  );
};
