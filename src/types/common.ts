
// Central shared types used across the application
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CoordinatesWithZoom extends Coordinates {
  zoom: number;
}

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  count: number;
  enabled: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FilterState {
  searchQuery: string;
  selectedLandscape: string;
  selectedCountry: string;
  selectedPeriod: string;
  selectedStatus: string;
  selectedObjectType: string;
  godNameSearch: string;
}

export interface MapNavigationFunction {
  (lat: number, lng: number, zoom: number): void;
}
