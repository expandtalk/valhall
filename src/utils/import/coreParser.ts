
import { ParsedRecord } from "@/types/import";
import { parseRundataSQL } from '../rundataParser';
import { validateSignum } from '../signumValidator';
import { isRundataSQL } from './sqlDetection';
import { parseTSVData } from './tsvParser';

export const parseImportDataCore = async (
  data: string, 
  source: string, 
  testMode: boolean = false
): Promise<ParsedRecord[]> => {
  console.log(`🚀 Starting parseImportData with testMode: ${testMode}, source: ${source}`);
  console.log(`📊 Data length: ${data.length} characters`);
  
  let lines = data.split('\n').filter(line => line.trim());
  
  // For test mode, expand to more lines to capture the full table structure including interpretations
  if (testMode) {
    console.log(`🧪 Test mode: processing up to 1000 lines out of ${lines.length} total to capture full database structure`);
    lines = lines.slice(0, Math.min(1000, lines.length));
  }
  
  // Check if this looks like Rundata SQL format - enhanced detection for interpretations table
  if (isRundataSQL(data)) {
    console.log('🎯 Detected Rundata SQL format with complex tables, using specialized parser...');
    const parsedRecords = await parseRundataSQL(lines.join('\n'));
    console.log(`✅ Rundata parser returned ${parsedRecords.length} records`);
    
    // Enhanced validation for all inscription types with better logging
    const validatedRecords = parsedRecords.filter(record => {
      if (!record.signum) {
        console.log(`⚠️ Skipping record with no signum`);
        return false;
      }
      
      // Allow all valid country prefixes and provide detailed validation feedback
      const validCountryPrefixes = ['DR', 'N', 'E', 'IR', 'Sc', 'U', 'Sö', 'Ög', 'Sm', 'G', 'Vg', 'Hs', 'Vs', 'Dg', 'Np', 'Vr', 'Bo'];
      const signumParts = record.signum.split(' ');
      const prefix = signumParts[0];
      
      const isValidPrefix = validCountryPrefixes.some(validPrefix => 
        prefix.startsWith(validPrefix) || validPrefix.startsWith(prefix)
      );
      
      if (!isValidPrefix && !testMode) {
        console.log(`⚠️ Skipping record with unknown prefix: ${record.signum} (prefix: ${prefix})`);
        return false;
      }
      
      // Additional validation for signum format
      const signumValidation = validateSignum(record.signum);
      if (!signumValidation.isValid && !testMode) {
        console.log(`⚠️ Skipping record with invalid signum format: ${record.signum} - ${signumValidation.reason}`);
        return false;
      }
      
      console.log(`✅ Valid record: ${record.signum} (transliteration: ${record.transliteration ? 'YES' : 'NO'})`);
      return true;
    });
    
    console.log(`✅ After validation: ${validatedRecords.length} valid records (filtered from ${parsedRecords.length})`);
    return validatedRecords;
  }
  
  // Enhanced TSV parsing with signum focus
  const records = await parseTSVData(lines, source, testMode);
  
  console.log(`✅ parseImportData completed: ${records.length} records found`);
  return records;
};
