
export interface MySQLDatingRecord {
  datingid: string;
  objectid: string;
  dating: string;
  lang: string;
}

export interface DatingImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
