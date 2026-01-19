
export interface MySQLUriRecord {
  uriid: string;
  uri: string;
}

export interface UriImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
