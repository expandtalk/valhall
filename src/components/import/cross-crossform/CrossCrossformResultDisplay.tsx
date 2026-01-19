
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ImportResult {
  success: boolean;
  count: number;
  error?: string;
}

interface CrossCrossformResultDisplayProps {
  importResult: ImportResult | null;
}

export const CrossCrossformResultDisplay: React.FC<CrossCrossformResultDisplayProps> = ({
  importResult
}) => {
  if (!importResult) return null;

  return (
    <div className={`border rounded-lg p-3 ${
      importResult.success 
        ? 'bg-green-500/10 border-green-500/20' 
        : 'bg-red-500/10 border-red-500/20'
    }`}>
      <div className="flex items-center gap-2">
        {importResult.success ? (
          <CheckCircle className="h-4 w-4 text-green-400" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-400" />
        )}
        <span className={`text-sm font-medium ${
          importResult.success ? 'text-green-300' : 'text-red-300'
        }`}>
          {importResult.success ? 'Import slutförd!' : 'Import misslyckades'}
        </span>
      </div>
      
      {importResult.error && (
        <p className="text-red-300 text-xs mt-1">{importResult.error}</p>
      )}
    </div>
  );
};
