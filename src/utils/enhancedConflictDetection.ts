
import { supabase } from "@/integrations/supabase/client";
import { ParsedRecord } from "@/types/import";
import { validateSignum } from './signumValidator';

export const detectAdvancedConflicts = async (record: ParsedRecord): Promise<string[]> => {
  const conflicts: string[] = [];
  
  if (!record.signum) {
    conflicts.push('Signum är obligatoriskt');
    return conflicts;
  }

  // Basic signum validation
  const signumValidation = validateSignum(record.signum);
  if (!signumValidation.isValid) {
    conflicts.push(`Ogiltigt signum format: ${signumValidation.reason}`);
  }

  try {
    // Check for exact signum match
    const { data: exactMatch } = await supabase
      .from('runic_inscriptions')
      .select('id, signum')
      .eq('signum', record.signum)
      .limit(1);

    if (exactMatch && exactMatch.length > 0) {
      conflicts.push(`Signum ${record.signum} finns redan i databasen`);
    }

    // Check for similar signa (fuzzy matching)
    const signumParts = record.signum.split(' ');
    if (signumParts.length >= 2) {
      const prefix = signumParts[0];
      const number = signumParts[1];
      
      const { data: similarSigna } = await supabase
        .from('runic_inscriptions')
        .select('signum')
        .ilike('signum', `${prefix}%${number}%`)
        .neq('signum', record.signum)
        .limit(5);

      if (similarSigna && similarSigna.length > 0) {
        const similarList = similarSigna.map(s => s.signum).join(', ');
        conflicts.push(`Liknande signum finns: ${similarList}`);
      }
    }

    // Validate location if provided
    if (record.location && record.location.trim().length < 3) {
      conflicts.push('Plats verkar vara för kort eller ofullständig');
    }

    // Check for missing critical data
    if (!record.transliteration || record.transliteration.trim().length === 0) {
      conflicts.push('Translitteration saknas - kan behöva manuell granskning');
    }

  } catch (error) {
    console.error('Error in advanced conflict detection:', error);
    conflicts.push('Kunde inte kontrollera konflikter mot databasen');
  }

  return conflicts;
};

export const isAdvancedConflict = (conflicts: string[]): boolean => {
  const criticalKeywords = ['finns redan', 'obligatoriskt', 'ogiltigt'];
  return conflicts.some(conflict => 
    criticalKeywords.some(keyword => 
      conflict.toLowerCase().includes(keyword)
    )
  );
};
