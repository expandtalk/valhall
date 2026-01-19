
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface ObjectsActionButtonsProps {
  onImport: () => void;
  isImporting: boolean;
  hasData: boolean;
}

export const ObjectsActionButtons: React.FC<ObjectsActionButtonsProps> = ({ onImport, isImporting, hasData }) => (
  <div className="flex justify-end">
    <Button
      onClick={onImport}
      disabled={isImporting || !hasData}
      className="bg-purple-600 hover:bg-purple-700 text-white"
    >
      {isImporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importerar...
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          Importera Objects
        </>
      )}
    </Button>
  </div>
);
