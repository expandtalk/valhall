
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface SwedishLocalitiesDataInputProps {
  importData: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const SwedishLocalitiesDataInput: React.FC<SwedishLocalitiesDataInputProps> = ({ importData, onChange, disabled }) => (
  <Textarea
    placeholder="Klistra in SQL-data här..."
    className="h-48 bg-slate-900 border-slate-700 text-slate-200 focus:ring-purple-500"
    value={importData}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
  />
);
