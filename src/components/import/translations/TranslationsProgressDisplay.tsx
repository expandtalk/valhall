
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface TranslationsProgressDisplayProps {
  isImporting: boolean;
  importProgress: number;
}

export const TranslationsProgressDisplay: React.FC<TranslationsProgressDisplayProps> = ({ isImporting, importProgress }) => {
  if (!isImporting) return null;

  return (
    <div className="space-y-2">
      <p className="text-white">Importerar...</p>
      <Progress value={importProgress} className="w-full" />
    </div>
  );
};
