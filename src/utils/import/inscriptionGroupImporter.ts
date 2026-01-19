
import { supabase } from '@/integrations/supabase/client';

export interface MySQLInscriptionGroupRecord {
  inscriptionid: string; // hex string
  groupid: string; // hex string
}

const hexToBytea = (hex: string) => `\\x${hex}`;

export const parseInscriptionGroupSQL = (sql: string): MySQLInscriptionGroupRecord[] => {
  const records: MySQLInscriptionGroupRecord[] = [];

  const valuesRegex = /INSERT INTO `inscription_group`[^;]*?VALUES\s*([\s\S]*)/i;
  const match = sql.match(valuesRegex);

  if (!match || !match[1]) {
    throw new Error("Kunde inte hitta en giltig `INSERT INTO inscription_group` sats. Vänligen klistra in hela SQL-satsen, inklusive VALUES-blocket.");
  }

  const valuesString = match[1];

  const tupleRegex = /\(X'([0-9A-F]+)',X'([0-9A-F]+)'\)/gi;
  let tupleMatch;

  while ((tupleMatch = tupleRegex.exec(valuesString)) !== null) {
    records.push({
      inscriptionid: tupleMatch[1],
      groupid: tupleMatch[2],
    });
  }

  if (records.length === 0) {
      throw new Error("Inga giltiga inskrift-grupp-kopplingar hittades. Kontrollera att datan efter VALUES är i formatet (X'id', X'id'),...");
  }

  return records;
};

export const importInscriptionGroups = async (
  records: MySQLInscriptionGroupRecord[],
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
      inscriptionid: hexToBytea(record.inscriptionid),
      groupid: hexToBytea(record.groupid),
    }));

    const { error } = await supabase.from('inscription_group').upsert(dataToInsert);

    if (error) {
      console.error(`Error inserting batch ${i / BATCH_SIZE + 1} of inscription_group:`, error);
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
