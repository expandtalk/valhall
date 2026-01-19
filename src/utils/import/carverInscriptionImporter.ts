import { supabase } from "@/integrations/supabase/client";

export interface MySQLCarverInscriptionRecord {
  carverinscriptionid: string;
  carverid: string;
  inscriptionid: string;
  attribution: string;
  certainty: boolean;
  notes: string | null;
  lang: string;
}

// Function to convert MySQL binary UUID to standard UUID format
const convertBinaryUUID = (binaryUUID: string): string => {
  // Remove X' prefix and ' suffix if present
  const hexString = binaryUUID.replace(/^X'/, '').replace(/'$/, '');
  
  // Convert hex string to UUID format (8-4-4-4-12)
  if (hexString.length === 32) {
    return [
      hexString.substring(0, 8),
      hexString.substring(8, 12),
      hexString.substring(12, 16),
      hexString.substring(16, 20),
      hexString.substring(20, 32)
    ].join('-').toLowerCase();
  }
  
  // If already in UUID format, return as-is
  return hexString.toLowerCase();
};

export const importCarverInscriptions = async (records: MySQLCarverInscriptionRecord[]): Promise<{
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}> => {
  console.log(`Starting import of ${records.length} carver-inscription relationships...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (const record of records) {
    try {
      console.log(`Processing carver-inscription ${record.carverinscriptionid}...`);
      
      // Prepare carver-inscription data for direct import to carver_inscription table
      const carverInscriptionData = {
        carverinscriptionid: `\\x${record.carverinscriptionid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
        carverid: `\\x${record.carverid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
        inscriptionid: `\\x${record.inscriptionid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
        attribution: record.attribution as 'attributed' | 'signed' | 'similar' | 'signed on pair stone',
        certainty: record.certainty,
        notes: record.notes,
        lang: record.lang
      };
      
      console.log(`Importing carver-inscription relationship directly to carver_inscription table:`, carverInscriptionData);
      
      // Insert directly to carver_inscription table
      const { error } = await supabase
        .from('carver_inscription')
        .insert(carverInscriptionData);
      
      if (error) {
        console.error(`Error inserting carver-inscription ${record.carverinscriptionid}:`, error);
        if (error.code === '23505') {
          skipped++;
          errorMessages.push(`Carver-inscription ${record.carverinscriptionid}: Already exists (skipped)`);
        } else {
          errors++;
          errorMessages.push(`Carver-inscription ${record.carverinscriptionid}: ${error.message}`);
        }
      } else {
        console.log(`Successfully imported carver-inscription ${record.carverinscriptionid} to carver_inscription table`);
        success++;
      }
      
    } catch (error) {
      console.error(`Exception processing carver-inscription ${record.carverinscriptionid}:`, error);
      errors++;
      errorMessages.push(`Carver-inscription ${record.carverinscriptionid}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

export const parseCarverInscriptionSQL = (sqlData: string): MySQLCarverInscriptionRecord[] => {
  const records: MySQLCarverInscriptionRecord[] = [];
  
  console.log('Parsing carver-inscription SQL data...');
  
  // Extract INSERT statements for carver_inscription table
  const insertMatch = sqlData.match(/INSERT INTO `carver_inscription`.*?VALUES\s*(.*?)(?:;|\n\n|$)/s);
  
  if (!insertMatch) {
    console.warn('No carver_inscription INSERT statement found in SQL data');
    return records;
  }
  
  const valuesSection = insertMatch[1];
  console.log('Found VALUES section:', valuesSection.substring(0, 200) + '...');
  
  // Parse individual value tuples - improved regex for carver_inscription format
  const tupleRegex = /\(\s*X'([^']+)',\s*X'([^']+)',\s*X'([^']+)',\s*'([^']+)',\s*([01]),\s*(?:'([^']*)'|NULL),\s*'([^']+)'\s*\)/g;
  
  let match;
  while ((match = tupleRegex.exec(valuesSection)) !== null) {
    const [, carverinscriptionid, carverid, inscriptionid, attribution, certainty, notes, lang] = match;
    
    records.push({
      carverinscriptionid: `X'${carverinscriptionid}'`,
      carverid: `X'${carverid}'`,
      inscriptionid: `X'${inscriptionid}'`,
      attribution: attribution,
      certainty: certainty === '1',
      notes: notes || null,
      lang: lang
    });
  }
  
  console.log(`Parsed ${records.length} carver-inscription records from SQL data`);
  return records;
};
