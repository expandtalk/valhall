import L from 'leaflet';
import { HistoricalEventMarker, getEventTypeColor, getEventTypeIcon, getSignificanceSize } from '@/hooks/useHistoricalEventMarkers';

export const createHistoricalEventMarker = (
  event: HistoricalEventMarker,
  map: L.Map
): L.Marker | null => {
  if (!event.coordinates) {
    return null;
  }

  const { lat, lng } = event.coordinates;
  
  // Create custom icon based on event type
  const icon = getEventTypeIcon(event.event_type);
  const color = getEventTypeColor(event.event_type);
  const size = getSignificanceSize(event.significance_level);

  // Create custom HTML marker
  const customIcon = L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        color: white;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${Math.max(8, size - 4)}px;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        position: relative;
      ">
        ${icon}
      </div>
    `,
    className: 'historical-event-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });

  const marker = L.marker([lat, lng], { icon: customIcon });

  // Create popup content
  const yearRange = event.year_end && event.year_end !== event.year_start
    ? `${event.year_start}-${event.year_end}`
    : `${event.year_start}`;

  const popupContent = `
    <div class="historical-event-popup">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: ${color};">
        ${event.event_name}
      </h3>
      <div style="margin-bottom: 6px;">
        <strong>År:</strong> ${yearRange}
      </div>
      <div style="margin-bottom: 6px;">
        <strong>Typ:</strong> ${getEventTypeLabel(event.event_type)}
      </div>
      <div style="margin-bottom: 6px;">
        <strong>Betydelse:</strong> ${getSignificanceLabel(event.significance_level)}
      </div>
      ${event.region_affected && event.region_affected.length > 0 ? `
        <div style="margin-bottom: 6px;">
          <strong>Regioner:</strong> ${event.region_affected.join(', ')}
        </div>
      ` : ''}
      ${event.description ? `
        <div style="margin-top: 8px; font-size: 12px; color: #666;">
          ${event.description}
        </div>
      ` : ''}
    </div>
  `;

  marker.bindPopup(popupContent, {
    maxWidth: 300,
    className: 'historical-event-popup-container'
  });

  return marker;
};

export const addHistoricalEventMarkers = (
  map: L.Map,
  events: HistoricalEventMarker[]
): L.Marker[] => {
  const markers: L.Marker[] = [];

  events.forEach(event => {
    const marker = createHistoricalEventMarker(event, map);
    if (marker) {
      marker.addTo(map);
      markers.push(marker);
    }
  });

  console.log(`✅ Added ${markers.length} historical event markers to map`);
  return markers;
};

// Helper functions for labels
const getEventTypeLabel = (eventType: string): string => {
  const labels: { [key: string]: string } = {
    'raid': 'Plundring',
    'settlement': 'Bosättning',
    'political': 'Politisk händelse',
    'military': 'Militär händelse',
    'religious': 'Religiös händelse',
    'trade': 'Handelshändelse'
  };
  return labels[eventType] || eventType;
};

const getSignificanceLabel = (significance: string): string => {
  const labels: { [key: string]: string } = {
    'very_high': 'Mycket hög',
    'high': 'Hög',
    'medium': 'Medel',
    'low': 'Låg'
  };
  return labels[significance] || significance;
};