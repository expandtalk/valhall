
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  UrisHeader,
  UrisDataInput,
  UrisActionButtons,
  UrisParsedDataDisplay,
  UrisProgressDisplay,
  UrisResultDisplay,
  useUrisImport
} from './index';

export const UrisImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  } = useUrisImport();

  return (
    <Card className="bg-white/5 border-white/10">
      <UrisHeader />
      <CardContent className="space-y-4">
        <UrisDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />
        <UrisActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />
        <UrisParsedDataDisplay parsedRecords={parsedRecords} />
        <UrisProgressDisplay isImporting={isImporting} importProgress={importProgress} />
        <UrisResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
