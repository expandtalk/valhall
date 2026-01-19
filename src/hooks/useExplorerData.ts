
import { useEffect } from 'react';
import { useRunicData } from '@/hooks/useRunicData';
import { useLegendManager } from '@/hooks/useLegendManager';
import { useFilterState } from '@/components/explorer/FilterState';

interface UseExplorerDataProps {
  godNameSearch: string;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  selectedTimePeriod?: string; // NEW: Add this parameter
}

export const useExplorerData = ({ 
  godNameSearch, 
  currentPage, 
  itemsPerPage, 
  setCurrentPage,
  selectedTimePeriod = 'all' // NEW: Default to 'all'
}: UseExplorerDataProps) => {
  const {
    searchQuery,
    selectedLandscape,
    selectedCountry,
    selectedPeriod,
    selectedStatus,
    selectedObjectType,
    setSearchQuery,
    setSelectedLandscape,
    setSelectedCountry,
    setSelectedPeriod,
    setSelectedStatus,
    setSelectedObjectType,
    filterState,
    activeFiltersCount,
    hasActiveSearch,
    handleClearFilters
  } = useFilterState();

  const enhancedFilterState = {
    ...filterState,
    godNameSearch,
    isVikingMode: false,
    selectedVikingCategory: 'all',
    selectedTimePeriod // NEW: Pass the time period to the filter
  };

  const {
    inscriptions,
    isLoading,
    connectionError,
    dbStats,
    loadData
  } = useRunicData(enhancedFilterState);

  const {
    enabledLegendItems,
    legendItems,
    mapInscriptions,
    handleLegendToggle
  } = useLegendManager(
    inscriptions, 
    false, 
    selectedTimePeriod, 
    'explorer', 
    dbStats,
    hasActiveSearch,
    inscriptions // Pass the same inscriptions as search results since they're already filtered by useRunicData
  );

  // Calculate pagination
  const totalPages = Math.ceil(inscriptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInscriptions = inscriptions.slice(startIndex, endIndex);

  // Reset to first page when inscriptions change
  useEffect(() => {
    setCurrentPage(1);
  }, [inscriptions.length, searchQuery, selectedLandscape, selectedCountry, selectedPeriod, selectedStatus, selectedObjectType, godNameSearch, selectedTimePeriod, setCurrentPage]);

  useEffect(() => {
    loadData();
  }, [selectedLandscape, selectedCountry, selectedPeriod, selectedStatus, selectedObjectType, godNameSearch, selectedTimePeriod]);

  const handleClearFiltersAndGods = () => {
    handleClearFilters();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadData();
  };

  return {
    // Filter state
    searchQuery,
    selectedLandscape,
    selectedCountry,
    selectedPeriod,
    selectedStatus,
    selectedObjectType,
    setSearchQuery,
    setSelectedLandscape,
    setSelectedCountry,
    setSelectedPeriod,
    setSelectedStatus,
    setSelectedObjectType,
    activeFiltersCount,
    hasActiveSearch,
    handleClearFilters: handleClearFiltersAndGods,
    handleSearch,
    
    // Data
    inscriptions,
    currentInscriptions,
    isLoading,
    connectionError,
    dbStats,
    loadData,
    
    // Legend
    enabledLegendItems,
    legendItems,
    mapInscriptions,
    handleLegendToggle,
    
    // Pagination
    totalPages,
    currentPage
  };
};
