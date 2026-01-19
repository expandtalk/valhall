
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface DanishNotesResultDisplayProps {
  importResult: { success: boolean; message: string; details?: string } | null;
  onClose: () => void;
}

export const DanishNotesResultDisplay: React.FC<DanishNotesResultDisplayProps> = ({ importResult, onClose }) => {
  if (!importResult) return null;

  return (
    <div className={`p-4 rounded-md border ${importResult.success ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'}`}>
      <div className="flex items-start gap-4">
        {importResult.success ? (
          <CheckCircle className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
        ) : (
          <XCircle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
        )}
        <div className="flex-grow">
          <h3 className={`font-semibold ${importResult.success ? 'text-green-300' : 'text-red-300'}`}>
            {importResult.success ? "Import Lyckades" : "Import Misslyckades"}
          </h3>
          <p className={`text-sm ${importResult.success ? 'text-green-400' : 'text-red-400'}`}>
            {importResult.message}
          </p>
          {importResult.details && (
            <p className="text-xs text-slate-400 mt-2">Detaljer: {importResult.details}</p>
          )}
        </div>
        <Button onClick={onClose} variant="ghost" size="sm">Stäng</Button>
      </div>
    </div>
  );
};
