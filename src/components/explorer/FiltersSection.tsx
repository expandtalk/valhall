
import React from 'react';
import { RunicFilters } from "../RunicFilters";

interface FiltersSectionProps {
  selectedLandscape: string;
  selectedCountry: string;
  selectedPeriod: string;
  selectedStatus: string;
  selectedObjectType: string;
  onLandscapeChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onObjectTypeChange: (value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export const FiltersSection: React.FC<FiltersSectionProps> = ({
  selectedLandscape,
  selectedCountry,
  selectedPeriod,
  selectedStatus,
  selectedObjectType,
  onLandscapeChange,
  onCountryChange,
  onPeriodChange,
  onStatusChange,
  onObjectTypeChange,
  onClearFilters,
  activeFiltersCount
}) => {
  return (
    <div className="w-full max-w-2xl">
      <RunicFilters
        selectedLandscape={selectedLandscape}
        selectedCountry={selectedCountry}
        selectedPeriod={selectedPeriod}
        selectedStatus={selectedStatus}
        selectedObjectType={selectedObjectType}
        onLandscapeChange={onLandscapeChange}
        onCountryChange={onCountryChange}
        onPeriodChange={onPeriodChange}
        onStatusChange={onStatusChange}
        onObjectTypeChange={onObjectTypeChange}
        onClearFilters={onClearFilters}
        activeFiltersCount={activeFiltersCount}
      />
    </div>
  );
};
