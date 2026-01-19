
import { supabase } from "@/integrations/supabase/client";
import { MySQLDatingRecord, DatingImportResult } from './types';

export const importDatingRecords = async (
  records: MySQLDatingRecord[],
  setImportProgress: (progress: number) => void
): Promise<DatingImportResult> => {
  console.log(`🚀 Starting import of ${records.length} dating records...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    
    try {
      console.log(`📥 Processing dating ${i + 1}/${records.length}: ${record.datingid.substring(0, 8)}... - "${record.dating}"`);
      
      // Convert UUID back to bytea for objectid
      const objectidBuffer = record.objectid.replace(/-/g, '');
      const objectidBytes = `\\x${objectidBuffer}`;
      
      // Prepare dating data for import
      const datingData = {
        datingid: record.datingid,
        objectid: objectidBytes,
        dating: record.dating,
        lang: record.lang
      };
      
      console.log(`💾 Inserting dating:`, datingData);
      
      // Insert into dating table
      const { data, error } = await supabase
        .from('dating')
        .insert(datingData)
        .select();
      
      if (error) {
        console.error(`❌ Error inserting dating:`, error);
        if (error.code === '23505') {
          skipped++;
          errorMessages.push(`Dating "${record.dating}": Already exists (skipped)`);
          console.log(`⏭️ Skipped duplicate: ${record.datingid.substring(0, 8)}...`);
        } else {
          errors++;
          errorMessages.push(`Dating "${record.dating}": ${error.message}`);
          console.error(`💥 Error details:`, error);
        }
      } else {
        console.log(`✅ Successfully imported dating: ${record.datingid.substring(0, 8)}... - "${record.dating}"`);
        console.log(`📊 Inserted data:`, data);
        success++;
      }
      
      // Update progress
      const currentProgress = ((success + errors + skipped) / records.length) * 100;
      setImportProgress(currentProgress);
      
    } catch (error) {
      console.error(`💥 Exception processing dating:`, error);
      errors++;
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      errorMessages.push(`Dating "${record.datingid.substring(0, 12)}...": ${errorMsg}`);
    }
  }
  
  console.log(`🏁 Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
  
  return {
    success,
    errors,
    skipped,
    errorMessages
  };
};
