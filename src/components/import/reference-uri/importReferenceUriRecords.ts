
import { supabase } from '@/integrations/supabase/client';
import { MySQLReferenceUriRecord, ReferenceUriImportResult } from './types';

export const importReferenceUriRecords = async (
  records: MySQLReferenceUriRecord[],
  setProgress: (progress: number) => void
): Promise<ReferenceUriImportResult> => {
  const result: ReferenceUriImportResult = { success: 0, errors: 0, skipped: 0, errorMessages: [] };
  const BATCH_SIZE = 500;

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    const recordsToInsert = batch.map(rec => ({
      reference_id: rec.referenceid,
      uri_id: rec.uriid,
    }));

    const { error } = await supabase.from('reference_uri').insert(recordsToInsert).select();

    if (error) {
      console.error('Error importing reference_uri batch:', error);
      result.errors += batch.length;
      result.errorMessages.push(`Batch from index ${i}: ${error.message}`);
    } else {
      result.success += batch.length;
    }
    setProgress(((i + batch.length) / records.length) * 100);
  }

  return result;
};
