
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useGroupsImport } from './useGroupsImport';
import { GroupsHeader } from './GroupsHeader';
import { GroupsDataInput } from './GroupsDataInput';
import { GroupsActionButtons } from './GroupsActionButtons';
import { GroupsParsedDataDisplay } from './GroupsParsedDataDisplay';
import { GroupsProgressDisplay } from './GroupsProgressDisplay';
import { GroupsResultDisplay } from './GroupsResultDisplay';
import { ImportStatusDisplay } from '../ImportStatusDisplay';

export const GroupsImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isParsing,
    isImporting,
    importProgress,
    importResult,
    status,
    handleParse,
    handleImport,
  } = useGroupsImport();

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <GroupsHeader />
      <CardContent className="space-y-4">
        <GroupsDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting || isParsing}
        />
        <div className="flex items-center justify-between">
          <ImportStatusDisplay
            status={status}
            successMessage="Importen av grupper lyckades!"
            errorMessage="Importen av grupper misslyckades."
          />
          <GroupsActionButtons
            onParse={handleParse}
            onImport={handleImport}
            isParsing={isParsing}
            isImporting={isImporting}
            hasParsedRecords={parsedRecords.length > 0}
          />
        </div>
        <GroupsProgressDisplay isImporting={isImporting} importProgress={importProgress} />
        <GroupsResultDisplay result={importResult} />
        <GroupsParsedDataDisplay records={parsedRecords} />
      </CardContent>
    </Card>
  );
};
