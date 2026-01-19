
import { supabase } from '@/integrations/supabase/client';
import { MySQLGroupRecord, GroupImportResult } from './types';

export const importGroupsRecords = async (
  records: MySQLGroupRecord[],
  onProgress: (progress: number) => void
): Promise<GroupImportResult> => {
  const result: GroupImportResult = {
    success: 0,
    errors: 0,
    skipped: 0,
    errorMessages: [],
  };

  const CHUNK_SIZE = 100;
  for (let i = 0; i < records.length; i += CHUNK_SIZE) {
    const chunk = records.slice(i, i + CHUNK_SIZE);
    
    const recordsToInsert = chunk.map(record => ({
      groupid: `\\x${record.groupid}`,
      type: record.type,
      notes: record.notes,
      lang: record.lang,
    }));

    const { error } = await supabase
      .from('groups')
      .upsert(recordsToInsert, { onConflict: 'groupid' });

    if (error) {
      result.errors += chunk.length;
      result.errorMessages.push(`Chunk ${Math.floor(i / CHUNK_SIZE) + 1}: ${error.message}`);
    } else {
      result.success += chunk.length;
    }

    const progress = ((i + chunk.length) / records.length) * 100;
    onProgress(progress);
  }

  console.log('Groups import finished.', result);
  return result;
};
