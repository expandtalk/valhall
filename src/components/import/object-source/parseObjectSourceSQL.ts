
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLObjectSourceRecord } from './types';

const binaryToUUID = (binaryStr: string): string => {
  if (!binaryStr) return binaryStr;
  let hex = binaryStr.trim();
  if (hex.startsWith("X'")) {
    hex = hex.replace(/X'|'/g, '');
  } else if (hex.startsWith('X')) {
    hex = hex.substring(1);
  }
  
  if (hex.length !== 32) {
    console.warn(`Invalid hex for UUID, returning original value: ${binaryStr}`);
    return binaryStr; 
  }
  
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`.toLowerCase();
};

const binaryToHex = (binaryStr: string): string => {
  if (!binaryStr) return binaryStr;
  let hex = binaryStr.trim();
  if (hex.startsWith("X'")) {
    hex = hex.replace(/X'|'/g, '');
  } else if (hex.startsWith('X')) {
    hex = hex.substring(1);
  }
  return hex;
};

export const parseObjectSourceSQL = (sqlData: string): MySQLObjectSourceRecord[] => {
  console.log('Parsing object_source SQL data...');
  const tables = extractTablesFromSQL(sqlData);
  const objectSourceTable = tables.find(t => t.name === 'object_source');

  if (!objectSourceTable || objectSourceTable.data.length === 0) {
    console.warn('No `object_source` data found in SQL.');
    return [];
  }

  const records: MySQLObjectSourceRecord[] = objectSourceTable.data.map(row => ({
    objectid: binaryToUUID(row.objectid),
    sourceid: binaryToHex(row.sourceid),
  }));

  console.log(`Successfully parsed ${records.length} object_source records.`);
  return records;
};
