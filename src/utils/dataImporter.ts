
import { supabase } from "@/integrations/supabase/client";
import { ParsedRecord } from "@/types/import";
import { parseCoordinates } from "./importParser";
import { sanitizeTextInput, validateSQLSafety } from "./security/inputValidation";

export const importToMainTable = async (record: ParsedRecord): Promise<void> => {
  console.log(`importToMainTable: *** STARTING IMPORT *** for ${record.signum}`, record);
  
  try {
    // Validate and sanitize input data for security
    const signumValidation = validateSQLSafety(record.signum || '');
    if (!signumValidation.isValid) {
      throw new Error(`Invalid signum: ${signumValidation.reason}`);
    }
    
    const transliterationValidation = validateSQLSafety(record.transliteration || '');
    if (!transliterationValidation.isValid) {
      throw new Error(`Invalid transliteration: ${transliterationValidation.reason}`);
    }
    
    // Clean and prepare the data with security sanitization
    const cleanedRecord = {
      signum: sanitizeTextInput(record.signum?.trim() || ''),
      transliteration: sanitizeTextInput(record.transliteration?.trim() || 'Translitteration saknas'),
      translation_en: sanitizeTextInput(record.translation_en?.trim() || ''),
      location: sanitizeTextInput(record.location?.trim() || 'Plats okänd'),
      dating_text: sanitizeTextInput(record.dating_text?.trim() || ''),
      object_type: sanitizeTextInput(record.object_type?.trim() || ''),
      coordinates: record.coordinates ? parseCoordinates(record.coordinates) : null,
      data_source: sanitizeTextInput(record.source_database || 'imported'),
      created_at: new Date().toISOString()
    };

    console.log(`importToMainTable: Cleaned record for ${record.signum}:`, cleanedRecord);

    // Validate required fields
    if (!cleanedRecord.signum) {
      throw new Error('Signum is required but missing');
    }

    console.log(`importToMainTable: About to call Supabase insert for ${record.signum}`);

    // IMPORT LOGIC: Uses UPSERT to handle existing records gracefully
    // This prevents duplicate key errors and updates existing records if needed
    const { data, error } = await supabase
      .from('runic_inscriptions')
      .upsert([cleanedRecord], { 
        onConflict: 'signum',
        ignoreDuplicates: true 
      })
      .select();

    console.log(`importToMainTable: Supabase response for ${record.signum}:`, { data, error });

    if (error) {
      console.error(`importToMainTable: ❌ Database error for ${record.signum}:`, error);
      
      // Check if this is a duplicate signum error
      if (error.code === '23505' && error.message.includes('signum')) {
        throw new Error(`Signum ${record.signum} finns redan i databasen. Använd staging för att hantera konflikter.`);
      }
      
      throw new Error(`Database error: ${error.message} (Code: ${error.code || 'unknown'})`);
    }

    if (!data || data.length === 0) {
      console.error(`importToMainTable: ❌ No data returned after insert for ${record.signum}`);
      throw new Error('Insert appeared successful but no data returned');
    }

    console.log(`importToMainTable: ✅ Successfully inserted ${record.signum} with ID ${data[0].id}`);
    return;
  } catch (error) {
    console.error(`importToMainTable: ❌ Exception for ${record.signum}:`, error);
    throw error;
  }
};

export const importToStaging = async (record: ParsedRecord, conflictMessages: string[]): Promise<void> => {
  console.log(`importToStaging: *** STARTING STAGING IMPORT *** for ${record.signum}`, { record, conflictMessages });
  
  try {
    // Validate and sanitize input data for security
    const signumValidation = validateSQLSafety(record.signum || '');
    if (!signumValidation.isValid) {
      throw new Error(`Invalid signum: ${signumValidation.reason}`);
    }
    
    // Prepare staging record with security sanitization
    const stagingRecord = {
      original_signum: sanitizeTextInput(record.signum?.trim() || ''),
      source_database: sanitizeTextInput(record.source_database || 'imported'),
      transliteration: sanitizeTextInput(record.transliteration?.trim() || ''),
      translation_en: sanitizeTextInput(record.translation_en?.trim() || ''),
      location: sanitizeTextInput(record.location?.trim() || ''),
      coordinates: sanitizeTextInput(record.coordinates?.trim() || ''),
      dating_text: sanitizeTextInput(record.dating_text?.trim() || ''),
      object_type: sanitizeTextInput(record.object_type?.trim() || ''),
      conflict_reasons: conflictMessages.map(msg => sanitizeTextInput(msg)) || [],
      raw_data: JSON.parse(JSON.stringify(record)), // Convert ParsedRecord to Json
      status: 'pending' as const,
      created_at: new Date().toISOString()
    };

    console.log(`importToStaging: Prepared staging record for ${record.signum}:`, stagingRecord);

    // Validate required fields for staging
    if (!stagingRecord.original_signum) {
      throw new Error('Original signum is required but missing');
    }
    if (!stagingRecord.source_database) {
      throw new Error('Source database is required but missing');
    }

    console.log(`importToStaging: About to call Supabase insert for staging ${record.signum}`);

    // STAGING LOGIC: Always creates a new staging record for manual review
    // This allows administrators to decide how to handle conflicts
    const { data, error } = await supabase
      .from('staging_inscriptions')
      .insert(stagingRecord)
      .select();

    console.log(`importToStaging: Supabase staging response for ${record.signum}:`, { data, error });

    if (error) {
      console.error(`importToStaging: ❌ Database error for ${record.signum}:`, error);
      throw new Error(`Staging database error: ${error.message} (Code: ${error.code || 'unknown'})`);
    }

    if (!data || data.length === 0) {
      console.error(`importToStaging: ❌ No data returned after staging insert for ${record.signum}`);
      throw new Error('Staging insert appeared successful but no data was returned');
    }

    console.log(`importToStaging: ✅ Successfully inserted to staging ${record.signum} with ID ${data[0].id}`);
    return;
  } catch (error) {
    console.error(`importToStaging: ❌ Exception for ${record.signum}:`, error);
    throw error;
  }
};

// Generic import function that handles municipalities with UPSERT logic
export const importToMunicipalities = async (records: any[]): Promise<void> => {
  console.log(`importToMunicipalities: *** STARTING IMPORT *** with ${records.length} records`);
  
  if (!records || records.length === 0) {
    console.log(`importToMunicipalities: No records to import`);
    return;
  }

  try {
    // Use upsert to handle existing records gracefully
    const { data, error } = await supabase
      .from('municipalities')
      .upsert(records, { 
        onConflict: 'municipalityid',
        ignoreDuplicates: true 
      })
      .select();

    if (error) {
      console.error(`importToMunicipalities: ❌ Database error:`, error);
      throw new Error(`Database error for municipalities: ${error.message} (Code: ${error.code || 'unknown'})`);
    }

    console.log(`importToMunicipalities: ✅ Successfully imported ${records.length} records to municipalities`);
    return;
  } catch (error) {
    console.error(`importToMunicipalities: ❌ Exception:`, error);
    throw error;
  }
};

import { transformTableData } from './import/columnMapper';

// Universal import function for ANY Supabase table with smart conflict resolution
export const importToAnyTable = async (tableName: string, records: any[]): Promise<void> => {
  console.log(`importToAnyTable: *** STARTING IMPORT *** for table ${tableName} with ${records.length} records`);
  
  if (!records || records.length === 0) {
    console.log(`importToAnyTable: No records to import for ${tableName}`);
    return;
  }

  try {
    // Check if table should be skipped (marked as null in mapping)
    const { TABLE_COLUMN_MAPPINGS } = await import('./import/columnMapper');
    if (TABLE_COLUMN_MAPPINGS[tableName.toLowerCase()] === null) {
      console.log(`⏭️ Skipping table ${tableName} - not supported in Supabase schema`);
      return;
    }

    // Transform data to match Supabase schema
    const transformedRecords = transformTableData(tableName, records);
    
    // If transformedRecords is null, the table should be skipped
    if (transformedRecords === null) {
      console.log(`⏭️ Skipping table ${tableName} - transformation returned null`);
      return;
    }
    
    console.log(`importToAnyTable: Transformed ${transformedRecords.length} records for ${tableName}`);
    if (transformedRecords.length > 0) {
      console.log(`importToAnyTable: Sample transformed record:`, transformedRecords[0]);
    }
    // Define conflict keys for different tables
    const conflictKeys: { [key: string]: string } = {
      'municipalities': 'municipalityid',
      'counties': 'countyid', 
      'countries': 'countryid',
      'materialtypes': 'materialtypeid',
      'carver_source': 'carverinscriptionid,sourceid',
      'dating': 'datingid',
      'dating_source': 'dating_id,source_id',
      'findnumbers': 'objectid,findnumber',
      'sources': 'sourceid',
      'groups': 'groupid',
      'imagelinks': 'imagelinkid',
      'inscription_group': 'inscriptionid,groupid',
      'material_materialsubtype': 'materialid,subtypeid',
      'coordinates': 'object_id,coordinate_id',
      'cross_crossform': 'crossid,crossformid',
      'crossdescs': 'objectid',
      'crosses': 'objectid,cross_number',
      'crossforms': 'crossformid',
      'fragments': 'objectid,belongsto',
      'hundreds': 'external_id',
      'danish_parishes': 'external_id',
      'her_dk_notes': 'external_id',
      'translations': 'translationid',
      'uris': 'uriid',
      'reference_uri': 'reference_uri_id',
      'runic_inscriptions': 'signum'
    };

    const conflictKey = conflictKeys[tableName.toLowerCase()];
    
    if (conflictKey && !conflictKey.includes(',')) {
      console.log(`Using UPSERT with conflict key: ${conflictKey} for table ${tableName}`);
      
      // Use TypeScript-safe UPSERT for single-column conflicts
      const { error } = await (supabase as any)
        .from(tableName)
        .upsert(transformedRecords, { 
          onConflict: conflictKey,
          ignoreDuplicates: true 
        });

      if (error && error.code !== '23505') {
        console.error(`importToAnyTable: ❌ UPSERT failed for ${tableName}:`, error);
        throw new Error(`Database error for ${tableName}: ${error.message}`);
      } else if (error && error.code === '23505') {
        console.log(`Duplicate key handled gracefully for ${tableName}`);
      }
    } else {
      console.log(`Using regular insert with duplicate handling for ${tableName}`);
      
      // Try regular insert and handle duplicates gracefully
      const { error } = await (supabase as any)
        .from(tableName)
        .insert(transformedRecords);
        
      if (error && error.code === '23505') {
        console.log(`Duplicate key error for ${tableName} - records likely already exist, continuing...`);
      } else if (error) {
        throw new Error(`Database error for ${tableName}: ${error.message}`);
      }
    }

    console.log(`importToAnyTable: ✅ Successfully processed ${records.length} records for ${tableName}`);
    return;
  } catch (error) {
    console.error(`importToAnyTable: ❌ Exception for ${tableName}:`, error);
    throw error;
  }
};
