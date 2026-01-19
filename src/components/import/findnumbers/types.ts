
export interface MySQLFindnumberRecord {
  objectid: string; // This will be a UUID string after parsing
  findnumber: string;
}

export interface FindnumberImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
