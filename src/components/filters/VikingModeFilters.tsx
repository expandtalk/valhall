
import React from 'react';
import { VikingGeographyFilter } from "./VikingGeographyFilter";
import { VikingEraRealmFilter } from "./VikingEraRealmFilter";
import { VikingEraPeriodFilter } from "./VikingEraPeriodFilter";
import { StatusFilter } from "./StatusFilter";

interface VikingModeFiltersProps {
  selectedVikingCategory: string;
  selectedCountry: string;
  selectedPeriod: string;
  selectedStatus: string;
  onVikingCategoryChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const VikingModeFilters: React.FC<VikingModeFiltersProps> = ({
  selectedVikingCategory,
  selectedCountry,
  selectedPeriod,
  selectedStatus,
  onVikingCategoryChange,
  onCountryChange,
  onPeriodChange,
  onStatusChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <VikingGeographyFilter
        selectedCategory={selectedVikingCategory}
        onCategoryChange={onVikingCategoryChange}
      />
      
      <VikingEraRealmFilter
        selectedRealm={selectedCountry}
        onRealmChange={onCountryChange}
      />
      
      <VikingEraPeriodFilter
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
      />
      
      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};
