
import { supabase } from '@/integrations/supabase/client';
import { MySQLSourceRecord, SourceImportResult } from './types';

export const importSourcesRecords = async (
  records: MySQLSourceRecord[],
  onProgress: (progress: number) => void
): Promise<SourceImportResult> => {
  const result: SourceImportResult = {
    success: 0,
    errors: 0,
    skipped: 0,
    errorMessages: [],
  };

  const CHUNK_SIZE = 100;
  for (let i = 0; i < records.length; i += CHUNK_SIZE) {
    const chunk = records.slice(i, i + CHUNK_SIZE);
    
    const recordsToInsert = chunk.map(record => ({
      ...record,
      sourceid: `\\x${record.sourceid}`,
      publication_year: record.publication_year && !isNaN(record.publication_year) ? record.publication_year : null,
    }));

    // Use upsert to avoid errors on duplicate sourceids
    const { error } = await supabase.from('sources').upsert(recordsToInsert, {
      onConflict: 'sourceid'
    });

    if (error) {
      result.errors += chunk.length;
      result.errorMessages.push(`Chunk ${Math.floor(i / CHUNK_SIZE) + 1}: ${error.message}`);
    } else {
      result.success += chunk.length;
    }

    const progress = ((i + chunk.length) / records.length) * 100;
    onProgress(progress);
  }

  console.log('Source import finished.', result);
  return result;
};
