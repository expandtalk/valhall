
import React from 'react';
import { Info } from "lucide-react";

interface BulkImportDatasetWarningProps {
  lineCount: number;
}

export const BulkImportDatasetWarning: React.FC<BulkImportDatasetWarningProps> = ({ lineCount }) => {
  return (
    <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-500/20">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-orange-400 mt-0.5" />
        <div>
          <h4 className="text-orange-300 font-semibold mb-2">Stor dataset upptäckt</h4>
          <p className="text-slate-300 text-sm">
            Du har {lineCount.toLocaleString()} rader. Med förbättrad signum-validering rekommenderar vi fortfarande att dela upp stora dataset i mindre filer (max 10,000-20,000 rader per import).
          </p>
        </div>
      </div>
    </div>
  );
};
