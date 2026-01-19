
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImportSettings as ImportSettingsType } from "@/types/import";

interface BulkImportSourceSettingsProps {
  sourceDatabase: string;
  setSourceDatabase: (value: string) => void;
  settings: ImportSettingsType;
  setSettings: (settings: ImportSettingsType) => void;
}

export const BulkImportSourceSettings: React.FC<BulkImportSourceSettingsProps> = ({
  sourceDatabase,
  setSourceDatabase,
  settings,
  setSettings
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Källdatabas
        </label>
        <Select value={sourceDatabase} onValueChange={setSourceDatabase}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rundata">Rundata (SQL export)</SelectItem>
            <SelectItem value="runes">RuneS Database</SelectItem>
            <SelectItem value="k-samsok">K-samsök</SelectItem>
            <SelectItem value="other">Annan källa (TSV)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Konflikthantering
        </label>
        <Select 
          value={settings.duplicateHandling} 
          onValueChange={(value: any) => setSettings({...settings, duplicateHandling: value})}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="staging">Skicka till staging (säkert)</SelectItem>
            <SelectItem value="skip">Hoppa över dubbletter</SelectItem>
            <SelectItem value="merge">Försök sammanfoga</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
