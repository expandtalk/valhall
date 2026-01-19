
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { getAllVikingLocations } from '@/utils/vikingEraLocations';

interface UseMapVikingLocationsProps {
  map: L.Map | null;
  isVikingMode: boolean;
  enabledLegendItems: { [key: string]: boolean };
  isMapReady: React.MutableRefObject<boolean>;
  mapContainer: React.RefObject<HTMLDivElement>;
  safelyAddLayer: (layer: L.Layer) => boolean;
}

export const useMapVikingLocations = ({ 
  map, 
  isVikingMode, 
  enabledLegendItems, 
  isMapReady, 
  mapContainer, 
  safelyAddLayer 
}: UseMapVikingLocationsProps) => {
  const vikingMarkers = useRef<L.Marker[]>([]);
  const addedLocations = useRef<Set<string>>(new Set());

  // Clear Viking markers
  const clearVikingMarkers = () => {
    vikingMarkers.current.forEach(marker => {
      try {
        marker.remove();
      } catch (error) {
        console.error('Error removing viking marker:', error);
      }
    });
    vikingMarkers.current = [];
    addedLocations.current.clear();
  };

  useEffect(() => {
    if (!map || !isMapReady.current || !mapContainer.current) {
      console.log('Map not ready for Viking locations');
      return;
    }

    if (!document.contains(mapContainer.current)) {
      console.warn('Map container not in DOM during Viking locations setup');
      return;
    }

    // Clear existing Viking markers
    clearVikingMarkers();

    // Add Viking era locations if in Viking mode - but skip duplicates with regions
    if (isVikingMode) {
      setTimeout(() => {
        if (!map || !isMapReady.current || !mapContainer.current || !document.contains(mapContainer.current)) {
          console.warn('Map not ready for Viking locations');
          return;
        }

        try {
          const vikingLocations = getAllVikingLocations();
          
          // Comprehensive list of locations already covered by Viking regions or should be skipped
          const skipLocations = new Set([
            // Major cities and trading posts already in Viking regions
            'Birka', 'Hedeby', 'York', 'Jorvik', 'Dublin', 'Dyflin', 
            'Gamla Uppsala', 'Uppsala', 'Ribe', 'Aalborg', 'Ålborg',
            'Kiev', 'Staraja Ladoga', 'Aldeigjuborg', 'Paris', 'Lutetia',
            'London', 'Lundenwic', 'Hamburg', 'Hammaburg', 'Dorestad',
            'Visby', 'Gotland', 'Kaupang', 'Roskilde', 'Bergen',
            'Västra Aros', 'Sigtuna', 'Nidaros', 'Trondheim',
            // Combination names that might appear
            'Nidaros/Trondheim', 'Västra Aros/Uppsala', 'Jorvik/York',
            // Geographic regions
            'Isle of Man', 'Shetland', 'Orkney', 'Faroe Islands',
            // Problematic modern references
            'Salme', 'Saaremaa' // These have modern ship icons
          ]);
          
          vikingLocations.forEach(location => {
            if (!map || !isMapReady.current || !mapContainer.current || !document.contains(mapContainer.current)) {
              console.warn('Map not ready for Viking location marker');
              return;
            }

            // Check for exact matches
            if (skipLocations.has(location.name)) {
              console.log(`Skipping duplicate location (exact match): ${location.name}`);
              return;
            }

            // Check for partial matches to catch variations
            const shouldSkip = Array.from(skipLocations).some(skipName => {
              const locationName = location.name.toLowerCase();
              const skipNameLower = skipName.toLowerCase();
              // More strict partial matching - only skip if names are very similar
              return locationName.includes(skipNameLower) || 
                     skipNameLower.includes(locationName) ||
                     // Check for common variations
                     (locationName.includes('uppsala') && skipNameLower.includes('uppsala')) ||
                     (locationName.includes('hedeby') && skipNameLower.includes('hedeby')) ||
                     (locationName.includes('birka') && skipNameLower.includes('birka'));
            });

            if (shouldSkip) {
              console.log(`Skipping duplicate location (partial match): ${location.name}`);
              return;
            }

            // Create unique identifier to prevent duplicates
            const locationId = `${location.lat}-${location.lng}-${location.name}`;
            if (addedLocations.current.has(locationId)) {
              console.log(`Skipping already added location: ${location.name}`);
              return;
            }

            // Map categories to legend items
            let legendKey = location.category;
            if (location.category === 'trading_post') {
              legendKey = 'trading_post';
            } else if (location.category === 'settlement') {
              legendKey = 'settlement';
            }

            const categoryEnabled = enabledLegendItems[legendKey] !== false;
            if (!categoryEnabled) return;

            const iconColor = {
              'trading_post': '#10b981',
              'political_center': '#daa520',  
              'settlement': '#a0522d',
              'fortress': '#8b4513',
              'exploration': '#d2691e',
              'religious_center': '#fbbf24'
            }[location.category] || '#8b7355';

            const customIcon = L.divIcon({
              html: `<div style="
                background: ${iconColor};
                width: 4px;
                height: 4px;
                border-radius: 50%;
                border: 1px solid rgba(30, 41, 59, 0.8);
                box-shadow: 0 1px 2px rgba(0,0,0,0.4);
                position: relative;
              "></div>`,
              className: 'viking-location-marker-minimal',
              iconSize: [4, 4],
              iconAnchor: [2, 2]
            });

            const marker = L.marker([location.lat, location.lng], { icon: customIcon })
              .bindPopup(`
                <div style="background: rgba(30, 41, 59, 0.98) !important; color: white !important; padding: 8px; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border: 1px solid rgba(139, 115, 85, 0.8); backdrop-filter: blur(8px);">
                  <h3 style="font-weight: bold; font-size: 14px; color: #fbbf24 !important; margin: 0 0 6px 0;">${location.name}</h3>
                  <p style="font-size: 12px; color: rgba(255,255,255,0.9) !important; margin: 0 0 6px 0; line-height: 1.3;">${location.description}</p>
                  <span style="display: inline-block; padding: 2px 6px; background: rgba(251, 191, 36, 0.2); color: #fbbf24 !important; font-size: 10px; border-radius: 8px; border: 1px solid rgba(251, 191, 36, 0.4);">
                    ${location.category.replace('_', ' ')}
                  </span>
                </div>
              `, {
                className: 'viking-location-popup-dark'
              });

            if (safelyAddLayer(marker)) {
              vikingMarkers.current.push(marker);
              addedLocations.current.add(locationId);
              console.log(`Added Viking location: ${location.name}`);
            } else {
              console.warn(`Failed to add Viking location marker for ${location.name}`);
            }
          });

          const visibleLocations = vikingLocations.filter(loc => {
            // Apply same filtering logic as above
            if (skipLocations.has(loc.name)) return false;
            
            const shouldSkip = Array.from(skipLocations).some(skipName => {
              const locationName = loc.name.toLowerCase();
              const skipNameLower = skipName.toLowerCase();
              return locationName.includes(skipNameLower) || 
                     skipNameLower.includes(locationName) ||
                     (locationName.includes('uppsala') && skipNameLower.includes('uppsala')) ||
                     (locationName.includes('hedeby') && skipNameLower.includes('hedeby')) ||
                     (locationName.includes('birka') && skipNameLower.includes('birka'));
            });
            
            if (shouldSkip) return false;
            
            let legendKey = loc.category;
            if (loc.category === 'trading_post') legendKey = 'trading_post';
            else if (loc.category === 'settlement') legendKey = 'settlement';
            return enabledLegendItems[legendKey] !== false;
          });
          
          console.log(`Added ${visibleLocations.length} unique Viking era locations to themed map`);
        } catch (error) {
          console.error('Error adding Viking locations:', error);
        }
      }, 700);
    }

    return () => {
      clearVikingMarkers();
    };
  }, [map, isVikingMode, enabledLegendItems, isMapReady, mapContainer, safelyAddLayer]);

  return { clearVikingMarkers };
};
