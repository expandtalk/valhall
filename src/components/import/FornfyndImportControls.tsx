
import React from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Loader2, FileText } from "lucide-react";
import { ImportStatusDisplay } from "./ImportStatusDisplay";

interface FornfyndImportControlsProps {
  textData: string;
  onTextDataChange: (value: string) => void;
  onParseData: () => void;
  onImport: () => void;
  isImporting: boolean;
  parsedCount: number;
  importStatus: 'idle' | 'success' | 'error';
}

export const FornfyndImportControls: React.FC<FornfyndImportControlsProps> = ({
  textData,
  onTextDataChange,
  onParseData,
  onImport,
  isImporting,
  parsedCount,
  importStatus
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="fornfynd-data" className="text-white">Fornfynd detaljerad data:</Label>
        <textarea
          id="fornfynd-data"
          value={textData}
          onChange={(e) => onTextDataChange(e.target.value)}
          placeholder="Klistra in fullständig Fornfynd-data här (med L-nummer, koordinater, beskrivningar, etc.)..."
          className="w-full h-32 p-3 bg-black/20 border border-white/20 rounded text-white placeholder-slate-400 resize-none"
        />
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={onParseData}
          disabled={!textData.trim()}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <FileText className="h-4 w-4 mr-2" />
          Parsa detaljerad data
        </Button>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button 
          onClick={onImport}
          disabled={isImporting || parsedCount === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isImporting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Importerar...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Importera {parsedCount} Fornfynd-poster
            </>
          )}
        </Button>

        <ImportStatusDisplay status={importStatus} />
      </div>
    </>
  );
};
