
import React from 'react';
import { Button } from "@/components/ui/button";

interface GroupsActionButtonsProps {
  onParse: () => void;
  onImport: () => void;
  isParsing: boolean;
  isImporting: boolean;
  hasParsedRecords: boolean;
}

export const GroupsActionButtons: React.FC<GroupsActionButtonsProps> = ({
  onParse,
  onImport,
  isParsing,
  isImporting,
  hasParsedRecords,
}) => {
  return (
    <div className="flex justify-end gap-2">
      <Button onClick={onParse} disabled={isParsing || isImporting}>
        {isParsing ? 'Tolkar...' : 'Tolka SQL'}
      </Button>
      <Button
        onClick={onImport}
        disabled={!hasParsedRecords || isImporting || isParsing}
        variant="destructive"
      >
        {isImporting ? 'Importerar...' : 'Importera'}
      </Button>
    </div>
  );
};
