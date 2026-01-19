
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from 'lucide-react';

interface ObjectArtefactActionButtonsProps {
  onImport: () => void;
  isImporting: boolean;
  hasData: boolean;
}

export const ObjectArtefactActionButtons: React.FC<ObjectArtefactActionButtonsProps> = ({
  onImport,
  isImporting,
  hasData
}) => {
  return (
    <div className="flex gap-3 justify-end">
      <Button
        onClick={onImport}
        disabled={isImporting || !hasData}
        className="bg-purple-600 hover:bg-purple-700"
      >
        {isImporting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Importerar...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Starta Import
          </>
        )}
      </Button>
    </div>
  );
};
