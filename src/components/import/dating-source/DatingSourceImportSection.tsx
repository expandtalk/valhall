
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DatingSourceHeader } from './DatingSourceHeader';
import { DatingSourceDataInput } from './DatingSourceDataInput';
import { DatingSourceActionButtons } from './DatingSourceActionButtons';
import { DatingSourceParsedDataDisplay } from './DatingSourceParsedDataDisplay';
import { DatingSourceProgressDisplay } from './DatingSourceProgressDisplay';
import { DatingSourceResultDisplay } from './DatingSourceResultDisplay';
import { useDatingSourceImport } from './useDatingSourceImport';

export const DatingSourceImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  } = useDatingSourceImport();

  return (
    <Card className="bg-white/5 border-white/10">
      <DatingSourceHeader />
      <CardContent className="space-y-4">
        <DatingSourceDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />
        <DatingSourceActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />
        <DatingSourceParsedDataDisplay parsedRecords={parsedRecords} />
        <DatingSourceProgressDisplay isImporting={isImporting} importProgress={importProgress} />
        <DatingSourceResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
