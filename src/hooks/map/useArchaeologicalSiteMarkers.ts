import { useMemo } from 'react';
import L from 'leaflet';
import { ARCHAEOLOGICAL_SITES, getArchaeologicalSitesForPeriod } from '@/utils/archaeologicalSites/archaeologicalSitesData';

// Define colors for different archaeological site types
const getArchaeologicalSiteColor = (type: string): string => {
  const colors = {
    burial_site: '#8B4513',      // Saddle brown
    defense_wall: '#696969',     // Dim gray
    burial_field: '#CD853F',     // Peru
    cult_house: '#9932CC',       // Dark orchid
    rock_carving: '#2F4F4F',     // Dark slate gray
    fortress: '#A0522D',         // Sienna
    stone_wall_system: '#708090', // Slate gray
    ancient_shoreline: '#4682B4', // Steel blue
    village: '#DAA520',          // Goldenrod
    trading_post: '#228B22',     // Forest green
    hall_building: '#9932CC',    // Dark orchid
    settlement: '#CD853F'        // Peru
  };
  return colors[type] || '#666666';
};

// Define icon symbols for different types
const getArchaeologicalSiteSymbol = (type: string): string => {
  const symbols = {
    burial_site: '⛰️',
    defense_wall: '🏔️',
    burial_field: '⚰️',
    cult_house: '🏛️',
    rock_carving: '🪨',
    fortress: '🏰',
    stone_wall_system: '🧱',
    ancient_shoreline: '🌊',
    village: '🏘️',
    trading_post: '🏪',
    hall_building: '🏛️',
    settlement: '🏘️'
  };
  return symbols[type] || '📍';
};

export interface ArchaeologicalSiteMarker {
  id: string;
  position: L.LatLng;
  color: string;
  symbol: string;
  name: string;
  type: string;
  description: string;
  period: string[];
  popupContent: string;
}

export const useArchaeologicalSiteMarkers = (
  selectedTimePeriod: string,
  enabledLegendItems: { [key: string]: boolean }
) => {
  return useMemo(() => {
    // Get archaeological sites for the selected time period
    const sitesForPeriod = getArchaeologicalSitesForPeriod(selectedTimePeriod);
    
    return sitesForPeriod
      .filter(site => {
        // Check if this type of archaeological site is enabled
        const legendKey = `archaeological_${site.type}`;
        return enabledLegendItems[legendKey] !== false && enabledLegendItems.archaeological_sites !== false;
      })
      .map(site => {
        const color = getArchaeologicalSiteColor(site.type);
        const symbol = getArchaeologicalSiteSymbol(site.type);
        
        // Create detailed popup content
        const popupContent = `
          <div class="archaeological-site-popup">
            <h3 style="margin: 0 0 8px 0; color: ${color}; font-size: 16px;">
              ${symbol} ${site.name}
            </h3>
            <p style="margin: 4px 0; font-size: 14px; color: #666;">
              <strong>Period:</strong> ${site.period.join(', ')}
            </p>
            <p style="margin: 4px 0; font-size: 14px; color: #666;">
              <strong>Typ:</strong> ${site.type.replace(/_/g, ' ')}
            </p>
            <p style="margin: 4px 0; font-size: 14px;">
              ${site.description}
            </p>
            ${site.details ? `
              <p style="margin: 8px 0 4px 0; font-size: 13px; color: #555;">
                ${site.details}
              </p>
            ` : ''}
            ${site.findings && site.findings.length > 0 ? `
              <p style="margin: 4px 0; font-size: 13px;">
                <strong>Fynd:</strong> ${site.findings.join(', ')}
              </p>
            ` : ''}
            ${site.dimensions ? `
              <p style="margin: 4px 0; font-size: 13px;">
                <strong>Dimensioner:</strong> ${site.dimensions}
              </p>
            ` : ''}
            ${site.specialFeatures && site.specialFeatures.length > 0 ? `
              <p style="margin: 4px 0; font-size: 13px;">
                <strong>Särdrag:</strong> ${site.specialFeatures.join(', ')}
              </p>
            ` : ''}
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #888;">
              <strong>Region:</strong> ${site.region}, ${site.country}
            </p>
          </div>
        `;

        return {
          id: site.id,
          position: new L.LatLng(site.coordinates.lat, site.coordinates.lng),
          color,
          symbol,
          name: site.name,
          type: site.type,
          description: site.description,
          period: site.period,
          popupContent
        };
      });
  }, [selectedTimePeriod, enabledLegendItems]);
};

export const getArchaeologicalSiteTypeCount = (type: string, selectedTimePeriod: string): number => {
  const sitesForPeriod = getArchaeologicalSitesForPeriod(selectedTimePeriod);
  return sitesForPeriod.filter(site => site.type === type).length;
};

export const getAllArchaeologicalSiteTypes = (selectedTimePeriod: string): string[] => {
  const sitesForPeriod = getArchaeologicalSitesForPeriod(selectedTimePeriod);
  const types = new Set(sitesForPeriod.map(site => site.type));
  return Array.from(types);
};