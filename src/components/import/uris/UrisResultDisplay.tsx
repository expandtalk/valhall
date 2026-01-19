
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { UriImportResult } from './types';

interface UrisResultDisplayProps {
  importResult: UriImportResult | null;
}

export const UrisResultDisplay: React.FC<UrisResultDisplayProps> = ({ importResult }) => {
  if (!importResult) return null;

  const total = importResult.success + importResult.errors + importResult.skipped;

  return (
    <Alert className={importResult.errors > 0 ? "border-red-500/50 text-red-500" : "border-green-500/50 text-green-500"}>
      {importResult.errors === 0 ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
      <AlertTitle>Importresultat</AlertTitle>
      <AlertDescription>
        <p>Lyckade: {importResult.success}/{total}</p>
        <p>Misslyckade: {importResult.errors}/{total}</p>
        {importResult.skipped > 0 && <p>Skippade: {importResult.skipped}/{total}</p>}
        {importResult.errorMessages.length > 0 && (
          <div className="mt-2 text-xs max-h-24 overflow-y-auto bg-black/30 p-2 rounded">
            <h5 className="font-bold mb-1">Felmeddelanden:</h5>
            {importResult.errorMessages.map((msg, i) => <p key={i}>{msg}</p>)}
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};
