
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface BulkImportDataInputProps {
  sourceDatabase: string;
  importData: string;
  setImportData: (data: string) => void;
  lineCount: number;
  isLargeDataset: boolean;
  isVeryLargeDataset: boolean;
  isImporting: boolean;
}

export const BulkImportDataInput: React.FC<BulkImportDataInputProps> = ({
  sourceDatabase,
  importData,
  setImportData,
  lineCount,
  isLargeDataset,
  isVeryLargeDataset,
  isImporting
}) => {
  return (
    <div className="relative z-10">
      <label className="block text-sm font-medium text-slate-300 mb-2">
        Import Data
      </label>
      <Textarea
        value={importData}
        onChange={(e) => setImportData(e.target.value)}
        placeholder={sourceDatabase === 'rundata' 
          ? `Klistra in Rundata SQL export här...\n\nExempel:\nCREATE TABLE \`inscriptions\` (...)\nINSERT INTO \`inscriptions\` VALUES (...)`
          : `Klistra in data här i TSV-format:\nSignum\tTranslitteration\tPlats\tÖversättning\tDatering\tKoordinater\tObjekttyp\n\nExempel:\nU 337\tþur uiki\tRamsund\tThor consecrate\t1000-1100\t59.123,18.456\tRunsten`
        }
        className="w-full h-40 bg-white/5 border-white/10 text-white font-mono text-sm relative z-10"
        disabled={isImporting}
        style={{ pointerEvents: 'auto' }}
      />
      <div className="text-xs text-slate-400 mt-1 flex justify-between">
        <span>{lineCount.toLocaleString()} rader totalt</span>
        {isVeryLargeDataset && (
          <span className="text-red-400 font-semibold">⚠️ Mycket stor dataset - kan ta lång tid</span>
        )}
        {isLargeDataset && !isVeryLargeDataset && (
          <span className="text-orange-400">⚠️ Stor dataset - optimerad validering aktiverad</span>
        )}
      </div>
    </div>
  );
};
