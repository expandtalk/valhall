import { supabase } from "@/integrations/supabase/client";

export interface MySQLReadingSourceRecord {
  readingid: string; // hex string
  sourceid: string; // hex string
}

// Function to find reading by rundata_readingid
const findReadingByRundataId = async (rundataReadingId: string): Promise<string | null> => {
  const { data, error } = await supabase
    .from('readings')
    .select('id')
    .eq('rundata_readingid', rundataReadingId.toLowerCase())
    .limit(1);

  if (error) {
    console.error(`Error finding reading with rundata_readingid ${rundataReadingId}:`, error);
    return null;
  }

  return data && data.length > 0 ? data[0].id : null;
};

export const importReadingSources = async (records: MySQLReadingSourceRecord[]): Promise<{
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}> => {
  console.log(`Starting import of ${records.length} reading-source relationships...`);

  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];

  const recordsToInsert = [];

  for (const record of records) {
    const reading_id = await findReadingByRundataId(record.readingid);
    if (!reading_id) {
      const msg = `Skipping: Reading with old ID ${record.readingid} not found.`;
      console.warn(msg);
      skipped++;
      errorMessages.push(msg);
      continue;
    }
    recordsToInsert.push({
      reading_id,
      sourceid: `\\x${record.sourceid.toLowerCase()}`,
    });
  }

  if (recordsToInsert.length > 0) {
    const { error } = await supabase.from('reading_source').insert(recordsToInsert);

    if (error) {
      console.error(`Error inserting reading-source relations:`, error);
      errors = recordsToInsert.length;
      errorMessages.push(`Batch insert failed: ${error.message}`);
    } else {
      success = recordsToInsert.length;
      console.log(`Successfully imported ${success} reading-source relations.`);
    }
  }

  return { success, errors, skipped, errorMessages };
};

export const parseReadingSourceSQL = (sqlData: string): MySQLReadingSourceRecord[] => {
  const records: MySQLReadingSourceRecord[] = [];
  // This regex is more flexible and will capture the VALUES clause even without a trailing semicolon.
  const insertMatch = sqlData.match(/INSERT INTO `reading_source`.*?VALUES\s*([\s\S]*)/i);

  if (!insertMatch) {
    console.warn('No reading_source INSERT statement found in SQL data');
    return records;
  }

  const valuesSection = insertMatch[1];
  const tupleRegex = /\(\s*X'([^']+)',\s*X'([^']+)'\s*\)/g;

  let match;
  while ((match = tupleRegex.exec(valuesSection)) !== null) {
    const [, readingid, sourceid] = match;
    records.push({
      readingid,
      sourceid,
    });
  }

  console.log(`Parsed ${records.length} reading-source records from SQL data`);
  return records;
};
