
import { supabase } from '@/integrations/supabase/client';
import { MySQLTranslationRecord, TranslationImportResult } from './types';

const BATCH_SIZE = 100;

export const importTranslationsRecords = async (
  records: MySQLTranslationRecord[],
  onProgress: (progress: number) => void
): Promise<TranslationImportResult> => {
  const result: TranslationImportResult = {
    success: 0,
    errors: 0,
    skipped: 0,
    errorMessages: [],
  };

  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    
    const { error } = await supabase.from('translations').upsert(
      batch.map(record => ({
        translationid: record.translationid,
        inscriptionid: record.inscriptionid,
        translation: record.translation,
        text: record.text,
        teitext: record.teitext,
        language: record.language,
      })),
      { onConflict: 'translationid' }
    );

    if (error) {
      console.error('Error importing translations batch:', error);
      result.errors += batch.length;
      result.errorMessages.push(`Batch ${i/BATCH_SIZE + 1}: ${error.message}`);
    } else {
      result.success += batch.length;
    }

    const progress = ((i + batch.length) / records.length) * 100;
    onProgress(progress);
  }

  console.log('Import finished.', result);
  return result;
};
