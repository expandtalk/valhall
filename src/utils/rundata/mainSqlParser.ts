
import { RundataTable } from './types';
import { extractTableDefinition } from './tableExtractor';
import { parseInsertStatement, detectInsertStatement, buildInsertStatement } from './insertParser';

export const mainSqlParser = (lines: string[], tables: RundataTable[]): RundataTable[] => {
  let currentTable: RundataTable | null = null;
  let inInsertBlock = false;
  let insertSQL = '';
  let collectingValues = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line || line.startsWith('#') || line.startsWith('--') || line.startsWith('/*') || line.startsWith('*/') || line.startsWith('/*!') || line.startsWith('LOCK TABLES') || line.startsWith('UNLOCK TABLES')) {
      continue;
    }
    
    if (line.match(/CREATE TABLE/i)) {
      if (inInsertBlock && currentTable && insertSQL) {
        console.log(`🔚 Finalizing incomplete INSERT for table ${currentTable.name} due to new CREATE TABLE`);
        parseInsertStatement(insertSQL, currentTable);
        inInsertBlock = false;
        collectingValues = false;
        insertSQL = '';
      }
      
      if (currentTable) {
        if (!tables.find(t => t.name === currentTable!.name)) {
          tables.push(currentTable);
        }
        console.log(`Pushed previous table ${currentTable.name} to tables array.`);
      }
      
      const tableResult = extractTableDefinition(lines, i);
      if (tableResult) {
        currentTable = tableResult.table;
        i = tableResult.endIndex - 1; 
        console.log(`📊 Created table: ${currentTable.name} with ${currentTable.columns.length} columns`);
        
        if (currentTable.name.includes('her_DK') || currentTable.name.includes('herred')) {
          console.log(`🇩🇰 Detected Danish administrative table: ${currentTable.name}`);
        }
      }
    }
    
    if (currentTable && detectInsertStatement(line, currentTable)) {
      if (inInsertBlock && insertSQL) {
        console.log(`🔚 Finalizing previous INSERT for table ${currentTable!.name} due to new INSERT`);
        parseInsertStatement(insertSQL, currentTable!);
      }
      
      inInsertBlock = true;
      insertSQL = line;
      
      if (line.includes('VALUES')) {
        collectingValues = true;
        insertSQL = line;
        console.log(`🎯 Found VALUES on same line as INSERT for table ${currentTable?.name || 'unknown'}`);
      }
      continue;
    }
    
    if (inInsertBlock) {
      const result = buildInsertStatement(line, insertSQL, collectingValues);
      insertSQL = result.insertSQL;
      collectingValues = result.collectingValues;
      
      if (result.isComplete) {
        console.log(`✅ Completing INSERT statement for table ${currentTable!.name}`);
        parseInsertStatement(insertSQL, currentTable!);
        inInsertBlock = false;
        collectingValues = false;
        insertSQL = '';
      }
    }
  }
  
  if (inInsertBlock && currentTable && insertSQL) {
    console.log(`🔚 Finalizing incomplete INSERT for table ${currentTable.name} at end of file`);
    parseInsertStatement(insertSQL, currentTable);
  }
  
  if (currentTable && !tables.find(t => t.name === currentTable?.name)) {
    tables.push(currentTable);
  }
  
  return tables;
};
