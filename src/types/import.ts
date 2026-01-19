
export interface ImportSettings {
  autoResolveSimpleConflicts: boolean;
  gpsToleranceMeters: number;
  signumNormalization: 'preserve' | 'standardize';
  duplicateHandling: 'staging' | 'skip' | 'merge';
}

export interface ImportResult {
  total: number;
  imported: number;
  staged: number;
  errors: number;
  conflicts: string[];
}

export interface ParsedRecord {
  signum: string;
  transliteration: string;
  location: string;
  translation_en: string;
  dating_text: string;
  coordinates: string;
  object_type: string;
  source_database: string;
  raw_line: string;
}
