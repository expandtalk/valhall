
import React from 'react';
import { Swords } from 'lucide-react';
import { VIKING_TIME_PERIODS } from '@/constants/vikingEraRealms';
import { SelectFilter } from './SelectFilter';

interface VikingEraPeriodFilterProps {
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
}

export const VikingEraPeriodFilter: React.FC<VikingEraPeriodFilterProps> = ({
  selectedPeriod,
  onPeriodChange
}) => {
  const options = Object.entries(VIKING_TIME_PERIODS).map(([code, name]) => ({
    value: code,
    label: name as string
  }));
  
  return (
    <SelectFilter
      label={
        <div className="flex items-center gap-1 text-sm font-medium text-amber-400">
          <Swords className="h-4 w-4" />
          Tidsperiod
        </div>
      }
      value={selectedPeriod}
      onValueChange={onPeriodChange}
      options={options}
      placeholder="Välj tidsperiod"
      triggerClassName="bg-slate-800/80 border-amber-500/30 text-amber-100 hover:bg-slate-700/80"
      contentClassName="bg-slate-800 border-amber-500/30 z-50"
      itemClassName="text-amber-100 hover:bg-amber-600/20 focus:bg-amber-600/20"
    />
  );
};
