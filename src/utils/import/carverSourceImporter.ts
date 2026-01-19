
import { supabase } from "@/integrations/supabase/client";

export interface MySQLCarverSourceRecord {
  carverinscriptionid: string;
  sourceid: string;
}

export const importCarverSources = async (records: MySQLCarverSourceRecord[]): Promise<{
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}> => {
  console.log(`Starting import of ${records.length} carver-source relationships...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (const record of records) {
    try {
      console.log(`Processing carver-source relationship...`);
      
      // Prepare carver-source data for direct import to carver_source table
      const carverSourceData = {
        carverinscriptionid: `\\x${record.carverinscriptionid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
        sourceid: `\\x${record.sourceid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`
      };
      
      console.log(`Importing carver-source relationship:`, carverSourceData);
      
      // Insert directly to carver_source table
      const { error } = await supabase
        .from('carver_source')
        .insert(carverSourceData);
      
      if (error) {
        console.error(`Error inserting carver-source:`, error);
        if (error.code === '23505') {
          skipped++;
          errorMessages.push(`Carver-source relationship: Already exists (skipped)`);
        } else {
          errors++;
          errorMessages.push(`Carver-source relationship: ${error.message}`);
        }
      } else {
        console.log(`Successfully imported carver-source relationship`);
        success++;
      }
      
    } catch (error) {
      console.error(`Exception processing carver-source:`, error);
      errors++;
      errorMessages.push(`Carver-source: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  console.log(`Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
  
  return {
    success,
    errors,
    skipped,
    errorMessages
  };
};

export const parseCarverSourceSQL = (sqlData: string): MySQLCarverSourceRecord[] => {
  const records: MySQLCarverSourceRecord[] = [];
  
  console.log('Parsing carver-source SQL data...');
  
  // Extract INSERT statements for carver_source table
  const insertMatch = sqlData.match(/INSERT INTO `carver_source`.*?VALUES\s*(.*?)(?:;|\n\n|$)/s);
  
  if (!insertMatch) {
    console.warn('No carver_source INSERT statement found in SQL data');
    return records;
  }
  
  const valuesSection = insertMatch[1];
  console.log('Found VALUES section:', valuesSection.substring(0, 200) + '...');
  
  // Parse individual value tuples for carver_source format
  const tupleRegex = /\(\s*X'([^']+)',\s*X'([^']+)'\s*\)/g;
  
  let match;
  while ((match = tupleRegex.exec(valuesSection)) !== null) {
    const [, carverinscriptionid, sourceid] = match;
    
    records.push({
      carverinscriptionid: `X'${carverinscriptionid}'`,
      sourceid: `X'${sourceid}'`
    });
  }
  
  console.log(`Parsed ${records.length} carver-source records from SQL data`);
  return records;
};
