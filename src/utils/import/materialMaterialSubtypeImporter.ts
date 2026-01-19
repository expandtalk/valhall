
import { supabase } from '@/integrations/supabase/client';

export interface MySQLMaterialMaterialSubtypeRecord {
  materialid: string; // This is a hex string
  subtypeid: string; // This is a hex string
}

const hexToBytea = (hex: string) => `\\x${hex}`;

export const parseMaterialMaterialSubtypeSQL = (sql: string): MySQLMaterialMaterialSubtypeRecord[] => {
  const records: MySQLMaterialMaterialSubtypeRecord[] = [];
  
  // This regex is designed to find the VALUES clause for the material_materialsubtype table.
  // It's intentionally flexible to handle incomplete pastes from SQL dump files.
  const valuesRegex = /INSERT INTO `material_materialsubtype`[^;]*?VALUES\s*([\s\S]*)/i;
  const match = sql.match(valuesRegex);
  
  if (!match || !match[1]) {
    throw new Error("Kunde inte hitta en giltig `INSERT INTO material_materialsubtype` sats. Vänligen klistra in hela SQL-satsen, inklusive VALUES-blocket.");
  }

  const valuesString = match[1];

  const tupleRegex = /\(X'([0-9A-F]+)',X'([0-9A-F]+)'\)/gi;
  let tupleMatch;

  while ((tupleMatch = tupleRegex.exec(valuesString)) !== null) {
    records.push({
      materialid: tupleMatch[1],
      subtypeid: tupleMatch[2],
    });
  }
  
  if (records.length === 0) {
      throw new Error("Inga giltiga material-subtyp-kopplingar hittades. Kontrollera att datan efter VALUES är i formatet (X'id', X'id'),...");
  }
  
  return records;
};

export const importMaterialMaterialSubtypes = async (
  records: MySQLMaterialMaterialSubtypeRecord[],
  onProgress?: (progress: number) => void
) => {
  const result = { success: 0, errors: 0, skipped: 0, errorMessages: [] as string[] };
  const BATCH_SIZE = 500; // A safe batch size for Supabase upserts

  if (records.length === 0) {
    return result;
  }

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const dataToInsert = batch.map(record => ({
      materialid: hexToBytea(record.materialid),
      subtypeid: hexToBytea(record.subtypeid),
    }));

    // Using upsert to handle potential re-imports gracefully.
    const { error } = await supabase.from('material_materialsubtype').upsert(dataToInsert);

    if (error) {
      console.error(`Error inserting batch ${i / BATCH_SIZE + 1} of material_materialsubtype:`, error);
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
