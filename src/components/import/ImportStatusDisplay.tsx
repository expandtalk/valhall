
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ImportStatusDisplayProps {
  status: 'idle' | 'success' | 'error';
  successMessage?: string;
  errorMessage?: string;
}

export const ImportStatusDisplay: React.FC<ImportStatusDisplayProps> = ({ 
  status, 
  successMessage = "Import lyckades!",
  errorMessage = "Import misslyckades"
}) => {
  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-400">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm">{successMessage}</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-2 text-red-400">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">{errorMessage}</span>
      </div>
    );
  }

  return null;
};
