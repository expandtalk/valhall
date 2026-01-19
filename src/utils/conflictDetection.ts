
import { supabase } from "@/integrations/supabase/client";
import { ParsedRecord } from "@/types/import";

export const detectConflicts = async (record: ParsedRecord): Promise<string[]> => {
  const conflicts: string[] = [];

  try {
    // Check for signum conflicts
    const { data: existingSignum } = await supabase
      .from('runic_inscriptions')
      .select('id, signum, location')
      .eq('signum', record.signum)
      .maybeSingle();

    if (existingSignum) {
      conflicts.push('signum_conflict');
    }

    // Check GPS validity
    if (record.coordinates) {
      const coords = record.coordinates.split(',');
      if (coords.length !== 2 || isNaN(parseFloat(coords[0])) || isNaN(parseFloat(coords[1]))) {
        conflicts.push('gps_uncertainty');
      } else {
        const lat = parseFloat(coords[0]);
        const lng = parseFloat(coords[1]);
        // Basic coordinate range validation for Nordic region
        if (lat < 55 || lat > 71 || lng < 4 || lng > 31) {
          conflicts.push('gps_out_of_range');
        }
      }
    }

    // Check dating vagueness
    if (record.dating_text && (
      record.dating_text.includes('?') || 
      record.dating_text.includes('möjligen') ||
      record.dating_text.includes('possibly') ||
      record.dating_text.includes('osäker') ||
      record.dating_text.includes('uncertain')
    )) {
      conflicts.push('dating_vague');
    }

    // Check for potential duplicates based on location similarity
    if (record.location && record.location.length > 5) {
      const locationParts = record.location.split(',')[0].trim(); // Take first part before comma
      const { data: similarLocations } = await supabase
        .from('runic_inscriptions')
        .select('id, signum, location')
        .ilike('location', `%${locationParts}%`)
        .neq('signum', record.signum) // Exclude the current record
        .limit(3);

      if (similarLocations && similarLocations.length > 0) {
        conflicts.push('location_similarity');
      }
    }

    // Check for empty critical fields
    if (!record.transliteration || record.transliteration.trim().length < 3) {
      conflicts.push('missing_transliteration');
    }

    if (!record.location || record.location.trim().length < 3) {
      conflicts.push('missing_location');
    }

  } catch (error) {
    console.error('Error detecting conflicts:', error);
    conflicts.push('detection_error');
  }

  return conflicts;
};

export const isSimpleConflict = (conflicts: string[]): boolean => {
  // Define what constitutes "simple" conflicts that can be auto-resolved
  const simpleConflicts = ['gps_uncertainty', 'dating_vague'];
  return conflicts.length === 1 && simpleConflicts.includes(conflicts[0]);
};

export const getConflictDescription = (conflict: string): string => {
  const descriptions: Record<string, string> = {
    'signum_conflict': 'Signum finns redan i databasen',
    'gps_uncertainty': 'GPS-koordinater är ogiltiga eller felformaterade',
    'gps_out_of_range': 'GPS-koordinater ligger utanför Nordic region',
    'dating_vague': 'Datering innehåller osäkerhetsmarkörer',
    'location_similarity': 'Liknande plats finns redan i databasen',
    'missing_transliteration': 'Translitteration saknas eller är för kort',
    'missing_location': 'Plats saknas eller är för kort',
    'detection_error': 'Fel vid konfliktdetektering'
  };
  
  return descriptions[conflict] || conflict;
};
