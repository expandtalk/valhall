
import { RunicInscription, BaseInscription } from './inscription';
import { LegendItem, MapNavigationFunction } from './common';

export interface ExplorerContentProps {
  shouldShowMap: boolean;
  mapInscriptions: BaseInscription[];
  currentInscriptions: BaseInscription[];
  allInscriptions: BaseInscription[];
  enabledLegendItems: { [key: string]: boolean };
  legendItems: LegendItem[];
  expandedCards: Set<string>;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isLoading: boolean;
  hasActiveSearch: boolean;
  totalInscriptions: number;
  shouldShowFilters: boolean;
  selectedLandscape: string;
  selectedCountry: string;
  selectedPeriod: string;
  selectedStatus: string;
  selectedObjectType: string;
  onMarkerClick: (inscription: BaseInscription) => void;
  onMapNavigate: (navFunction: MapNavigationFunction) => void;
  onLegendToggle: (id: string) => void;
  onToggleExpanded: (id: string) => void;
  onResultClick: (inscription: BaseInscription) => void;
  onPageChange: (page: number) => void;
  handleClearFilters: () => void;
  onToggleFilters: () => void;
  onLandscapeChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onObjectTypeChange: (value: string) => void;
  activeFiltersCount: number;
}

export interface LayoutHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  totalInscriptions: number;
  isExplorerMode: boolean;
  onGodNameSearchWithLegend: (godName: string) => void;
  onLegendToggle: (id: string) => void;
  isSearchMinimized: boolean;
  setIsSearchMinimized: (minimized: boolean) => void;
  shouldShowTimeline: boolean;
  mapNavigate: MapNavigationFunction | null;
  isTimelineMinimized: boolean;
  setIsTimelineMinimized: (minimized: boolean) => void;
}
