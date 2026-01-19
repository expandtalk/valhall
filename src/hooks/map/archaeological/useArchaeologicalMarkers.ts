
import { useRef, useEffect } from 'react';
import L from 'leaflet';
import { getFindsInPeriod, ARCHAEOLOGICAL_FINDS, clusterFinds } from '@/utils/archaeologicalFinds';
import { createSingleFindMarker, createClusterMarker } from './markerCreators';
import { ArchaeologicalFind, FindCluster } from '@/utils/archaeologicalFinds/types';

interface UseArchaeologicalMarkersProps {
  map: L.Map | null;
  selectedPeriod: string;
  enabledLegendItems: { [key: string]: boolean };
  isMapReady: React.RefObject<boolean>;
  safelyAddLayer: (layer: L.Layer) => boolean;
  showClustering?: boolean;
}

export const useArchaeologicalMarkers = ({
  map,
  selectedPeriod,
  enabledLegendItems,
  isMapReady,
  safelyAddLayer,
  showClustering = true
}: UseArchaeologicalMarkersProps) => {
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!map || !isMapReady.current) return;

    // ✅ SÄKER borttagning av archaeological markers
    markersRef.current.forEach(marker => {
      try {
        if (marker && map && map.hasLayer && map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      } catch (error) {
        console.warn('⚠️ Error removing archaeological marker:', error);
      }
    });
    markersRef.current = [];

    // Add archaeological finds if enabled
    if (enabledLegendItems.archaeological_finds !== false) {
      const finds = getFindsInPeriod(ARCHAEOLOGICAL_FINDS, selectedPeriod);
      
      if (showClustering) {
        const clusteredItems = clusterFinds(finds, 5); // 5km clustering radius
        
        clusteredItems.forEach(item => {
          let marker: L.Marker | null = null;
          
          // Type guard to check if it's a cluster (FindCluster) or single find (ArchaeologicalFind)
          if ('finds' in item && Array.isArray(item.finds)) {
            // It's a cluster - convert to ClusteredItem format
            const clusterItem = {
              lat: item.centerLat,
              lng: item.centerLng,
              finds: item.finds
            };
            marker = createClusterMarker(clusterItem, map, isMapReady);
          } else {
            // It's a single find - cast to ArchaeologicalFind since we know it's not a cluster
            marker = createSingleFindMarker(item as ArchaeologicalFind, map, isMapReady);
          }
          
          if (marker && safelyAddLayer(marker)) {
            markersRef.current.push(marker);
          }
        });
      } else {
        finds.forEach(find => {
          const marker = createSingleFindMarker(find, map, isMapReady);
          if (marker && safelyAddLayer(marker)) {
            markersRef.current.push(marker);
          }
        });
      }

      console.log(`Added ${markersRef.current.length} archaeological markers for period: ${selectedPeriod}`);
    }

    return () => {
      // ✅ SÄKER cleanup
      markersRef.current.forEach(marker => {
        try {
          if (marker && map && map.hasLayer && map.hasLayer(marker)) {
            map.removeLayer(marker);
          }
        } catch (error) {
          console.warn('⚠️ Error removing archaeological marker during cleanup:', error);
        }
      });
      markersRef.current = [];
    };
  }, [map, selectedPeriod, enabledLegendItems.archaeological_finds, isMapReady, safelyAddLayer, showClustering]);

  return {
    archaeologicalMarkers: markersRef.current,
    findCount: getFindsInPeriod(ARCHAEOLOGICAL_FINDS, selectedPeriod).length
  };
};
