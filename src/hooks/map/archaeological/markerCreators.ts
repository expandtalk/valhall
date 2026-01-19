import L from 'leaflet';
import { ArchaeologicalFind } from '@/utils/archaeologicalFinds/types';

interface ClusteredItem {
  lat: number;
  lng: number;
  finds: ArchaeologicalFind[];
}

const getMarkerSize = (find: ArchaeologicalFind): { width: number; height: number; fontSize: number } => {
  const findType = find.findType?.toLowerCase() || '';
  const name = find.name?.toLowerCase() || '';
  
  // Special handling for Gotland silver hoards - much smaller and more discrete
  if (name.includes('gotland') && (findType.includes('artifacts') || findType.includes('treasure'))) {
    return { width: 45, height: 16, fontSize: 7 }; // Even smaller for Gotland silver hoards
  }
  
  // Make warrior graves smaller and less prominent
  if (findType.includes('burial') || findType.includes('grave')) {
    // Remove text for warrior graves to make them less prominent
    return { width: 20, height: 20, fontSize: 0 }; // Icon only, no text, smaller
  }
  
  // Treasure hoards remain prominent (but not Gotland ones)
  if (findType.includes('artifacts') || findType.includes('treasure')) {
    return { width: 120, height: 36, fontSize: 12 };
  }
  
  // Weapon finds medium size
  if (findType.includes('weapons') || findType.includes('weapon')) {
    return { width: 100, height: 32, fontSize: 11 };
  }
  
  // Default smaller size for other finds
  return { width: 90, height: 30, fontSize: 10 };
};

const getMarkerIcon = (find: ArchaeologicalFind): string => {
  const findType = find.findType?.toLowerCase() || '';
  
  if (findType.includes('artifacts') || findType.includes('treasure')) {
    return '💰';
  }
  if (findType.includes('burial') || findType.includes('grave')) {
    return '⚰️';
  }
  if (findType.includes('weapons') || findType.includes('weapon')) {
    return '⚔️';
  }
  if (findType.includes('ritual') || findType.includes('religious')) {
    return '⛪';
  }
  if (findType.includes('settlement') || findType.includes('village')) {
    return '🏘️';
  }
  
  return '🗿'; // Default archaeological icon
};

const getMarkerColors = (find: ArchaeologicalFind): { background: string; border: string; text: string } => {
  const findType = find.findType?.toLowerCase() || '';
  
  // Muted colors for burial sites to make them less prominent
  if (findType.includes('burial') || findType.includes('grave')) {
    return {
      background: 'rgba(101, 67, 33, 0.6)', // More muted brown
      border: '#654321',
      text: '#ffffff'
    };
  }
  
  if (findType.includes('artifacts') || findType.includes('treasure')) {
    return {
      background: 'rgba(255, 215, 0, 0.9)',
      border: '#daa520',
      text: '#000000'
    };
  }
  
  if (findType.includes('weapons') || findType.includes('weapon')) {
    return {
      background: 'rgba(220, 20, 60, 0.8)',
      border: '#dc143c',
      text: '#ffffff'
    };
  }
  
  // Default archaeological color
  return {
    background: 'rgba(160, 82, 45, 0.8)',
    border: '#a0522d',
    text: '#ffffff'
  };
};

export const createSingleFindMarker = (
  find: ArchaeologicalFind,
  map: L.Map,
  isMapReady: React.RefObject<boolean>
): L.Marker | null => {
  if (!map || !isMapReady.current) return null;

  const icon = getMarkerIcon(find);
  const size = getMarkerSize(find);
  const colors = getMarkerColors(find);
  const name = find.name?.toLowerCase() || '';
  const findType = find.findType?.toLowerCase() || '';

  // Special handling for warrior graves - icon only, no text
  const showText = size.fontSize > 0;
  const isGotlandHoard = name.includes('gotland') && (findType.includes('artifacts') || findType.includes('treasure'));

  const customIcon = L.divIcon({
    html: `<div style="
      background: ${colors.background};
      min-width: ${size.width}px;
      height: ${size.height}px;
      border-radius: ${size.height/2}px;
      border: 2px solid ${colors.border};
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${size.fontSize}px;
      font-weight: bold;
      color: ${colors.text};
      text-align: center;
      padding: 0 ${showText ? '6px' : '0'};
      white-space: nowrap;
      gap: ${showText ? '3px' : '0'};
      text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
      backdrop-filter: blur(2px);
      z-index: ${isGotlandHoard ? 250 : 400};
    ">
      <span style="font-size: ${showText ? size.fontSize + 1 : 12}px;">${icon}</span>
      ${showText ? `<span style="color: ${colors.text};">${find.name}</span>` : ''}
    </div>`,
    className: 'archaeological-find-marker',
    iconSize: [size.width, size.height],
    iconAnchor: [size.width/2, size.height/2]
  });

  const marker = L.marker([find.lat, find.lng], { icon: customIcon })
    .bindPopup(`
      <div style="background: rgba(30, 41, 59, 0.98) !important; color: white !important; padding: 16px; border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,0.4); border: 2px solid ${colors.border}; backdrop-filter: blur(6px); min-width: 280px; max-width: 320px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid ${colors.border}; background: ${colors.background}; display: flex; align-items: center; justify-content: center; font-size: 16px;">
            <span style="color: #ffffff;">${icon}</span>
          </div>
          <div>
            <h3 style="font-weight: bold; font-size: 18px; color: #ffffff !important; margin: 0;">${find.name}</h3>
            <p style="font-size: 13px; color: rgba(255,255,255,0.7) !important; margin: 2px 0 0 0;">${find.country}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 12px;">
          <p style="color: rgba(255,255,255,0.9) !important; font-size: 14px; line-height: 1.5; margin: 0;">${find.description}</p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          <span style="display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 16px; font-size: 11px; font-weight: 600; background: ${colors.background}60; color: #ffffff !important; border: 1px solid ${colors.border};">
            ${icon} ${find.findType}
          </span>
          <span style="display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 16px; font-size: 11px; font-weight: 600; background: rgba(75, 85, 99, 0.6); color: rgba(255,255,255,0.9) !important; border: 1px solid rgba(75, 85, 99, 0.7);">
            📅 ${find.period}
          </span>
        </div>
        
        <div style="padding-top: 12px; border-top: 1px solid rgba(75, 85, 99, 0.5);">
          <p style="font-size: 11px; color: rgba(255,255,255,0.6) !important; margin: 0;">Arkeologiskt fynd</p>
        </div>
      </div>
    `, {
      maxWidth: 340,
      className: 'archaeological-find-popup'
    });

  return marker;
};

export const createClusterMarker = (
  cluster: ClusteredItem,
  map: L.Map,
  isMapReady: React.RefObject<boolean>
): L.Marker | null => {
  if (!map || !isMapReady.current || !('finds' in cluster)) return null;

  const findCount = cluster.finds.length;
  const size = Math.min(40 + (findCount * 3), 60); // Smaller cluster sizes
  
  const customIcon = L.divIcon({
    html: `<div style="
      background: rgba(139, 69, 19, 0.8);
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid #8b4513;
      box-shadow: 0 4px 8px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${Math.min(14 + (findCount * 0.5), 18)}px;
      font-weight: bold;
      color: white;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
      backdrop-filter: blur(3px);
      z-index: 500;
    ">
      ${findCount}
    </div>`,
    className: 'archaeological-cluster-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });

  const marker = L.marker([cluster.lat, cluster.lng], { icon: customIcon });

  // Add click handler to expand cluster
  marker.on('click', () => {
    if (map) {
      // Zoom in to show individual finds
      map.setView([cluster.lat, cluster.lng], Math.min(map.getZoom() + 2, 15), {
        animate: true,
        duration: 0.5
      });
    }
  });

  // Create popup with cluster information
  const findsList = cluster.finds.slice(0, 5).map(find => 
    `<li style="color: rgba(255,255,255,0.9) !important; margin: 4px 0;">${find.name} (${find.findType})</li>`
  ).join('');

  marker.bindPopup(`
    <div style="background: rgba(30, 41, 59, 0.98) !important; color: white !important; padding: 16px; border-radius: 8px; box-shadow: 0 6px 24px rgba(0,0,0,0.4); border: 2px solid #8b4513; backdrop-filter: blur(6px); min-width: 280px; max-width: 320px;">
      <h3 style="font-weight: bold; font-size: 18px; color: #ffffff !important; margin: 0 0 12px 0;">Arkeologisk fyndgrupp</h3>
      <p style="color: rgba(255,255,255,0.8) !important; font-size: 14px; margin: 0 0 12px 0;">${findCount} fynd i detta område</p>
      
      <ul style="list-style: none; padding: 0; margin: 0 0 12px 0;">
        ${findsList}
        ${cluster.finds.length > 5 ? `<li style="color: rgba(255,255,255,0.7) !important;">... och ${cluster.finds.length - 5} till</li>` : ''}
      </ul>
      
      <p style="font-size: 11px; color: rgba(255,255,255,0.6) !important; margin: 0; font-style: italic;">Klicka för att zooma in</p>
    </div>
  `, {
    maxWidth: 340,
    className: 'archaeological-cluster-popup'
  });

  return marker;
};
