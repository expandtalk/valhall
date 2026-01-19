
export interface RunicInscription {
  id: string;
  signum: string;
  location?: string;
  province?: string;
  country?: string;
  transliteration?: string;
  translation_en?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VikingFortress {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  fortress_type: string;
  country: string;
  region?: string;
  description?: string;
  historical_significance?: string;
  construction_start?: number;
  construction_end?: number;
}

export interface VikingCity {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: string;
  period_start: number;
  period_end: number;
  country: string;
  region?: string;
  description: string;
  historical_significance?: string;
  replaces?: string;
  unesco_site: boolean;
  status: string;
  population_estimate?: number;
}

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  count: number;
  enabled: boolean;
  type?: 'primary' | 'category' | 'subcategory';
  children?: LegendItem[];
  parentId?: string;
}
