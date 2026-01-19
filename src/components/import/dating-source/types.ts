
export interface MySQLDatingSourceRecord {
  datingid: string;
  sourceid: string;
}

export interface DatingSourceImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
