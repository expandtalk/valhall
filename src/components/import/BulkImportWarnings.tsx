
import React from 'react';
import { Database } from "lucide-react";

interface BulkImportWarningsProps {
  lineCount: number;
}

export const BulkImportWarnings: React.FC<BulkImportWarningsProps> = ({
  lineCount
}) => {
  return (
    <>
      {lineCount > 200000 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <Database className="h-4 w-4" />
            <span className="font-semibold">Extremt stor dataset</span>
          </div>
          <p className="text-red-300 text-sm">
            {lineCount.toLocaleString()} rader är en extremt stor dataset. För bästa prestanda:
          </p>
          <ul className="text-red-300 text-sm mt-2 ml-4">
            <li>• Dela upp i mindre filer (max 10,000-20,000 rader per import)</li>
            <li>• Test-funktionen är begränsad och kan vara långsam</li>
            <li>• Import kan ta mycket lång tid eller misslyckas</li>
          </ul>
        </div>
      )}

      {lineCount > 300000 && (
        <div className="text-sm text-orange-400 bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
          <strong>Import inaktiverad:</strong> Dataset med {lineCount.toLocaleString()} rader överstiger gränsen på 300,000 rader. 
          Dela upp datan i mindre filer för att kunna importera.
        </div>
      )}
    </>
  );
};
