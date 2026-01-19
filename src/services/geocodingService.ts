import { supabase } from "@/integrations/supabase/client";

interface GeocodeResult {
  latitude: number;
  longitude: number;
  confidence: 'high' | 'medium' | 'low';
  source: string;
}

interface LocationToGeocode {
  signum: string;
  location: string;
  parish?: string;
  province?: string;
  country?: string;
  municipality?: string;
  landscape?: string;
  priority: 'high' | 'medium' | 'low';
}

// Basic geocoding using Nominatim (OpenStreetMap)
const geocodeWithNominatim = async (locationString: string): Promise<GeocodeResult | null> => {
  try {
    console.log(`GEOCODING: Attempting to geocode: "${locationString}"`);
    
    // Add rate limiting - Nominatim requires max 1 request per second
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    const encodedLocation = encodeURIComponent(locationString);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocation}&limit=1&countrycodes=se,dk,no,de,is&accept-language=sv,da,no,en`;
    
    console.log(`GEOCODING: Fetching URL: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RunicResearchApp/1.0 (educational use)'
      }
    });
    
    console.log(`GEOCODING: Response status: ${response.status}`);
    
    if (!response.ok) {
      console.warn(`GEOCODING: Nominatim returned error ${response.status}: ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    console.log(`GEOCODING: Nominatim response:`, data);
    
    if (data && Array.isArray(data) && data.length > 0) {
      const result = data[0];
      const geocodeResult = {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        confidence: (result.importance > 0.6 ? 'high' : result.importance > 0.4 ? 'medium' : 'low') as 'high' | 'medium' | 'low',
        source: 'nominatim'
      };
      
      console.log(`GEOCODING: Successfully parsed result:`, geocodeResult);
      return geocodeResult;
    }
    
    console.log(`GEOCODING: No results found for "${locationString}"`);
    return null;
  } catch (error) {
    console.error(`GEOCODING: Error geocoding "${locationString}":`, error);
    return null;
  }
};

// Smart location string builder
const buildLocationString = (location: LocationToGeocode): string[] => {
  const candidates = [];
  
  console.log(`GEOCODING: Building location strings for ${location.signum}:`, {
    location: location.location,
    parish: location.parish,
    province: location.province,
    municipality: location.municipality,
    country: location.country
  });
  
  // Check if location is essentially unknown
  const isLocationUnknown = !location.location || 
    location.location.toLowerCase().includes('plats okänd') ||
    location.location.toLowerCase().includes('endast signum') ||
    location.location.toLowerCase().includes('unknown location');
  
  // Strategy 1: If location is unknown but we have parish, use parish as location
  if (isLocationUnknown && location.parish && location.province) {
    const parishName = location.parish;
    let targetCountry = location.country || 'Sweden';
    
    console.log(`GEOCODING: Using parish as location: ${parishName}, ${location.province}`);
    
    // Auto-detect Danish runestones by "sogn" suffix
    if (parishName.toLowerCase().includes('sogn')) {
      targetCountry = 'Denmark';
      console.log(`GEOCODING: Detected Danish runestone due to "sogn" suffix: ${parishName}`);
    }
    
    // General socken/sogn handling for all regions
    if (parishName.toLowerCase().includes('socken') || parishName.toLowerCase().includes('sogn')) {
      const placeNameOnly = parishName.replace(/\s*(socken|sogn)\s*/i, '').trim();
      
      // Special handling for Norwegian parishes
      if (location.province === 'NO' || targetCountry.toLowerCase() === 'norway') {
        candidates.push(`${placeNameOnly}, ${location.province}, Norway`);
        candidates.push(`${placeNameOnly}, Norway`);
        if (parishName.toLowerCase() === 'bergen sogn') {
          candidates.push('Bergen, Norway');
          candidates.push('Bergen, Norge');
          candidates.push('Bergen, Hordaland, Norway');
        }
      }
      // Special handling for Danish parishes - prioritize place name without sogn
      else if (location.province?.toLowerCase() === 'bornholm' || targetCountry.toLowerCase() === 'denmark') {
        // For Danish "sogn", prioritize the place name without sogn
        candidates.push(`${placeNameOnly}, Denmark`);
        candidates.push(`${placeNameOnly}, ${location.province}, Denmark`);
        if (location.province?.toLowerCase() === 'bornholm') {
          candidates.push(`${placeNameOnly}, Bornholm, Denmark`);
          candidates.push(`${placeNameOnly}, Bornholm`);
        }
        // Also try with sogn as fallback
        candidates.push(`${parishName}, Denmark`);
        if (location.province?.toLowerCase() === 'bornholm') {
          candidates.push(`${parishName}, Bornholm, Denmark`);
        }
      }
      // Swedish socknar - check for specific regions
      else {
        // Öland socknar
        if (location.province?.toLowerCase().includes('kalmar') && (location.landscape?.toLowerCase() === 'öland' || location.signum?.startsWith('B '))) {
          candidates.push(`${placeNameOnly}, Öland, Sweden`);
          candidates.push(`${placeNameOnly} kyrka, Öland, Sweden`);
          candidates.push(`${placeNameOnly}, Öland, Kalmar län, Sweden`);
        }
        // Gotland socknar
        else if (location.province?.toLowerCase().includes('gotland') || location.landscape?.toLowerCase() === 'gotland') {
          candidates.push(`${placeNameOnly} kyrka, Gotland, Sweden`);
          candidates.push(`${placeNameOnly}, Gotland, Sweden`);
          candidates.push(`${placeNameOnly}, Gotland`);
        }
        // General Swedish socknar
        else {
          candidates.push(`${placeNameOnly}, ${location.province}, Sweden`);
          candidates.push(`${placeNameOnly}, Sweden`);
          candidates.push(`${placeNameOnly} kyrka, ${location.province}, Sweden`);
        }
      }
    }
    
    // Always try the original parish name too
    candidates.push(`${parishName}, ${location.province}, ${targetCountry}`);
    candidates.push(`${parishName}, ${targetCountry}`);
  }
  
  // Strategy 2: Full address if available and location is known
  if (!isLocationUnknown && location.parish && location.province) {
    candidates.push(`${location.location}, ${location.parish}, ${location.province}, ${location.country || 'Sweden'}`);
  }
  
  // Strategy 3: Location + province + country (if location is known)
  if (!isLocationUnknown && location.province) {
    candidates.push(`${location.location}, ${location.province}, ${location.country || 'Sweden'}`);
  }
  
  // Strategy 4: Municipality fallback (often more reliable than parish for Swedish places)
  if (location.municipality && location.municipality !== location.province && location.municipality !== location.parish) {
    if (isLocationUnknown) {
      candidates.push(`${location.municipality}, ${location.province || ''}, Sweden`.replace(', ,', ','));
      candidates.push(`${location.municipality}, Sweden`);
    } else {
      candidates.push(`${location.location}, ${location.municipality}, Sweden`);
    }
  }
  
  // Strategy 5: Location + municipality + country (if location known)
  if (!isLocationUnknown && location.municipality && location.municipality !== location.province) {
    candidates.push(`${location.location}, ${location.municipality}, ${location.country || 'Sweden'}`);
  }
  
  // Strategy 6: Location + country (if location known)
  if (!isLocationUnknown) {
    candidates.push(`${location.location}, ${location.country || 'Sweden'}`);
  }
  
  // Strategy 7: Just location name (if known)
  if (!isLocationUnknown) {
    candidates.push(location.location);
  }
  
  console.log(`GEOCODING: Generated ${candidates.length} location candidates:`, candidates);
  return candidates;
};

// Main geocoding function
export const geocodeInscription = async (location: LocationToGeocode): Promise<GeocodeResult | null> => {
  console.log(`GEOCODING: Starting geocoding for inscription ${location.signum}: ${location.location}`);
  
  // Check if we have either location OR parish data
  const hasLocationData = (location.location && location.location.trim() !== '') || location.parish;
  
  if (!hasLocationData) {
    console.log(`GEOCODING: SKIPPED ${location.signum} - no location or parish data`);
    return null;
  }
  
  // Check if location is essentially unknown
  const isLocationUnknown = !location.location || 
    location.location.toLowerCase().includes('plats okänd') ||
    location.location.toLowerCase().includes('endast signum') ||
    location.location.toLowerCase().includes('unknown location');
  
  // If location is unknown but we have parish, we can still proceed
  if (isLocationUnknown && !location.parish) {
    console.log(`GEOCODING: SKIPPED ${location.signum} - location unknown and no parish data: ${location.location}`);
    return null;
  }
  
  // Skip if location is truly invalid and we have no parish backup
  if (!isLocationUnknown) {
    const invalidLocationPatterns = [
      'förlorad',
      'lost',
      'missing'
    ];
    
    const locationLower = location.location.toLowerCase();
    if (invalidLocationPatterns.some(pattern => locationLower.includes(pattern))) {
      console.log(`GEOCODING: SKIPPED ${location.signum} - invalid location pattern: ${location.location}`);
      return null;
    }
  }
  
  const locationCandidates = buildLocationString(location);
  
  for (let i = 0; i < locationCandidates.length; i++) {
    const locationString = locationCandidates[i];
    console.log(`GEOCODING: Trying candidate ${i + 1}/${locationCandidates.length}: "${locationString}"`);
    
    try {
      const result = await geocodeWithNominatim(locationString);
      if (result) {
        console.log(`GEOCODING: SUCCESS! Geocoded ${location.signum} with candidate ${i + 1}: [${result.latitude}, ${result.longitude}] confidence: ${result.confidence}`);
        return result;
      }
    } catch (error) {
      console.error(`GEOCODING: Error with candidate "${locationString}":`, error);
      continue; // Try next candidate
    }
  }
  
  console.log(`GEOCODING: FAILED to geocode ${location.signum} after trying ${locationCandidates.length} candidates`);
  return null;
};

// Save geocoded coordinates to database
export const saveGeocodedCoordinates = async (signum: string, result: GeocodeResult, locationInput: string): Promise<boolean> => {
  try {
    console.log(`GEOCODING: Saving coordinates for ${signum}:`, {
      latitude: result.latitude,
      longitude: result.longitude,
      source: result.source,
      confidence: result.confidence,
      notes: `Geocoded from: "${locationInput}"`
    });
    
    const { data, error } = await supabase
      .from('additional_coordinates')
      .upsert({
        signum,
        latitude: result.latitude,
        longitude: result.longitude,
        source: result.source,
        confidence: result.confidence,
        notes: `Geocoded from: "${locationInput}"`
      }, {
        onConflict: 'signum'
      })
      .select();
    
    if (error) {
      console.error(`GEOCODING: Database error saving coordinates for ${signum}:`, error);
      return false;
    }
    
    console.log(`GEOCODING: Successfully saved coordinates for ${signum}`, data);
    return true;
  } catch (error) {
    console.error(`GEOCODING: Exception saving coordinates for ${signum}:`, error);
    return false;
  }
};

// Get inscriptions that need geocoding
export const getInscriptionsForGeocoding = async (limit: number = 50): Promise<LocationToGeocode[]> => {
  try {
    console.log(`GEOCODING: Fetching inscriptions for geocoding (limit: ${limit})`);
    
    // First, let's see what data structure we're working with
    const { data: sampleData, error: sampleError } = await supabase
      .from('runic_with_coordinates')
      .select('signum, location, parish, province, country, municipality, landscape, geocoding_priority, coordinate_status')
      .limit(5);
    
    if (sampleError) {
      console.error('GEOCODING: Error fetching sample data:', sampleError);
    } else {
      console.log('GEOCODING: Sample data from database:', sampleData);
    }
    
    // Check if inscriptions already have coordinates in additional_coordinates table
    const { data: existingCoords, error: existingError } = await supabase
      .from('additional_coordinates')
      .select('signum');
    
    if (existingError) {
      console.error('GEOCODING: Error fetching existing coordinates:', existingError);
    } else {
      console.log(`GEOCODING: Found ${existingCoords?.length || 0} inscriptions with existing additional coordinates`);
    }
    
    const existingSignums = new Set(existingCoords?.map(c => c.signum) || []);
    
    // Get inscriptions that need geocoding (excluding those that already have additional coordinates)
    let query = supabase
      .from('runic_with_coordinates')
      .select('signum, location, parish, province, country, municipality, landscape, geocoding_priority')
      .in('geocoding_priority', ['high_geocoding_potential', 'medium_geocoding_potential']);
    
    // Don't filter by location being not null or not empty anymore, since we can use parish
    // We'll handle the filtering in the geocoding function itself
    
    // If we have existing coordinates, exclude those
    if (existingSignums.size > 0) {
      query = query.not('signum', 'in', `(${Array.from(existingSignums).map(s => `"${s}"`).join(',')})`);
    }
    
    const { data, error } = await query
      .order('geocoding_priority')
      .limit(limit);
    
    if (error) {
      console.error('GEOCODING: Error fetching inscriptions for geocoding:', error);
      throw error;
    }
    
    console.log(`GEOCODING: Found ${data?.length || 0} inscriptions ready for geocoding`);
    if (data && data.length > 0) {
      console.log('GEOCODING: First few examples:', data.slice(0, 3).map(item => ({
        signum: item.signum,
        location: item.location,
        parish: item.parish,
        priority: item.geocoding_priority
      })));
    }
    
    const result = (data || []).map(item => ({
      signum: item.signum,
      location: item.location || '',
      parish: item.parish,
      province: item.province,
      country: item.country,
      municipality: item.municipality,
      landscape: item.landscape,
      priority: item.geocoding_priority === 'high_geocoding_potential' ? 'high' as const : 'medium' as const
    }));
    
    console.log(`GEOCODING: Returning ${result.length} inscriptions for geocoding`);
    return result;
  } catch (error) {
    console.error('GEOCODING: Exception in getInscriptionsForGeocoding:', error);
    throw error;
  }
};

// Test Gotland coordinates
export const testGotlandCoordinates = async (): Promise<{ success: number; failed: number }> => {
  const testCoordinates = [
    {
      signum: 'G 134',
      lat: 57.4856,
      lng: 18.5208,
      notes: 'Sjonhems kyrka, Sjonhems socken - manual test coordinates'
    },
    {
      signum: 'G 123', 
      lat: 57.452,
      lng: 18.5113,
      notes: 'Vänge kyrka, Vänge socken - manual test coordinates'
    }
  ];
  
  return addManualCoordinates(testCoordinates);
};

// Add manual coordinates for specific inscriptions
export const addManualCoordinates = async (manualCoordinates: Array<{signum: string, lat: number, lng: number, notes: string}>): Promise<{ success: number; failed: number }> => {
  console.log(`GEOCODING: Adding ${manualCoordinates.length} manual coordinates`);
  
  let success = 0;
  let failed = 0;
  
  for (const coord of manualCoordinates) {
    try {
      const result: GeocodeResult = {
        latitude: coord.lat,
        longitude: coord.lng,
        confidence: 'high',
        source: 'manual'
      };
      
      const saved = await saveGeocodedCoordinates(coord.signum, result, coord.notes);
      if (saved) {
        success++;
        console.log(`GEOCODING: Manual coordinates added for ${coord.signum}`);
      } else {
        failed++;
        console.log(`GEOCODING: Failed to save manual coordinates for ${coord.signum}`);
      }
    } catch (error) {
      console.error(`GEOCODING: Error adding manual coordinates for ${coord.signum}:`, error);
      failed++;
    }
  }
  
  console.log(`GEOCODING: Manual coordinates completed: ${success} successful, ${failed} failed`);
  return { success, failed };
};

// Add specific Gotland runestone coordinates
export const addGotlandCoordinates = async (): Promise<{ success: number; failed: number }> => {
  const gotlandCoordinates = [
    {
      signum: 'G 67',
      lat: 57.3667,
      lng: 18.4833,
      notes: 'Sproge kyrka, Sproge socken, Gotland - manual coordinates'
    },
    {
      signum: 'G 110', 
      lat: 57.4297,
      lng: 18.4669,
      notes: 'Tjängvide, Alskogs socken, Gotland - manual coordinates'
    },
    {
      signum: 'G 159',
      lat: 57.3397,
      lng: 18.4044,
      notes: 'Gothems kyrka, Gothems socken, Gotland - manual coordinates'
    },
    {
      signum: 'G 229',
      lat: 57.2631,
      lng: 18.3397,
      notes: 'Barlingbo kyrka, Barlingbo socken, Gotland - manual coordinates'
    },
    {
      signum: 'G 346',
      lat: 57.6394,
      lng: 18.2944,
      notes: 'Strandgatan, Visby, Gotland - manual coordinates'
    }
  ];
  
  return addManualCoordinates(gotlandCoordinates);
};

// Add specific Scanian (Skåne) runestone coordinates
export const addScanianCoordinates = async (): Promise<{ success: number; failed: number }> => {
  const scanianCoordinates = [
    {
      signum: 'DR 298',
      lat: 55.7046,
      lng: 13.1962,
      notes: 'Dalbystenen, Kulturen, Lund - manual coordinates'
    },
    {
      signum: 'DR 308A',
      lat: 55.7058,
      lng: 13.1928,
      notes: 'Lund, kv. Maria Magle - manual coordinates'
    },
    {
      signum: 'DR 329',
      lat: 55.7532,
      lng: 13.3592,
      notes: 'Gårdstångastenen 1, Gårdstånga socken - manual coordinates'
    },
    {
      signum: 'DR 336',
      lat: 56.0167,
      lng: 12.9167,
      notes: 'Allerumstenen, Allerums kyrka - manual coordinates'
    },
    // Viktiga runstenar från din lista
    {
      signum: 'DR 262',
      lat: 55.5833,
      lng: 12.9833,
      notes: 'Fosiestenen, Fosie kyrka - manual coordinates'
    },
    {
      signum: 'DR 271',
      lat: 55.3833,
      lng: 13.8000,
      notes: 'Tullstorpstenen, Tullstorps socken - manual coordinates'
    },
    {
      signum: 'DR 295',
      lat: 55.6333,
      lng: 13.7167,
      notes: 'Hällestadstenen 1, Hällestads kyrka - manual coordinates'
    }
  ];
  
  return addManualCoordinates(scanianCoordinates);
};

// Add specific Bornholm and Sjælland coordinates from user report
export const addBornholmSjaellandCoordinates = async (): Promise<{ success: number; failed: number }> => {
  const coordinates = [
    {
      signum: 'Bh 33',
      lat: 55.0739,
      lng: 14.815,
      notes: 'DR 379 - Bornholm - manual coordinates from geocoding correction'
    },
    {
      signum: 'Bh 59',
      lat: 55.1434,
      lng: 15.0686,
      notes: 'DK Bh59 - Bornholm - manual coordinates from geocoding correction'
    },
    {
      signum: 'Bh 38',
      lat: 55.1059,
      lng: 14.8243,
      notes: 'DK Bh38 - Bornholm - manual coordinates from geocoding correction'
    },
    {
      signum: 'Bh 58',
      lat: 55.1498,
      lng: 14.9948,
      notes: 'DR AUD1999;288, DK Bh58 - Bornholm - manual coordinates from geocoding correction'
    },
    {
      signum: 'DR AUD1988',
      lat: 55.3495,
      lng: 11.1923,
      notes: 'DR AUD1988;205A, DK Sj69, Tårnborg, Tårnborg sogn - manual coordinates from geocoding correction'
    },
    // Additional Bornholm coordinates batch 2
    {
      signum: 'Bh 60',
      lat: 55.1432,
      lng: 15.0795,
      notes: 'DK Bh60 - Bornholm - manual coordinates from geocoding correction'
    },
    {
      signum: 'Bh 64',
      lat: 55.0014,
      lng: 15.0535,
      notes: 'DK Bh64 - Bornholm - manual coordinates from geocoding correction'
    },
    {
      signum: 'Bh 4',
      lat: 55.1846,
      lng: 14.708,
      notes: 'DK Bh4 - Bornholm - current coordinates (manual correction)'
    },
    {
      signum: 'Bh 51',
      lat: 55.1344,
      lng: 15.1422,
      notes: 'DK Bh51, DR 390 - Bornholm - current coordinates (manual correction)'
    },
    {
      signum: 'Bh 53',
      lat: 55.1381,
      lng: 15.0161,
      notes: 'DK Bh53, DR 392 - Bornholm - manual coordinates from geocoding correction'
    },
    {
      signum: 'Bh 55',
      lat: 55.1381,
      lng: 15.016,
      notes: 'DK Bh55, DR 394 - Bornholm - manual coordinates from geocoding correction'
    }
  ];
  
  return addManualCoordinates(coordinates);
};

// Batch geocoding function
export const batchGeocode = async (limit: number = 100): Promise<{ success: number; failed: number }> => {
  console.log(`GEOCODING: Starting batch geocoding (limit: ${limit})`);
  
  try {
    const inscriptions = await getInscriptionsForGeocoding(limit);
    let success = 0;
    let failed = 0;
    
    console.log(`GEOCODING: Processing ${inscriptions.length} inscriptions`);
    
    for (const inscription of inscriptions) {
      try {
        console.log(`GEOCODING: Processing inscription ${inscription.signum}`);
        const result = await geocodeInscription(inscription);
        if (result) {
          const locationString = buildLocationString(inscription)[0];
          const saved = await saveGeocodedCoordinates(inscription.signum, result, locationString);
          if (saved) {
            success++;
            console.log(`GEOCODING: SUCCESS: ${inscription.signum} processed successfully`);
          } else {
            failed++;
            console.log(`GEOCODING: FAILED: Could not save ${inscription.signum}`);
          }
        } else {
          failed++;
          console.log(`GEOCODING: FAILED: Could not geocode ${inscription.signum}`);
        }
      } catch (error) {
        console.error(`GEOCODING: Exception processing ${inscription.signum}:`, error);
        failed++;
      }
    }
    
    console.log(`GEOCODING: Batch geocoding completed: ${success} successful, ${failed} failed`);
    return { success, failed };
  } catch (error) {
    console.error('GEOCODING: Exception in batchGeocode:', error);
    throw error;
  }
};