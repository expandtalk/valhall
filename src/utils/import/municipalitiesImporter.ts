
import { supabase } from "@/integrations/supabase/client";

export interface MySQLMunicipalityRecord {
  municipalityid: string;
  countyid: string;
  municipality: string;
  number: string | null;
}

export const importMunicipalities = async (records: MySQLMunicipalityRecord[]): Promise<{
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}> => {
  console.log(`Starting import of ${records.length} municipalities...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (const record of records) {
    try {
      console.log(`Processing municipality: ${record.municipality}`);
      
      // Prepare municipality data for import
      const municipalityData = {
        municipalityid: `\\x${record.municipalityid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
        countyid: `\\x${record.countyid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
        municipality: record.municipality,
        number: record.number
      };
      
      console.log(`Importing municipality:`, municipalityData);
      
      // Upsert to municipalities table (handles duplicates gracefully)
      const { error } = await supabase
        .from('municipalities')
        .upsert(municipalityData, { 
          onConflict: 'municipalityid',
          ignoreDuplicates: true 
        });
      
      if (error) {
        console.error(`Error inserting municipality:`, error);
        if (error.code === '23505') {
          skipped++;
          errorMessages.push(`Municipality "${record.municipality}": Already exists (skipped)`);
        } else {
          errors++;
          errorMessages.push(`Municipality "${record.municipality}": ${error.message}`);
        }
      } else {
        console.log(`Successfully imported municipality: ${record.municipality}`);
        success++;
      }
      
    } catch (error) {
      console.error(`Exception processing municipality:`, error);
      errors++;
      errorMessages.push(`Municipality "${record.municipality}": ${error instanceof Error ? error.message : 'Unknown error'}`);
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

export const parseMunicipalitiesSQL = (sqlData: string): MySQLMunicipalityRecord[] => {
  const records: MySQLMunicipalityRecord[] = [];
  
  console.log('Parsing municipalities SQL data...');
  
  // Extract INSERT statements for municipalities table
  const insertMatch = sqlData.match(/INSERT INTO `municipalities`.*?VALUES\s*(.*?)(?:;|\n\n|$)/s);
  
  if (!insertMatch) {
    console.warn('No municipalities INSERT statement found in SQL data');
    return records;
  }
  
  const valuesSection = insertMatch[1];
  console.log('Found VALUES section:', valuesSection.substring(0, 200) + '...');
  
  // Parse individual value tuples for municipalities format
  const tupleRegex = /\(\s*X'([^']+)',\s*X'([^']+)',\s*'([^']+)',\s*(?:'([^']*)'|NULL)\s*\)/g;
  
  let match;
  while ((match = tupleRegex.exec(valuesSection)) !== null) {
    const [, municipalityid, countyid, municipality, number] = match;
    
    records.push({
      municipalityid: `X'${municipalityid}'`,
      countyid: `X'${countyid}'`,
      municipality,
      number: number || null
    });
  }
  
  console.log(`Parsed ${records.length} municipality records from SQL data`);
  return records;
};
