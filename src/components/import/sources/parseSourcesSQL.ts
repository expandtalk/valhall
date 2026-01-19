import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLSourceRecord } from './types';

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

export const parseSourcesSQL = (sqlData: string): MySQLSourceRecord[] => {
  console.log('Parsing sources SQL data...');
  const tables = extractTablesFromSQL(sqlData);
  const sourcesTable = tables.find(t => t.name === 'sources');

  if (!sourcesTable || sourcesTable.data.length === 0) {
    console.warn('No `sources` data found in SQL.');
    return [];
  }

  const records: MySQLSourceRecord[] = sourcesTable.data.map(row => ({
    sourceid: binaryToHex(row.sourceid),
    title: row.title || null,
    author: row.author || null,
    publication_year: row.year ? parseInt(row.year, 10) : null,
    notes: row.abbreviation || row.notes || null,
    source_type: row.source_type || 'book',
    isbn: row.isbn || null,
    url: row.url || null,
    publisher: row.publisher || null,
  }));

  console.log(`Successfully parsed ${records.length} source records.`);
  return records;
};
