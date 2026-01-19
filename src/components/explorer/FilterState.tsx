
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface FilterState {
  searchQuery: string;
  selectedLandscape: string;
  selectedCountry: string;
  selectedPeriod: string;
  selectedStatus: string;
  selectedObjectType: string;
}

export const useFilterState = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLandscape, setSelectedLandscape] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedObjectType, setSelectedObjectType] = useState('all');

  // Handle URL parameters
  useEffect(() => {
    const urlSearchQuery = searchParams.get('searchQuery');
    const urlZoomTo = searchParams.get('zoomTo');
    
    if (urlSearchQuery) {
      console.log('🔍 FilterState: Setting search query from URL:', urlSearchQuery);
      setSearchQuery(urlSearchQuery);
    }
    
    if (urlZoomTo) {
      console.log('🎯 FilterState: ZoomTo parameter detected:', urlZoomTo);
      // The zoomTo will be handled by ExplorerMain useEffect
    }
  }, [searchParams]);

  const filterState: FilterState = {
    searchQuery,
    selectedLandscape,
    selectedCountry,
    selectedPeriod,
    selectedStatus,
    selectedObjectType
  };

  const activeFiltersCount = [
    selectedLandscape, 
    selectedCountry, 
    selectedPeriod, 
    selectedStatus, 
    selectedObjectType
  ].filter(filter => filter !== 'all').length;

  const hasActiveSearch = searchQuery.trim() !== '' || activeFiltersCount > 0;

  const handleClearFilters = () => {
    setSelectedLandscape('all');
    setSelectedCountry('all');
    setSelectedPeriod('all');
    setSelectedStatus('all');
    setSelectedObjectType('all');
    setSearchQuery('');
  };

  return {
    // State values
    searchQuery,
    selectedLandscape,
    selectedCountry,
    selectedPeriod,
    selectedStatus,
    selectedObjectType,
    
    // Setters
    setSearchQuery,
    setSelectedLandscape,
    setSelectedCountry,
    setSelectedPeriod,
    setSelectedStatus,
    setSelectedObjectType,
    
    // Helper values
    filterState,
    activeFiltersCount,
    hasActiveSearch,
    handleClearFilters
  };
};
