
import React from 'react';
import { FindnumberImportResult } from './types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle, SkipForward } from 'lucide-react';

interface FindnumbersResultDisplayProps {
  importResult: FindnumberImportResult | null;
}

export const FindnumbersResultDisplay: React.FC<FindnumbersResultDisplayProps> = ({ importResult }) => {
  if (!importResult) return null;

  const { success, errors, skipped, errorMessages } = importResult;

  return (
    <div className="space-y-4">
      <Alert variant={errors > 0 ? "destructive" : "default"} className="bg-black/20 border-white/20">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Importresultat</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>Klart! {success} poster importerade, {errors} fel, {skipped} överhoppade.</p>
        </AlertDescription>
      </Alert>

      {errorMessages.length > 0 && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-500/30">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Felmeddelanden</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 max-h-40 overflow-y-auto">
              {errorMessages.slice(0, 100).map((msg, index) => (
                <li key={index} className="text-xs">{msg}</li>
              ))}
              {errorMessages.length > 100 && <li>... och {errorMessages.length - 100} till.</li>}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
