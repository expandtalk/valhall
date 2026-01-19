
export interface MySQLTranslationRecord {
  translationid: string; // bytea hex
  inscriptionid: string; // bytea hex
  translation: string;
  text: string;
  teitext: string | null;
  language: string;
}

export interface TranslationImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
