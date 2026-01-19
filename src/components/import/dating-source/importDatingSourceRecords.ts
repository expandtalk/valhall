
import { supabase } from "@/integrations/supabase/client";
import { MySQLDatingSourceRecord, DatingSourceImportResult } from './types';

export const importDatingSourceRecords = async (
  records: MySQLDatingSourceRecord[],
  setImportProgress: (progress: number) => void
): Promise<DatingSourceImportResult> => {
  console.log(`🚀 Starting import of ${records.length} dating source links...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    
    try {
      if (!record.datingid || !record.sourceid) {
        skipped++;
        errorMessages.push(`Skipping record with missing datingid or sourceid: ${JSON.stringify(record)}`);
        continue;
      }

      console.log(`📥 Processing link ${i + 1}/${records.length}: ${record.datingid} -> ${record.sourceid}`);
      
      const importData = {
        dating_id: record.datingid, // This is a UUID, passed as string
        source_id: record.sourceid, // This is already a bytea hex string e.g. \\x...
      };
      
      console.log(`💾 Inserting dating_source link:`, importData);
      
      const { error } = await supabase
        .from('dating_source')
        .insert(importData);
      
      if (error) {
        console.error(`❌ Error inserting dating_source link:`, error);
        if (error.code === '23505') { // unique_violation
          skipped++;
          errorMessages.push(`Link for dating ${record.datingid.substring(0, 8)} already exists (skipped)`);
        } else if (error.code === '23503') { // foreign_key_violation
            errors++;
            errorMessages.push(`Dating ID ${record.datingid.substring(0, 8)} not found in 'dating' table.`);
        } else {
          errors++;
          errorMessages.push(`Link ${record.datingid.substring(0, 8)}: ${error.message}`);
        }
      } else {
        success++;
      }
      
      const currentProgress = ((success + errors + skipped) / records.length) * 100;
      setImportProgress(currentProgress);
      
    } catch (error) {
      console.error(`💥 Exception processing link:`, error);
      errors++;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      errorMessages.push(`Link for ${record.datingid.substring(0, 8)}: ${errorMsg}`);
    }
  }
  
  console.log(`🏁 Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
  
  return { success, errors, skipped, errorMessages };
};
