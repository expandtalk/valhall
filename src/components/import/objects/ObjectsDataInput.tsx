
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface ObjectsDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const ObjectsDataInput: React.FC<ObjectsDataInputProps> = ({ importData, onChange, disabled }) => (
  <div>
    <label htmlFor="objects-data-input" className="block text-sm font-medium text-slate-300 mb-2">
      SQL INSERT Data
    </label>
    <Textarea
      id="objects-data-input"
      placeholder="Klistra in din SQL INSERT-sats för `objects` här..."
      value={importData}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="h-48 bg-slate-800 border-slate-700 text-white font-mono"
    />
  </div>
);
