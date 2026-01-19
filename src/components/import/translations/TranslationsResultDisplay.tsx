
import React from 'react';
import { TranslationImportResult } from './types';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle } from 'lucide-react';

interface TranslationsResultDisplayProps {
  importResult: TranslationImportResult | null;
}

export const TranslationsResultDisplay: React.FC<TranslationsResultDisplayProps> = ({ importResult }) => {
  if (!importResult) return null;

  const hasErrors = importResult.errors > 0;

  return (
    <Alert variant={hasErrors ? "destructive" : "default"} className="bg-opacity-20">
      {hasErrors ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
      <AlertTitle>{hasErrors ? 'Import avslutad med fel' : 'Import slutförd'}</AlertTitle>
      <AlertDescription>
        <p>Lyckade: {importResult.success}</p>
        <p>Misslyckade: {importResult.errors}</p>
        <p>Hoppades över: {importResult.skipped}</p>
        {importResult.errorMessages.length > 0 && (
          <div className="mt-2 text-xs">
            <h5 className="font-semibold">Felmeddelanden:</h5>
            <ul className="list-disc pl-5">
              {importResult.errorMessages.map((msg, i) => <li key={i}>{msg}</li>)}
            </ul>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};
