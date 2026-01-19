
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SourcesHeader } from './SourcesHeader';
import { SourcesDataInput } from './SourcesDataInput';
import { SourcesActionButtons } from './SourcesActionButtons';
import { SourcesParsedDataDisplay } from './SourcesParsedDataDisplay';
import { SourcesProgressDisplay } from './SourcesProgressDisplay';
import { SourcesResultDisplay } from './SourcesResultDisplay';
import { useSourcesImport } from './useSourcesImport';

export const SourcesImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  } = useSourcesImport();

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <SourcesHeader />
      <CardContent className="space-y-6">
        <SourcesDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />
        <SourcesActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />
        <SourcesParsedDataDisplay parsedRecords={parsedRecords} />
        <SourcesProgressDisplay
          isImporting={isImporting}
          importProgress={importProgress}
        />
        <SourcesResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
