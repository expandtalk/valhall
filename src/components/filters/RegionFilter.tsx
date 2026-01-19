
import React from 'react';
import { MapPin } from 'lucide-react';
import { SelectFilter } from './SelectFilter';

interface RegionFilterProps {
  selectedLandscape: string;
  onLandscapeChange: (value: string) => void;
  availableRegions: Record<string, string>;
  regionLabel: string;
}

export const RegionFilter: React.FC<RegionFilterProps> = ({
  selectedLandscape,
  onLandscapeChange,
  availableRegions,
  regionLabel
}) => {
  const options = Object.entries(availableRegions)
    .filter(([code, name]) => code && code.trim() !== '') // Filter out empty string keys
    .map(([code, name]) => ({
      value: code,
      label: `${code} - ${name}`
    }));

  if (options.length === 0) {
    return null;
  }
  
  return (
    <SelectFilter
      label={
        <div className="flex items-center gap-1 text-sm font-medium text-white">
          <MapPin className="h-4 w-4" />
          {regionLabel}
        </div>
      }
      value={selectedLandscape}
      onValueChange={onLandscapeChange}
      options={options}
      placeholder="Select region"
      showAllOption={{ value: "all", label: "All regions" }}
      triggerClassName="bg-white/10 border-white/20 text-white"
      contentClassName="bg-slate-800 border-white/20 z-50"
      itemClassName="text-white hover:bg-white/10"
      allItemClassName="text-white hover:bg-white/10"
    />
  );
};
