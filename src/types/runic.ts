
export interface RunicAnalysis {
  period: string;
  confidence: number;
  yearRange: {
    start: number;
    end: number;
  };
  reasoning: string;
  linguisticFeatures: string[];
  runType: string;
  location?: string;
  objectType?: string;
}

export interface AnalysisInput {
  transliteration: string;
  location?: string;
  objectType?: string;
  imageFile?: File | null;
}

export interface RunicInscription {
  id: string;
  name?: string;
  signum?: string;
  transliteration?: string;
  translation?: string;
  translation_en?: string;
  period?: string;
  location?: string;
  province?: string;
  country?: string;
  objectType?: string;
  description?: string;
  imageUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
