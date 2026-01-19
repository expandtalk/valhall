
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  ReferenceUriHeader,
  ReferenceUriDataInput,
  ReferenceUriActionButtons,
  ReferenceUriParsedDataDisplay,
  ReferenceUriProgressDisplay,
  ReferenceUriResultDisplay,
  useReferenceUriImport
} from './index';

export const ReferenceUriImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  } = useReferenceUriImport();

  return (
    <Card className="bg-white/5 border-white/10">
      <ReferenceUriHeader />
      <CardContent className="space-y-4">
        <ReferenceUriDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />
        <ReferenceUriActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />
        <ReferenceUriParsedDataDisplay parsedRecords={parsedRecords} />
        <ReferenceUriProgressDisplay isImporting={isImporting} importProgress={importProgress} />
        <ReferenceUriResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
