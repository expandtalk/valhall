
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { valdemarsRoute, getRoutesBySection, getRouteColor, getMainRoute } from '@/utils/valdemarsRoute';

interface UseMapRouteProps {
  map: L.Map | null;
  isVikingMode: boolean;
  enabledLegendItems: { [key: string]: boolean };
  isMapReady: React.MutableRefObject<boolean>;
  mapContainer: React.RefObject<HTMLDivElement>;
  safelyAddLayer: (layer: L.Layer) => boolean;
  selectedTimePeriod?: string;
}

export const useMapRoute = ({ 
  map, 
  isVikingMode, 
  enabledLegendItems, 
  isMapReady, 
  mapContainer, 
  safelyAddLayer,
  selectedTimePeriod = 'viking_age'
}: UseMapRouteProps) => {
  const routeLayer = useRef<L.Polyline | null>(null);
  const routeMarkers = useRef<L.Marker[]>([]);

  // Clear route layers
  const clearRouteLayers = () => {
    if (!map) return;

    // Clear route
    if (routeLayer.current) {
      try {
        map.removeLayer(routeLayer.current);
      } catch (error) {
        console.error('Error removing route layer:', error);
      }
      routeLayer.current = null;
    }
    
    // Clear route markers
    routeMarkers.current.forEach(marker => {
      try {
        marker.remove();
      } catch (error) {
        console.error('Error removing route marker:', error);
      }
    });
    routeMarkers.current = [];
  };

  useEffect(() => {
    if (!map || !isMapReady.current || !mapContainer.current) {
      console.log('Map not ready for route setup');
      return;
    }

    if (!document.contains(mapContainer.current)) {
      console.warn('Map container not in DOM during route setup');
      return;
    }

    // Clear existing route
    clearRouteLayers();

    // FIXAD: Visa Valdemars rutt både i viking mode och modern mode, men bara under viking_age timeline
    // OCH kontrollera att den är aktiverad i legend
    const shouldShowRoute = selectedTimePeriod === 'viking_age' && 
                           enabledLegendItems.valdemars_route !== false;

    console.log('🛣️ Route visibility check:', {
      selectedTimePeriod,
      valdemarsRouteEnabled: enabledLegendItems.valdemars_route,
      shouldShowRoute
    });

    if (shouldShowRoute) {
      setTimeout(() => {
        if (!map || !isMapReady.current || !mapContainer.current || !document.contains(mapContainer.current)) {
          console.warn('Map not ready for route addition');
          return;
        }

        try {
          const routeColor = getRouteColor(isVikingMode);
          const mainRoute = getMainRoute();
          const sections = getRoutesBySection();
          
          console.log(`Route sections available:`, Object.keys(sections));
          
          // Create main route line
          const mainRouteCoordinates = mainRoute.map(point => [point.coordinates.lat, point.coordinates.lng] as [number, number]);
          
          const polyline = L.polyline(mainRouteCoordinates, {
            color: routeColor,
            weight: 4,
            opacity: 0.9,
            smoothFactor: 1.5,
            dashArray: '10, 5',
            lineCap: 'round',
            lineJoin: 'round'
          });
          
          if (safelyAddLayer(polyline)) {
            routeLayer.current = polyline;
          } else {
            console.warn('Failed to add route polyline');
            return;
          }

          // Add route point markers with sail icon for major points
          const allRoutePoints = valdemarsRoute();
          allRoutePoints.forEach((point, index) => {
            if (!map || !isMapReady.current || !mapContainer.current || !document.contains(mapContainer.current)) {
              console.warn('Map not ready for marker addition');
              return;
            }

            const isLotstation = point.isLotstation;
            const isStart = index === 0;
            const isEnd = point.id === 'tallinn';
            const isMajorHub = ['braviken', 'stockholm', 'kokar', 'hanko', 'porkala'].includes(point.id);
            const isAlternative = ['Alternativ ostlig', 'Inre Stockholm', 'Genväg'].includes(point.section || '');
            
            let size = 4;
            let borderWidth = 1;
            let markerColor = routeColor;
            let opacity = isAlternative ? 0.6 : 1.0;
            let iconHtml = '';
            
            if (isStart || isEnd || isMajorHub) {
              // Use sail icon for major waypoints
              iconHtml = '<svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20v-8l5-3V4a1 1 0 0 1 2 0v5l5 3v8H3zm6-2h4v-4l-2-1.2L9 14v4z"/></svg>';
              size = isStart || isEnd ? 12 : 10;
              borderWidth = 2;
              markerColor = isStart ? '#22c55e' : isEnd ? '#ef4444' : '#8b5cf6';
            } else if (isLotstation) {
              iconHtml = '<svg width="6" height="6" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3"/></svg>';
              size = 8;
              borderWidth = 2;
              markerColor = '#f59e0b';
            } else {
              iconHtml = '<svg width="4" height="4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/></svg>';
              size = isAlternative ? 3 : 4;
              markerColor = isAlternative ? '#6366f1' : routeColor;
            }
            
            const customIcon = L.divIcon({
              html: `<div style="
                background: ${markerColor};
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                border: ${borderWidth}px solid white;
                box-shadow: 0 1px 3px rgba(0,0,0,0.4);
                opacity: ${opacity};
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
              ">${iconHtml}</div>`,
              className: 'valdemars-route-marker',
              iconSize: [size + borderWidth * 2, size + borderWidth * 2],
              iconAnchor: [(size + borderWidth * 2) / 2, (size + borderWidth * 2) / 2]
            });

            const marker = L.marker([point.coordinates.lat, point.coordinates.lng], { icon: customIcon })
              .bindPopup(`
                <div class="p-3 max-w-sm">
                  <h3 class="font-bold text-base ${isLotstation ? 'text-amber-700' : isMajorHub ? 'text-purple-700' : 'text-blue-700'}">${point.name}</h3>
                  <p class="text-sm text-gray-600 mt-1">${point.description}</p>
                  ${point.section ? `<span class="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">${point.section}</span>` : ''}
                  ${isStart ? '<div class="text-xs text-green-600 mt-1">🚢 Startpunkt</div>' : ''}
                  ${isEnd ? '<div class="text-xs text-red-600 mt-1">🏁 Slutdestination</div>' : ''}
                  ${isLotstation ? '<div class="text-xs text-amber-600 mt-1">⚓ Lotstation</div>' : ''}
                  ${isMajorHub ? '<div class="text-xs text-purple-600 mt-1">🏛️ Handelscentrum</div>' : ''}
                  ${isAlternative ? '<div class="text-xs text-indigo-600 mt-1">🔄 Alternativ rutt</div>' : ''}
                </div>
              `);

            if (safelyAddLayer(marker)) {
              routeMarkers.current.push(marker);
            } else {
              console.warn(`Failed to add marker for ${point.name}`);
            }
          });

          console.log(`✅ Added detailed Valdemar's sailing route with ${allRoutePoints.length} waypoints`);
        } catch (error) {
          console.error('Error adding route:', error);
        }
      }, 500);
    } else {
      console.log('🚫 Valdemar\'s route not shown - either wrong time period or disabled in legend');
    }

    return () => {
      clearRouteLayers();
    };
  }, [map, isVikingMode, enabledLegendItems, isMapReady, mapContainer, safelyAddLayer, selectedTimePeriod]);

  return { clearRouteLayers };
};
