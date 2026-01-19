
import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

interface ImportResults {
  success: number;
  errors: string[];
  warnings: string[];
}

interface ObjectsResultDisplayProps {
  importResults: ImportResults;
  onClose: () => void;
}

export const ObjectsResultDisplay: React.FC<ObjectsResultDisplayProps> = ({ importResults, onClose }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-white">Importresultat</h3>
    <div className="flex items-center gap-2 text-green-400">
      <CheckCircle className="h-5 w-5" />
      <span>{importResults.success} objekt importerades.</span>
    </div>
    {importResults.warnings.length > 0 && (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-yellow-400">
          <AlertTriangle className="h-5 w-5" />
          <span>{importResults.warnings.length} varningar:</span>
        </div>
        <ul className="list-disc list-inside bg-yellow-400/10 p-3 rounded-md max-h-40 overflow-y-auto text-sm text-yellow-300">
          {importResults.warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </div>
    )}
    {importResults.errors.length > 0 && (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-red-400">
          <XCircle className="h-5 w-5" />
          <span>{importResults.errors.length} fel:</span>
        </div>
        <ul className="list-disc list-inside bg-red-400/10 p-3 rounded-md max-h-40 overflow-y-auto text-sm text-red-300">
          {importResults.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    )}
    <div className="flex justify-end">
      <Button onClick={onClose} variant="outline">Stäng</Button>
    </div>
  </div>
);
