
import React from 'react';
import { Textarea } from "@/components/ui/textarea";

interface SignumInscriptionDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const SignumInscriptionDataInput: React.FC<SignumInscriptionDataInputProps> = ({ importData, onChange, disabled }) => (
  <div>
    <label htmlFor="signum-inscription-data-input" className="block text-sm font-medium text-slate-300 mb-2">
      SQL INSERT Data
    </label>
    <Textarea
      id="signum-inscription-data-input"
      placeholder="Klistra in din SQL-sats för `signum_inscription` här..."
      value={importData}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="h-48 bg-slate-800 border-slate-700 text-white font-mono"
    />
  </div>
);
