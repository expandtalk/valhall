
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface PlacesDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const PlacesDataInput: React.FC<PlacesDataInputProps> = ({ importData, onChange, disabled }) => (
  <div>
    <label htmlFor="places-data-input" className="block text-sm font-medium text-slate-300 mb-2">
      SQL INSERT Data
    </label>
    <Textarea
      id="places-data-input"
      placeholder="Klistra in din SQL INSERT-sats för `places` här..."
      value={importData}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="h-48 bg-slate-800 border-slate-700 text-white font-mono"
    />
  </div>
);
