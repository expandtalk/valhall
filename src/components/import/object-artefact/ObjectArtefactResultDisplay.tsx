
import React from 'react';
import { Button } from "@/components/ui/button";

interface ImportResults {
  success: number;
  errors: string[];
  warnings: string[];
}

interface ObjectArtefactResultDisplayProps {
  importResults: ImportResults;
  onClose: () => void;
}

export const ObjectArtefactResultDisplay: React.FC<ObjectArtefactResultDisplayProps> = ({
  importResults,
  onClose
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h3 className="text-green-400 font-semibold mb-2">Import slutförd</h3>
        <p className="text-green-300">
          {importResults.success} object-artefakt-kopplingar importerades framgångsrikt
        </p>
      </div>

      {importResults.warnings.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <h3 className="text-yellow-400 font-semibold mb-2">Varningar ({importResults.warnings.length})</h3>
          <div className="max-h-32 overflow-y-auto">
            {importResults.warnings.map((warning, index) => (
              <p key={index} className="text-yellow-300 text-sm">{warning}</p>
            ))}
          </div>
        </div>
      )}

      {importResults.errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold mb-2">Fel ({importResults.errors.length})</h3>
          <div className="max-h-32 overflow-y-auto">
            {importResults.errors.map((error, index) => (
              <p key={index} className="text-red-300 text-sm">{error}</p>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700"
        >
          Stäng
        </Button>
      </div>
    </div>
  );
};
