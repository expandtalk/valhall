
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ObjectSourceHeader } from './ObjectSourceHeader';
import { ObjectSourceDataInput } from './ObjectSourceDataInput';
import { ObjectSourceActionButtons } from './ObjectSourceActionButtons';
import { ObjectSourceParsedDataDisplay } from './ObjectSourceParsedDataDisplay';
import { ObjectSourceProgressDisplay } from './ObjectSourceProgressDisplay';
import { ObjectSourceResultDisplay } from './ObjectSourceResultDisplay';
import { useObjectSourceImport } from './useObjectSourceImport';

export const ObjectSourceImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  } = useObjectSourceImport();

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <ObjectSourceHeader />
      <CardContent className="space-y-6">
        <ObjectSourceDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />
        <ObjectSourceActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />
        <ObjectSourceParsedDataDisplay parsedRecords={parsedRecords} />
        <ObjectSourceProgressDisplay
          isImporting={isImporting}
          importProgress={importProgress}
        />
        <ObjectSourceResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
