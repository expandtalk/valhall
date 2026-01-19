import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useArchaeologicalSiteMarkers, ArchaeologicalSiteMarker } from '@/hooks/map/useArchaeologicalSiteMarkers';

interface ArchaeologicalSitesLayerProps {
  map: L.Map | null;
  selectedTimePeriod: string;
  enabledLegendItems: { [key: string]: boolean };
  isVisible: boolean;
  onSiteClick?: (siteId: string) => void;
}

export const ArchaeologicalSitesLayer: React.FC<ArchaeologicalSitesLayerProps> = ({
  map,
  selectedTimePeriod,
  enabledLegendItems,
  isVisible,
  onSiteClick
}) => {
  const markersRef = useRef<L.Marker[]>([]);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  
  const archaeologicalSites = useArchaeologicalSiteMarkers(selectedTimePeriod, enabledLegendItems);

  // ✅ SÄKER borttagning av markers
  const clearMarkers = () => {
    try {
      if (layerGroupRef.current && map && map.hasLayer && map.hasLayer(layerGroupRef.current)) {
        layerGroupRef.current.clearLayers();
      }
      markersRef.current = [];
    } catch (error) {
      console.warn('⚠️ Error clearing archaeological site markers:', error);
    }
  };

  // Create marker for archaeological site
  const createArchaeologicalSiteMarker = (site: ArchaeologicalSiteMarker): L.Marker => {
    // Create custom icon with symbol and color
    const iconHtml = `
      <div style="
        background-color: ${site.color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        ${site.symbol}
      </div>
    `;

    const customIcon = L.divIcon({
      html: iconHtml,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
      className: 'archaeological-site-marker'
    });

    const marker = L.marker(site.position, { icon: customIcon })
      .bindPopup(site.popupContent, {
        maxWidth: 300,
        className: 'archaeological-site-popup'
      });

    // Add click handler
    marker.on('click', () => {
      if (onSiteClick) {
        onSiteClick(site.id);
      }
    });

    return marker;
  };

  useEffect(() => {
    if (!map || !isVisible) {
      clearMarkers();
      return;
    }

    // Initialize layer group if needed
    if (!layerGroupRef.current) {
      layerGroupRef.current = L.layerGroup().addTo(map);
    }

    // Clear existing markers
    clearMarkers();

    // Create new markers
    archaeologicalSites.forEach(site => {
      const marker = createArchaeologicalSiteMarker(site);
      markersRef.current.push(marker);
      if (layerGroupRef.current) {
        marker.addTo(layerGroupRef.current);
      }
    });

    console.log(`🏛️ Archaeological Sites: Created ${archaeologicalSites.length} markers for period ${selectedTimePeriod}`);

    // Cleanup function
    return () => {
      clearMarkers();
    };
  }, [map, selectedTimePeriod, enabledLegendItems, isVisible, archaeologicalSites]);

  // Remove layer group when component unmounts
  // ✅ SÄKER cleanup när komponenten unmountas
  useEffect(() => {
    return () => {
      try {
        if (layerGroupRef.current && map && map.hasLayer && map.hasLayer(layerGroupRef.current)) {
          map.removeLayer(layerGroupRef.current);
        }
      } catch (error) {
        console.warn('⚠️ Error removing archaeological site layer group during cleanup:', error);
      }
    };
  }, [map]);

  return null;
};