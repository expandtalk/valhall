
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info, Upload } from "lucide-react";

interface DatingSourceActionButtonsProps {
  sqlData: string;
  parsedRecordsLength: number;
  isImporting: boolean;
  onParseSql: () => void;
  onImportRecords: () => void;
}

export const DatingSourceActionButtons: React.FC<DatingSourceActionButtonsProps> = ({
  sqlData,
  parsedRecordsLength,
  isImporting,
  onParseSql,
  onImportRecords
}) => {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onParseSql}
        disabled={!sqlData.trim() || isImporting}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Info className="h-4 w-4 mr-2" />
        Parsa SQL
      </Button>

      <Button
        onClick={onImportRecords}
        disabled={parsedRecordsLength === 0 || isImporting}
        className="bg-green-600 hover:bg-green-700"
      >
        <Upload className="h-4 w-4 mr-2" />
        Importera Kopplingar
      </Button>
    </div>
  );
};
