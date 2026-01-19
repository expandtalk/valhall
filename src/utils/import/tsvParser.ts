
import { ParsedRecord } from "@/types/import";
import { validateSignum } from '../signumValidator';
import { isSQLStructureCommand } from './sqlDetection';

export const parseTSVData = async (
  lines: string[], 
  source: string, 
  testMode: boolean = false
): Promise<ParsedRecord[]> => {
  const records: ParsedRecord[] = [];
  let processedCount = 0;
  let validRecordCount = 0;

  for (const line of lines) {
    processedCount++;
    
    // Skip empty lines and comments
    if (!line.trim() || line.startsWith('#')) continue;
    
    // Only skip SQL structure commands, not INSERT commands
    if (isSQLStructureCommand(line)) continue;
    
    // Parse TSV data
    const fields = line.split('\t');
    
    if (fields.length >= 3) {
      const rawSignum = fields[0]?.trim() || '';
      
      // Validate and normalize signum immediately
      const signumValidation = validateSignum(rawSignum);
      
      if (signumValidation.isValid || testMode) { // In test mode, include even invalid signa for analysis
        records.push({
          signum: signumValidation.normalizedSignum || rawSignum,
          transliteration: fields[1]?.trim() || '',
          location: fields[2]?.trim() || '',
          translation_en: fields[3]?.trim() || '',
          dating_text: fields[4]?.trim() || '',
          coordinates: fields[5]?.trim() || '',
          object_type: fields[6]?.trim() || '',
          source_database: source,
          raw_line: line
        });
        validRecordCount++;
      }
    }

    // In test mode, stop after finding enough valid records for quick analysis
    if (testMode && validRecordCount >= 30) {
      console.log(`🧪 Test mode: stopping after finding ${validRecordCount} valid records`);
      break;
    }

    // Progress logging for large datasets
    if (!testMode && processedCount % 1000 === 0) {
      console.log(`📊 Processed ${processedCount} lines, found ${validRecordCount} valid records`);
    }
  }

  return records;
};
