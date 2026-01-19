
export interface MySQLReferenceUriRecord {
  referenceid: string;
  uriid: string;
}

export interface ReferenceUriImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
