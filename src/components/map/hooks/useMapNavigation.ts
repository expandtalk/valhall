
import { useCallback, useEffect } from 'react';
import L from 'leaflet';

interface UseMapNavigationProps {
  map: L.Map | null;
  onMapNavigate?: (navFunction: (lat: number, lng: number, zoom: number) => void) => void;
}

export const useMapNavigation = ({ map, onMapNavigate }: UseMapNavigationProps) => {
  // Set up map navigation function with proper validation
  const handleMapNavigate = useCallback((lat: number, lng: number, zoom: number) => {
    // Validate coordinates before attempting to navigate
    if (!map) {
      console.warn('Map not initialized for navigation');
      return;
    }

    if (lat === null || lat === undefined || lng === null || lng === undefined) {
      console.warn('Invalid coordinates for map navigation:', { lat, lng, zoom });
      return;
    }

    if (isNaN(lat) || isNaN(lng) || isNaN(zoom)) {
      console.warn('NaN values in coordinates for map navigation:', { lat, lng, zoom });
      return;
    }

    // Additional validation for reasonable coordinate ranges
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.warn('Coordinates out of valid range:', { lat, lng, zoom });
      return;
    }

    if (zoom < 0 || zoom > 20) {
      console.warn('Zoom level out of valid range:', { zoom });
      return;
    }

    try {
      map.setView([lat, lng], zoom, { animate: true, duration: 1.5 });
    } catch (error) {
      console.error('Error navigating map:', error, { lat, lng, zoom });
    }
  }, [map]);

  // Call parent onMapNavigate if provided
  useEffect(() => {
    if (onMapNavigate) {
      console.log('🗺️ [useMapNavigation] Passing navigation function up to parent component.');
      onMapNavigate(handleMapNavigate);
    }
  }, [handleMapNavigate, onMapNavigate]);

  return { handleMapNavigate };
};
