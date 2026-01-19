
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";
import { ImportSettings as ImportSettingsType } from "@/types/import";

interface ImportSettingsProps {
  settings: ImportSettingsType;
  onSettingsChange: (settings: ImportSettingsType) => void;
}

export const ImportSettings: React.FC<ImportSettingsProps> = ({ settings, onSettingsChange }) => {
  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
        <Settings className="h-4 w-4" />
        Import-inställningar
      </h4>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={settings.autoResolveSimpleConflicts}
            onChange={(e) => onSettingsChange({...settings, autoResolveSimpleConflicts: e.target.checked})}
            className="rounded"
          />
          Lös enkla konflikter automatiskt
        </label>
        <p className="text-xs text-slate-400 ml-6">
          T.ex. automatiskt korrigera GPS-format eller enkla dateringsproblem
        </p>
      </div>
    </div>
  );
};
