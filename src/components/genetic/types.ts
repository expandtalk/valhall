// Types for the genetic evolution system
export interface EyeColor {
  id: string;
  color_name: string;
  color_name_en: string;
  global_frequency_percent: number;
  rarity_rank: number;
  genetic_complexity: string;
  main_genes: string[];
  evolutionary_advantage: string;
  historical_origin: string;
  cultural_associations: string;
  light_sensitivity_level: string;
  health_protection_level: string;
}

export interface EyeColorRegion {
  id: string;
  eye_color_id: string;
  region_name: string;
  country: string;
  frequency_percent: number;
  genetic_significance: string;
  population_notes: string;
}

export interface GeneticMarker {
  id: string;
  type: string;
  haplogroup?: string;
  gene?: string;
  frequency: number;
  origin: string;
  description: string;
  modernDistribution: string;
  significance: string;
  studyEvidence?: string;
  geographicSpread: string;
  timeIntroduction: string;
}

export interface HistoricalPeriod {
  id: string;
  name: string;
  name_en: string;
  timeRange: string;
  description: string;
  geneticCharacteristics: string;
}

export interface ArchaeologicalSite {
  id: string;
  name: string;
  location: string;
  parish: string;
  county: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  period: string;
  dating: string;
  description: string;
  burialType: string;
  individuals: Individual[];
}

export interface Individual {
  id: string;
  siteId: string;
  sampleId: string;
  geneticSex: 'XY' | 'XX';
  archaeologicalSex?: 'male' | 'female';
  age?: string;
  graveNumber?: string;
  graveGoods?: string[];
  radiocarbon?: string;
  yHaplogroup?: string;
  mtHaplogroup?: string;
  ancestry?: {
    british_irish?: number;
    eastern_baltic?: number;
    uralic?: number;
    scandinavian?: number;
  };
  isotopes?: {
    strontium?: string;
    oxygen?: string;
  };
  burialContext: string;
  museumsInventory?: string;
}

export interface GeneticStudyData {
  markers: GeneticMarker[];
  periods: HistoricalPeriod[];
  sites: ArchaeologicalSite[];
  individuals: Individual[];
}

export interface HairColor {
  id: string;
  color_name: string;
  color_name_en: string;
  global_frequency_percent: number;
  scandinavian_frequency_percent: number;
  rarity_rank: number;
  genetic_complexity: string;
  main_genes: string[];
  key_markers: string[];
  evolutionary_advantage: string;
  historical_origin: string;
  population_distribution: string;
  pigmentation_level: string;
  uv_adaptation: string;
  research_confidence: string;
}

export interface HairColorRegion {
  id: string;
  hair_color_id: string;
  region_name: string;
  country: string;
  frequency_percent: number;
  genetic_significance: string;
  population_notes: string;
  historical_period: string;
}

export interface HairColorGenetics {
  id: string;
  hair_color_id: string;
  gene_name: string;
  marker_id: string;
  chromosome: string;
  effect_size: number;
  population_frequency: number;
  discovery_study: string;
  functional_impact: string;
  interaction_genes: string[];
}
