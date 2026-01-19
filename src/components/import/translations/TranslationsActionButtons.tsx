
import React from 'react';
import { Button } from "@/components/ui/button";

interface TranslationsActionButtonsProps {
  sqlData: string;
  parsedRecordsLength: number;
  isImporting: boolean;
  onParseSql: () => void;
  onImportRecords: () => void;
}

export const TranslationsActionButtons: React.FC<TranslationsActionButtonsProps> = ({
  sqlData,
  parsedRecordsLength,
  isImporting,
  onParseSql,
  onImportRecords,
}) => {
  return (
    <div className="flex gap-4">
      <Button
        onClick={onParseSql}
        disabled={!sqlData || isImporting}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Tolka SQL
      </Button>
      <Button
        onClick={onImportRecords}
        disabled={parsedRecordsLength === 0 || isImporting}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        {isImporting ? 'Importerar...' : `Importera ${parsedRecordsLength} poster`}
      </Button>
    </div>
  );
};
