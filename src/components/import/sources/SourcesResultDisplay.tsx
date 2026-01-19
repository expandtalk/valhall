
import React from 'react';
import { SourceImportResult } from './types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SourcesResultDisplayProps {
  importResult: SourceImportResult | null;
}

export const SourcesResultDisplay: React.FC<SourcesResultDisplayProps> = ({ importResult }) => {
  if (!importResult) return null;

  const hasErrors = importResult.errors > 0;

  return (
    <Alert variant={hasErrors ? "destructive" : "default"} className="bg-black/20 border-white/20">
      {hasErrors ? (
        <XCircle className="h-4 w-4" color="#f87171" />
      ) : (
        <CheckCircle className="h-4 w-4" color="#4ade80" />
      )}
      <AlertTitle className={hasErrors ? "text-red-400" : "text-green-400"}>
        Importresultat
      </AlertTitle>
      <AlertDescription className="text-slate-300">
        <p>
          Klart! {importResult.success} poster importerade, {importResult.errors} fel, {importResult.skipped} överhoppade.
        </p>
        {hasErrors && importResult.errorMessages.length > 0 && (
          <div className="mt-2">
            <h5 className="font-semibold text-white">Felmeddelanden</h5>
            <ScrollArea className="h-24 mt-1 p-2 bg-black/30 rounded">
              <ul className="text-xs list-disc list-inside space-y-1">
                {importResult.errorMessages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};
