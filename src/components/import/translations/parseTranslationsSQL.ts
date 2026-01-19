
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';
import { MySQLTranslationRecord } from './types';

const binaryToByteaHex = (binaryStr: string): string => {
    if (!binaryStr || !binaryStr.startsWith("X'")) return binaryStr;
    const hex = binaryStr.replace(/X'|'/g, '');
    if (hex.length === 0) return '';
    return `\\x${hex}`;
}

export const parseTranslationsSQL = (sqlData: string): MySQLTranslationRecord[] => {
    console.log('Parsing translations SQL data...');
    const tables = extractTablesFromSQL(sqlData);
    const translationsTable = tables.find(t => t.name === 'translations');

    if (!translationsTable) {
        console.warn('No `translations` table found in SQL.');
        return [];
    }

    const records: MySQLTranslationRecord[] = translationsTable.data.map(row => ({
        translationid: binaryToByteaHex(row.translationid),
        inscriptionid: binaryToByteaHex(row.inscriptionid),
        translation: row.translation,
        text: row.text,
        teitext: row.teitext || null,
        language: row.language,
    }));

    console.log(`Successfully parsed ${records.length} translation records.`);
    return records;
};
