
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { getVikingRegionsByPeriod } from '@/utils/vikingEraRegions';
import { createVikingRegionMarker } from '@/utils/vikingRegionMarkers';

export const useMapVikingRegions = (
  map: L.Map | null,
  selectedPeriod: string,
  enabled: boolean = true
) => {
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!map || !enabled) return;

    // ✅ SÄKER borttagning av Viking region markers
    markersRef.current.forEach(marker => {
      try {
        if (marker && map && map.hasLayer && map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      } catch (error) {
        console.warn('⚠️ Error removing Viking region marker:', error);
      }
    });
    markersRef.current = [];

    // Get Viking regions for the selected period
    const vikingRegions = getVikingRegionsByPeriod(selectedPeriod);

    // Create markers for each region
    vikingRegions.forEach(region => {
      const safelyAddLayer = (layer: L.Layer): boolean => {
        try {
          map.addLayer(layer);
          return true;
        } catch (error) {
          console.warn('Failed to add layer to map:', error);
          return false;
        }
      };

      // Handle marker click to focus map on location
      const handleMarkerClick = (clickedRegion: typeof region) => {
        console.log(`Focusing map on: ${clickedRegion.vikingName} at [${clickedRegion.lat}, ${clickedRegion.lng}]`);
        
        // Focus map on the clicked location with appropriate zoom
        map.setView([clickedRegion.lat, clickedRegion.lng], 8, {
          animate: true,
          duration: 1.5
        });
      };

      const marker = createVikingRegionMarker(region, safelyAddLayer, handleMarkerClick);
      
      if (marker && safelyAddLayer(marker)) {
        markersRef.current.push(marker);
      }
    });

    console.log(`Added ${markersRef.current.length} Viking region markers for period: ${selectedPeriod}`);

    // ✅ SÄKER cleanup function
    return () => {
      markersRef.current.forEach(marker => {
        try {
          if (marker && map && map.hasLayer && map.hasLayer(marker)) {
            map.removeLayer(marker);
          }
        } catch (error) {
          console.warn('⚠️ Error removing Viking region marker during cleanup:', error);
        }
      });
      markersRef.current = [];
    };
  }, [map, selectedPeriod, enabled]);

  return {
    vikingRegionMarkers: markersRef.current
  };
};
