
import { useRef, useEffect } from 'react';
import L from 'leaflet';

interface UseMapInstanceProps {
  isVikingMode: boolean;
}

export const useMapInstance = ({ isVikingMode }: UseMapInstanceProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // ✅ SÄKER map initialization med race condition-skydd
    const mapInstance = L.map(mapContainer.current, {
      center: [60.0, 15.0], // Centered on Scandinavia
      zoom: 5, // Good zoom level to see all of Scandinavia
      preferCanvas: true, // Förbättrar prestanda och förhindrar DOM-problem
      worldCopyJump: true,
      // ✅ Tilläggsåtgärder för att förhindra race conditions
      fadeAnimation: false, // Undvik CSS transitions som kan orsaka DOM-problem
      zoomAnimation: true,
      markerZoomAnimation: false // Förhindra marker animations under zoom
    });

    map.current = mapInstance;

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return { mapContainer, map };
};
