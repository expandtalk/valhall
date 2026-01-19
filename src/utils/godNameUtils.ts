
export interface GodNameMatch {
  placeName: string;
  godName: string;
  matchType: 'exact' | 'variant' | 'compound';
  confidence: number;
}

export const NORSE_GODS_EXPANDED = {
  'Thor': ['Thor', 'Tor', 'Þórr', 'Thors', 'Tors', 'Thorslund', 'Torslund', 'Torshäll', 'Thorshäll'],
  'Odin': ['Odin', 'Óðinn', 'Oden', 'Wodan', 'Odins', 'Odens', 'Odensvi', 'Odensala', 'Odensholm'],
  'Frey': ['Frey', 'Freyr', 'Frö', 'Freys', 'Frös', 'Frösön', 'Frösö', 'Frölund'],
  'Frigg': ['Frigg', 'Frigga', 'Friggs', 'Friggeråker'],
  'Njord': ['Njord', 'Njörðr', 'Njords', 'Njärdhov'],
  'Ull': ['Ull', 'Ullr', 'Ulls', 'Ullevi', 'Ulleviäng'],
  'Balder': ['Balder', 'Baldr', 'Balders', 'Baldersberg'],
  'Tyr': ['Tyr', 'Týr', 'Tyrs', 'Tyrshög'],
  'Loki': ['Loki', 'Lokis'],
  'Heimdall': ['Heimdall', 'Heimdallr'],
  'Vidar': ['Vidar', 'Víðarr'],
  'Vali': ['Vali', 'Váli']
};

export const findGodNamesInPlace = (placeName: string, searchGod?: string): GodNameMatch[] => {
  const matches: GodNameMatch[] = [];
  const normalizedPlace = placeName.toLowerCase().replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
  
  const godsToCheck = searchGod 
    ? { [searchGod]: NORSE_GODS_EXPANDED[searchGod as keyof typeof NORSE_GODS_EXPANDED] || [searchGod] }
    : NORSE_GODS_EXPANDED;

  Object.entries(godsToCheck).forEach(([godName, variants]) => {
    variants.forEach(variant => {
      const normalizedVariant = variant.toLowerCase().replace(/þ/g, 't').replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o');
      
      // Exact match
      if (normalizedPlace === normalizedVariant) {
        matches.push({
          placeName,
          godName,
          matchType: 'exact',
          confidence: 1.0
        });
      }
      // Compound place names (e.g., "Thorslunda", "Odensala") - check if place starts with god name
      else if (normalizedPlace.startsWith(normalizedVariant) && normalizedPlace.length > normalizedVariant.length) {
        matches.push({
          placeName,
          godName,
          matchType: 'compound',
          confidence: 0.9
        });
      }
      // Contains god name anywhere in the place name
      else if (normalizedPlace.includes(normalizedVariant) && normalizedVariant.length >= 3) {
        matches.push({
          placeName,
          godName,
          matchType: 'variant',
          confidence: 0.7
        });
      }
    });
  });

  return matches.sort((a, b) => b.confidence - a.confidence);
};

export const searchPlacesForGodNames = async (godName?: string): Promise<{ place: any; matches: GodNameMatch[] }[]> => {
  console.log('🔍 Starting god name search for:', godName || 'all gods');
  
  try {
    // Import supabase client
    const { supabase } = await import('@/integrations/supabase/client');
    
    // Get all places from the database
    const { data: places, error } = await supabase
      .from('places')
      .select('*');

    if (error) {
      console.error('Error fetching places:', error);
      return [];
    }

    console.log('📍 Total places in database:', places?.length || 0);

    if (!places || places.length === 0) {
      console.log('❌ No places found in database');
      return [];
    }

    const results: { place: any; matches: GodNameMatch[] }[] = [];
    
    places.forEach(place => {
      if (place.place) {
        const matches = findGodNamesInPlace(place.place, godName);
        if (matches.length > 0) {
          console.log('✅ Found god name match:', place.place, '→', matches.map(m => `${m.godName} (${m.confidence})`));
          results.push({ place, matches });
        }
      }
    });

    console.log('🎯 Total god name matches found:', results.length);
    
    return results.sort((a, b) => {
      const maxConfidenceA = Math.max(...a.matches.map(m => m.confidence));
      const maxConfidenceB = Math.max(...b.matches.map(m => m.confidence));
      return maxConfidenceB - maxConfidenceA;
    });
  } catch (error) {
    console.error('Error in searchPlacesForGodNames:', error);
    return [];
  }
};
