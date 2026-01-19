
import { supabase } from "@/integrations/supabase/client";

export interface MySQLMaterialTypeRecord {
  materialtypeid: string;
  materialtype: string;
  lang: string;
}

export const importMaterialTypes = async (records: MySQLMaterialTypeRecord[]): Promise<{
  success: number;
  errors: number;
  skipped: number;
  errorMessages: string[];
}> => {
  console.log(`Starting import of ${records.length} material types...`);
  
  let success = 0;
  let errors = 0;
  let skipped = 0;
  const errorMessages: string[] = [];
  
  for (const record of records) {
    try {
      console.log(`Processing material type: ${record.materialtype}`);
      
      // Prepare material type data for import
      const materialTypeData = {
        materialtypeid: `\\x${record.materialtypeid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
        materialtype: record.materialtype,
        lang: record.lang
      };
      
      console.log(`Importing material type:`, materialTypeData);
      
      // Insert to materialtypes table
      const { error } = await supabase
        .from('materialtypes')
        .insert(materialTypeData);
      
      if (error) {
        console.error(`Error inserting material type:`, error);
        if (error.code === '23505') {
          skipped++;
          errorMessages.push(`Material type "${record.materialtype}": Already exists (skipped)`);
        } else {
          errors++;
          errorMessages.push(`Material type "${record.materialtype}": ${error.message}`);
        }
      } else {
        console.log(`Successfully imported material type: ${record.materialtype}`);
        success++;
      }
      
    } catch (error) {
      console.error(`Exception processing material type:`, error);
      errors++;
      errorMessages.push(`Material type "${record.materialtype}": ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  console.log(`Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
  
  return {
    success,
    errors,
    skipped,
    errorMessages
  };
};

export const parseMaterialTypesSQL = (sqlData: string): MySQLMaterialTypeRecord[] => {
  const records: MySQLMaterialTypeRecord[] = [];
  
  console.log('Parsing materialtypes SQL data...');
  
  // Extract INSERT statements for materialtypes table
  const insertMatch = sqlData.match(/INSERT INTO `materialtypes`.*?VALUES\s*(.*?)(?:;|\n\n|$)/s);
  
  if (!insertMatch) {
    console.warn('No materialtypes INSERT statement found in SQL data');
    return records;
  }
  
  const valuesSection = insertMatch[1];
  console.log('Found VALUES section:', valuesSection.substring(0, 200) + '...');
  
  // Parse individual value tuples for materialtypes format
  const tupleRegex = /\(\s*X'([^']+)',\s*'([^']+)',\s*'([^']+)'\s*\)/g;
  
  let match;
  while ((match = tupleRegex.exec(valuesSection)) !== null) {
    const [, materialtypeid, materialtype, lang] = match;
    
    records.push({
      materialtypeid: `X'${materialtypeid}'`,
      materialtype,
      lang
    });
  }
  
  console.log(`Parsed ${records.length} material type records from SQL data`);
  return records;
};
