
export interface RundataTable {
  name: string;
  columns: string[];
  data: Record<string, any>[];
}

export interface TableRelationships {
  inscriptionsTable?: RundataTable;
  objectsTable?: RundataTable;
  signaTable?: RundataTable;
  placesTable?: RundataTable;
  readingsTable?: RundataTable;
  coordinatesTable?: RundataTable;
  translationsTable?: RundataTable;
  periodsTable?: RundataTable;
  interpretationsTable?: RundataTable;
}

export interface DanishAdministrativeData {
  her_DKid: string;
  parishcode: string;
  fofmparish?: string;
  locality?: number;
}
