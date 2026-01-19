
import { supabase } from '@/integrations/supabase/client';
import { MySQLUriRecord, UriImportResult } from './types';

export const importUrisRecords = async (
  records: MySQLUriRecord[],
  setProgress: (progress: number) => void
): Promise<UriImportResult> => {
  const result: UriImportResult = { success: 0, errors: 0, skipped: 0, errorMessages: [] };
  const BATCH_SIZE = 500;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const recordsToInsert = batch.map(rec => ({
      uriid: rec.uriid,
      uri: rec.uri,
    }));

    const { error } = await supabase.from('uris').upsert(recordsToInsert, { onConflict: 'uriid' });

    if (error) {
      console.error('Error importing uris batch:', error);
      result.errors += batch.length;
      result.errorMessages.push(`Batch from index ${i}: ${error.message}`);
    } else {
      result.success += batch.length;
    }
    setProgress(((i + batch.length) / records.length) * 100);
  }

  return result;
};
