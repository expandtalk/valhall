
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  DatingHeader,
  DatingDataInput,
  DatingActionButtons,
  DatingParsedDataDisplay,
  DatingProgressDisplay,
  DatingResultDisplay
} from './dating';
import { useDatingImport } from './dating/useDatingImport';

export const DatingImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords
  } = useDatingImport();

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <DatingHeader />
      
      <CardContent className="space-y-4">
        <DatingDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />

        <DatingActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />

        <DatingParsedDataDisplay parsedRecords={parsedRecords} />

        <DatingProgressDisplay
          isImporting={isImporting}
          importProgress={importProgress}
        />

        <DatingResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
