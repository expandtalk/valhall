
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLGroupRecord } from './types';

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

export const parseGroupsSQL = (sqlData: string): MySQLGroupRecord[] => {
  console.log('Parsing groups SQL data...');
  const tables = extractTablesFromSQL(sqlData);
  const groupsTable = tables.find(t => t.name === 'groups');

  if (!groupsTable || groupsTable.data.length === 0) {
    console.warn('No `groups` data found in SQL.');
    return [];
  }

  const records: MySQLGroupRecord[] = groupsTable.data.map(row => ({
    groupid: binaryToHex(row.groupid),
    type: row.type,
    notes: row.notes || null,
    lang: row.lang || 'sv-se',
  }));

  console.log(`Successfully parsed ${records.length} group records.`);
  return records;
};
