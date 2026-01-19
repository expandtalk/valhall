
import { supabase } from "@/integrations/supabase/client";
import { parseCoordinates } from './coordinateUtils';

// Limit coordinate enrichment to improve performance
const MAX_COORDINATE_SEARCHES = 100;
const COORDINATE_SEARCH_BATCH_SIZE = 20;

export const enrichInscriptionsWithCoordinates = async (inscriptions: any[]) => {
  console.log(`🔄 Starting coordinate enrichment for ${inscriptions.length} inscriptions (limited to ${MAX_COORDINATE_SEARCHES})`);
  
  if (!inscriptions || inscriptions.length === 0) {
    return [];
  }

  // Debug: Log first few inscriptions to see their structure
  console.log('📊 Sample inscriptions structure:', inscriptions.slice(0, 3).map(i => ({
    signum: i.signum,
    rundata_signum: i.rundata_signum,
    id: i.id,
    hasCoordinates: !!i.coordinates,
    hasLatLng: !!(i.latitude && i.longitude),
    location: i.location
  })));

  // Limit the number of inscriptions we process to avoid performance issues
  const limitedInscriptions = inscriptions.slice(0, MAX_COORDINATE_SEARCHES);
  
  // Process in smaller batches to avoid overwhelming the browser
  const batches = [];
  for (let i = 0; i < limitedInscriptions.length; i += COORDINATE_SEARCH_BATCH_SIZE) {
    batches.push(limitedInscriptions.slice(i, i + COORDINATE_SEARCH_BATCH_SIZE));
  }

  const enrichedInscriptions = [];
  let successCount = 0;
  let existingCount = 0;

  for (const batch of batches) {
    const batchPromises = batch.map(async (inscription) => {
      try {
        // Skip if coordinates already exist
        if (inscription.coordinates || (inscription.latitude && inscription.longitude)) {
          existingCount++;
          return {
            ...inscription,
            coordinates: inscription.coordinates || {
              lat: typeof inscription.latitude === 'number' ? inscription.latitude : parseFloat(String(inscription.latitude)),
              lng: typeof inscription.longitude === 'number' ? inscription.longitude : parseFloat(String(inscription.longitude))
            }
          };
        }

        // Try to find coordinates using signum mapping
        const coords = await findCoordinatesForInscription(inscription);
        
        if (coords) {
          successCount++;
          console.log(`✅ Found coordinates for ${inscription.signum}:`, coords);
        }
        
        return {
          ...inscription,
          coordinates: coords
        };
      } catch (error) {
        console.warn(`Failed to enrich inscription ${inscription.signum}:`, error);
        return inscription;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    enrichedInscriptions.push(...batchResults);
    
    // Small delay between batches to prevent overwhelming the browser
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  // Add remaining inscriptions without coordinate enrichment
  const remainingInscriptions = inscriptions.slice(MAX_COORDINATE_SEARCHES);
  enrichedInscriptions.push(...remainingInscriptions);

  // Debug statistics
  const withCoords = enrichedInscriptions.filter(i => i.coordinates);
  const withUnknownLocation = enrichedInscriptions.filter(i => 
    !i.location || i.location === 'Plats okänd (endast signum från databas)'
  );

  console.log(`✅ Enhanced data loading complete:`);
  console.log(`  - Total inscriptions: ${enrichedInscriptions.length}`);
  console.log(`  - With coordinates: ${withCoords.length} (${Math.round(withCoords.length / enrichedInscriptions.length * 100)}%)`);
  console.log(`  - Existing coordinates: ${existingCount}`);
  console.log(`  - New coordinates found: ${successCount}`);
  console.log(`  - With unknown location: ${withUnknownLocation.length} (${Math.round(withUnknownLocation.length / enrichedInscriptions.length * 100)}%)`);
  
  // Debug: Show some examples of enriched data
  const coordExamples = withCoords.slice(0, 5).map(i => ({
    signum: i.signum,
    coordinates: i.coordinates,
    location: i.location
  }));
  console.log('📍 Examples of inscriptions with coordinates:', coordExamples);

  return enrichedInscriptions;
};

const findCoordinatesForInscription = async (inscription: any): Promise<{ lat: number; lng: number } | null> => {
  if (!inscription.signum) {
    return null;
  }

  try {
    console.log(`🔍 Looking for coordinates for signum: ${inscription.signum}`);

    // 1. Check coordinates table first using signum as object_id
    const { data: coordData, error: coordError } = await supabase
      .from('coordinates')
      .select('latitude, longitude, object_id')
      .eq('object_id', inscription.signum)
      .maybeSingle();

    if (coordError) {
      console.warn(`Error querying coordinates for ${inscription.signum}:`, coordError);
    }

    if (coordData && coordData.latitude && coordData.longitude) {
      console.log(`📍 Found coordinates in coordinates table for ${inscription.signum}:`, coordData);
      return {
        lat: typeof coordData.latitude === 'number' ? coordData.latitude : parseFloat(String(coordData.latitude)),
        lng: typeof coordData.longitude === 'number' ? coordData.longitude : parseFloat(String(coordData.longitude))
      };
    }

    // 2. Try variations of signum (with/without spaces, different cases)
    const signumVariations = [
      inscription.signum,
      inscription.signum.replace(/\s+/g, ''), // Remove spaces
      inscription.signum.replace(/\s+/g, ' '), // Normalize spaces
      inscription.signum.toLowerCase(),
      inscription.signum.toUpperCase(),
      inscription.rundata_signum, // Alternative signum field
    ].filter(Boolean);

    console.log(`🔍 Trying signum variations for ${inscription.signum}:`, signumVariations);

    for (const signumVariation of signumVariations) {
      const { data: coordVariationData } = await supabase
        .from('coordinates')
        .select('latitude, longitude, object_id')
        .eq('object_id', signumVariation)
        .maybeSingle();

      if (coordVariationData && coordVariationData.latitude && coordVariationData.longitude) {
        console.log(`📍 Found coordinates with variation ${signumVariation} for ${inscription.signum}:`, coordVariationData);
        return {
          lat: typeof coordVariationData.latitude === 'number' ? coordVariationData.latitude : parseFloat(String(coordVariationData.latitude)),
          lng: typeof coordVariationData.longitude === 'number' ? coordVariationData.longitude : parseFloat(String(coordVariationData.longitude))
        };
      }
    }

    // 3. Check locations table for additional location data based on inscription ID
    const { data: locationData } = await supabase
      .from('locations')
      .select('location, object_id')
      .eq('object_id', inscription.id)
      .maybeSingle();

    if (locationData && locationData.location && locationData.location !== 'Plats okänd (endast signum från databas)') {
      console.log(`📍 Found location data for ${inscription.signum}: ${locationData.location}`);
      // Update the inscription's location field if it was unknown
      inscription.location = locationData.location;
    }

    // 4. Fallback to parsing existing coordinate strings if present
    if (inscription.coordinates && typeof inscription.coordinates === 'string') {
      const parsed = parseCoordinates(inscription.coordinates);
      if (parsed) {
        console.log(`📍 Parsed coordinates from string for ${inscription.signum}:`, parsed);
        return parsed;
      }
    }

    console.log(`❌ No coordinates found for signum: ${inscription.signum}`);
    return null;
  } catch (error) {
    console.error(`Error finding coordinates for ${inscription.signum}:`, error);
    return null;
  }
};
