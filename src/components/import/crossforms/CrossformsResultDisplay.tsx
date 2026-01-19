
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}

interface CrossformsResultDisplayProps {
  importResult: ImportResult | null;
}

export const CrossformsResultDisplay: React.FC<CrossformsResultDisplayProps> = ({
  importResult
}) => {
  if (!importResult) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-400" />
        Importresultat - crossforms-tabellen
      </h4>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <Badge className="bg-green-500 text-white border-0">
          {importResult.success} lyckade
        </Badge>
        <Badge className="bg-red-500 text-white border-0">
          {importResult.errors} fel
        </Badge>
        <Badge className="bg-yellow-500 text-white border-0">
          {importResult.skipped} överhoppade
        </Badge>
      </div>

      {importResult.errorMessages.length > 0 && (
        <div className="mt-3">
          <h5 className="text-red-400 font-semibold mb-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Felmeddelanden:
          </h5>
          <div className="text-xs text-red-300 max-h-32 overflow-y-auto space-y-1">
            {importResult.errorMessages.slice(0, 10).map((msg, index) => (
              <div key={index} className="bg-red-500/10 rounded p-1">
                {msg}
              </div>
            ))}
            {importResult.errorMessages.length > 10 && (
              <div className="text-red-400">
                ...och {importResult.errorMessages.length - 10} fler fel
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
