
import { supabase } from '@/integrations/supabase/client';

export interface MySQLImageLinkRecord {
  imagelinkid: string; // This is a hex string
  objectid: string; // This is a hex string
  imagelink: string;
}

const hexToBytea = (hex: string) => `\\x${hex}`;

export const parseImageLinksSQL = (sql: string): MySQLImageLinkRecord[] => {
  const records: MySQLImageLinkRecord[] = [];
  
  // This regex is designed to find the VALUES clause for the imagelinks table.
  const valuesRegex = /INSERT INTO `imagelinks`[^;]*?VALUES\s*([\s\S]*)/i;
  const match = sql.match(valuesRegex);
  
  if (!match || !match[1]) {
    throw new Error("Kunde inte hitta en giltig `INSERT INTO imagelinks` sats. Vänligen klistra in hela SQL-satsen, inklusive VALUES-blocket.");
  }

  const valuesString = match[1];

  // Regex to capture the tuples: (X'HEX', X'HEX', 'URL')
  const tupleRegex = /\(X'([0-9A-F]+)',X'([0-9A-F]+)','([^']*)'\)/gi;
  let tupleMatch;

  while ((tupleMatch = tupleRegex.exec(valuesString)) !== null) {
    records.push({
      imagelinkid: tupleMatch[1],
      objectid: tupleMatch[2],
      imagelink: tupleMatch[3],
    });
  }
  
  if (records.length === 0) {
      throw new Error("Inga giltiga bildlänkar hittades. Kontrollera att datan efter VALUES är i formatet (X'id', X'id', 'url'),...");
  }
  
  return records;
};

export const importImageLinks = async (
  records: MySQLImageLinkRecord[],
  onProgress?: (progress: number) => void
) => {
  const result = { success: 0, errors: 0, skipped: 0, errorMessages: [] as string[] };
  const BATCH_SIZE = 500;

  if (records.length === 0) {
    return result;
  }

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const dataToInsert = batch.map(record => ({
      imagelinkid: hexToBytea(record.imagelinkid),
      objectid: hexToBytea(record.objectid),
      imagelink: record.imagelink,
    }));

    const { error } = await supabase.from('imagelinks').upsert(dataToInsert);

    if (error) {
      console.error(`Error inserting batch ${i / BATCH_SIZE + 1} of imagelinks:`, error);
      result.errors += batch.length;
      result.errorMessages.push(`Batch starting at record ${i + 1}: ${error.message}`);
    } else {
      result.success += batch.length;
    }
    
    if (onProgress) {
        const progress = Math.round(((i + batch.length) / records.length) * 100);
        onProgress(progress);
    }
  }

  return result;
};
