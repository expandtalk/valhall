
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface DanishParishesDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const DanishParishesDataInput: React.FC<DanishParishesDataInputProps> = ({ importData, onChange, disabled }) => (
  <div>
    <label htmlFor="danish-parishes-data-input" className="block text-sm font-medium text-slate-300 mb-2">
      SQL INSERT/CREATE Data
    </label>
    <Textarea
      id="danish-parishes-data-input"
      placeholder="Klistra in din SQL-sats för `her_DK` här..."
      value={importData}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="h-48 bg-slate-800 border-slate-700 text-white font-mono"
    />
  </div>
);
