
import L from 'leaflet';
import { GERMANIC_GROUPS } from '@/utils/germanicTimeline/groups';
import { GERMANIC_TIME_PERIODS, GermanicTimelinePeriod } from '@/utils/germanicTimeline/timelineData';
import { createGoogleMapsUrl, createStreetViewUrl } from '@/utils/coordinateData';

export const addGermanicGroupMarkers = (
  map: L.Map,
  selectedTimePeriod: string,
  enabledLegendItems: { [key: string]: boolean }
): L.Marker[] => {
  if (!map) {
    console.warn('Map not provided to addGermanicGroupMarkers');
    return [];
  }

  // Check if Germanic timeline is enabled
  if (enabledLegendItems.germanic_timeline === false) {
    console.log('🚫 Germanic timeline disabled in legend');
    return [];
  }

  console.log('🏛️ ADDING GERMANIC GROUP MARKERS for period:', selectedTimePeriod);

  // Find the current period data
  const currentPeriod = GERMANIC_TIME_PERIODS.find(p => p.id === selectedTimePeriod);
  console.log('📅 Current period data:', currentPeriod);

  if (!currentPeriod) {
    console.warn(`⚠️ No period data found for: ${selectedTimePeriod}`);
    return [];
  }

  // Get relevant groups for this time period with improved filtering
  const relevantGroups = GERMANIC_GROUPS.filter(group => {
    // Check if group has valid coordinates
    if (!group.lat || !group.lng) {
      return false;
    }

    // Handle specific period matching based on group's time range
    if (group.startYear && group.endYear && currentPeriod.startYear && currentPeriod.endYear) {
      // Check for overlap between group time range and current period
      return group.startYear <= currentPeriod.endYear && group.endYear >= currentPeriod.startYear;
    }

    // Fallback to period string matching
    if (group.period) {
      // Handle specific period matching
      if (group.period.includes(selectedTimePeriod)) {
        return true;
      }
      
      // Handle broader period ranges
      if (selectedTimePeriod === 'roman_iron' && 
          (group.period.includes('iron_age') || group.period.includes('roman') || group.period.includes('migration'))) {
        return true;
      }
      
      // Handle migration period
      if (selectedTimePeriod === 'migration_period' && 
          (group.period.includes('migration') || group.period.includes('iron_age'))) {
        return true;
      }
      
      // Handle Viking age
      if (selectedTimePeriod === 'viking_age' && 
          (group.period.includes('viking') || group.period.includes('late'))) {
        return true;
      }
      
      // Ensure Sami and Kvens are shown across multiple periods
      if ((group.name.toLowerCase().includes('sami') || group.name.toLowerCase().includes('kven') || 
           group.nameEn?.toLowerCase().includes('sami') || group.nameEn?.toLowerCase().includes('kven')) &&
          (selectedTimePeriod === 'viking_age' || selectedTimePeriod === 'migration_period' || selectedTimePeriod === 'roman_iron')) {
        return true;
      }
    }

    return false;
  });

  console.log(`🎯 Found ${relevantGroups.length} relevant Germanic groups for ${selectedTimePeriod}:`, 
    relevantGroups.map(g => ({ name: g.name, period: g.period, lat: g.lat, lng: g.lng })));

  const markers: L.Marker[] = [];

  relevantGroups.forEach(group => {
    try {
      // Validate coordinates
      if (!group.lat || !group.lng ||
          typeof group.lat !== 'number' || 
          typeof group.lng !== 'number' ||
          isNaN(group.lat) || 
          isNaN(group.lng)) {
        console.warn(`Invalid coordinates for Germanic group: ${group.name}`, { lat: group.lat, lng: group.lng });
        return;
      }

      // Create custom icon based on group type
      let iconColor = '#8B4513'; // Saddle brown default
      let borderColor = '#654321';
      
      // Special colors for different group types
      if (group.name.toLowerCase().includes('sami') || group.nameEn?.toLowerCase().includes('sami')) {
        iconColor = '#4A90E2'; // Blue for Sami
        borderColor = '#2E5C8A';
      } else if (group.name.toLowerCase().includes('kven') || group.nameEn?.toLowerCase().includes('kven')) {
        iconColor = '#50C878'; // Emerald for Kvens
        borderColor = '#2E8B57';
      } else if (group.name.toLowerCase().includes('goth')) {
        iconColor = '#8B0000'; // Dark red for Goths
        borderColor = '#5C0000';
      } else if (group.name.toLowerCase().includes('vandal')) {
        iconColor = '#800080'; // Purple for Vandals
        borderColor = '#4B0082';
      }

      const iconHtml = `<div style="
        background: linear-gradient(135deg, ${iconColor}, ${borderColor});
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid ${borderColor};
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 8px;
        font-weight: bold;
      ">⚔️</div>`;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'germanic-group-marker',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
      });

      const googleMapsUrl = createGoogleMapsUrl(group.lat, group.lng, group.name);
      const streetViewUrl = createStreetViewUrl(group.lat, group.lng);

      const marker = L.marker([group.lat, group.lng], { icon: customIcon })
        .bindPopup(`
          <div class="p-4 max-w-sm">
            <h3 class="font-bold text-lg text-amber-700">${group.name} ⚔️</h3>
            <p class="text-sm text-amber-600 font-semibold mb-2">🏛️ Germansk folkgrupp</p>
            <p class="text-sm text-gray-600 mb-2">${group.description}</p>
            
            <div class="space-y-1 text-xs">
              <p><strong>Period:</strong> ${group.period || 'Okänd'}</p>
              <p><strong>Språkgren:</strong> ${group.languageBranch || 'Okänd'}</p>
              ${group.startYear && group.endYear ? `<p><strong>Tidsspan:</strong> ${group.startYear} - ${group.endYear}</p>` : ''}
            </div>
            
            <p class="text-xs text-gray-500 mt-2">${group.descriptionEn || 'Germansk folkgrupp från antiken'}</p>
            
            <div class="mt-3 pt-2 border-t border-gray-200">
              <div class="flex gap-2">
                <a href="${googleMapsUrl}" target="_blank" class="inline-flex items-center px-2 py-1 bg-amber-600 text-white text-xs rounded hover:bg-amber-700">
                  📍 Google Maps
                </a>
                <a href="${streetViewUrl}" target="_blank" class="inline-flex items-center px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600">
                  👁️ Street View
                </a>
              </div>
              <p class="text-xs text-gray-500 mt-1">Koordinater: ${group.lat.toFixed(4)}, ${group.lng.toFixed(4)}</p>
            </div>
          </div>
        `);

      try {
        marker.addTo(map);
        markers.push(marker);
        console.log(`✅ GERMANIC GROUP ADDED: ${group.name} at [${group.lat}, ${group.lng}]`);
      } catch (addError) {
        console.error(`Failed to add Germanic group marker ${group.name}:`, addError);
      }
    } catch (error) {
      console.error(`Error creating Germanic group marker for ${group.name}:`, error);
    }
  });

  console.log(`🏛️ GERMANIC GROUPS SUMMARY: ${markers.length} markers added to map for period ${selectedTimePeriod}`);
  return markers;
};
