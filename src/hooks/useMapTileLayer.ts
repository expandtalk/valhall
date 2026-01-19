
import { useEffect, useRef } from 'react';
import L from 'leaflet';

interface UseMapTileLayerProps {
  map: L.Map | null;
  isVikingMode: boolean;
  enabledLegendItems: { [key: string]: boolean };
  isMapReady: React.MutableRefObject<boolean>;
  mapContainer: React.RefObject<HTMLDivElement>;
  safelyAddLayer: (layer: L.Layer) => boolean;
}

export const useMapTileLayer = ({ 
  map, 
  isVikingMode, 
  enabledLegendItems,
  isMapReady, 
  mapContainer, 
  safelyAddLayer 
}: UseMapTileLayerProps) => {
  const currentTileLayer = useRef<L.TileLayer | null>(null);

  useEffect(() => {
    if (!map || !isMapReady.current || !mapContainer.current) {
      console.log('Map not ready for tile layer');
      return;
    }

    if (!document.contains(mapContainer.current)) {
      console.warn('Map container not in DOM during tile layer setup');
      return;
    }

    // Remove existing tile layer
    if (currentTileLayer.current) {
      try {
        currentTileLayer.current.remove();
      } catch (error) {
        console.error('Error removing tile layer:', error);
      }
    }

    // Add appropriate tile layer based on mode - historical vs modern approach
    let tileLayer: L.TileLayer;

    if (isVikingMode) {
      // Use terrain-focused map without modern city labels - shows geography but not anachronistic labels
      tileLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri — Source: US National Park Service',
        maxZoom: 18,
        opacity: 1.0,
        className: 'viking-terrain-tiles'
      });
      
      // Add historical styling to map container
      setTimeout(() => {
        if (mapContainer.current) {
          mapContainer.current.classList.add('viking-terrain-map');
          mapContainer.current.classList.remove('modern-natural-map');
        }
      }, 100);
      
    } else {
      // Detailed map with modern labels for modern mode
      tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        opacity: 1.0,
        className: 'modern-detailed-tiles'
      });
      
      // Remove historical styling for modern mode
      setTimeout(() => {
        if (mapContainer.current) {
          mapContainer.current.classList.remove('viking-terrain-map');
          mapContainer.current.classList.add('modern-natural-map');
        }
      }, 100);
    }

    if (safelyAddLayer(tileLayer)) {
      currentTileLayer.current = tileLayer;
      console.log(`Added ${isVikingMode ? 'historical terrain' : 'modern detailed'} tile layer`);
    }

    return () => {
      if (currentTileLayer.current) {
        try {
          currentTileLayer.current.remove();
        } catch (error) {
          console.error('Error removing tile layer on cleanup:', error);
        }
      }
    };
  }, [map, isVikingMode, isMapReady, mapContainer, safelyAddLayer]);

  return { currentTileLayer };
};
