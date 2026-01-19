
import { ParsedRecord } from "@/types/import";
import { RundataTable, TableRelationships } from './types';
import { extractSignumFromSignaTable, lookupSignumByUUID } from './signumExtractor';

export const processInscriptions = (relationships: TableRelationships): ParsedRecord[] => {
  const records: ParsedRecord[] = [];
  
  console.log('🚀 Starting processInscriptions with binary UUID relationships');
  
  if (!relationships.signaTable || !relationships.signaTable.data.length) {
    console.log('❌ No signa table found or empty - cannot process inscriptions');
    return records;
  }
  
  console.log(`📊 Processing ${relationships.signaTable.data.length} signa entries`);
  
  // Extract signum mappings from the signa table
  const signumMap = extractSignumFromSignaTable(relationships.signaTable);
  console.log(`🗺️ Created signum map with ${signumMap.size} entries`);
  
  // Process each signa entry to create inscription records
  for (const signaRow of relationships.signaTable.data) {
    try {
      const signum1 = signaRow.signum1?.trim();
      const signum2 = signaRow.signum2?.trim();
      
      if (!signum1 || !signum2) {
        console.warn('⚠️ Skipping signa row with missing signum parts:', signaRow);
        continue;
      }
      
      const fullSignum = `${signum1} ${signum2}`;
      
      // Create a basic inscription record from signa data
      const record: ParsedRecord = {
        signum: fullSignum,
        transliteration: '', // Will be filled from readings table if available
        location: '', // Will be filled from places table if available
        translation_en: '', // Will be filled from translations table if available
        dating_text: '', // Will be filled from periods table if available
        coordinates: '', // Will be filled from coordinates table if available
        object_type: '', // Will be filled from objects table if available
        source_database: 'Rundata',
        raw_line: JSON.stringify(signaRow)
      };
      
      // Enhanced location detection for all countries including Denmark
      if (signum1 === 'DR') {
        record.location = 'Danmark';
        record.coordinates = '55.6761,12.5683'; // Default to Copenhagen area
      } else if (signum1 === 'N') {
        record.location = 'Norge';
        record.coordinates = '59.9139,10.7522'; // Default to Oslo area
      } else if (signum1 === 'E') {
        record.location = 'Estonia';
        record.coordinates = '58.5953,25.0136'; // Default to Estonia
      } else if (signum1 === 'IR') {
        record.location = 'Ireland';
        record.coordinates = '53.1424,-7.6921'; // Default to Ireland
      } else if (signum1 === 'Sc') {
        record.location = 'Scotland';
        record.coordinates = '56.4907,-4.2026'; // Default to Scotland
      } else {
        // Default to Sweden for other prefixes
        record.location = 'Sverige';
        record.coordinates = '59.3293,18.0686'; // Default to Stockholm
      }
      
      // Try to enrich with data from other tables
      if (relationships.inscriptionsTable && relationships.inscriptionsTable.data.length > 0) {
        const matchingInscription = findMatchingInscription(relationships.inscriptionsTable, signaRow.signumid);
        if (matchingInscription) {
          record.transliteration = matchingInscription.transliteration || record.transliteration;
          record.location = matchingInscription.location || record.location;
          record.translation_en = matchingInscription.translation_en || record.translation_en;
          record.dating_text = matchingInscription.dating_text || record.dating_text;
          record.object_type = matchingInscription.object_type || record.object_type;
        }
      }
      
      // Try to get coordinates from coordinates table
      if (relationships.coordinatesTable && relationships.coordinatesTable.data.length > 0) {
        const coords = findMatchingCoordinates(relationships.coordinatesTable, signaRow.signumid);
        if (coords) {
          record.coordinates = coords;
        }
      }
      
      // Try to get readings/transliteration from readings table
      if (relationships.readingsTable && relationships.readingsTable.data.length > 0) {
        const reading = findMatchingReading(relationships.readingsTable, signaRow.signumid);
        if (reading) {
          record.transliteration = reading.transliteration || record.transliteration;
        }
      }
      
      // Try to get translations from translations table
      if (relationships.translationsTable && relationships.translationsTable.data.length > 0) {
        const translation = findMatchingTranslation(relationships.translationsTable, signaRow.signumid);
        if (translation) {
          record.translation_en = translation.translation_en || record.translation_en;
        }
      }
      
      // Try to get dating info from periods table
      if (relationships.periodsTable && relationships.periodsTable.data.length > 0) {
        const period = findMatchingPeriod(relationships.periodsTable, signaRow.signumid);
        if (period) {
          record.dating_text = period.dating_text || record.dating_text;
        }
      }
      
      records.push(record);
      
      if (records.length % 100 === 0) {
        console.log(`📊 Processed ${records.length} inscription records so far`);
      }
      
    } catch (error) {
      console.error('❌ Error processing signa row:', error, signaRow);
    }
  }
  
  console.log(`✅ Successfully processed ${records.length} inscription records from Rundata`);
  return records;
};

export const processFallbackData = (tables: RundataTable[], existingRecords: ParsedRecord[]): ParsedRecord[] => {
  console.log('🔄 Starting fallback data processing...');
  
  // If we already have records from the main processing, return them
  if (existingRecords.length > 0) {
    console.log(`✅ Using ${existingRecords.length} records from main processing`);
    return existingRecords;
  }
  
  const fallbackRecords: ParsedRecord[] = [];
  
  // Look for any table that might contain inscription data
  for (const table of tables) {
    if (!table.data || table.data.length === 0) continue;
    
    console.log(`🔍 Checking table ${table.name} for fallback data (${table.data.length} rows)`);
    
    // Check if this table has columns that look like inscription data
    const hasSignum = table.columns.some(col => col.toLowerCase().includes('signum'));
    const hasText = table.columns.some(col => 
      col.toLowerCase().includes('text') || 
      col.toLowerCase().includes('transliteration') ||
      col.toLowerCase().includes('translation')
    );
    
    if (hasSignum || hasText) {
      console.log(`📋 Table ${table.name} appears to contain inscription data`);
      
      for (const row of table.data.slice(0, 10)) { // Limit to first 10 for fallback
        try {
          const record: ParsedRecord = {
            signum: extractSignumFromRow(row) || `Unknown_${Math.random().toString(36).substr(2, 9)}`,
            transliteration: extractTextFromRow(row, 'transliteration') || '',
            location: extractTextFromRow(row, 'location') || '',
            translation_en: extractTextFromRow(row, 'translation') || '',
            dating_text: extractTextFromRow(row, 'dating') || '',
            coordinates: extractTextFromRow(row, 'coordinates') || '',
            object_type: extractTextFromRow(row, 'object') || '',
            source_database: 'Rundata',
            raw_line: JSON.stringify(row)
          };
          
          fallbackRecords.push(record);
        } catch (error) {
          console.warn('⚠️ Error processing fallback row:', error);
        }
      }
    }
  }
  
  console.log(`🔄 Fallback processing found ${fallbackRecords.length} additional records`);
  return fallbackRecords;
};

// Helper functions for matching records across tables
const findMatchingInscription = (inscriptionsTable: RundataTable, signumId: string): any => {
  return inscriptionsTable.data.find(row => 
    row.signumid === signumId || 
    row.id === signumId ||
    (typeof row.signumid === 'string' && row.signumid.includes(signumId))
  );
};

const findMatchingCoordinates = (coordinatesTable: RundataTable, signumId: string): string | null => {
  const coordRow = coordinatesTable.data.find(row => 
    row.signumid === signumId || 
    row.inscription_id === signumId ||
    (typeof row.signumid === 'string' && row.signumid.includes(signumId))
  );
  
  if (coordRow && coordRow.latitude && coordRow.longitude) {
    return `${coordRow.latitude},${coordRow.longitude}`;
  }
  
  return null;
};

const findMatchingReading = (readingsTable: RundataTable, signumId: string): any => {
  return readingsTable.data.find(row => 
    row.signumid === signumId || 
    row.inscription_id === signumId ||
    (typeof row.signumid === 'string' && row.signumid.includes(signumId))
  );
};

const findMatchingTranslation = (translationsTable: RundataTable, signumId: string): any => {
  return translationsTable.data.find(row => 
    row.signumid === signumId || 
    row.inscription_id === signumId ||
    (typeof row.signumid === 'string' && row.signumid.includes(signumId))
  );
};

const findMatchingPeriod = (periodsTable: RundataTable, signumId: string): any => {
  return periodsTable.data.find(row => 
    row.signumid === signumId || 
    row.inscription_id === signumId ||
    (typeof row.signumid === 'string' && row.signumid.includes(signumId))
  );
};

// Helper functions for fallback processing
const extractSignumFromRow = (row: any): string | null => {
  const signumFields = ['signum', 'signum1', 'signum2', 'name', 'id'];
  
  for (const field of signumFields) {
    if (row[field] && typeof row[field] === 'string') {
      return row[field].trim();
    }
  }
  
  return null;
};

const extractTextFromRow = (row: any, type: string): string => {
  const fieldMappings = {
    transliteration: ['transliteration', 'text', 'runic_text'],
    location: ['location', 'place', 'site', 'parish'],
    translation: ['translation', 'translation_en', 'meaning'],
    dating: ['dating', 'period', 'date'],
    coordinates: ['coordinates', 'lat', 'lng', 'latitude', 'longitude'],
    object: ['object_type', 'type', 'material']
  };
  
  const fields = fieldMappings[type] || [type];
  
  for (const field of fields) {
    if (row[field] && typeof row[field] === 'string') {
      return row[field].trim();
    }
  }
  
  return '';
};
