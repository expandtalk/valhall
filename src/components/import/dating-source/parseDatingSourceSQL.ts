
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLDatingSourceRecord } from './types';

// Helper to convert binary(16) string (like X'...' or X...) to UUID format
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

// Helper to convert binary(16) string (like X'...' or X...) to a bytea hex string `\\x...`
const binaryToByteaHex = (binaryStr: string): string => {
    if (!binaryStr) return binaryStr;
    let hex = binaryStr.trim();
    if (hex.startsWith("X'")) {
      hex = hex.replace(/X'|'/g, '');
    } else if (hex.startsWith('X')) {
      hex = hex.substring(1);
    }
    
    if (hex.length === 0) return '';
    return `\\x${hex.toLowerCase()}`;
}

export const parseDatingSourceSQL = (sqlData: string): MySQLDatingSourceRecord[] => {
  console.log('Parsing dating_source SQL data...');
  const tables = extractTablesFromSQL(sqlData);
  const datingSourceTable = tables.find(t => t.name === 'dating_source');

  if (!datingSourceTable || datingSourceTable.data.length === 0) {
    console.warn('No `dating_source` data found in SQL.');
    return [];
  }

  const records: MySQLDatingSourceRecord[] = datingSourceTable.data.map(row => ({
    datingid: binaryToUUID(row.datingid),
    sourceid: binaryToByteaHex(row.sourceid),
  }));

  console.log(`Successfully parsed ${records.length} dating_source records.`);
  return records;
};
