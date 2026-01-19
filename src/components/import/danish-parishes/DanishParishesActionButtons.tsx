
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface DanishParishesActionButtonsProps {
  onImport: () => void;
  isImporting: boolean;
  hasData: boolean;
}

export const DanishParishesActionButtons: React.FC<DanishParishesActionButtonsProps> = ({ onImport, isImporting, hasData }) => (
  <div className="flex justify-end">
    <Button
      onClick={onImport}
      disabled={isImporting || !hasData}
      className="bg-teal-600 hover:bg-teal-700 text-white"
    >
      {isImporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importerar...
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          Importera Danska Socknar
        </>
      )}
    </Button>
  </div>
);
