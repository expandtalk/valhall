
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";
import { DatingSourceImportResult } from './types';

interface DatingSourceResultDisplayProps {
  importResult: DatingSourceImportResult | null;
}

export const DatingSourceResultDisplay: React.FC<DatingSourceResultDisplayProps> = ({
  importResult
}) => {
  if (!importResult) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-3">📊 Importresultat:</h4>
      
      <div className="flex gap-3 mb-3">
        <Badge className="bg-green-500 text-white border-0 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {importResult.success} lyckade
        </Badge>
        
        {importResult.errors > 0 && (
          <Badge className="bg-red-500 text-white border-0 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            {importResult.errors} fel
          </Badge>
        )}
        
        {importResult.skipped > 0 && (
          <Badge className="bg-yellow-500 text-white border-0 flex items-center gap-1">
            <MinusCircle className="h-3 w-3" />
            {importResult.skipped} överhoppade
          </Badge>
        )}
      </div>

      {importResult.errorMessages.length > 0 && (
        <div className="mt-3">
          <h5 className="text-red-400 font-medium mb-2">Felmeddelanden:</h5>
          <div className="bg-red-900/20 rounded p-2 max-h-32 overflow-y-auto">
            {importResult.errorMessages.map((message, index) => (
              <div key={index} className="text-red-300 text-sm">
                • {message}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
