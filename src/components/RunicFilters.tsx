
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FilterHeader } from "./filters/FilterHeader";
import { FilterInfo } from "./filters/FilterInfo";
import { ModernModeFilters } from "./filters/ModernModeFilters";
import { ScrollArea } from "@/components/ui/scroll-area";

// Modern landscapes for filtering
const LANDSCAPES: Record<string, string> = {
  'uppland': 'Uppland',
  'gotland': 'Gotland', 
  'blekinge': 'Blekinge'
};

interface RunicFiltersProps {
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

export const RunicFilters: React.FC<RunicFiltersProps> = ({
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
    <Card className="bg-gray-900/95 backdrop-blur-md border-gray-500/60 max-h-[600px] overflow-hidden">
      <CardHeader className="pb-4">
        <FilterHeader
          activeFiltersCount={activeFiltersCount}
          onClearFilters={onClearFilters}
        />
      </CardHeader>
      
      <CardContent className="space-y-4 overflow-hidden">
        <FilterInfo />

        <ScrollArea className="h-full max-h-[400px]">
          <div className="pr-4">
            <ModernModeFilters
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
              availableRegions={LANDSCAPES}
            />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
