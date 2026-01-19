
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLReferenceUriRecord } from './types';

const binaryToByteaHex = (binaryStr: string): string => {
    if (!binaryStr || !binaryStr.startsWith("X'")) return binaryStr;
    const hex = binaryStr.replace(/X'|'/g, '');
    if (hex.length === 0) return '';
    return `\\x${hex}`;
}

const parseStandaloneReferenceUriInsert = (sqlData: string): MySQLReferenceUriRecord[] => {
    const records: MySQLReferenceUriRecord[] = [];
    const valueRegex = /\(\s*X'([0-9A-F]+)'\s*,\s*X'([0-9A-F]+)'\s*\)/gi;
    let match;
    while ((match = valueRegex.exec(sqlData)) !== null) {
        records.push({
            referenceid: binaryToByteaHex(`X'${match[1]}'`),
            uriid: binaryToByteaHex(`X'${match[2]}'`),
        });
    }
    return records;
}

export const parseReferenceUriSQL = (sqlData: string): MySQLReferenceUriRecord[] => {
    console.log('Parsing reference_uri SQL data...');

    if (!sqlData.includes('CREATE TABLE') && /INSERT INTO\s+[`']?reference_uri[`']?/i.test(sqlData)) {
        console.log('Detected standalone reference_uri INSERT statement. Using specific parser.');
        const records = parseStandaloneReferenceUriInsert(sqlData);
        console.log(`Successfully parsed ${records.length} reference-URI records from standalone insert.`);
        return records;
    }

    const tables = extractTablesFromSQL(sqlData);
    const referenceUriTable = tables.find(t => t.name === 'reference_uri');

    if (!referenceUriTable || referenceUriTable.data.length === 0) {
        // As a fallback, try to find a table with `referenceid` and `uriid` columns
        const potentialTable = tables.find(t => t.columns.includes('referenceid') && t.columns.includes('uriid'));
        if (potentialTable) {
            console.log(`Found potential table '${potentialTable.name}' for reference_uri data.`);
            const records: MySQLReferenceUriRecord[] = potentialTable.data.map(row => ({
                referenceid: binaryToByteaHex(row.referenceid),
                uriid: binaryToByteaHex(row.uriid),
            }));
            console.log(`Successfully parsed ${records.length} reference_uri records from '${potentialTable.name}'.`);
            return records;
        }

        console.warn('No `reference_uri` data found in SQL.');
        return [];
    }

    const records: MySQLReferenceUriRecord[] = referenceUriTable.data.map(row => ({
        referenceid: binaryToByteaHex(row.referenceid),
        uriid: binaryToByteaHex(row.uriid),
    }));

    console.log(`Successfully parsed ${records.length} reference_uri records.`);
    return records;
};
