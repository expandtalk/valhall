
import React from 'react';
import { Calendar } from 'lucide-react';
import { PERIOD_MARKERS } from '@/constants/runicConstants';
import { SelectFilter } from './SelectFilter';

interface PeriodFilterProps {
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
}

export const PeriodFilter: React.FC<PeriodFilterProps> = ({
  selectedPeriod,
  onPeriodChange
}) => {
  const options = Object.entries(PERIOD_MARKERS).map(([code, name]) => ({
    value: code,
    label: name as string
  }));

  return (
    <SelectFilter
      label={
        <div className="flex items-center gap-1 text-sm font-medium text-white">
          <Calendar className="h-4 w-4" />
          Period
        </div>
      }
      value={selectedPeriod}
      onValueChange={onPeriodChange}
      options={options}
      placeholder="Select period"
      showAllOption={{ value: "all", label: "All periods" }}
      triggerClassName="bg-white/10 border-white/20 text-white"
      contentClassName="bg-slate-800 border-white/20 z-50"
      itemClassName="text-white hover:bg-white/10"
      allItemClassName="text-white hover:bg-white/10"
    />
  );
};
