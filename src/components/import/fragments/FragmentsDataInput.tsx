
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface FragmentsDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const FragmentsDataInput: React.FC<FragmentsDataInputProps> = ({ importData, onChange, disabled }) => (
  <div>
    <label htmlFor="fragments-data-input" className="block text-sm font-medium text-slate-300 mb-2">
      SQL INSERT Data
    </label>
    <Textarea
      id="fragments-data-input"
      placeholder="Klistra in din SQL INSERT-sats för `fragments` här..."
      value={importData}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="h-48 bg-slate-800 border-slate-700 text-white font-mono"
    />
  </div>
);
