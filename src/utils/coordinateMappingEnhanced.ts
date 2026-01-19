import { locationCoords } from './coordinateData';
import { generateUniqueOffset } from './coordinateUtils';
import { isUnderwaterInscription } from './underwaterDetection';
import { getVikingEraLocation } from './vikingEraLocations';
import type { CoordinatesWithZoom } from '@/types/common';
import { REGIONAL_CENTERS, FAMOUS_STONES_ENHANCED, CITY_LOCATIONS, COUNTRY_CENTERS, REGION_NAME_TO_CODE } from './locationConstants';
import { RunicInscription } from '@/types/inscription';

interface Coordinates {
  lat: number;
  lng: number;
}

// Enhanced signum pattern detection
export const detectSignumPattern = (signum: string): { prefix: string; number?: string; region?: string } => {
  // Handle various signum formats including spaces and no spaces
  const patterns = [
    // Complex formats with ATA, KALM, Fv etc.
    /^(Öl|Sm|G)\s+(ATA|KALM|Fv)/, // Öl ATA430/37;16, Sm KALM1986;119, G Fv1959;105C
    /^(DR|DK)\s*([A-Z]*)\s*(\d+)/, // DR AUD1988, DK Sj38, DR 1, DR1
    /^([A-ZÅÄÖa-zåäö]{1,3})\s*(\d+)/, // Standard format: Ög 136, Sö 179, U 337, U337
    /^([A-Z]{1,2})\s*(\d+)/, // Simple format: U 344, N 184
    /^([A-Z]+)\s+([A-Z]+)\s*(\d+)/, // Complex format: Bo Boije5
    /^(KJ)\s*(\d+)/, // Krause-Jankuhn format
    /^(BN|BH)\s*(\d+)/, // Bergen/Bornholm specific
  ];
  
  for (const pattern of patterns) {
    const match = signum.match(pattern);
    if (match) {
      return {
        prefix: match[1],
        number: match[2] || match[3],
        region: match[2]
      };
    }
  }
  
  // Special handling for complex formats like "Öl ATA430/37;16"
  if (signum.includes('ATA') || signum.includes('KALM') || signum.includes('Fv')) {
    const prefix = signum.split(/\s+/)[0]; // Get first part: "Öl", "Sm", "G" etc.
    return { prefix };
  }
  
  // Fallback to first letters
  const prefixMatch = signum.match(/^([A-ZÅÄÖa-zåäö]{1,3})/);
  return {
    prefix: prefixMatch ? prefixMatch[1] : signum.substring(0, 2).toUpperCase()
  };
};

export const getEnhancedCoordinates = (inscription: RunicInscription, isVikingMode: boolean = false): CoordinatesWithZoom | null => {
  const signum = inscription.signum;
  const primary_signum = (inscription as any).primary_signum || inscription.signum;
  console.log(`🔍 ENHANCED COORDINATE SEARCH for: "${signum}" (primary: "${primary_signum}")`);

  // Priority 1: Check additional coordinates with HIGH confidence and MANUAL source (HIGHEST PRIORITY)
  if (inscription.additional_latitude && inscription.additional_longitude) {
    const source = (inscription as any).additional_source || 'unknown';
    const confidence = (inscription as any).additional_confidence || 'unknown';
    
    // Prioritize manual coordinates with high confidence
    if (source === 'manual' && confidence === 'high') {
      console.log(`🏆 Using HIGH CONFIDENCE MANUAL coordinates for ${signum}: [${inscription.additional_latitude}, ${inscription.additional_longitude}]`);
      return generateUniqueOffset(inscription, {
        lat: inscription.additional_latitude,
        lng: inscription.additional_longitude,
        zoom: 14
      });
    }
  }

  // Priority 2: Check original_coordinates from database (point type) - but only if no manual override
  if (inscription.original_coordinates) {
    console.log(`✅ Using database original_coordinates for ${signum}`);
    // Parse PostgreSQL point format "(x,y)" to lat/lng
    const pointStr = String(inscription.original_coordinates);
    const match = pointStr.match(/\(([^,]+),([^)]+)\)/);
    if (match) {
      const lng = parseFloat(match[1]);
      const lat = parseFloat(match[2]);
      return generateUniqueOffset(inscription, { lat, lng, zoom: 15 });
    }
  }

  // Priority 3: Check any additional coordinates (lower confidence)
  if (inscription.additional_latitude && inscription.additional_longitude) {
    console.log(`📍 Using additional coordinates for ${signum}: [${inscription.additional_latitude}, ${inscription.additional_longitude}]`);
    return generateUniqueOffset(inscription, {
      lat: inscription.additional_latitude,
      lng: inscription.additional_longitude,
      zoom: 14
    });
  }

  // Priority 3: Check legacy coordinates field (fallback)
  if (inscription.coordinates && inscription.coordinates.lat && inscription.coordinates.lng) {
    console.log(`✅ Using legacy coordinates field for ${signum}`);
    return generateUniqueOffset(inscription, { ...inscription.coordinates, zoom: 15 });
  }

  // Priority 4: Check enhanced famous stones database (VERIFIED COORDINATES)
  // ✅ Leta koordinater för både signum och primary_signum (för B 144 -> U 144 mapping)
  const famousStoneKeys = [
    primary_signum, // Prioritera primary_signum först
    signum,
    primary_signum?.toLowerCase(),
    signum.toLowerCase(),
    primary_signum?.toUpperCase(),
    signum.toUpperCase(),
    primary_signum?.replace(/\s+/g, ''), // Remove all spaces: "DR 1" -> "DR1"
    signum.replace(/\s+/g, ''),
    primary_signum?.replace(/\s+/g, '').toLowerCase(),
    signum.replace(/\s+/g, '').toLowerCase(),
    primary_signum?.replace(/\s+/g, '').toUpperCase(),
    signum.replace(/\s+/g, '').toUpperCase(),
    inscription.location || '',
    inscription.location?.toLowerCase() || '',
  ].filter(key => key && key.length > 0);

  for (const key of famousStoneKeys) {
    if (FAMOUS_STONES_ENHANCED[key]) {
      console.log(`⭐ FAMOUS STONE FOUND (VERIFIED): ${signum} (using key: ${key})`);
      return generateUniqueOffset(inscription, FAMOUS_STONES_ENHANCED[key]);
    }
  }

  // Priority 5: Check traditional location coordinates (VERIFIED COORDINATES)
  // ✅ Kolla både primary_signum och signum för koordinater
  if (locationCoords[primary_signum]) {
    console.log(`📍 Found in verified location coords using primary_signum: ${primary_signum}`);
    return generateUniqueOffset(inscription, { ...locationCoords[primary_signum], zoom: 13 });
  }
  if (locationCoords[signum]) {
    console.log(`📍 Found in verified location coords using signum: ${signum}`);
    return generateUniqueOffset(inscription, { ...locationCoords[signum], zoom: 13 });
  }

  // If no verified coordinates found, try parish-based location detection with socken handling
  if (inscription.parish) {
    // Remove "socken" suffix to improve matching
    const parishName = inscription.parish.replace(/\s*socken\s*$/i, '').trim();
    console.log(`🔍 Trying parish-based geocoding: "${inscription.parish}" -> "${parishName}"`);
    
    // Try to find coordinates for the parish name without "socken"
    const parishKeys = [
      parishName,
      parishName.toLowerCase(),
      parishName.toUpperCase(),
    ];
    
    for (const key of parishKeys) {
      if (CITY_LOCATIONS[key]) {
        console.log(`📍 Found parish coordinates: ${inscription.parish} -> ${key}`);
        return generateUniqueOffset(inscription, { ...CITY_LOCATIONS[key], zoom: 12 });
      }
    }
  }

  // Priority 6: Try regional fallback based on primary_signum prefix först
  const primarySignumPattern = detectSignumPattern(primary_signum);
  if (primarySignumPattern.prefix && REGIONAL_CENTERS[primarySignumPattern.prefix]) {
    console.log(`🏛️ Using regional center for ${primary_signum}: ${primarySignumPattern.prefix}`);
    return generateUniqueOffset(inscription, { ...REGIONAL_CENTERS[primarySignumPattern.prefix], zoom: 8 });
  }
  
  // Fallback till vanligt signum
  const signumPattern = detectSignumPattern(signum);
  if (signumPattern.prefix && REGIONAL_CENTERS[signumPattern.prefix]) {
    console.log(`🏛️ Using regional center for ${signum}: ${signumPattern.prefix}`);
    return generateUniqueOffset(inscription, { ...REGIONAL_CENTERS[signumPattern.prefix], zoom: 8 });
  }

  // Priority 7: Try landscape/province fallback
  if (inscription.landscape) {
    const landscapeCode = REGION_NAME_TO_CODE[inscription.landscape.toLowerCase()];
    if (landscapeCode && REGIONAL_CENTERS[landscapeCode]) {
      console.log(`🌄 Using landscape fallback for ${signum}: ${inscription.landscape} -> ${landscapeCode}`);
      return generateUniqueOffset(inscription, { ...REGIONAL_CENTERS[landscapeCode], zoom: 8 });
    }
  }
  
  // If no verified coordinates found, return null to trigger geocoding
  console.log(`❌ NO VERIFIED COORDINATES found for ${signum} - needs geocoding with parish/location data`);
  console.log(`📍 Available data for geocoding: Location="${inscription.location}", Parish="${inscription.parish}", Province="${inscription.province}"`);
  
  return null;
};

// Export the enhanced function as the main coordinate getter
export const getApproximateCoordinates = getEnhancedCoordinates;
export { isUnderwaterInscription };