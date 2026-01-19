
import { ParsedRecord } from "@/types/import";
import { getCategoryMapping } from '../categoryMapper';

export const parseRecord = async (rawData: any, sourceDatabase: string): Promise<ParsedRecord> => {
  let record: ParsedRecord = {
    signum: '',
    transliteration: '',
    translation_en: '',
    location: '',
    dating_text: '',
    object_type: '',
    coordinates: '',
    source_database: sourceDatabase,
    raw_line: JSON.stringify(rawData)
  };

  if (sourceDatabase === 'Rundata') {
    record.signum = rawData.signum || '';
    record.transliteration = rawData.transliteration || '';
    record.translation_en = rawData.translation_en || '';
    record.location = rawData.location || '';
    record.dating_text = rawData.dating_text || '';
    
    const originalObjectType = rawData.object_type || '';
    const mappedCategory = await getCategoryMapping(originalObjectType);
    
    record.object_type = mappedCategory || originalObjectType;
    record.coordinates = rawData.coordinates || '';
  } else if (sourceDatabase === 'NIyR') {
    record.signum = rawData.signum || '';
    record.transliteration = rawData.transliteration || '';
    record.translation_en = rawData.translation_en || '';
    record.location = rawData.location || '';
    record.dating_text = rawData.dating_text || '';
    record.object_type = rawData.object_type || '';
    record.coordinates = rawData.coordinates || '';
  }

  return record;
};
