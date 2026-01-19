
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ReferenceUriProgressDisplayProps {
  isImporting: boolean;
  importProgress: number;
}

export const ReferenceUriProgressDisplay: React.FC<ReferenceUriProgressDisplayProps> = ({
  isImporting,
  importProgress
}) => {
  if (!isImporting) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">Importerar kopplingar...</h4>
      <Progress value={importProgress} className="mb-2" />
      <div className="text-sm text-slate-300">
        {Math.round(importProgress)}% slutfört
      </div>
    </div>
  );
};
