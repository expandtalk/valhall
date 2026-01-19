
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface FragmentsActionButtonsProps {
  onImport: () => void;
  isImporting: boolean;
  hasData: boolean;
}

export const FragmentsActionButtons: React.FC<FragmentsActionButtonsProps> = ({ onImport, isImporting, hasData }) => (
  <div className="flex justify-end">
    <Button
      onClick={onImport}
      disabled={isImporting || !hasData}
      className="bg-indigo-600 hover:bg-indigo-700 text-white"
    >
      {isImporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importerar...
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          Importera Fragment
        </>
      )}
    </Button>
  </div>
);
