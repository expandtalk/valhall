
import { BaseInscription } from './inscription';
import { LegendItem, MapNavigationFunction } from './common';

export interface MapAndResultsSectionProps {
  mapInscriptions: BaseInscription[];
  currentInscriptions: BaseInscription[];
  allInscriptions: BaseInscription[];
  enabledLegendItems: { [key: string]: boolean };
  selectedTimePeriod: string;
  legendItems: LegendItem[];
  expandedCards: Set<string>;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isLoading: boolean;
  hasActiveSearch: boolean;
  totalInscriptions: number;
  showFilters: boolean;
  selectedLandscape: string;
  selectedCountry: string;
  selectedPeriod: string;
  selectedStatus: string;
  selectedObjectType: string;
  onMarkerClick: (inscription: BaseInscription) => void;
  onMapNavigate: (navFunction: MapNavigationFunction) => void;
  onLegendToggle: (id: string) => void;
  onToggleExpanded: (id: string) => void;
  onResultClick?: (inscription: BaseInscription) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  onToggleFilters: () => void;
  onLandscapeChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onObjectTypeChange: (value: string) => void;
  activeFiltersCount: number;
}

export interface UseMapMarkersReturn {
  generateLegendData: () => LegendItem[];
}
