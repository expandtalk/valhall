
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface UrisProgressDisplayProps {
  isImporting: boolean;
  importProgress: number;
}

export const UrisProgressDisplay: React.FC<UrisProgressDisplayProps> = ({ isImporting, importProgress }) => {
  if (!isImporting) return null;

  return (
    <div className="space-y-2">
      <p className="text-white">Importerar...</p>
      <Progress value={importProgress} className="w-full" />
    </div>
  );
};
