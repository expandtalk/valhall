
import { locationCoords } from './coordinateData';
import { generateUniqueOffset } from './coordinateUtils';
import { isUnderwaterInscription } from './underwaterDetection';
import { 
  detectLocationFromField,
  detectLocationFromSignum,
  extractProvinceFromSignum,
  detectLocationFromProvince,
  detectLocationFromCountry
} from './locationDetection';

interface RunicInscription {
  id: string;
  signum: string;
  location?: string;
  province?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  raw_data?: any;
  placement?: string;
  height_above_sea?: number;
  transliteration?: string;
  translation_en?: string;
  translation_sv?: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

// ✅ COMPLETE DATABASE: All famous stones with exact coordinates and ALL possible name variations
const FAMOUS_STONES_COORDINATES: { [key: string]: Coordinates } = {
  // 1. Rökstenen - världens längsta runinskrift (ALLA VARIATIONER)
  'Ög 136': { lat: 58.2953, lng: 14.8372 },
  'ög 136': { lat: 58.2953, lng: 14.8372 },
  'OG 136': { lat: 58.2953, lng: 14.8372 },
  'Rök': { lat: 58.2953, lng: 14.8372 },
  'rök': { lat: 58.2953, lng: 14.8372 },
  'Rökstenen': { lat: 58.2953, lng: 14.8372 },
  'rökstenen': { lat: 58.2953, lng: 14.8372 },
  'RÖKSTENEN': { lat: 58.2953, lng: 14.8372 },
  'Rök kyrka': { lat: 58.2953, lng: 14.8372 },
  'Röks kyrka': { lat: 58.2953, lng: 14.8372 },
  
  // 2. Sparlösastenen (ALLA VARIATIONER)
  'Vg 119': { lat: 58.3939, lng: 13.1506 },
  'vg 119': { lat: 58.3939, lng: 13.1506 },
  'VG 119': { lat: 58.3939, lng: 13.1506 },
  'Sparlösa': { lat: 58.3939, lng: 13.1506 },
  'sparlösa': { lat: 58.3939, lng: 13.1506 },
  'Sparlösastenen': { lat: 58.3939, lng: 13.1506 },
  'sparlösastenen': { lat: 58.3939, lng: 13.1506 },
  'SPARLÖSASTENEN': { lat: 58.3939, lng: 13.1506 },
  'Sparlösa kyrka': { lat: 58.3939, lng: 13.1506 },
  
  // 3. Gripsholmsstenen - Ingvarssten (ALLA VARIATIONER)
  'Sö 179': { lat: 59.3969, lng: 17.1167 },
  'sö 179': { lat: 59.3969, lng: 17.1167 },
  'SO 179': { lat: 59.3969, lng: 17.1167 },
  'Gripsholm': { lat: 59.3969, lng: 17.1167 },
  'gripsholm': { lat: 59.3969, lng: 17.1167 },
  'Gripsholmsstenen': { lat: 59.3969, lng: 17.1167 },
  'gripsholmsstenen': { lat: 59.3969, lng: 17.1167 },
  'GRIPSHOLMSSTENEN': { lat: 59.3969, lng: 17.1167 },
  'Gripsholms slott': { lat: 59.3969, lng: 17.1167 },
  'Mariefred': { lat: 59.3969, lng: 17.1167 },
  
  // 4. Björketorpsstenen - näst högsta runstenen (ALLA VARIATIONER)
  'DR 360': { lat: 56.2667, lng: 15.3833 },
  'dr 360': { lat: 56.2667, lng: 15.3833 },
  'Dr 360': { lat: 56.2667, lng: 15.3833 },
  'Björketorp': { lat: 56.2667, lng: 15.3833 },
  'björketorp': { lat: 56.2667, lng: 15.3833 },
  'Björketorpsstenen': { lat: 56.2667, lng: 15.3833 },
  'björketorpsstenen': { lat: 56.2667, lng: 15.3833 },
  'BJÖRKETORPSSTENEN': { lat: 56.2667, lng: 15.3833 },
  'Ronneby': { lat: 56.2667, lng: 15.3833 }, // Nära Ronneby
  
  // 5. Tunestenen - Norge, äldsta (ALLA VARIATIONER)
  'N KJ72': { lat: 59.2833, lng: 11.1167 },
  'n kj72': { lat: 59.2833, lng: 11.1167 },
  'N KJ 72': { lat: 59.2833, lng: 11.1167 },
  'Tune': { lat: 59.2833, lng: 11.1167 },
  'tune': { lat: 59.2833, lng: 11.1167 },
  'Tunestenen': { lat: 59.2833, lng: 11.1167 },
  'tunestenen': { lat: 59.2833, lng: 11.1167 },
  'TUNESTENEN': { lat: 59.2833, lng: 11.1167 },
  'Sarpsborg': { lat: 59.2833, lng: 11.1167 },
  
  // 6. Järsbergsstenen (ALLA VARIATIONER)
  'Vr 1': { lat: 59.3167, lng: 14.1167 },
  'vr 1': { lat: 59.3167, lng: 14.1167 },
  'VR 1': { lat: 59.3167, lng: 14.1167 },
  'Järsberg': { lat: 59.3167, lng: 14.1167 },
  'järsberg': { lat: 59.3167, lng: 14.1167 },
  'Järsbergsstenen': { lat: 59.3167, lng: 14.1167 },
  'järsbergsstenen': { lat: 59.3167, lng: 14.1167 },
  'JÄRSBERGSSTENEN': { lat: 59.3167, lng: 14.1167 },
  'Kristinehamn': { lat: 59.3167, lng: 14.1167 },
  
  // 7. Norahällen (ALLA VARIATIONER)
  'U 130': { lat: 59.4167, lng: 18.0500 },
  'u 130': { lat: 59.4167, lng: 18.0500 },
  'Nora': { lat: 59.4167, lng: 18.0500 },
  'nora': { lat: 59.4167, lng: 18.0500 },
  'Norahällen': { lat: 59.4167, lng: 18.0500 },
  'norahällen': { lat: 59.4167, lng: 18.0500 },
  'NORAHÄLLEN': { lat: 59.4167, lng: 18.0500 },
  'Danderyd': { lat: 59.4167, lng: 18.0500 },
  
  // 8. Orkestastenen/Yttergärdestenen (ALLA VARIATIONER)
  'U 344': { lat: 59.5167, lng: 17.0000 },
  'u 344': { lat: 59.5167, lng: 17.0000 },
  'Orkesta': { lat: 59.5167, lng: 17.0000 },
  'orkesta': { lat: 59.5167, lng: 17.0000 },
  'Yttergärde': { lat: 59.5167, lng: 17.0000 },
  'yttergärde': { lat: 59.5167, lng: 17.0000 },
  'Orkesta kyrka': { lat: 59.5167, lng: 17.0000 },
  
  // 9. Ardrestenarna - Gotland (ALLA VARIATIONER)
  'G 88': { lat: 57.6348, lng: 18.2948 },
  'g 88': { lat: 57.6348, lng: 18.2948 },
  'Ardre': { lat: 57.6348, lng: 18.2948 },
  'ardre': { lat: 57.6348, lng: 18.2948 },
  'Ardrestenarna': { lat: 57.6348, lng: 18.2948 },
  'ardrestenarna': { lat: 57.6348, lng: 18.2948 },
  
  // 10. Anundshögen-stenen (ALLA VARIATIONER)
  'Vs 13': { lat: 59.6167, lng: 16.5500 },
  'vs 13': { lat: 59.6167, lng: 16.5500 },
  'VS 13': { lat: 59.6167, lng: 16.5500 },
  'Anundshög': { lat: 59.6167, lng: 16.5500 },
  'anundshög': { lat: 59.6167, lng: 16.5500 },
  'Anundshögen': { lat: 59.6167, lng: 16.5500 },
  'anundshögen': { lat: 59.6167, lng: 16.5500 },
  'ANUNDSHÖGEN': { lat: 59.6167, lng: 16.5500 },
  'Västerås': { lat: 59.6167, lng: 16.5500 },
  
  // Ytterligare viktiga stenar (ALLA VARIATIONER)
  'Sö 304': { lat: 59.2333, lng: 17.8000 },
  'sö 304': { lat: 59.2333, lng: 17.8000 },
  'SO 304': { lat: 59.2333, lng: 17.8000 },
  'Oxelby': { lat: 59.2333, lng: 17.8000 },
  'oxelby': { lat: 59.2333, lng: 17.8000 },
  'Oxelbystenen': { lat: 59.2333, lng: 17.8000 },
  'oxelbystenen': { lat: 59.2333, lng: 17.8000 },
  'Salem': { lat: 59.2333, lng: 17.8000 },
  
  'U 455': { lat: 59.4333, lng: 17.9167 },
  'u 455': { lat: 59.4333, lng: 17.9167 },
  'Näsby': { lat: 59.4333, lng: 17.9167 },
  'näsby': { lat: 59.4333, lng: 17.9167 },
  'Näsbystenen': { lat: 59.4333, lng: 17.9167 },
  'näsbystenen': { lat: 59.4333, lng: 17.9167 },
  
  'U 104': { lat: 59.8167, lng: 17.6333 },
  'u 104': { lat: 59.8167, lng: 17.6333 },
  'Oxford': { lat: 59.8167, lng: 17.6333 },
  'oxford': { lat: 59.8167, lng: 17.6333 },
  'Oxfordstenen': { lat: 59.8167, lng: 17.6333 },
  'oxfordstenen': { lat: 59.8167, lng: 17.6333 },
  'Eds': { lat: 59.8167, lng: 17.6333 },
  'eds': { lat: 59.8167, lng: 17.6333 },
  'Eds kyrka': { lat: 59.8167, lng: 17.6333 },
  
  // Klassiska kända stenar från tidigare (ALLA VARIATIONER)
  'Öl 1': { lat: 56.6634, lng: 16.3567 },
  'öl 1': { lat: 56.6634, lng: 16.3567 },
  'ÖL 1': { lat: 56.6634, lng: 16.3567 },
  'Karlevi': { lat: 56.6634, lng: 16.3567 },
  'karlevi': { lat: 56.6634, lng: 16.3567 },
  'Karlevistenen': { lat: 56.6634, lng: 16.3567 },
  'karlevistenen': { lat: 56.6634, lng: 16.3567 },
  'KARLEVISTENEN': { lat: 56.6634, lng: 16.3567 },
  
  'DR 41': { lat: 55.7558, lng: 9.4219 },
  'dr 41': { lat: 55.7558, lng: 9.4219 },
  'DR 42': { lat: 55.7558, lng: 9.4219 },
  'dr 42': { lat: 55.7558, lng: 9.4219 },
  'Jelling': { lat: 55.7558, lng: 9.4219 },
  'jelling': { lat: 55.7558, lng: 9.4219 },
  'JELLING': { lat: 55.7558, lng: 9.4219 },
  
  // Järlabanke-stenarna (ALLA VARIATIONER)
  'U 212': { lat: 59.4439, lng: 18.0697 },
  'u 212': { lat: 59.4439, lng: 18.0697 },
  'U 261': { lat: 59.4439, lng: 18.0697 },
  'u 261': { lat: 59.4439, lng: 18.0697 },
  'Täby': { lat: 59.4439, lng: 18.0697 },
  'täby': { lat: 59.4439, lng: 18.0697 },
  'TÄBY': { lat: 59.4439, lng: 18.0697 },
  
  'Gs 8': { lat: 60.6749, lng: 17.1413 },
  'gs 8': { lat: 60.6749, lng: 17.1413 },
  'GS 8': { lat: 60.6749, lng: 17.1413 },
  'Sö 158': { lat: 59.2167, lng: 17.6333 },
  'sö 158': { lat: 59.2167, lng: 17.6333 },
  'SO 158': { lat: 59.2167, lng: 17.6333 },
};

export const getApproximateCoordinates = (inscription: RunicInscription, isVikingMode: boolean = false): Coordinates | null => {
  const signum = inscription.signum;
  console.log(`🔍 COORDINATE SEARCH for signum: "${signum}"`);
  console.log(`📄 Full inscription data:`, {
    id: inscription.id,
    signum: inscription.signum,
    location: inscription.location,
    province: inscription.province,
    country: inscription.country,
    coordinates: inscription.coordinates
  });

  // First check if coordinates are already in the database
  if (inscription.coordinates && inscription.coordinates.lat && inscription.coordinates.lng) {
    console.log(`✅ Using database coordinates for ${signum}:`, inscription.coordinates);
    return inscription.coordinates;
  }

  // ✅ PRIORITY 1: Check famous stones with EXTENSIVE matching patterns!
  const famousStoneKeys = [
    signum, // Exact signum match
    signum.toLowerCase(),
    signum.toUpperCase(),
    signum.replace(/\s+/g, ''), // Remove spaces
    signum.replace(/\s+/g, '').toLowerCase(),
    inscription.location || '',
    inscription.location?.toLowerCase() || '',
    inscription.location?.toUpperCase() || '',
    // Extract just the signum part (e.g., "Ög 136" from longer strings)
    signum.match(/^([A-ZÅÄÖa-zåäö]{1,3}\s*\d+)/)?.[1] || '',
    signum.match(/^([A-ZÅÄÖa-zåäö]{1,3}\s*\d+)/)?.[1]?.toLowerCase() || '',
    // Check if signum contains famous stone patterns
    ...Object.keys(FAMOUS_STONES_COORDINATES).filter(key => 
      signum.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(signum.toLowerCase())
    )
  ].filter(key => key.length > 0);

  console.log(`🔍 Checking famous stone keys for ${signum}:`, famousStoneKeys);

  for (const key of famousStoneKeys) {
    if (FAMOUS_STONES_COORDINATES[key]) {
      console.log(`⭐ FAMOUS STONE FOUND: ${signum} -> ${key}:`, FAMOUS_STONES_COORDINATES[key]);
      return generateUniqueOffset(inscription, FAMOUS_STONES_COORDINATES[key]);
    }
  }

  // Also check if location field contains famous stone names with fuzzy matching
  if (inscription.location) {
    const locationLower = inscription.location.toLowerCase();
    const locationKey = Object.keys(FAMOUS_STONES_COORDINATES).find(key => {
      const keyLower = key.toLowerCase();
      return locationLower.includes(keyLower) ||
             keyLower.includes(locationLower) ||
             // Check for partial matches
             (keyLower.length > 3 && locationLower.includes(keyLower.substring(0, keyLower.length - 1))) ||
             (locationLower.length > 3 && keyLower.includes(locationLower.substring(0, locationLower.length - 1)));
    });
    
    if (locationKey) {
      console.log(`⭐ FAMOUS STONE by location ${inscription.location} -> ${locationKey}:`, FAMOUS_STONES_COORDINATES[locationKey]);
      return generateUniqueOffset(inscription, FAMOUS_STONES_COORDINATES[locationKey]);
    }
  }

  // Check for exact signum matches in coordinate data
  if (locationCoords[signum]) {
    console.log(`📍 Found exact coordinates for ${signum}:`, locationCoords[signum]);
    return generateUniqueOffset(inscription, locationCoords[signum]);
  }

  // Check for specific locations in the location field
  const locationResult = detectLocationFromField(inscription);
  if (locationResult) return locationResult;

  // Special handling for Kalmar mentions in text content
  if (inscription.transliteration?.toLowerCase().includes('kalmar') || 
      inscription.translation_en?.toLowerCase().includes('kalmar') ||
      inscription.translation_sv?.toLowerCase().includes('kalmar') ||
      inscription.location?.toLowerCase().includes('kalmar')) {
    console.log(`Found Kalmar reference in ${inscription.signum}`);
    return generateUniqueOffset(inscription, { lat: 56.6634, lng: 16.3567 });
  }

  // Check specific signum patterns for various inscriptions
  const signumResult = detectLocationFromSignum(inscription);
  if (signumResult) return signumResult;

  // Check province field for proper province detection
  const provinceResult = detectLocationFromProvince(inscription);
  if (provinceResult) return provinceResult;

  // Extract province/region from signum with better prioritization
  const extractedProvinceResult = extractProvinceFromSignum(inscription, isVikingMode);
  if (extractedProvinceResult) return extractedProvinceResult;

  // Check country field for fallback - use Viking era centers in Viking mode
  const countryResult = detectLocationFromCountry(inscription, isVikingMode);
  if (countryResult) return countryResult;

  // If no coordinates found, return null instead of default
  console.log(`❌ NO COORDINATES found for ${signum}`);
  return null;
};

// Export the underwater detection function for use in other components
export { isUnderwaterInscription };
