
import { RundataTable, TableRelationships } from './types';
import { getLanguageNameSv } from '../languageUtils';

export const processTableRelationships = (tables: RundataTable[]): TableRelationships => {
  console.log('🔗 Processing table relationships...');
  
  const relationships: TableRelationships = {};
  
  // Identifiera tabeller baserat på namn och kolumner
  for (const table of tables) {
    const tableName = table.name.toLowerCase();
    
    if (tableName.includes('signa')) {
      relationships.signaTable = table;
      console.log(`📋 Found signa table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('inscriptions')) {
      relationships.inscriptionsTable = table;
      console.log(`📋 Found inscriptions table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('objects')) {
      relationships.objectsTable = table;
      console.log(`📋 Found objects table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('places')) {
      relationships.placesTable = table;
      console.log(`📋 Found places table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('readings')) {
      relationships.readingsTable = table;
      console.log(`📋 Found readings table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('coordinates')) {
      relationships.coordinatesTable = table;
      console.log(`📋 Found coordinates table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('translations')) {
      relationships.translationsTable = table;
      console.log(`📋 Found translations table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('periods')) {
      relationships.periodsTable = table;
      console.log(`📋 Found periods table: ${table.name} with ${table.data.length} rows`);
    } else if (tableName.includes('interpretations')) {
      relationships.interpretationsTable = table;
      console.log(`📋 Found interpretations table: ${table.name} with ${table.data.length} rows`);
    }
  }
  
  console.log(`🔗 Processed relationships for ${Object.keys(relationships).length} table types`);
  return relationships;
};

export const enrichInscriptionWithRelatedData = async (signaRow: any, relationships: TableRelationships): Promise<any> => {
  console.log(`🔍 Enriching signa row for: ${signaRow.signum || signaRow.signum1}`);
  
  let enrichedData = { ...signaRow };
  
  // Extrahera grundläggande signum information
  enrichedData.signum = signaRow.signum || signaRow.signum1 || signaRow.signum2 || '';
  
  // Berika med data från interpretations tabellen om den finns
  if (relationships.interpretationsTable && signaRow.signumid) {
    const interpretations = relationships.interpretationsTable.data.filter(
      (interpretation: any) => interpretation.signumid === signaRow.signumid
    );
    
    if (interpretations.length > 0) {
      console.log(`📖 Found ${interpretations.length} interpretations for ${enrichedData.signum}`);
      
      // Samla translitterationer från interpretations
      const transliterations = interpretations
        .map((interp: any) => interp.transliteration)
        .filter((trans: string) => trans && trans.trim())
        .join(' | ');
      
      if (transliterations) {
        enrichedData.transliteration = transliterations;
      }
      
      // Berika med språkinformation om tillgängligt
      for (const interpretation of interpretations) {
        if (interpretation.language) {
          try {
            const languageName = await getLanguageNameSv(interpretation.language);
            enrichedData.language = languageName;
            enrichedData.language_code = interpretation.language;
            console.log(`🌐 Language enriched: ${interpretation.language} -> ${languageName}`);
            break; // Använd första språket vi hittar
          } catch (error) {
            console.warn(`⚠️ Could not resolve language ${interpretation.language}:`, error);
          }
        }
      }
      
      // Samla andra användbara fält från interpretations
      const contents = interpretations
        .map((interp: any) => interp.content)
        .filter((content: string) => content && content.trim())
        .join(' | ');
      
      if (contents) {
        enrichedData.interpretation_content = contents;
      }
    }
  }
  
  // Berika med objektinformation om objects tabellen finns
  if (relationships.objectsTable && signaRow.signumid) {
    const objects = relationships.objectsTable.data.filter(
      (obj: any) => obj.signumid === signaRow.signumid
    );
    
    if (objects.length > 0) {
      const primaryObject = objects[0];
      enrichedData.object_type = primaryObject.object_type || primaryObject.objekttyp || '';
      enrichedData.material = primaryObject.material || '';
      console.log(`🏺 Object data enriched: ${enrichedData.object_type}`);
    }
  }
  
  // Berika med platsinformation om places tabellen finns
  if (relationships.placesTable && signaRow.signumid) {
    const places = relationships.placesTable.data.filter(
      (place: any) => place.signumid === signaRow.signumid
    );
    
    if (places.length > 0) {
      const primaryPlace = places[0];
      enrichedData.location = primaryPlace.location || primaryPlace.parish || primaryPlace.socken || '';
      enrichedData.parish = primaryPlace.parish || primaryPlace.socken || '';
      enrichedData.fofmparish = primaryPlace.fofmparish || '';
      console.log(`📍 Place data enriched: ${enrichedData.location}`);
    }
  }
  
  // Berika med koordinater om coordinates tabellen finns
  if (relationships.coordinatesTable && signaRow.signumid) {
    const coordinates = relationships.coordinatesTable.data.filter(
      (coord: any) => coord.signumid === signaRow.signumid
    );
    
    if (coordinates.length > 0) {
      const primaryCoord = coordinates[0];
      if (primaryCoord.lat && primaryCoord.lng) {
        enrichedData.coordinates = `${primaryCoord.lat},${primaryCoord.lng}`;
        console.log(`🗺️ Coordinates enriched: ${enrichedData.coordinates}`);
      }
    }
  }
  
  // Berika med översättningar om translations tabellen finns
  if (relationships.translationsTable && signaRow.signumid) {
    const translations = relationships.translationsTable.data.filter(
      (trans: any) => trans.signumid === signaRow.signumid
    );
    
    if (translations.length > 0) {
      const englishTranslation = translations.find((trans: any) => 
        trans.language === 'en-gb' || trans.language === 'en'
      );
      const swedishTranslation = translations.find((trans: any) => 
        trans.language === 'sv-se' || trans.language === 'sv'
      );
      
      if (englishTranslation) {
        enrichedData.translation_en = englishTranslation.translation || englishTranslation.text || '';
      }
      if (swedishTranslation) {
        enrichedData.translation_sv = swedishTranslation.translation || swedishTranslation.text || '';
      }
      
      console.log(`🔤 Translations enriched: EN=${!!enrichedData.translation_en}, SV=${!!enrichedData.translation_sv}`);
    }
  }
  
  // Berika med datering om periods tabellen finns
  if (relationships.periodsTable && signaRow.signumid) {
    const periods = relationships.periodsTable.data.filter(
      (period: any) => period.signumid === signaRow.signumid
    );
    
    if (periods.length > 0) {
      const primaryPeriod = periods[0];
      enrichedData.dating_text = primaryPeriod.dating || primaryPeriod.period || '';
      enrichedData.period_start = primaryPeriod.start_year || primaryPeriod.from_year;
      enrichedData.period_end = primaryPeriod.end_year || primaryPeriod.to_year;
      console.log(`📅 Dating enriched: ${enrichedData.dating_text}`);
    }
  }
  
  console.log(`✅ Enrichment completed for ${enrichedData.signum} with ${Object.keys(enrichedData).length} fields`);
  return enrichedData;
};
