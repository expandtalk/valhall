
import { supabase } from "@/integrations/supabase/client";
import { getEnhancedCoordinates } from '../../utils/coordinateMappingEnhanced';

// Enhanced coordinate enrichment with much better coverage
const MAX_COORDINATE_SEARCHES = 200; // Increased limit
const COORDINATE_SEARCH_BATCH_SIZE = 50; // Larger batches

export const enrichInscriptionsWithEnhancedCoordinates = async (inscriptions: any[]) => {
  console.log(`🚀 Starting ENHANCED coordinate enrichment for ${inscriptions.length} inscriptions`);
  
  if (!inscriptions || inscriptions.length === 0) {
    return [];
  }

  // Process more inscriptions with enhanced mapping
  const limitedInscriptions = inscriptions.slice(0, MAX_COORDINATE_SEARCHES);
  
  // Process in larger batches since enhanced mapping is more efficient
  const batches = [];
  for (let i = 0; i < limitedInscriptions.length; i += COORDINATE_SEARCH_BATCH_SIZE) {
    batches.push(limitedInscriptions.slice(i, i + COORDINATE_SEARCH_BATCH_SIZE));
  }

  const enrichedInscriptions = [];
  let enhancedCount = 0;
  let existingCount = 0;
  let fallbackCount = 0;

  for (const batch of batches) {
    const batchPromises = batch.map(async (inscription) => {
      try {
        // Skip if coordinates already exist
        if (inscription.coordinates && typeof inscription.coordinates === 'object' && 'lat' in inscription.coordinates && 'lng' in inscription.coordinates) {
          existingCount++;
          return inscription;
        }

        if (inscription.latitude && inscription.longitude) {
          existingCount++;
          return {
            ...inscription,
            coordinates: {
              lat: typeof inscription.latitude === 'number' ? inscription.latitude : parseFloat(String(inscription.latitude)),
              lng: typeof inscription.longitude === 'number' ? inscription.longitude : parseFloat(String(inscription.longitude))
            }
          };
        }

        // Use enhanced coordinate mapping
        const coords = getEnhancedCoordinates(inscription, false);
        
        if (coords) {
          enhancedCount++;
          console.log(`✅ Enhanced coordinates for ${inscription.signum}:`, coords);
        } else {
          fallbackCount++;
        }
        
        return {
          ...inscription,
          coordinates: coords
        };
      } catch (error) {
        console.warn(`Failed to enhance inscription ${inscription.signum}:`, error);
        return inscription;
      }
    });

    const batchResults = await Promise.all(batchPromises);
    enrichedInscriptions.push(...batchResults);
    
    // Small delay between batches
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 25));
    }
  }

  // Add remaining inscriptions without enhancement
  const remainingInscriptions = inscriptions.slice(MAX_COORDINATE_SEARCHES);
  enrichedInscriptions.push(...remainingInscriptions);

  // Enhanced statistics
  const withCoords = enrichedInscriptions.filter(i => i.coordinates);
  const withUnknownLocation = enrichedInscriptions.filter(i => 
    !i.location || i.location === 'Plats okänd (endast signum från databas)'
  );

  console.log(`🎯 ENHANCED coordinate enrichment results:`);
  console.log(`  - Total inscriptions: ${enrichedInscriptions.length}`);
  console.log(`  - With coordinates: ${withCoords.length} (${Math.round(withCoords.length / enrichedInscriptions.length * 100)}%)`);
  console.log(`  - Existing coordinates: ${existingCount}`);
  console.log(`  - Enhanced coordinates: ${enhancedCount}`);
  console.log(`  - Still without coordinates: ${fallbackCount}`);
  console.log(`  - With unknown location text: ${withUnknownLocation.length}`);
  
  // Show examples of enhanced data by region
  const regionExamples = ['DR', 'U', 'Sö', 'BN', 'Ög'].map(region => {
    const example = withCoords.find(i => i.signum?.startsWith(region));
    return example ? {
      region,
      signum: example.signum,
      coordinates: example.coordinates,
      location: example.location
    } : null;
  }).filter(Boolean);
  
  console.log('🗺️ Enhanced coordinate examples by region:', regionExamples);

  return enrichedInscriptions;
};
