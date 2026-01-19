import { RundataTable } from './types';
import { parseInsertStatement } from './insertParser';

export const handleStandaloneInserts = (sqlData: string): RundataTable[] => {
  const tables: RundataTable[] = [];

  // This function handles SQL files that are essentially just one large INSERT statement
  // without a corresponding CREATE TABLE. This is common for some data exports.

  if (sqlData.includes('CREATE TABLE')) {
    return tables;
  }

  // Helper function to process known tables
  const processKnownTable = (tableName: string): boolean => {
    const knownTables = [
      'signa', 'her_SE_parishes', 'her_DK', 'hundreds', 'dating_source', 
      'findnumbers', 'sources', 'object_source', 'groups', 'her_NO', 
      'her_SE', 'her_DK_notes', 'translations'
    ];
    return knownTables.includes(tableName);
  };

  // Helper function to process generic unknown tables
  const processGenericTable = (tableName: string): void => {
    const insertRegex = new RegExp(`INSERT INTO\\s+[\`\'"]?${tableName}[\`\'"]?\\s*\\([^)]+\\)\\s*VALUES\\s*\\([^;]+\\);?`, 'gi');
    const matches = sqlData.match(insertRegex);
    
    if (matches && matches.length > 0) {
      console.log(`🔄 Processing ${matches.length} INSERT statements for table ${tableName}`);
      
      // Try to extract columns from first INSERT statement
      const firstMatch = matches[0];
      const columnMatch = firstMatch.match(/INSERT INTO\s+[`'"]?\w+[`'"]?\s*\(([^)]+)\)/i);
      
      if (columnMatch) {
        const columns = columnMatch[1]
          .split(',')
          .map(col => col.trim().replace(/[`'"]/g, ''));
        
        const genericTable: RundataTable = {
          name: tableName,
          columns: columns,
          data: []
        };
        
        // Parse all INSERT statements for this table
        parseInsertStatement(sqlData, genericTable);
        
        if (genericTable.data.length > 0) {
          tables.push(genericTable);
          console.log(`✅ Successfully processed generic table ${tableName}: ${genericTable.data.length} records`);
        }
      }
    }
  };

  console.log('🔍 Analyzing SQL data for standalone INSERT statements...');
  
  // Generic approach: find all INSERT INTO statements and extract table names
  const insertMatches = sqlData.match(/INSERT INTO\s+[`']?(\w+)[`']?/gi);
  if (insertMatches) {
    const foundTables = [...new Set(insertMatches.map(match => {
      const tableMatch = match.match(/INSERT INTO\s+[`']?(\w+)[`']?/i);
      return tableMatch ? tableMatch[1] : null;
    }).filter(Boolean))];
    
    console.log(`🎯 Found INSERT statements for tables: ${foundTables.join(', ')}`);
    console.log(`📊 Total unique tables found in SQL: ${foundTables.length}`);
    
    // Check which tables have dedicated parsers vs generic handling
    const knownTables = [
      'signa', 'her_SE_parishes', 'her_DK', 'hundreds', 'dating_source', 
      'findnumbers', 'sources', 'object_source', 'groups', 'her_NO', 
      'her_SE', 'her_DK_notes', 'translations'
    ];
    
    const tablesWithParsers = foundTables.filter(table => knownTables.includes(table));
    const tablesWithoutParsers = foundTables.filter(table => !knownTables.includes(table));
    
    console.log(`✅ Tables with dedicated parsers (${tablesWithParsers.length}): ${tablesWithParsers.join(', ')}`);
    console.log(`⚠️ Tables without dedicated parsers (${tablesWithoutParsers.length}): ${tablesWithoutParsers.join(', ')}`);
    
    if (tablesWithoutParsers.length > 0) {
      console.log(`🔧 These tables will be processed with generic handler and may need dedicated parsers for better accuracy`);
    }
    
    // Process each found table
    for (const tableName of foundTables) {
      if (processKnownTable(tableName)) {
        // Known table - will be processed by specific handlers below
        continue;
      }
      
      // Generic processing for unknown tables
      console.log(`⚠️ Processing unknown table '${tableName}' with generic handler`);
      processGenericTable(tableName);
    }
  }

  // signa
  const hasSignaInsert = /INSERT INTO\s+[`']?signa[`']?/i.test(sqlData);
  const hasSignaValues = sqlData.includes('X\'') && (sqlData.includes('B\',\'') || sqlData.includes('U\',\'') || sqlData.includes('G\',\'') || sqlData.includes('DR\',\''));
  if (hasSignaInsert && hasSignaValues) {
    console.log('🎯 Detected standalone signa INSERT statements - creating virtual signa table');
    const currentTable = {
      name: 'signa',
      columns: ['signumid', 'signum1', 'signum2'],
      data: []
    };
    parseInsertStatement(sqlData, currentTable);
    if (currentTable.data.length > 0) {
      tables.push(currentTable);
      console.log(`✅ Successfully processed standalone signa data: ${currentTable.data.length} records`);
    }
  }

  // her_SE_parishes
  if (/INSERT INTO\s+[`']?her_SE_parishes[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone her_SE_parishes INSERT statements - creating virtual table');
    const parishTable = {
      name: 'her_SE_parishes',
      columns: ['her_SEparishid', 'parishcode', 'raäparish'],
      data: []
    };
    parseInsertStatement(sqlData, parishTable);
    if (parishTable.data.length > 0) {
      tables.push(parishTable);
      console.log(`✅ Successfully processed standalone Swedish parish data: ${parishTable.data.length} records`);
    }
  }
  
  // her_DK
  if (/INSERT INTO\s+[`']?her_DK[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone her_DK INSERT statements - creating virtual table');
    const herDkTable = {
      name: 'her_DK',
      columns: ['her_DKid', 'parishcode', 'fofmparish', 'locality'],
      data: []
    };
    parseInsertStatement(sqlData, herDkTable);
    if (herDkTable.data.length > 0) {
      tables.push(herDkTable);
      console.log(`✅ Successfully processed standalone Danish parish data: ${herDkTable.data.length} records`);
    }
  }

  // hundreds
  if (/INSERT INTO\s+[`']?hundreds[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone hundreds INSERT statements - creating virtual table');
    const hundredTable = {
      name: 'hundreds',
      columns: ['hundredid', 'provinceid', 'divisionid', 'hundred'],
      data: []
    };
    parseInsertStatement(sqlData, hundredTable);
    if (hundredTable.data.length > 0) {
      tables.push(hundredTable);
      console.log(`✅ Successfully processed standalone hundred data: ${hundredTable.data.length} records`);
    }
  }

  // dating_source
  if (/INSERT INTO\s+[`']?dating_source[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone dating_source INSERT statements - creating virtual table');
    const datingSourceTable = {
      name: 'dating_source',
      columns: ['datingid', 'sourceid'],
      data: []
    };
    parseInsertStatement(sqlData, datingSourceTable);
    if (datingSourceTable.data.length > 0) {
      tables.push(datingSourceTable);
      console.log(`✅ Successfully processed standalone dating_source data: ${datingSourceTable.data.length} records`);
    }
  }

  // findnumbers
  if (/INSERT INTO\s+[`']?findnumbers[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone findnumbers INSERT statements - creating virtual table');
    const findnumbersTable = {
      name: 'findnumbers',
      columns: ['objectid', 'findnumber'],
      data: []
    };
    parseInsertStatement(sqlData, findnumbersTable);
    if (findnumbersTable.data.length > 0) {
      tables.push(findnumbersTable);
      console.log(`✅ Successfully processed standalone findnumbers data: ${findnumbersTable.data.length} records`);
    }
  }

  // sources
  if (/INSERT INTO\s+[`']?sources[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone sources INSERT statements - creating virtual table');
    const sourcesTable = {
      name: 'sources',
      columns: ['sourceid', 'title', 'author', 'year', 'abbreviation', 'notes', 'source_type', 'isbn', 'url', 'publisher'],
      data: []
    };
    parseInsertStatement(sqlData, sourcesTable);
    if (sourcesTable.data.length > 0) {
      tables.push(sourcesTable);
      console.log(`✅ Successfully processed standalone sources data: ${sourcesTable.data.length} records`);
    }
  }

  // object_source
  if (/INSERT INTO\s+[`']?object_source[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone object_source INSERT statements - creating virtual table');
    const objectSourceTable = {
      name: 'object_source',
      columns: ['objectid', 'sourceid'],
      data: []
    };
    parseInsertStatement(sqlData, objectSourceTable);
    if (objectSourceTable.data.length > 0) {
      tables.push(objectSourceTable);
      console.log(`✅ Successfully processed standalone object_source data: ${objectSourceTable.data.length} records`);
    }
  }

  // groups
  if (/INSERT INTO\s+[`']?groups[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone groups INSERT statements - creating virtual table');
    const groupsTable = {
      name: 'groups',
      columns: ['groupid', 'type', 'notes', 'lang'],
      data: []
    };
    parseInsertStatement(sqlData, groupsTable);
    if (groupsTable.data.length > 0) {
      tables.push(groupsTable);
      console.log(`✅ Successfully processed standalone groups data: ${groupsTable.data.length} records`);
    }
  }

  // her_NO
  if (/INSERT INTO\s+[`']?her_NO[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone her_NO INSERT statements - creating virtual table');
    const herNoTable = {
      name: 'her_NO',
      columns: ['her_NOid', 'locality'],
      data: []
    };
    parseInsertStatement(sqlData, herNoTable);
    if (herNoTable.data.length > 0) {
      tables.push(herNoTable);
      console.log(`✅ Successfully processed standalone Norwegian locality data: ${herNoTable.data.length} records`);
    }
  }

  // her_SE
  if (/INSERT INTO\s+[`']?her_SE[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone her_SE INSERT statements - creating virtual table');
    const herSeTable = {
      name: 'her_SE',
      columns: ['her_SEid', 'her_SEparishid', 'raänr', 'fmisid', 'kmrid'],
      data: []
    };
    parseInsertStatement(sqlData, herSeTable);
    if (herSeTable.data.length > 0) {
      tables.push(herSeTable);
      console.log(`✅ Successfully processed standalone Swedish locality data: ${herSeTable.data.length} records`);
    }
  }

  // her_DK_notes
  if (/INSERT INTO\s+[`']?her_DK_notes[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone her_DK_notes INSERT statements - creating virtual table');
    const herDkNotesTable = {
      name: 'her_DK_notes',
      columns: ['her_DK_notesid', 'objectid', 'her_DKid', 'notes', 'lang'],
      data: []
    };
    parseInsertStatement(sqlData, herDkNotesTable);
    if (herDkNotesTable.data.length > 0) {
      tables.push(herDkNotesTable);
      console.log(`✅ Successfully processed standalone Danish notes data: ${herDkNotesTable.data.length} records`);
    }
  }

  // translations
  if (/INSERT INTO\s+[`']?translations[`']?/i.test(sqlData)) {
    console.log('🎯 Detected standalone translations INSERT statements - creating virtual table');
    const translationsTable = {
      name: 'translations',
      columns: ['translationid', 'inscriptionid', 'translation', 'text', 'teitext', 'language'],
      data: []
    };
    parseInsertStatement(sqlData, translationsTable);
    if (translationsTable.data.length > 0) {
      tables.push(translationsTable);
      console.log(`✅ Successfully processed standalone translations data: ${translationsTable.data.length} records`);
    }
  }

  return tables;
};
