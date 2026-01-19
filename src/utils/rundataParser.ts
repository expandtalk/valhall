
import { parseImportData } from './importParser';
import { extractTablesFromSQL } from './rundata/sqlParser';
import { processTableRelationships, enrichInscriptionWithRelatedData } from './rundata/tableRelationshipProcessor';
import { ParsedRecord } from '@/types/import';

export const parseRundataSQL = async (sqlData: string): Promise<ParsedRecord[]> => {
  console.log('🎯 Enhanced Rundata SQL parser starting with multi-table support...');
  console.log(`📊 Processing ${sqlData.length} characters of SQL data`);
  
  try {
    // Extract all tables from SQL using enhanced parser
    const tables = extractTablesFromSQL(sqlData);
    console.log(`📋 Extracted ${tables.length} tables:`, tables.map(t => `${t.name} (${t.data.length} rows)`));
    
    if (tables.length === 0) {
      console.warn('⚠️ No tables found in SQL data');
      return [];
    }
    
    // Process table relationships to understand how they connect
    const relationships = processTableRelationships(tables);
    
    // Find the signa table which contains the inscription mappings
    const signaTable = relationships.signaTable;
    
    if (!signaTable || signaTable.data.length === 0) {
      console.warn('⚠️ No signa table found or signa table is empty');
      console.log('Available tables:', tables.map(t => t.name));
      return [];
    }
    
    console.log(`✅ Found signa table with ${signaTable.data.length} rows`);
    console.log('Sample signa data:', signaTable.data.slice(0, 3));
    
    // Convert signa table data to ParsedRecord format with enrichment
    const records: ParsedRecord[] = [];
    
    for (const signaRow of signaTable.data) {
      // First enrich the signa record with data from related tables
      const enrichedData = await enrichInscriptionWithRelatedData(signaRow, relationships);
      
      console.log(`🔄 Converting enriched signa row: ${enrichedData.signum}`);
      
      const record: ParsedRecord = {
        signum: enrichedData.signum || '',
        transliteration: enrichedData.transliteration || '', 
        location: enrichedData.location || enrichedData.parish || enrichedData.fofmparish || '', 
        translation_en: enrichedData.translation_en || '',
        dating_text: enrichedData.dating_text || '',
        coordinates: enrichedData.coordinates || '',
        object_type: enrichedData.object_type || '',
        source_database: 'Rundata',
        raw_line: JSON.stringify(enrichedData)
      };
      
      records.push(record);
    }
    
    console.log(`✅ Converted ${records.length} enriched signa entries to ParsedRecord format`);
    
    // Additional validation and cleanup
    const validRecords = records.filter(record => {
      if (!record.signum || record.signum.length < 2) {
        console.log(`⚠️ Skipping invalid signum: ${record.signum}`);
        return false;
      }
      return true;
    });
    
    console.log(`🎯 Enhanced Rundata parsing completed: ${validRecords.length} valid records`);
    return validRecords;
    
  } catch (error) {
    console.error('❌ Error parsing Rundata SQL:', error);
    return [];
  }
};
