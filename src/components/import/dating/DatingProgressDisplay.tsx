
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface DatingProgressDisplayProps {
  isImporting: boolean;
  importProgress: number;
}

export const DatingProgressDisplay: React.FC<DatingProgressDisplayProps> = ({
  isImporting,
  importProgress
}) => {
  if (!isImporting) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">Importerar dateringar...</h4>
      <Progress value={importProgress} className="mb-2" />
      <div className="text-sm text-slate-300">
        {Math.round(importProgress)}% slutfört
      </div>
    </div>
  );
};
