
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLFindnumberRecord } from './types';

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

export const parseFindnumbersSQL = (sqlData: string): MySQLFindnumberRecord[] => {
  console.log('Parsing findnumbers SQL data...');
  const tables = extractTablesFromSQL(sqlData);
  const findnumbersTable = tables.find(t => t.name === 'findnumbers');

  if (!findnumbersTable || findnumbersTable.data.length === 0) {
    console.warn('No `findnumbers` data found in SQL.');
    return [];
  }

  const records: MySQLFindnumberRecord[] = findnumbersTable.data.map(row => ({
    objectid: binaryToUUID(row.objectid),
    findnumber: row.findnumber,
  }));

  console.log(`Successfully parsed ${records.length} findnumber records.`);
  return records;
};
