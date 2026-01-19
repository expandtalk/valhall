import React from 'react';
import { MapAndResultsSection } from './MapAndResultsSection';
import { LinguistResultsView } from './LinguistResultsView';
import { ExplorerContentProps } from '@/types/explorer';

export const ExplorerContent: React.FC<ExplorerContentProps> = ({
  shouldShowMap,
  mapInscriptions,
  currentInscriptions,
  allInscriptions,
  enabledLegendItems,
  legendItems,
  expandedCards,
  currentPage,
  totalPages,
  itemsPerPage,
  isLoading,
  hasActiveSearch,
  totalInscriptions,
  shouldShowFilters,
  selectedLandscape,
  selectedCountry,
  selectedPeriod,
  selectedStatus,
  selectedObjectType,
  onMarkerClick,
  onMapNavigate,
  onLegendToggle,
  onToggleExpanded,
  onResultClick,
  onPageChange,
  handleClearFilters,
  onToggleFilters,
  onLandscapeChange,
  onCountryChange,
  onPeriodChange,
  onStatusChange,
  onObjectTypeChange,
  activeFiltersCount
}) => {
  if (shouldShowMap) {
    return (
      <MapAndResultsSection
        mapInscriptions={mapInscriptions}
        currentInscriptions={currentInscriptions}
        allInscriptions={allInscriptions}
        enabledLegendItems={enabledLegendItems}
        selectedTimePeriod="all"
        legendItems={legendItems}
        expandedCards={expandedCards}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        isLoading={isLoading}
        hasActiveSearch={hasActiveSearch}
        totalInscriptions={totalInscriptions}
        showFilters={shouldShowFilters}
        selectedLandscape={selectedLandscape}
        selectedCountry={selectedCountry}
        selectedPeriod={selectedPeriod}
        selectedStatus={selectedStatus}
        selectedObjectType={selectedObjectType}
        onMarkerClick={onMarkerClick}
        onMapNavigate={onMapNavigate}
        onLegendToggle={onLegendToggle}
        onToggleExpanded={onToggleExpanded}
        onResultClick={onResultClick}
        onPageChange={onPageChange}
        onClearFilters={handleClearFilters}
        onToggleFilters={onToggleFilters}
        onLandscapeChange={onLandscapeChange}
        onCountryChange={onCountryChange}
        onPeriodChange={onPeriodChange}
        onStatusChange={onStatusChange}
        onObjectTypeChange={onObjectTypeChange}
        activeFiltersCount={activeFiltersCount}
      />
    );
  }

  return (
    <LinguistResultsView
      currentInscriptions={currentInscriptions}
      currentPage={currentPage}
      totalPages={totalPages}
      onResultClick={onResultClick}
      onPageChange={onPageChange}
    />
  );
};
