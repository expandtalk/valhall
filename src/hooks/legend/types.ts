
export interface RunicInscription {
  id: string;
  signum: string;
  country?: string;
  status?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  [key: string]: any;
}

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  count: number;
  enabled: boolean;
  type?: 'primary' | 'category' | 'subcategory';
  children?: LegendItem[];
}

export interface LegendManagerConfig {
  inscriptions: RunicInscription[];
  isVikingMode: boolean;
  selectedTimePeriod: string;
}
