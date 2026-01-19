
export interface MySQLGroupRecord {
  groupid: string; // hex string for bytea
  type: 'die' | 'monument' | 'carver';
  notes: string | null;
  lang: string;
}

export interface GroupImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
