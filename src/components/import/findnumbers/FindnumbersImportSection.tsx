
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  FindnumbersHeader,
  FindnumbersDataInput,
  FindnumbersActionButtons,
  FindnumbersParsedDataDisplay,
  FindnumbersProgressDisplay,
  FindnumbersResultDisplay,
  useFindnumbersImport
} from './index';

export const FindnumbersImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  } = useFindnumbersImport();

  return (
    <Card className="bg-white/5 border-white/10">
      <FindnumbersHeader />
      <CardContent className="space-y-4">
        <FindnumbersDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />
        <FindnumbersActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />
        <FindnumbersParsedDataDisplay parsedRecords={parsedRecords} />
        <FindnumbersProgressDisplay isImporting={isImporting} importProgress={importProgress} />
        <FindnumbersResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
