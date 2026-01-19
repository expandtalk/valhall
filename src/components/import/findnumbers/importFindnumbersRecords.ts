
import { supabase } from "@/integrations/supabase/client";
import { MySQLFindnumberRecord, FindnumberImportResult } from './types';

export const importFindnumbersRecords = async (
  records: MySQLFindnumberRecord[],
  setImportProgress: (progress: number) => void
): Promise<FindnumberImportResult> => {
  console.log(`🚀 Starting import of ${records.length} findnumber records...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    
    try {
      if (!record.objectid || !record.findnumber) {
        skipped++;
        errorMessages.push(`Skipping record with missing objectid or findnumber: ${JSON.stringify(record)}`);
        continue;
      }

      const importData = {
        objectid: record.objectid,
        findnumber: record.findnumber,
      };
      
      const { error } = await supabase
        .from('findnumbers')
        .insert(importData);
      
      if (error) {
        console.error(`❌ Error inserting findnumber:`, error);
        if (error.code === '23505') { // unique_violation
          skipped++;
          errorMessages.push(`Findnumber for object ${record.objectid.substring(0, 8)} already exists (skipped)`);
        } else if (error.code === '23503') { // foreign_key_violation on objectid
            errors++;
            errorMessages.push(`Object ID ${record.objectid.substring(0, 8)} not found in 'objects' table.`);
        } else {
          errors++;
          errorMessages.push(`Findnumber for ${record.objectid.substring(0, 8)}: ${error.message}`);
        }
      } else {
        success++;
      }
      
    } catch (error) {
      console.error(`💥 Exception processing findnumber:`, error);
      errors++;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      errorMessages.push(`Findnumber for ${record.objectid.substring(0, 8)}: ${errorMsg}`);
    } finally {
        const currentProgress = ((success + errors + skipped) / records.length) * 100;
        setImportProgress(currentProgress);
    }
  }
  
  console.log(`🏁 Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
  
  return { success, errors, skipped, errorMessages };
};
