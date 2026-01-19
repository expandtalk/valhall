
import L from 'leaflet';
import { supabase } from '@/integrations/supabase/client';
import { parseCoordinates } from '@/hooks/useRunicData/coordinateUtils';

interface FolkGroup {
  id: string;
  name: string;
  name_en: string;
  main_category: string;
  sub_category: string;
  coordinates: any;
  active_period_start: number;
  active_period_end: number;
  description: string;
  historical_significance?: string;
  language_family?: string;
  language_subfamily?: string;
}

let folkGroupsCache: FolkGroup[] | null = null;

const loadFolkGroups = async (): Promise<FolkGroup[]> => {
  if (folkGroupsCache) {
    return folkGroupsCache;
  }

  try {
    const { data, error } = await supabase
      .from('folk_groups')
      .select('*');

    if (error) {
      console.error('Error loading folk groups for map:', error);
      return [];
    }

    folkGroupsCache = data || [];
    return folkGroupsCache;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const addFolkGroupMarkers = async (
  map: L.Map,
  selectedTimePeriod: string,
  enabledLegendItems: { [key: string]: boolean }
): Promise<L.Marker[]> => {
  if (!map) {
    console.warn('Map not provided to addFolkGroupMarkers');
    return [];
  }

  console.log('👥 ADDING FOLK GROUP MARKERS for period:', selectedTimePeriod);

  const folkGroups = await loadFolkGroups();
  console.log(`📊 Loaded ${folkGroups.length} folk groups from database`);

  // Filter folk groups that have coordinates and are relevant for the time period
  const relevantGroups = folkGroups.filter(group => {
    // Check if group has valid coordinates
    if (!group.coordinates) {
      return false;
    }

    // Extract coordinates using global parser
    const coordinatesObj = parseCoordinates(group.coordinates);

    if (!coordinatesObj) {
      return false;
    }

    // For now, show all folk groups regardless of time period
    // Later we can add time period filtering if needed
    return true;
  });

  console.log(`🎯 Found ${relevantGroups.length} relevant folk groups with coordinates`);

  const markers: L.Marker[] = [];

  for (const group of relevantGroups) {
    try {
      // Parse coordinates using global parser
      const coordinatesObj = parseCoordinates(group.coordinates);
      
      if (!coordinatesObj) {
        console.warn(`Invalid coordinates for folk group: ${group.name}`, { coordinates: group.coordinates });
        continue;
      }
      
      const { lat, lng } = coordinatesObj;

      // Create custom icon based on group category with enhanced styling
      let iconColor = '#8B4513'; // Default brown
      let borderColor = '#654321';
      let emoji = '👥';
      
      switch (group.main_category) {
        case 'germanic':
          iconColor = '#4A90E2'; // Blue
          borderColor = '#2E5C8A';
          emoji = '⚔️';
          break;
        case 'celtic':
          iconColor = '#50C878'; // Green
          borderColor = '#2E8B57';
          emoji = '🍀';
          break;
        case 'slavic':
          iconColor = '#800080'; // Purple
          borderColor = '#4B0082';
          emoji = '🏰';
          break;
        case 'finno_ugric':
          iconColor = '#FF6B35'; // Orange
          borderColor = '#CC5529';
          emoji = '🌲';
          break;
        case 'italic':
          iconColor = '#DC143C'; // Crimson
          borderColor = '#8B0000';
          emoji = '🏛️';
          break;
        case 'thracian':
          iconColor = '#FFD700'; // Gold
          borderColor = '#B8860B';
          emoji = '🛡️';
          break;
        case 'illyrian':
          iconColor = '#FF69B4'; // Hot pink
          borderColor = '#C71585';
          emoji = '⛰️';
          break;
        default:
          iconColor = '#8B4513'; // Brown
          borderColor = '#654321';
          emoji = '👥';
      }

      const iconHtml = `<div style="
        background: linear-gradient(135deg, ${iconColor}, ${borderColor});
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid ${borderColor};
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      ">${emoji}</div>`;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'folk-group-marker',
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const formatPeriod = (start: number, end: number) => {
        if (start < 0 && end < 0) {
          return `${Math.abs(end)} - ${Math.abs(start)} f.Kr.`;
        } else if (start < 0 && end > 0) {
          return `${Math.abs(start)} f.Kr. - ${end} e.Kr.`;
        } else {
          return `${start} - ${end} e.Kr.`;
        }
      };

      const getCategoryName = (category: string) => {
        const categoryMap: { [key: string]: string } = {
          'germanic': 'Germanska',
          'celtic': 'Keltiska', 
          'slavic': 'Slaviska',
          'finno_ugric': 'Finno-ugriska',
          'italic': 'Italiska',
          'thracian': 'Thrakiska',
          'illyrian': 'Illyriska'
        };
        return categoryMap[category] || category;
      };

      const marker = L.marker([lat, lng], { icon: customIcon })
        .bindPopup(`
          <div class="p-4 max-w-sm">
            <h3 class="font-bold text-lg text-blue-700">${group.name} ${emoji}</h3>
            <p class="text-sm text-blue-600 font-semibold mb-2">🌍 ${group.name_en}</p>
            <p class="text-sm text-gray-600 mb-2">${group.description || 'Historisk folkgrupp'}</p>
            
            <div class="space-y-1 text-xs">
              <p><strong>Kategori:</strong> ${getCategoryName(group.main_category)}</p>
              <p><strong>Subkategori:</strong> ${group.sub_category}</p>
              ${group.active_period_start && group.active_period_end ? 
                `<p><strong>Aktiv period:</strong> ${formatPeriod(group.active_period_start, group.active_period_end)}</p>` : ''}
              ${group.language_family ? 
                `<p><strong>Språkfamilj:</strong> ${group.language_family}${group.language_subfamily ? ` / ${group.language_subfamily}` : ''}</p>` : ''}
            </div>
            
            ${group.historical_significance ? 
              `<p class="text-xs text-gray-500 mt-2"><strong>Historisk betydelse:</strong> ${group.historical_significance}</p>` : ''}
            
            <div class="mt-3 pt-2 border-t border-gray-200">
              <p class="text-xs text-gray-500">Koordinater: ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
            </div>
          </div>
        `);

      try {
        marker.addTo(map);
        markers.push(marker);
        console.log(`✅ FOLK GROUP ADDED: ${group.name} at [${lat}, ${lng}]`);
      } catch (addError) {
        console.error(`Failed to add folk group marker ${group.name}:`, addError);
      }
    } catch (error) {
      console.error(`Error creating folk group marker for ${group.name}:`, error);
    }
  }

  console.log(`👥 FOLK GROUPS SUMMARY: ${markers.length} markers added to map`);
  return markers;
};
