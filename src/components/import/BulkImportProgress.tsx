
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface BulkImportProgressProps {
  isImporting: boolean;
  currentStatus: string;
  progress: number;
}

export const BulkImportProgress: React.FC<BulkImportProgressProps> = ({
  isImporting,
  currentStatus,
  progress
}) => {
  if (!isImporting) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300">{currentStatus}</span>
        <span className="text-white">{progress.toFixed(0)}%</span>
      </div>
      <Progress value={progress} className="bg-slate-700" />
    </div>
  );
};
