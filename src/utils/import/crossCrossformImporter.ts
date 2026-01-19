
import { supabase } from "@/integrations/supabase/client";

// Helper function to convert MySQL binary(16) hex string to PostgreSQL UUID
const convertBinaryToUUID = (hexString: string): string => {
  // Remove X' prefix and ' suffix if present
  const cleanHex = hexString.replace(/^X'|'$/g, '');
  
  // Ensure we have exactly 32 hex characters
  if (cleanHex.length !== 32) {
    throw new Error(`Invalid hex string length: ${cleanHex.length}, expected 32`);
  }
  
  // Format as UUID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
  const uuid = [
    cleanHex.slice(0, 8),
    cleanHex.slice(8, 12),
    cleanHex.slice(12, 16),
    cleanHex.slice(16, 20),
    cleanHex.slice(20, 32)
  ].join('-').toLowerCase();
  
  return uuid;
};

// Interface for the raw MySQL data
interface MySQLCrossCrossformRow {
  crosscrossformid: string;
  crossid: string;
  crossformid: string;
  certainty: number;
}

// Interface for PostgreSQL data
interface PostgreSQLCrossCrossformRow {
  crosscrossformid: string;
  crossid: string;
  crossformid: string;
  certainty: boolean;
}

export const importCrossCrossformData = async (mysqlData: string): Promise<void> => {
  console.log('Starting cross_crossform import...');
  
  try {
    // Parse the MySQL INSERT statements - fixed regex to handle backticks
    const insertMatches = mysqlData.match(/INSERT INTO `cross_crossform`[^;]+;?/g);
    
    if (!insertMatches) {
      console.log('No INSERT statements found, checking for standalone VALUES...');
      
      // Check if we have VALUES without INSERT statement
      const valuesMatch = mysqlData.match(/VALUES\s*(.*?)(?:;?\s*)$/is);
      if (valuesMatch) {
        console.log('Found standalone VALUES section, processing...');
        const processedData = `INSERT INTO \`cross_crossform\` (\`crosscrossformid\`, \`crossid\`, \`crossformid\`, \`certainty\`) VALUES ${valuesMatch[1]};`;
        return await importCrossCrossformData(processedData);
      }
      
      throw new Error('No INSERT statements or VALUES section found in the provided data');
    }
    
    const allRows: PostgreSQLCrossCrossformRow[] = [];
    
    for (const insertStatement of insertMatches) {
      console.log(`Processing INSERT statement: ${insertStatement.substring(0, 100)}...`);
      
      // Extract VALUES part - improved regex
      const valuesMatch = insertStatement.match(/VALUES\s*(.+?)(?:;?\s*)$/is);
      if (!valuesMatch) {
        console.log('No VALUES found in this INSERT statement, skipping...');
        continue;
      }
      
      const valuesString = valuesMatch[1].replace(/;$/, '').trim();
      console.log(`VALUES string: ${valuesString.substring(0, 200)}...`);
      
      // Parse individual value tuples - improved regex to handle various formats
      const tupleRegex = /\(\s*([^)]+)\s*\)/g;
      let tupleMatch;
      let rowCount = 0;
      
      while ((tupleMatch = tupleRegex.exec(valuesString)) !== null) {
        const values = tupleMatch[1].split(',').map(v => v.trim().replace(/^['"`]|['"`]$/g, ''));
        
        console.log(`Processing row ${rowCount + 1}: ${values.join(', ')}`);
        
        if (values.length >= 4) {
          try {
            const convertedRow: PostgreSQLCrossCrossformRow = {
              crosscrossformid: convertBinaryToUUID(values[0]),
              crossid: convertBinaryToUUID(values[1]),
              crossformid: convertBinaryToUUID(values[2]),
              certainty: values[3] === '1' || values[3] === 'true' || values[3] === 'TRUE'
            };
            
            allRows.push(convertedRow);
            console.log(`✅ Converted row ${rowCount + 1}: ${convertedRow.crosscrossformid}`);
            rowCount++;
          } catch (error) {
            console.warn(`❌ Failed to convert row ${rowCount + 1}: ${values.join(', ')}`, error);
          }
        } else {
          console.warn(`⚠️ Row ${rowCount + 1} has insufficient values: ${values.length}, expected 4`);
        }
      }
    }
    
    console.log(`Prepared ${allRows.length} rows for import`);
    
    if (allRows.length === 0) {
      throw new Error('No valid rows were processed from the provided data');
    }
    
    // Import in batches of 100
    const batchSize = 100;
    let imported = 0;
    
    for (let i = 0; i < allRows.length; i += batchSize) {
      const batch = allRows.slice(i, i + batchSize);
      
      console.log(`Importing batch ${Math.floor(i / batchSize) + 1}: ${batch.length} rows`);
      
      const { data, error } = await supabase
        .from('cross_crossform')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`Batch ${Math.floor(i / batchSize) + 1} failed:`, error);
        throw error;
      }
      
      imported += batch.length;
      console.log(`Imported batch ${Math.floor(i / batchSize) + 1}, total: ${imported}/${allRows.length}`);
    }
    
    console.log(`✅ Successfully imported ${imported} cross_crossform records`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
};

// Helper function to preview the conversion without importing
export const previewCrossCrossformConversion = (mysqlData: string): void => {
  console.log('Previewing cross_crossform conversion...');
  
  // Check for INSERT statements first
  const insertMatches = mysqlData.match(/INSERT INTO `cross_crossform`[^;]+;?/g);
  
  if (!insertMatches) {
    // Check for standalone VALUES
    const valuesMatch = mysqlData.match(/VALUES\s*(.*?)(?:;?\s*)$/is);
    if (valuesMatch) {
      console.log('Found standalone VALUES section');
      const processedData = `INSERT INTO \`cross_crossform\` (\`crosscrossformid\`, \`crossid\`, \`crossformid\`, \`certainty\`) VALUES ${valuesMatch[1]};`;
      return previewCrossCrossformConversion(processedData);
    }
    
    console.log('No INSERT statements or VALUES found');
    return;
  }
  
  console.log(`Found ${insertMatches.length} INSERT statements`);
  
  // Show first few conversions as preview
  const firstInsert = insertMatches[0];
  const valuesMatch = firstInsert.match(/VALUES\s*(.+?)(?:;?\s*)$/is);
  
  if (valuesMatch) {
    const valuesString = valuesMatch[1].replace(/;$/, '').trim();
    const tupleRegex = /\(\s*([^)]+)\s*\)/g;
    let tupleMatch;
    let count = 0;
    
    console.log('\nPreview of first 3 conversions:');
    
    while ((tupleMatch = tupleRegex.exec(valuesString)) !== null && count < 3) {
      const values = tupleMatch[1].split(',').map(v => v.trim().replace(/^['"`]|['"`]$/g, ''));
      
      if (values.length >= 4) {
        try {
          const original = {
            crosscrossformid: values[0],
            crossid: values[1],
            crossformid: values[2],
            certainty: values[3]
          };
          
          const converted = {
            crosscrossformid: convertBinaryToUUID(values[0]),
            crossid: convertBinaryToUUID(values[1]),
            crossformid: convertBinaryToUUID(values[2]),
            certainty: values[3] === '1' || values[3] === 'true' || values[3] === 'TRUE'
          };
          
          console.log(`\n${count + 1}. Original:`, original);
          console.log(`   Converted:`, converted);
          
          count++;
        } catch (error) {
          console.warn(`Failed to convert row ${count + 1}:`, error);
        }
      }
    }
    
    // Count total rows
    const allMatches = valuesString.match(/\(\s*[^)]+\s*\)/g);
    if (allMatches) {
      console.log(`\nTotal rows found: ${allMatches.length}`);
    }
  }
};
