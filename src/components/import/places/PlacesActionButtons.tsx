
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

interface PlacesActionButtonsProps {
  onImport: () => void;
  isImporting: boolean;
  hasData: boolean;
}

export const PlacesActionButtons: React.FC<PlacesActionButtonsProps> = ({ onImport, isImporting, hasData }) => (
  <div className="flex justify-end">
    <Button
      onClick={onImport}
      disabled={isImporting || !hasData}
      className="bg-green-600 hover:bg-green-700 text-white"
    >
      {isImporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importerar...
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          Importera Platser
        </>
      )}
    </Button>
  </div>
);
