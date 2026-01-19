
export interface MySQLObjectSourceRecord {
  objectid: string; // This will be a UUID string after parsing
  sourceid: string; // This will be a hex string for bytea
}

export interface ObjectSourceImportResult {
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}
