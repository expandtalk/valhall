
import React from 'react';

interface FiltersStatusSectionProps {
  activeFiltersCount: number;
  handleClearFilters: () => void;
  searchQuery: string;
  selectedLandscape: string;
  selectedCountry: string;
  selectedPeriod: string;
}

export const FiltersStatusSection: React.FC<FiltersStatusSectionProps> = ({
  activeFiltersCount,
  handleClearFilters,
  searchQuery,
  selectedLandscape,
  selectedCountry,
  selectedPeriod
}) => {
  if (activeFiltersCount === 0) return null;

  return (
    <div className="bg-amber-900/20 rounded-lg p-3 border border-amber-500/30">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-amber-300 font-medium text-sm">Aktiva filter ({activeFiltersCount})</h3>
        <button
          onClick={handleClearFilters}
          className="text-amber-300 hover:text-amber-200 text-xs underline"
        >
          Rensa alla
        </button>
      </div>
      <div className="space-y-1">
        {searchQuery && (
          <div className="text-xs text-amber-200">Sök: "{searchQuery}"</div>
        )}
        {selectedLandscape !== 'all' && (
          <div className="text-xs text-amber-200">Landskap: {selectedLandscape}</div>
        )}
        {selectedCountry !== 'all' && (
          <div className="text-xs text-amber-200">Land: {selectedCountry}</div>
        )}
        {selectedPeriod !== 'all' && (
          <div className="text-xs text-amber-200">Period: {selectedPeriod}</div>
        )}
      </div>
    </div>
  );
};
