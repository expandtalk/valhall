import { RundataTable } from './types';
import { handleStandaloneInserts } from './standaloneInsertHandler';
import { mainSqlParser } from './mainSqlParser';
import { validateSQLImportData } from '../security/inputValidation';

export const extractTablesFromSQL = (sqlData: string): RundataTable[] => {
  // Validate and sanitize SQL input for security
  const validation = validateSQLImportData(sqlData);
  if (!validation.isValid) {
    throw new Error(`Security validation failed: ${validation.reason}`);
  }
  
  // Use sanitized SQL data
  const sanitizedSqlData = validation.sanitized || sqlData;
  const lines = sanitizedSqlData.split('\n');
  console.log(`🔍 Processing ${lines.length} lines of validated SQL data`);

  const hasDanishTables = sanitizedSqlData.includes('her_DK') || sanitizedSqlData.includes('INSERT INTO `her_DK`');
  if (hasDanishTables) {
    console.log('🇩🇰 Detected Danish administrative tables in SQL');
  }

  // First, check if it's a file with only INSERTs.
  if (!sanitizedSqlData.includes('CREATE TABLE')) {
    const tables = handleStandaloneInserts(sanitizedSqlData);
    console.log(`📊 Extracted ${tables.length} tables from standalone INSERTs:`, tables.map(t => `${t.name} (${t.data.length} rows)`));
    return tables;
  }

  // Otherwise, it's a file with table structures, so we run the main parser.
  const tables = mainSqlParser(lines, []);
  console.log(`📊 Extracted ${tables.length} tables from structured SQL:`, tables.map(t => `${t.name} (${t.data.length} rows)`));
  
  return tables;
};
