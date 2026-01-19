
import L from 'leaflet';
import { getFindsInPeriod, ARCHAEOLOGICAL_FINDS } from '@/utils/archaeologicalFinds';

export const addArchaeologicalFindMarkers = (
  map: L.Map,
  selectedTimePeriod: string,
  enabledLegendItems: { [key: string]: boolean }
): L.Marker[] => {
  // Only add markers if Archaeological finds are enabled
  if (enabledLegendItems.archaeological_finds === false) {
    console.log('Archaeological finds disabled, skipping markers');
    return [];
  }

  const markers: L.Marker[] = [];
  const finds = getFindsInPeriod(ARCHAEOLOGICAL_FINDS, selectedTimePeriod);

  console.log(`Adding archaeological find markers for ${selectedTimePeriod}: ${finds.length} finds`);

  finds.forEach(find => {
    if (!find.lat || !find.lng) {
      console.warn(`Archaeological find ${find.name} missing coordinates`);
      return;
    }

    // Create a distinctive marker for archaeological finds with Viking-style appearance
    const customIcon = L.divIcon({
      html: `<div style="
        background: linear-gradient(135deg, #8b4513 0%, #654321 100%);
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid #d4af37;
        box-shadow: 0 2px 4px rgba(0,0,0,0.4);
        position: relative;
      "></div>`,
      className: 'archaeological-find-marker',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    // Viking-style popup with dark brown background
    const marker = L.marker([find.lat, find.lng], { 
      icon: customIcon 
    }).bindPopup(`
      <div style="
        background: linear-gradient(135deg, #2d1810 0%, #3d2418 100%);
        color: #d4af37;
        padding: 16px;
        border-radius: 8px;
        border: 2px solid #8b4513;
        box-shadow: 0 4px 12px rgba(0,0,0,0.6);
        font-family: 'Times New Roman', serif;
        min-width: 280px;
      ">
        <div style="text-align: center; margin-bottom: 12px;">
          <h3 style="color: #d4af37; margin: 0; font-size: 16px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">
            ${find.name}
          </h3>
          <p style="color: #b8860b; margin: 4px 0 0 0; font-size: 12px; font-style: italic;">
            ${find.nameEn}
          </p>
        </div>
        
        <div style="margin-bottom: 12px; border-top: 1px solid #8b4513; padding-top: 8px;">
          <p style="color: #deb887; font-size: 13px; line-height: 1.4; margin: 0; text-align: justify;">
            ${find.description}
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div style="background: rgba(139, 69, 19, 0.3); padding: 6px; border-radius: 4px; border: 1px solid #8b4513;">
            <strong style="color: #d4af37; font-size: 10px;">PERIOD:</strong><br>
            <span style="color: #deb887; font-size: 11px;">${find.period}</span>
          </div>
          <div style="background: rgba(139, 69, 19, 0.3); padding: 6px; border-radius: 4px; border: 1px solid #8b4513;">
            <strong style="color: #d4af37; font-size: 10px;">KULTUR:</strong><br>
            <span style="color: #deb887; font-size: 11px;">${find.culture}</span>
          </div>
        </div>
        
        <div style="background: rgba(139, 69, 19, 0.2); padding: 8px; border-radius: 4px; border: 1px solid #8b4513;">
          <strong style="color: #d4af37; font-size: 10px;">BETYDELSE:</strong><br>
          <span style="color: #deb887; font-size: 11px;">${find.significance}</span>
        </div>
        
        <div style="text-align: center; margin-top: 8px; padding-top: 6px; border-top: 1px solid #8b4513;">
          <span style="color: #b8860b; font-size: 10px; font-style: italic;">
            ${find.startYear < 0 ? Math.abs(find.startYear) + ' f.Kr.' : find.startYear + ' e.Kr.'} - 
            ${find.endYear < 0 ? Math.abs(find.endYear) + ' f.Kr.' : find.endYear + ' e.Kr.'}
          </span>
        </div>
      </div>
    `, {
      maxWidth: 300,
      className: 'viking-style-popup'
    });

    try {
      map.addLayer(marker);
      markers.push(marker);
      console.log(`Added archaeological find marker: ${find.name}`);
    } catch (error) {
      console.warn('Failed to add archaeological find marker:', error);
    }
  });

  console.log(`Successfully added ${markers.length} archaeological find markers`);
  return markers;
};
