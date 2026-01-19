
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  TranslationsHeader,
  TranslationsDataInput,
  TranslationsActionButtons,
  TranslationsParsedDataDisplay,
  TranslationsProgressDisplay,
  TranslationsResultDisplay,
  useTranslationsImport
} from './index';

export const TranslationsImportSection: React.FC = () => {
  const {
    sqlData,
    setSqlData,
    parsedRecords,
    isImporting,
    importProgress,
    importResult,
    handleParseSql,
    handleImportRecords,
  } = useTranslationsImport();

  return (
    <Card className="bg-white/5 border-white/10">
      <TranslationsHeader />
      <CardContent className="space-y-4">
        <TranslationsDataInput
          sqlData={sqlData}
          setSqlData={setSqlData}
          isImporting={isImporting}
        />
        <TranslationsActionButtons
          sqlData={sqlData}
          parsedRecordsLength={parsedRecords.length}
          isImporting={isImporting}
          onParseSql={handleParseSql}
          onImportRecords={handleImportRecords}
        />
        <TranslationsParsedDataDisplay parsedRecords={parsedRecords} />
        <TranslationsProgressDisplay isImporting={isImporting} importProgress={importProgress} />
        <TranslationsResultDisplay importResult={importResult} />
      </CardContent>
    </Card>
  );
};
