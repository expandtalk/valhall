
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Upload } from 'lucide-react';

interface SourcesActionButtonsProps {
  sqlData: string;
  parsedRecordsLength: number;
  isImporting: boolean;
  onParseSql: () => void;
  onImportRecords: () => void;
}

export const SourcesActionButtons: React.FC<SourcesActionButtonsProps> = ({
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
        <Play className="mr-2 h-4 w-4" />
        Tolka SQL
      </Button>
      <Button
        onClick={onImportRecords}
        disabled={parsedRecordsLength === 0 || isImporting}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        <Upload className="mr-2 h-4 w-4" />
        Importera Källor
      </Button>
    </div>
  );
};
