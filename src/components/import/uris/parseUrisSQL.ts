
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLUriRecord } from './types';

const binaryToByteaHex = (binaryStr: string): string => {
    if (!binaryStr || !binaryStr.startsWith("X'")) return binaryStr;
    const hex = binaryStr.replace(/X'|'/g, '');
    if (hex.length === 0) return '';
    return `\\x${hex}`;
}

const parseStandaloneUrisInsert = (sqlData: string): MySQLUriRecord[] => {
    const records: MySQLUriRecord[] = [];
    const valueRegex = /\(\s*X'([0-9A-F]+)'\s*,\s*'([^']+)'\s*\)/gi;
    let match;
    while ((match = valueRegex.exec(sqlData)) !== null) {
        records.push({
            uriid: binaryToByteaHex(`X'${match[1]}'`),
            uri: match[2],
        });
    }
    return records;
}

export const parseUrisSQL = (sqlData: string): MySQLUriRecord[] => {
    console.log('Parsing uris SQL data...');

    // The main SQL parser might fail on standalone INSERT statements without a CREATE TABLE.
    // Let's add a more specific parser for this case.
    if (!sqlData.includes('CREATE TABLE') && sqlData.includes('INSERT INTO `uris`')) {
        console.log('Detected standalone URIs INSERT statement. Using specific parser.');
        const records = parseStandaloneUrisInsert(sqlData);
        console.log(`Successfully parsed ${records.length} URI records from standalone insert.`);
        return records;
    }

    const tables = extractTablesFromSQL(sqlData);
    const urisTable = tables.find(t => t.name === 'uris');

    if (!urisTable) {
        console.warn('No `uris` table found in SQL.');
        return [];
    }

    const records: MySQLUriRecord[] = urisTable.data.map(row => ({
        uriid: binaryToByteaHex(row.uriid),
        uri: row.uri,
    }));

    console.log(`Successfully parsed ${records.length} URI records.`);
    return records;
};
