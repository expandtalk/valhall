
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImportResult {
  success: boolean;
  message: string;
  details?: string;
}

interface NorwegianLocalitiesResultDisplayProps {
  importResult: ImportResult;
  onClose: () => void;
}

export const NorwegianLocalitiesResultDisplay: React.FC<NorwegianLocalitiesResultDisplayProps> = ({ importResult, onClose }) => (
  <Alert variant={importResult.success ? 'default' : 'destructive'} className="relative">
    {importResult.success ? (
      <CheckCircle2 className="h-4 w-4" />
    ) : (
      <XCircle className="h-4 w-4" />
    )}
    <AlertTitle>{importResult.success ? 'Import Lyckades' : 'Import Misslyckades'}</AlertTitle>
    <AlertDescription>
      {importResult.message}
      {importResult.details && <p className="text-xs mt-2">{importResult.details}</p>}
    </AlertDescription>
    <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={onClose}>
      <XCircle className="h-4 w-4" />
    </Button>
  </Alert>
);
