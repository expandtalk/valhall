
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface SourcesDataInputProps {
  sqlData: string;
  setSqlData: (data: string) => void;
  isImporting: boolean;
}

export const SourcesDataInput: React.FC<SourcesDataInputProps> = ({
  sqlData,
  setSqlData,
  isImporting
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-white mb-2">
        MySQL Export Data for Sources
      </label>
      <Textarea
        value={sqlData}
        onChange={(e) => setSqlData(e.target.value)}
        placeholder="Klistra in MySQL INSERT statement för `sources`-tabellen här..."
        className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder-white/50 font-mono text-sm"
        disabled={isImporting}
      />
    </div>
  );
};
