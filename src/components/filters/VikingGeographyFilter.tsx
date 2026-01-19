
import React from 'react';
import { Ship } from 'lucide-react';
import { getVikingGeographyOptions } from '@/utils/runicRegions';
import { SelectFilter } from './SelectFilter';

interface VikingGeographyFilterProps {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

export const VikingGeographyFilter: React.FC<VikingGeographyFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const options = getVikingGeographyOptions();
  
  return (
    <SelectFilter
      label={
        <div className="flex items-center gap-1 text-sm font-medium text-amber-400">
          <Ship className="h-4 w-4" />
          Vikingageografi
        </div>
      }
      value={selectedCategory}
      onValueChange={onCategoryChange}
      options={options}
      placeholder="Välj kategori"
      triggerClassName="bg-slate-800/80 border-amber-500/30 text-amber-100 hover:bg-slate-700/80"
      contentClassName="bg-slate-800 border-amber-500/30 z-50"
      itemClassName="text-amber-100 hover:bg-amber-600/20 focus:bg-amber-600/20"
    />
  );
};
