
import { supabase } from '@/integrations/supabase/client';
import { MySQLObjectSourceRecord, ObjectSourceImportResult } from './types';

export const importObjectSourceRecords = async (
  records: MySQLObjectSourceRecord[],
  onProgress: (progress: number) => void
): Promise<ObjectSourceImportResult> => {
  const result: ObjectSourceImportResult = {
    success: 0,
    errors: 0,
    skipped: 0,
    errorMessages: [],
  };

  const CHUNK_SIZE = 100;
  for (let i = 0; i < records.length; i += CHUNK_SIZE) {
    const chunk = records.slice(i, i + CHUNK_SIZE);
    
    const recordsToInsert = chunk.map(record => ({
      objectid: record.objectid,
      sourceid: `\\x${record.sourceid}`,
    }));

    // Use upsert to avoid duplicate errors if the link already exists.
    const { error } = await supabase
      .from('object_source')
      .upsert(recordsToInsert, { onConflict: 'objectid,sourceid' });

    if (error) {
      result.errors += chunk.length;
      result.errorMessages.push(`Chunk ${Math.floor(i / CHUNK_SIZE) + 1}: ${error.message}`);
    } else {
      result.success += chunk.length;
    }

    const progress = ((i + chunk.length) / records.length) * 100;
    onProgress(progress);
  }

  console.log('Object-source import finished.', result);
  return result;
};
