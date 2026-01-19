
import React from 'react';
import { FloatingPanels } from "./FloatingPanels";
import { LegendItem } from '@/types/common';

interface LegendOverlayProps {
  legendItems: LegendItem[];
  onToggleItem: (id: string) => void;
  showSearchResults: boolean;
  searchResultsCount: number;
  onToggleSearchResults: () => void;
  currentInscriptions: any[];
  allInscriptions: any[];
  expandedCards: Set<string>;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isLoading: boolean;
  hasActiveSearch: boolean;
  totalInscriptions: number;
  onToggleExpanded: (id: string) => void;
  onResultClick?: (inscription: any) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  showFilters: boolean;
  onToggleFilters: () => void;
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
  activeFiltersCount: number;
}

export const LegendOverlay: React.FC<LegendOverlayProps> = React.memo((props) => {
  // This component is deprecated - functionality moved to FloatingPanels in MapAndResultsSection
  return null;
});

LegendOverlay.displayName = 'LegendOverlay';
