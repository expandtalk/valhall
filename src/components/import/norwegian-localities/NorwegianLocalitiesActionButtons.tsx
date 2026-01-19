
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

interface NorwegianLocalitiesActionButtonsProps {
  onImport: () => void;
  isImporting: boolean;
  hasData: boolean;
}

export const NorwegianLocalitiesActionButtons: React.FC<NorwegianLocalitiesActionButtonsProps> = ({ onImport, isImporting, hasData }) => (
  <div className="flex justify-end">
    <Button onClick={onImport} disabled={!hasData || isImporting}>
      {isImporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importerar...
        </>
      ) : (
        <>
          <Upload className="mr-2 h-4 w-4" />
          Importera Data
        </>
      )}
    </Button>
  </div>
);
