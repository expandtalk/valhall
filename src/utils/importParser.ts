import { ParsedRecord } from "@/types/import";
import { parseTSVData } from "./import/tsvParser";
import { parseRundataSQL } from './rundataParser';
import { parseCarverInscriptionSQL, importCarverInscriptions } from './import/carverInscriptionImporter';
import { parseCarverSourceSQL, importCarverSources } from './import/carverSourceImporter';
import { parseMaterialTypesSQL, importMaterialTypes } from './import/materialTypesImporter';
import { parseMunicipalitiesSQL, importMunicipalities } from './import/municipalitiesImporter';
import { parseCoordinatesSQL, importCoordinates } from './import/coordinatesImporter';
import { parseImageLinksSQL, importImageLinks } from './import/imagelinksImporter';
import { parseInscriptionGroupSQL, importInscriptionGroups } from './import/inscriptionGroupImporter';
import { parseMaterialMaterialSubtypeSQL, importMaterialMaterialSubtypes } from './import/materialMaterialSubtypeImporter';
import { parseReadingSourceSQL, importReadingSources } from './import/readingSourceImporter';
import { parseReadingsSQL, importReadings } from './import/readingsImporter';

export const parseImportData = async (importData: string, sourceDatabase: string, testMode: boolean = false): Promise<ParsedRecord[]> => {
  console.log(`🚀 Starting parseImportData with testMode: ${testMode}, source: ${sourceDatabase}`);
  
  const lines = importData.split('\n').filter(line => line.trim());
  const lineCount = lines.length;
  
  if (testMode && lineCount > 1000) {
    console.log(`🧪 Test mode: processing up to 1000 lines out of ${lineCount} total to capture full database structure`);
  }

  // UNIVERSAL SQL TABLE IMPORT - handles ALL table types with UPSERT logic
  const hasMultipleInsertStatements = (importData.match(/INSERT INTO [`']?\w+[`']?/gi) || []).length > 1;
  
  if (hasMultipleInsertStatements && sourceDatabase === 'rundata') {
    console.log('🎯 Detected multi-table SQL data - using universal table import with UPSERT logic');
    
    try {
      // Extract all tables from the SQL using the existing parser
      const { extractTablesFromSQL } = await import('./rundata/sqlParser');
      const { importToAnyTable } = await import('./dataImporter');
      
      const tables = extractTablesFromSQL(importData);
      console.log(`✅ Extracted ${tables.length} tables from SQL:`, tables.map(t => `${t.name} (${t.data.length} rows)`));
      
      let totalImported = 0;
      let totalErrors = 0;
      
      for (const table of tables) {
        if (table.data.length === 0) {
          console.log(`⏭️ Skipping empty table: ${table.name}`);
          continue;
        }
        
        console.log(`📥 Importing ${table.data.length} records to table: ${table.name}`);
        
        try {
          await importToAnyTable(table.name, table.data);
          totalImported += table.data.length;
          console.log(`✅ Successfully imported ${table.data.length} records to ${table.name}`);
        } catch (error) {
          console.error(`❌ Error importing to ${table.name}:`, error);
          totalErrors++;
        }
      }
      
      console.log(`🎯 Universal import completed: ${totalImported} total records imported across ${tables.length} tables, ${totalErrors} table errors`);
      
      // Return empty array since universal import already processed everything directly
      return [];
    } catch (error) {
      console.error('❌ Error in universal table import:', error);
      // Fall through to normal processing if universal import fails
    }
  }

  // Check for municipalities data first and handle it specially
  const hasMunicipalitiesInsert = importData.includes('INSERT INTO `municipalities`');
  const hasMunicipalitiesValues = importData.includes('municipalityid') && 
                                 importData.includes('municipality') &&
                                 importData.includes('X\'');
  
  if (hasMunicipalitiesInsert && hasMunicipalitiesValues) {
    console.log('🎯 Detected municipalities data - importing directly to municipalities table');
    
    try {
      const municipalitiesRecords = parseMunicipalitiesSQL(importData);
      console.log(`✅ Parsed ${municipalitiesRecords.length} municipalities records`);
      
      // Import directly to municipalities table
      const importResult = await importMunicipalities(municipalitiesRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      // Return empty array since we've already processed the data
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing municipalities data:', error);
      return [];
    }
  }

  // Check for materialtypes data first and handle it specially
  const hasMaterialTypesInsert = importData.includes('INSERT INTO `materialtypes`');
  const hasMaterialTypesValues = importData.includes('materialtypeid') && 
                                 importData.includes('materialtype') &&
                                 importData.includes('X\'');
  
  if (hasMaterialTypesInsert && hasMaterialTypesValues) {
    console.log('🎯 Detected materialtypes data - importing directly to materialtypes table');
    
    try {
      const materialTypesRecords = parseMaterialTypesSQL(importData);
      console.log(`✅ Parsed ${materialTypesRecords.length} materialtypes records`);
      
      // Import directly to materialtypes table
      const importResult = await importMaterialTypes(materialTypesRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      // Return empty array since we've already processed the data
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing materialtypes data:', error);
      return [];
    }
  }

  // Check for carver-source data first and handle it specially
  const hasCarverSourceInsert = importData.includes('INSERT INTO `carver_source`');
  const hasCarverSourceValues = importData.includes('carverinscriptionid') && 
                                importData.includes('sourceid') &&
                                importData.includes('X\'');
  
  if (hasCarverSourceInsert && hasCarverSourceValues) {
    console.log('🎯 Detected carver-source data - importing directly to carver_source table');
    
    try {
      const carverSourceRecords = parseCarverSourceSQL(importData);
      console.log(`✅ Parsed ${carverSourceRecords.length} carver-source records`);
      
      // Import directly to carver_source table
      const importResult = await importCarverSources(carverSourceRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      // Return empty array since we've already processed the data
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing carver-source data:', error);
      return [];
    }
  }

  // Check for carver-inscription data and handle it specially
  const hasCarverInscriptionInsert = importData.includes('INSERT INTO `carver_inscription`');
  const hasCarverInscriptionValues = importData.includes('carverinscriptionid') || 
                                    (importData.includes('X\'') && importData.includes('attributed'));
  
  if (hasCarverInscriptionInsert && hasCarverInscriptionValues) {
    console.log('🎯 Detected carver-inscription data - importing directly to carver_inscription table');
    
    try {
      const carverInscriptionRecords = parseCarverInscriptionSQL(importData);
      console.log(`✅ Parsed ${carverInscriptionRecords.length} carver-inscription records`);
      
      // Import directly to carver_inscription table instead of creating ParsedRecords
      const importResult = await importCarverInscriptions(carverInscriptionRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      // Return empty array since we've already processed the data
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing carver-inscription data:', error);
      return [];
    }
  }

  // Check for coordinates data
  const hasCoordinatesInsert = importData.includes('INSERT INTO `coordinates`');
  const hasCoordinatesValues = importData.includes('coordinateid') && importData.includes('X\'');
  
  if (hasCoordinatesInsert && hasCoordinatesValues) {
    console.log('🎯 Detected coordinates data - importing directly to coordinates table');
    
    try {
      const coordinatesRecords = parseCoordinatesSQL(importData);
      console.log(`✅ Parsed ${coordinatesRecords.length} coordinates records`);
      
      const importResult = await importCoordinates(coordinatesRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.updated} updated`);
      
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing coordinates data:', error);
      return [];
    }
  }

  // Check for imagelinks data
  const hasImageLinksInsert = importData.includes('INSERT INTO `imagelinks`');
  const hasImageLinksValues = importData.includes('imagelinkid') && importData.includes('X\'');
  
  if (hasImageLinksInsert && hasImageLinksValues) {
    console.log('🎯 Detected imagelinks data - importing directly to imagelinks table');
    
    try {
      const imageLinksRecords = parseImageLinksSQL(importData);
      console.log(`✅ Parsed ${imageLinksRecords.length} imagelinks records`);
      
      const importResult = await importImageLinks(imageLinksRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing imagelinks data:', error);
      return [];
    }
  }

  // Check for inscription_group data
  const hasInscriptionGroupInsert = importData.includes('INSERT INTO `inscription_group`');
  const hasInscriptionGroupValues = importData.includes('inscriptionid') && importData.includes('groupid') && importData.includes('X\'');
  
  if (hasInscriptionGroupInsert && hasInscriptionGroupValues) {
    console.log('🎯 Detected inscription_group data - importing directly to inscription_group table');
    
    try {
      const inscriptionGroupRecords = parseInscriptionGroupSQL(importData);
      console.log(`✅ Parsed ${inscriptionGroupRecords.length} inscription_group records`);
      
      const importResult = await importInscriptionGroups(inscriptionGroupRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing inscription_group data:', error);
      return [];
    }
  }

  // Check for material_materialsubtype data
  const hasMaterialMaterialSubtypeInsert = importData.includes('INSERT INTO `material_materialsubtype`');
  const hasMaterialMaterialSubtypeValues = importData.includes('materialid') && importData.includes('subtypeid') && importData.includes('X\'');
  
  if (hasMaterialMaterialSubtypeInsert && hasMaterialMaterialSubtypeValues) {
    console.log('🎯 Detected material_materialsubtype data - importing directly to material_materialsubtype table');
    
    try {
      const materialMaterialSubtypeRecords = parseMaterialMaterialSubtypeSQL(importData);
      console.log(`✅ Parsed ${materialMaterialSubtypeRecords.length} material_materialsubtype records`);
      
      const importResult = await importMaterialMaterialSubtypes(materialMaterialSubtypeRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing material_materialsubtype data:', error);
      return [];
    }
  }

  // Check for reading_source data
  const hasReadingSourceInsert = importData.includes('INSERT INTO `reading_source`');
  const hasReadingSourceValues = importData.includes('readingid') && importData.includes('sourceid') && importData.includes('X\'');
  
  if (hasReadingSourceInsert && hasReadingSourceValues) {
    console.log('🎯 Detected reading_source data - importing directly to reading_source table');
    
    try {
      const readingSourceRecords = parseReadingSourceSQL(importData);
      console.log(`✅ Parsed ${readingSourceRecords.length} reading_source records`);
      
      const importResult = await importReadingSources(readingSourceRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing reading_source data:', error);
      return [];
    }
  }

  // Check for readings data
  const hasReadingsInsert = importData.includes('INSERT INTO `readings`');
  const hasReadingsValues = importData.includes('readingid') && importData.includes('inscriptionid') && importData.includes('X\'');
  
  if (hasReadingsInsert && hasReadingsValues) {
    console.log('🎯 Detected readings data - importing directly to readings table');
    
    try {
      const readingsRecords = parseReadingsSQL(importData);
      console.log(`✅ Parsed ${readingsRecords.length} readings records`);
      
      const importResult = await importReadings(readingsRecords);
      console.log(`✅ Direct import completed: ${importResult.success} imported, ${importResult.errors} errors, ${importResult.skipped} skipped`);
      
      return [];
    } catch (error) {
      console.error('❌ Error parsing and importing readings data:', error);
      return [];
    }
  }

  // Detect Rundata format
  const hasSignaTable = importData.includes('CREATE TABLE') && importData.includes('signa');
  const hasSignaInsert = importData.includes('INSERT INTO `signa`');
  const hasBinaryUUID = importData.includes('X\'') && importData.includes('signumid');
  const hasObjectsTable = importData.includes('CREATE TABLE `objects`') || importData.includes('CREATE TABLE objects');
  const hasObjectsInsert = importData.includes('INSERT INTO `objects`');
  const hasDanishInscriptions = importData.includes('DR') || importData.includes('AUD') || importData.includes('her_DK');
  const hasInterpretationsTable = importData.includes('interpretations') || importData.includes('teitext');
  const hasComplexXMLContent = importData.includes('<tei:') || importData.includes('<w>') || importData.includes('xml:lang');

  const rundataIndicators = [
    hasSignaTable,
    hasSignaInsert, 
    hasBinaryUUID,
    hasDanishInscriptions,
    hasInterpretationsTable,
    hasComplexXMLContent,
    hasObjectsTable,
    hasObjectsInsert
  ].filter(Boolean).length;

  console.log(`🔍 Rundata detection - hasSignaTable: ${hasSignaTable}, hasSignaInsert: ${hasSignaInsert}, hasBinaryUUID: ${hasBinaryUUID}, hasDanishInscriptions: ${hasDanishInscriptions}, hasInterpretationsTable: ${hasInterpretationsTable}, hasComplexXMLContent: ${hasComplexXMLContent}, hasObjectsTable: ${hasObjectsTable}, hasObjectsInsert: ${hasObjectsInsert}`);
  console.log(`🔍 Found ${rundataIndicators} Rundata indicators`);

  if (rundataIndicators >= 2 || hasObjectsTable || hasObjectsInsert) {
    console.log('🎯 Detected Rundata SQL format - using enhanced SQL parser');
    
    try {
      const parsedRecords = await parseRundataSQL(importData);
      console.log(`✅ Enhanced Rundata parsing completed: ${parsedRecords.length} records`);
      return parsedRecords;
    } catch (error) {
      console.error('❌ Error parsing Rundata SQL:', error);
      return [];
    }
  }

  // TSV parsing logic
  console.log('🔍 Attempting to parse as TSV format');
  let parsedRecords: ParsedRecord[] = [];

  try {
    const parsedTSVRecords = await parseTSVData(lines, sourceDatabase, testMode);
    parsedRecords = parsedTSVRecords;
  } catch (error) {
    console.error('❌ TSV parsing failed:', error);
    return [];
  }

  console.log(`✅ parseImportData completed: ${parsedRecords.length} records found`);
  return parsedRecords;
};

export const parseCoordinates = (coordinates: string | undefined): { lat: number, lng: number } | null => {
  if (!coordinates) return null;

  const [latStr, lngStr] = coordinates.split(',').map(s => s.trim());

  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng)) {
    console.warn(`Invalid coordinates format: ${coordinates}`);
    return null;
  }

  return { lat, lng };
};
