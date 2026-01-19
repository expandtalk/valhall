
import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  GERMANIC_TIME_PERIODS, 
  getGroupsByPeriod, 
  getLanguageBranchColor, 
  getTypeIcon,
  GermanicGroup 
} from '@/utils/germanicTimeline/timelineData';

interface UseGermanicTimelineProps {
  map: L.Map | null;
  selectedPeriod: string;
  enabledLegendItems: { [key: string]: boolean };
  isMapReady: React.RefObject<boolean>;
  safelyAddLayer: (layer: L.Layer) => boolean;
}

export const useGermanicTimeline = ({
  map,
  selectedPeriod,
  enabledLegendItems,
  isMapReady,
  safelyAddLayer
}: UseGermanicTimelineProps) => {
  const markersRef = useRef<L.Marker[]>([]);

  const createGermanicGroupMarker = (group: GermanicGroup): L.Marker | null => {
    if (!map || !isMapReady.current) return null;

    const color = getLanguageBranchColor(group.languageBranch);
    const icon = getTypeIcon(group.languageBranch);
    
    // Create custom icon with language branch colors
    const customIcon = L.divIcon({
      html: `<div style="
        background: linear-gradient(135deg, ${color} 0%, ${color}CC 100%);
        min-width: 120px;
        height: 36px;
        border-radius: 18px;
        border: 2px solid ${color};
        box-shadow: 0 3px 10px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: bold;
        color: #ffffff;
        text-align: center;
        padding: 0 10px;
        white-space: nowrap;
        gap: 4px;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
      ">
        <span style="font-size: 14px;">${icon}</span>
        <span style="color: #ffffff;">${group.name}</span>
      </div>`,
      className: 'germanic-group-marker',
      iconSize: [120, 36],
      iconAnchor: [60, 18]
    });

    // Create popup with detailed information - consistent dark styling
    const period = GERMANIC_TIME_PERIODS.find(p => p.id === group.period);
    const marker = L.marker([group.lat, group.lng], { icon: customIcon })
      .bindPopup(`
        <div style="
          background: #1e293b;
          color: #ffffff;
          padding: 16px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
          border: 1px solid #374151;
          min-width: 300px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        ">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div style="
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 2px solid ${color};
              background-color: ${color};
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
              color: #ffffff;
            ">
              ${icon}
            </div>
            <div>
              <h3 style="font-weight: bold; font-size: 18px; color: #ffffff; margin: 0;">${group.name}</h3>
              <p style="font-size: 14px; color: #94a3b8; margin: 0;">${group.nameEn}</p>
            </div>
          </div>
          
          <div style="margin-bottom: 12px;">
            <p style="color: #e2e8f0; font-size: 14px; line-height: 1.5; margin: 0;">${group.description}</p>
          </div>
          
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
            <span style="
              display: inline-flex;
              align-items: center;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              background-color: #374151;
              color: #e2e8f0;
            ">
              🌍 ${group.languageBranch.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span style="
              display: inline-flex;
              align-items: center;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              background-color: #374151;
              color: #e2e8f0;
            ">
              📅 ${period?.name.split(' (')[0] || 'Okänd period'}
            </span>
            <span style="
              display: inline-flex;
              align-items: center;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
              background-color: #374151;
              color: #e2e8f0;
            ">
              ⭐ ${group.significance}
            </span>
          </div>
          
          <div style="padding-top: 8px; border-top: 1px solid #374151;">
            <p style="font-size: 12px; color: #64748b; margin: 0;">
              Germansk språk- och folkgruppsutveckling baserad på historisk forskning
            </p>
          </div>
        </div>
      `, {
        maxWidth: 320,
        className: 'germanic-group-popup'
      });

    return marker;
  };

  useEffect(() => {
    if (!map || !isMapReady.current) return;

    // ✅ SÄKER borttagning av Germanic markers
    markersRef.current.forEach(marker => {
      try {
        if (marker && map && map.hasLayer && map.hasLayer(marker)) {
          map.removeLayer(marker);
        }
      } catch (error) {
        console.warn('⚠️ Error removing Germanic marker:', error);
      }
    });
    markersRef.current = [];

    // Add markers for selected period
    if (enabledLegendItems.germanic_timeline !== false) {
      const groupsInPeriod = getGroupsByPeriod(selectedPeriod);
      
      groupsInPeriod.forEach(group => {
        const marker = createGermanicGroupMarker(group);
        if (marker && safelyAddLayer(marker)) {
          markersRef.current.push(marker);
        }
      });

      console.log(`Added ${markersRef.current.length} Germanic timeline markers for period: ${selectedPeriod}`);
    }

    return () => {
      // ✅ SÄKER cleanup
      markersRef.current.forEach(marker => {
        try {
          if (marker && map && map.hasLayer && map.hasLayer(marker)) {
            map.removeLayer(marker);
          }
        } catch (error) {
          console.warn('⚠️ Error removing Germanic marker during cleanup:', error);
        }
      });
      markersRef.current = [];
    };
  }, [map, selectedPeriod, enabledLegendItems.germanic_timeline, isMapReady, safelyAddLayer]);

  return {
    germanicMarkers: markersRef.current
  };
};
