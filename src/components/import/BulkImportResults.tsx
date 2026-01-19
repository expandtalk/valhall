
import React from 'react';
import { CheckCircle, AlertCircle, Info, Database } from "lucide-react";
import { ImportResult } from "@/types/import";

interface BulkImportResultsProps {
  result: ImportResult | null;
}

export const BulkImportResults: React.FC<BulkImportResultsProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="text-white text-sm font-medium">Importerade</span>
        </div>
        <div className="text-2xl font-bold text-green-400">{result.imported}</div>
      </div>
      
      <div className="bg-orange-600/20 border border-orange-400/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-orange-400" />
          <span className="text-white text-sm font-medium">Till Staging</span>
        </div>
        <div className="text-2xl font-bold text-orange-400">{result.staged}</div>
      </div>
      
      <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <span className="text-white text-sm font-medium">Fel</span>
        </div>
        <div className="text-2xl font-bold text-red-400">{result.errors}</div>
      </div>
      
      <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-400" />
          <span className="text-white text-sm font-medium">Totalt</span>
        </div>
        <div className="text-2xl font-bold text-blue-400">{result.total}</div>
      </div>
    </div>
  );
};
