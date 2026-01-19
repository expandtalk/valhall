
import { RundataTable } from './types';
import { parseComplexRows, parseRowValues } from './rowParser';

export const detectInsertStatement = (line: string, currentTable: RundataTable | null): boolean => {
  const trimmed = line.trim().toUpperCase();
  
  // Enhanced detection for INSERT statements with better pattern matching
  if (trimmed.startsWith('INSERT INTO')) {
    console.log(`🎯 Detected INSERT statement: ${line.substring(0, 80)}...`);
    return true;
  }
  
  return false;
};

export const buildInsertStatement = (line: string, currentInsertSQL: string, collectingValues: boolean): {
  insertSQL: string;
  collectingValues: boolean;
  isComplete: boolean;
} => {
  const trimmed = line.trim();
  
  // Skip MySQL-specific commands and comments
  if (trimmed.startsWith('/*!') || 
      trimmed.startsWith('LOCK TABLES') || 
      trimmed.startsWith('UNLOCK TABLES') ||
      trimmed === 'GO' ||
      trimmed.startsWith('--') ||
      trimmed.startsWith('#')) {
    return {
      insertSQL: currentInsertSQL,
      collectingValues,
      isComplete: false
    };
  }
  
  let newInsertSQL = currentInsertSQL;
  let newCollectingValues = collectingValues;
  
  // Add the line to our SQL statement
  if (newInsertSQL) {
    newInsertSQL += '\n' + line;
  } else {
    newInsertSQL = line;
  }
  
  // Check if we're starting to collect VALUES
  if (line.includes('VALUES') && !collectingValues) {
    newCollectingValues = true;
    console.log('📊 Started collecting VALUES section');
  }
  
  // Enhanced completion detection for complex INSERT statements
  const isComplete = isInsertComplete(newInsertSQL, newCollectingValues);
  
  return {
    insertSQL: newInsertSQL,
    collectingValues: newCollectingValues,
    isComplete
  };
};

const isInsertComplete = (insertSQL: string, collectingValues: boolean): boolean => {
  if (!collectingValues) return false;
  
  const trimmed = insertSQL.trim();
  
  // Check for traditional semicolon ending
  if (trimmed.endsWith(';')) {
    console.log('✅ INSERT complete: ends with semicolon');
    return true;
  }
  
  // For complex multi-line inserts, check if we have balanced parentheses
  // and the last non-empty line looks like it ends a VALUES clause
  const lines = insertSQL.split('\n').map(l => l.trim()).filter(l => l);
  const lastLine = lines[lines.length - 1];
  
  // Check if last line ends with a closing parenthesis (possibly followed by comma)
  if (lastLine.match(/\)[,;]?\s*$/)) {
    // Count parentheses to see if they're balanced
    const openParens = (insertSQL.match(/\(/g) || []).length;
    const closeParens = (insertSQL.match(/\)/g) || []).length;
    
    if (openParens === closeParens && openParens > 0) {
      console.log('✅ INSERT complete: balanced parentheses');
      return true;
    }
  }
  
  return false;
};

export const parseInsertStatement = (insertSQL: string, table: RundataTable): void => {
  console.log(`🔍 Parsing INSERT statement for table ${table.name}`);
  console.log(`📏 INSERT SQL length: ${insertSQL.length} characters`);
  
  try {
    // Clean up the SQL
    let cleanSQL = insertSQL
      .replace(/\/\*.*?\*\//g, '') // Remove comments
      .replace(/^\s*LOCK TABLES.*$/gm, '') // Remove LOCK statements
      .replace(/^\s*UNLOCK TABLES.*$/gm, '') // Remove UNLOCK statements
      .replace(/^\s*ALTER TABLE.*$/gm, '') // Remove ALTER statements
      .trim();
    
    // Extract the VALUES section with enhanced pattern matching
    const valuesMatch = cleanSQL.match(/VALUES\s*(.*?)(?:;?\s*)$/is);
    
    if (!valuesMatch) {
      console.warn(`⚠️ No VALUES section found in INSERT for ${table.name}`);
      return;
    }
    
    const valuesSection = valuesMatch[1].trim();
    console.log(`📊 VALUES section length: ${valuesSection.length} characters`);
    console.log(`📊 VALUES section preview: ${valuesSection.substring(0, 200)}...`);
    
    // Parse rows with enhanced handling for complex text
    const rows = parseComplexRows(valuesSection);
    console.log(`📋 Found ${rows.length} rows to parse`);
    
    // Process each row
    for (let i = 0; i < rows.length; i++) {
      try {
        const rowValues = parseRowValues(rows[i]);
        
        if (rowValues.length !== table.columns.length) {
          console.warn(`⚠️ Row ${i + 1}: Expected ${table.columns.length} columns, got ${rowValues.length}`);
          // Try to continue with available data
        }
        
        // Create row object matching available columns and values
        const rowObj: Record<string, any> = {};
        const maxColumns = Math.min(table.columns.length, rowValues.length);
        
        for (let j = 0; j < maxColumns; j++) {
          let value = rowValues[j];
          
          // Handle binary UUID values (convert to string representation)
          if (typeof value === 'string' && value.match(/^X'[0-9A-Fa-f]+'/)) {
            value = value; // Keep as-is for now, could convert to UUID format later
          }
          
          // Handle complex text with XML and special characters
          if (typeof value === 'string') {
            // Preserve XML structures and special characters
            value = value
              .replace(/\\"/g, '"') // Unescape quotes
              .replace(/\\'/g, "'") // Unescape single quotes
              .replace(/\\\\/g, '\\'); // Unescape backslashes
          }
          
          rowObj[table.columns[j]] = value;
        }
        
        table.data.push(rowObj);
        
        if ((i + 1) % 100 === 0) {
          console.log(`📊 Processed ${i + 1}/${rows.length} rows for ${table.name}`);
        }
        
      } catch (error) {
        console.error(`❌ Error parsing row ${i + 1} in ${table.name}:`, error);
        console.log(`❌ Problematic row: ${rows[i].substring(0, 200)}...`);
        // Continue with next row
      }
    }
    
    console.log(`✅ Successfully parsed ${table.data.length} rows for table ${table.name}`);
    
    // Log sample data for verification
    if (table.data.length > 0) {
      console.log(`📋 Sample row from ${table.name}:`, table.data[0]);
      
      // Special logging for interpretations table
      if (table.name === 'interpretations' && table.data.length > 0) {
        const sample = table.data[0];
        console.log(`📝 Interpretations sample - text: ${sample.text?.substring(0, 100)}...`);
        console.log(`📝 Interpretations sample - teitext: ${sample.teitext?.substring(0, 100)}...`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error parsing INSERT statement for ${table.name}:`, error);
  }
};
