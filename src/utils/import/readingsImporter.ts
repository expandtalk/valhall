import { supabase } from "@/integrations/supabase/client";

export interface MySQLReadingRecord {
  readingid: string;
  inscriptionid: string;
  reading: string;
  text: string | null;
  teitext: string | null;
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

// Function to find inscription by old inscriptionid
const findInscriptionByOldId = async (oldInscriptionId: string): Promise<string | null> => {
  const uuid = convertBinaryUUID(oldInscriptionId);
  
  // Try to find by exact signum match or other identifying fields
  const { data, error } = await supabase
    .from('runic_inscriptions')
    .select('id')
    .or(`id.eq.${uuid},rundata_signum.eq.${uuid}`)
    .limit(1);
  
  if (error) {
    console.error('Error finding inscription:', error);
    return null;
  }
  
  return data && data.length > 0 ? data[0].id : null;
};

export const importReadings = async (readings: MySQLReadingRecord[]): Promise<{
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}> => {
  console.log(`Starting import of ${readings.length} readings...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (const reading of readings) {
    try {
      console.log(`Processing reading ${reading.readingid}...`);
      
      // Find corresponding inscription
      const inscriptionId = await findInscriptionByOldId(reading.inscriptionid);
      
      if (!inscriptionId) {
        console.warn(`No inscription found for ID ${reading.inscriptionid}, skipping reading ${reading.readingid}`);
        skipped++;
        continue;
      }
      
      // Prepare reading data, now including rundata_readingid
      const readingData = {
        inscription_id: inscriptionId,
        reading_type: reading.reading,
        text: reading.text,
        tei_text: reading.teitext,
        rundata_readingid: reading.readingid.toLowerCase(),
      };
      
      console.log(`Importing reading for inscription ${inscriptionId}:`, readingData);
      
      // Insert reading
      const { error } = await supabase
        .from('readings')
        .insert(readingData);
      
      if (error) {
        console.error(`Error inserting reading ${reading.readingid}:`, error);
        errors++;
        errorMessages.push(`Reading ${reading.readingid}: ${error.message}`);
      } else {
        console.log(`Successfully imported reading ${reading.readingid}`);
        success++;
      }
      
    } catch (error) {
      console.error(`Exception processing reading ${reading.readingid}:`, error);
      errors++;
      errorMessages.push(`Reading ${reading.readingid}: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

export const parseReadingsSQL = (sqlData: string): MySQLReadingRecord[] => {
  const readings: MySQLReadingRecord[] = [];
  
  // Correct potential typos from copy-pasting
  const correctedSqlData = sqlData.replace(/^IINSERT/i, 'INSERT');

  // Extract INSERT statements for readings table
  const insertMatch = correctedSqlData.match(/INSERT INTO `readings`.*?VALUES\s*(.*?)(?:;|\n\n)/s);
  
  if (!insertMatch) {
    console.warn('No readings INSERT statement found in SQL data');
    return readings;
  }
  
  const valuesSection = insertMatch[1];
  
  // Parse individual value tuples, handling escaped single quotes (\') in text fields
  const tupleRegex = /\(\s*X'([^']+)',\s*X'([^']+)',\s*'([^']+)',\s*(?:'((?:\\'|[^'])*)'|NULL),\s*(?:'((?:\\'|[^'])*)'|NULL)\s*\)/g;
  
  let match;
  while ((match = tupleRegex.exec(valuesSection)) !== null) {
    const [, readingid, inscriptionid, reading, rawText, rawTeitext] = match;
    
    // Un-escape quotes
    const text = rawText ? rawText.replace(/\\'/g, "'").replace(/\\"/g, '"') : null;
    const teitext = rawTeitext ? rawTeitext.replace(/\\'/g, "'").replace(/\\"/g, '"') : null;
    
    readings.push({
      readingid: readingid,
      inscriptionid: inscriptionid,
      reading: reading,
      text: text || null,
      teitext: teitext || null
    });
  }
  
  console.log(`Parsed ${readings.length} readings from SQL data`);
  return readings;
};
