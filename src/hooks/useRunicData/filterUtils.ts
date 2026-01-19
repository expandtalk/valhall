
import type { Inscription, UseRunicDataProps } from './types';
import { searchPlacesForGodNames } from '../../utils/godNameUtils';

export const applyClientSideFilters = async (inscriptions: Inscription[], filters: UseRunicDataProps): Promise<Inscription[]> => {
  let filtered = [...inscriptions];

  // Apply period filtering
  if (filters.selectedPeriod && filters.selectedPeriod !== 'all') {
    // Apply period-based filtering logic here
  }

  // Apply object type filtering
  if (filters.selectedObjectType && filters.selectedObjectType !== 'all') {
    filtered = filtered.filter(inscription => 
      inscription.object_type?.toLowerCase().includes(filters.selectedObjectType!.toLowerCase())
    );
  }

  // Apply status filtering
  if (filters.selectedStatus && filters.selectedStatus !== 'all') {
    // Apply status-based filtering logic here
  }

  // Apply landscape filtering
  if (filters.selectedLandscape && filters.selectedLandscape !== 'all') {
    filtered = filtered.filter(inscription => 
      inscription.landscape?.toLowerCase().includes(filters.selectedLandscape!.toLowerCase()) ||
      inscription.province?.toLowerCase().includes(filters.selectedLandscape!.toLowerCase()) ||
      inscription.county?.toLowerCase().includes(filters.selectedLandscape!.toLowerCase())
    );
  }

  // Apply god name filtering - search in places database
  if (filters.godNameSearch) {
    console.log('🔍 Applying god name filter for:', filters.godNameSearch);
    
    try {
      const godPlaceResults = await searchPlacesForGodNames(filters.godNameSearch);
      console.log('📍 Found god places:', godPlaceResults.length);
      
      if (godPlaceResults.length > 0) {
        const godPlaceNames = godPlaceResults.map(result => result.place.place.toLowerCase());
        console.log('🎯 Filtering inscriptions by god place names:', godPlaceNames);
        
        filtered = filtered.filter(inscription => {
          // Check if inscription location matches any god place
          const locationMatch = inscription.location && 
            godPlaceNames.some(placeName => 
              inscription.location!.toLowerCase().includes(placeName) ||
              placeName.includes(inscription.location!.toLowerCase())
            );
          
          // Check other location fields
          const provinceMatch = inscription.province && 
            godPlaceNames.some(placeName => 
              inscription.province!.toLowerCase().includes(placeName) ||
              placeName.includes(inscription.province!.toLowerCase())
            );
          
          const parishMatch = inscription.parish && 
            godPlaceNames.some(placeName => 
              inscription.parish!.toLowerCase().includes(placeName) ||
              placeName.includes(inscription.parish!.toLowerCase())
            );
          
          const municipalityMatch = inscription.municipality && 
            godPlaceNames.some(placeName => 
              inscription.municipality!.toLowerCase().includes(placeName) ||
              placeName.includes(inscription.municipality!.toLowerCase())
            );

          return locationMatch || provinceMatch || parishMatch || municipalityMatch;
        });
      }
    } catch (error) {
      console.error('Error in god name filtering:', error);
    }
  }

  return filtered;
};
