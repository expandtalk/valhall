
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText } from 'lucide-react';

interface CrossCrossformActionButtonsProps {
  hasData: boolean;
  isImporting: boolean;
  onPreview: () => void;
  onImport: () => void;
}

export const CrossCrossformActionButtons: React.FC<CrossCrossformActionButtonsProps> = ({
  hasData,
  isImporting,
  onPreview,
  onImport
}) => {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onPreview}
        disabled={!hasData || isImporting}
        variant="outline"
        className="bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/50 text-blue-300"
      >
        <FileText className="h-4 w-4 mr-2" />
        Förhandsgranska Konvertering
      </Button>
      
      <Button
        onClick={onImport}
        disabled={!hasData || isImporting}
        className="bg-green-600 hover:bg-green-700"
      >
        {isImporting ? (
          <>Importerar...</>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Importera Data
          </>
        )}
      </Button>
    </div>
  );
};
