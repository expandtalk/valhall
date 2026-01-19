
export interface MySQLSourceRecord {
  sourceid: string; // hex string for bytea
  title: string | null;
  author: string | null;
  publication_year: number | null;
  notes: string | null;
  source_type: string | null;
  isbn: string | null;
  url: string | null;
  publisher: string | null;
}

export interface SourceImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
