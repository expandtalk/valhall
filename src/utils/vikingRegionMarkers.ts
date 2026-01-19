
import L from 'leaflet';
import { getRegionColors, getCategoryColors } from './vikingRegionDisplay';
import { getCountryColors } from './countryColors';

interface VikingRegion {
  lat: number;
  lng: number;
  vikingName: string;
  modernName: string;
  description: string;
  category: 'nordic' | 'germanic' | 'slavic' | 'celtic' | 'baltic' | 'other' | 'discoveries' | 'christian' | 'byzantine' | 'frankish' | 'anglo_saxon' | 'turkic';
  timeperiod: 'early_viking' | 'middle_viking' | 'late_viking' | 'all_viking';
  type?: 'tribe' | 'kingdom' | 'city' | 'religious_center' | 'discovery' | 'major_trading_city' | 'imperial_capital' | 'fortress' | 'defensive_structure' | 'defensive_wall' | 'ring_fortress';
}

// Function to get appropriate icon based on region type and category - updated for all types
const getRegionIcon = (region: VikingRegion): string => {
  const regionType = region.type || determineRegionType(region);
  
  // Debug logging for defensive structures
  if (regionType === 'defensive_structure') {
    console.log('🛡️ Creating defensive structure marker:', region.vikingName, 'at', region.lat, region.lng);
  }
  
  switch (regionType) {
    case 'major_trading_city':
      return '🏛️'; // Klassisk byggnadsikon för stora handelsstäder
    case 'imperial_capital':
      return '👑'; // Krona för kejsarstäder som Konstantinopel och Paris
    case 'fortress':
      return '🏰'; // Slott för befästningar som Danevirke
    case 'defensive_structure':
      return '🛡️'; // Sköld för pålspärrar och undervattenshinder
    case 'defensive_wall':
      return '🧱'; // Mur för försvarsvall som Götavirke
    case 'ring_fortress':
      return '⭕'; // Ring för Trelleborg-befästningar
    case 'tribe':
      return '⚔️'; // Svärd för stammar/folkslag
    case 'kingdom':
      return '🏰'; // Slott för kungariken
    case 'city':
      return '🏘️'; // Hus för mindre städer
    case 'religious_center':
      return '✠'; // Keltiskt kors för religiösa centra
    case 'discovery':
      return '🗺️'; // Karta för upptäckter
    default:
      return '🏛️'; // Default till handelsikon
  }
};

// ✅ IMPROVED: Better text fitting with dynamic width calculation
const getMarkerSize = (region: VikingRegion): { width: number, height: number, fontSize: number, iconSize: number } => {
  const regionType = region.type || determineRegionType(region);
  const displayName = getShortDisplayName(region.vikingName);
  const nameLength = displayName.length;
  
  // Calculate width based on character count and font size
  let baseWidth = Math.max(80, nameLength * 7 + 50); // Minimum 80px, then 7px per character
  
  switch (regionType) {
    case 'major_trading_city':
      return { width: Math.min(baseWidth + 30, 180), height: 40, fontSize: 11, iconSize: 16 };
    case 'imperial_capital':
      return { width: Math.min(baseWidth + 40, 200), height: 44, fontSize: 12, iconSize: 18 };
    case 'fortress':
      return { width: Math.min(baseWidth + 20, 160), height: 36, fontSize: 10, iconSize: 14 };
    case 'defensive_structure':
      return { width: Math.min(baseWidth + 15, 140), height: 32, fontSize: 9, iconSize: 12 };
    case 'defensive_wall':
      return { width: Math.min(baseWidth + 18, 150), height: 34, fontSize: 9, iconSize: 13 };
    case 'ring_fortress':
      return { width: Math.min(baseWidth + 22, 165), height: 36, fontSize: 10, iconSize: 14 };
    case 'discovery':
      return { width: Math.min(baseWidth + 25, 170), height: 38, fontSize: 10, iconSize: 15 };
    default:
      return { width: Math.min(baseWidth, 130), height: 32, fontSize: 9, iconSize: 12 };
  }
};

// ✅ IMPROVED: Better text shortening logic
const getShortDisplayName = (vikingName: string): string => {
  const shortNames: { [key: string]: string } = {
    'Miklagarður': 'Konstantinopel',
    'Kænugarður': 'Kiev',
    'Aldeigjuborg': 'Ladoga',
    'Holmgård': 'Novgorod',
    'Lundenwic': 'London',
    'Niðaróss': 'Trondheim',
    'Túnsberg': 'Tønsberg',
    'Jórvík': 'York',
    'Dyflin': 'Dublin',
    'Danevirke (Hollingsted)': 'Danevirke V',
    'Danevirke (Centrum)': 'Danevirke',
    'Danevirke (Egernförde)': 'Danevirke Ö',
    'Norrström pålspärr': 'Sthlm spärr',
    'Birka undervattenshinder': 'Birka hinder',
    'Sigtuna pålspärr': 'Sigtuna spärr',
    'Hedeby hamnspärr': 'Hedeby spärr',
    'Söderköping pålspärr': 'Sköping spärr',
    'Lödöse pålspärr': 'Lödöse spärr',
    'Helgeandsholmen befästning': 'Sthlm fort',
    'Trefaldighetskällan': 'Trefald.källa'
  };
  
  // Return shortened name if available
  if (shortNames[vikingName]) {
    return shortNames[vikingName];
  }
  
  // If name is too long, shorten intelligently
  if (vikingName.length > 11) {
    let shortened = vikingName
      .replace(/stenen$/, '')
      .replace(/sstenen$/, '')
      .replace(/kyrka$/, '')
      .replace(/slott$/, '')
      .replace(/hinder$/, 'h.')
      .replace(/spärr$/, 'sp.')
      .replace(/befästning$/, 'fort')
      .replace(/källan$/, 'källa');
    
    // If still too long, truncate
    if (shortened.length > 11) {
      shortened = shortened.substring(0, 9) + '..';
    }
    
    return shortened;
  }
  
  return vikingName;
};

// Helper function to determine region type based on name and description
const determineRegionType = (region: VikingRegion): string => {
  const name = region.vikingName.toLowerCase();
  const description = region.description.toLowerCase();
  
  // Debug logging for pålspärr detection
  if (name.includes('pålspärr') || name.includes('spärr') || name.includes('undervattenshinder') || name.includes('hinder')) {
    console.log('🔍 Detected defensive structure by name:', region.vikingName, '→ defensive_structure');
    return 'defensive_structure';
  }
  
  // Check for defensive structures first
  if (name.includes('pålspärr') || name.includes('spärr') || name.includes('undervattenshinder') || name.includes('hinder')) {
    return 'defensive_structure';
  }
  
  if (name.includes('danevirke') || name.includes('befästning') || description.includes('vall') || description.includes('försvars')) {
    return 'fortress';
  }
  
  // Check for major trading cities
  const majorTradingCities = ['hedeby', 'birka', 'ribe', 'kaupang', 'sigtuna', 'visby', 'dublin', 'york', 'novgorod', 'kiev', 'bulghar'];
  if (majorTradingCities.some(city => name.includes(city))) {
    return 'major_trading_city';
  }
  
  // Check for imperial capitals
  if (name.includes('konstantinopel') || name.includes('miklagarður') || name.includes('parís')) {
    return 'imperial_capital';
  }
  
  if (name.includes('hamburg') || name.includes('bremen') || name.includes('gamla uppsala') || 
      description.includes('missionscenter') || description.includes('ärkebiskop') || 
      description.includes('religious') || description.includes('kristet') ||
      description.includes('religiöst') || description.includes('tempel')) {
    return 'religious_center';
  }
  
  if (region.category === 'discoveries' || name.includes('vinland') || 
      name.includes('grönland') || name.includes('island') || name.includes('markland')) {
    return 'discovery';
  }
  
  if (name.includes('erna') || name.includes('arna') || name.includes('arna') ||
      description.includes('stam') || description.includes('folk') || 
      description.includes('tribe') || description.includes('people')) {
    return 'tribe';
  }
  
  if (name.includes('rike') || name.includes('land') || name.includes('gard') ||
      description.includes('rike') || description.includes('kungadöme') ||
      description.includes('kingdom') || description.includes('realm')) {
    return 'kingdom';
  }
  
  return 'city';
};

export const createVikingRegionMarker = (
  region: VikingRegion,
  safelyAddLayer: (layer: L.Layer) => boolean,
  onMarkerClick?: (region: VikingRegion) => void
): L.Marker | null => {
  // Debug logging for all regions
  console.log('📍 Creating marker for:', region.vikingName, 'type:', region.type || determineRegionType(region));
  
  const categoryColors = getCategoryColors();
  const color = categoryColors[region.category] || '#6b7280';
  
  // Special handling for different types
  let regionColors;
  const regionType = region.type || determineRegionType(region);
  
  // Enhanced debug logging for defensive structures
  if (regionType === 'defensive_structure') {
    console.log('🛡️ Processing defensive structure:', {
      name: region.vikingName,
      coordinates: [region.lat, region.lng],
      category: region.category,
      description: region.description.substring(0, 50) + '...'
    });
  }
  
  if (regionType === 'major_trading_city') {
    // Use golden colors for major trading cities
    regionColors = {
      background: 'rgba(245, 158, 11, 0.95)',
      border: '#d97706',
      text: '#ffffff'
    };
  } else if (regionType === 'imperial_capital') {
    // Use purple colors for imperial capitals
    regionColors = {
      background: 'rgba(147, 51, 234, 0.95)',
      border: '#7c3aed',
      text: '#ffffff'
    };
  } else if (regionType === 'fortress') {
    // Use dark red colors for fortresses
    regionColors = {
      background: 'rgba(185, 28, 28, 0.95)',
      border: '#991b1b',
      text: '#ffffff'
    };
  } else if (regionType === 'defensive_structure') {
    // Use steel blue colors for defensive structures
    regionColors = {
      background: 'rgba(71, 85, 105, 0.95)',
      border: '#475569',
      text: '#ffffff'
    };
    console.log('🎨 Applied defensive structure colors:', regionColors);
  } else {
    regionColors = getRegionColors(region.vikingName, region.modernName);
  }
  
  const icon = getRegionIcon(region);
  const shortName = getShortDisplayName(region.vikingName);
  const size = getMarkerSize(region);

  // ✅ ENHANCED STYLING: Better typography and text fitting
  const customIcon = L.divIcon({
    html: `<div style="
      background: ${regionColors.background};
      width: ${size.width}px;
      height: ${size.height}px;
      border-radius: ${size.height/2}px;
      border: 2px solid ${regionColors.border};
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: ${size.fontSize}px;
      font-weight: 600;
      color: ${regionColors.text};
      text-align: center;
      padding: 0 8px;
      white-space: nowrap;
      gap: 4px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
      backdrop-filter: blur(2px);
      z-index: ${regionType === 'major_trading_city' ? 1000 : (regionType === 'imperial_capital' ? 1100 : (regionType === 'fortress' ? 900 : 500))};
      overflow: hidden;
      line-height: 1.1;
    ">
      <span style="font-size: ${size.iconSize}px; flex-shrink: 0;">${icon}</span>
      <span style="
        color: ${regionColors.text}; 
        overflow: hidden; 
        text-overflow: ellipsis;
        max-width: ${size.width - size.iconSize - 20}px;
        font-weight: 600;
      ">${shortName}</span>
    </div>`,
    className: `viking-region-marker ${regionType}`,
    iconSize: [size.width, size.height],
    iconAnchor: [size.width/2, size.height/2]
  });

  // Enhanced popup with type-specific information
  const typeTranslations = {
    'major_trading_city': 'Stor handelsstad',
    'imperial_capital': 'Kejsarstad',
    'fortress': 'Befästning/Borg',
    'defensive_structure': 'Försvarshinder',
    'tribe': 'Folkslag/Stam',
    'kingdom': 'Rike/Kungadöme', 
    'city': 'Stad/Handelsplats',
    'religious_center': 'Religiöst centrum',
    'discovery': 'Upptäckt/Kolonisation'
  };

  const marker = L.marker([region.lat, region.lng], { icon: customIcon })
    .bindPopup(`
      <div style="background: rgba(30, 41, 59, 0.98) !important; color: white !important; padding: 18px; border-radius: 10px; box-shadow: 0 8px 32px rgba(0,0,0,0.4); border: 3px solid ${regionColors.border}; backdrop-filter: blur(8px); min-width: 360px; max-width: 400px;">
        <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 14px;">
          <div style="width: 44px; height: 44px; border-radius: 50%; border: 3px solid ${regionColors.border}; background: ${regionColors.background}; display: flex; align-items: center; justify-content: center; font-size: 20px;">
            <span style="color: #ffffff;">${icon}</span>
          </div>
          <div>
            <h3 style="font-weight: bold; font-size: 22px; color: #ffffff !important; margin: 0;">${region.vikingName}</h3>
            <p style="font-size: 15px; color: rgba(255,255,255,0.7) !important; margin: 4px 0 0 0;">${region.modernName}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 14px;">
          <p style="color: rgba(255,255,255,0.9) !important; font-size: 15px; line-height: 1.6; margin: 0;">${region.description}</p>
        </div>
        
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
          <span style="display: inline-flex; align-items: center; padding: 8px 14px; border-radius: 22px; font-size: 13px; font-weight: 600; background: ${regionColors.background}60; color: #ffffff !important; border: 2px solid ${regionColors.border};">
            ${icon} ${typeTranslations[regionType] || 'Okänd typ'}
          </span>
          <span style="display: inline-flex; align-items: center; padding: 8px 14px; border-radius: 22px; font-size: 13px; font-weight: 600; background: rgba(75, 85, 99, 0.7); color: rgba(255,255,255,0.9) !important; border: 2px solid rgba(75, 85, 99, 0.8);">
            🗺️ ${region.category}
          </span>
          ${regionType === 'major_trading_city' ? '<span style="display: inline-flex; align-items: center; padding: 8px 14px; border-radius: 22px; font-size: 13px; font-weight: 600; background: rgba(245, 158, 11, 0.8); color: white !important; border: 2px solid #d97706;">🏛️ Huvudhandelsstad</span>' : ''}
          ${regionType === 'fortress' ? '<span style="display: inline-flex; align-items: center; padding: 8px 14px; border-radius: 22px; font-size: 13px; font-weight: 600; background: rgba(185, 28, 28, 0.8); color: white !important; border: 2px solid #991b1b;">🏰 Befästningsverk</span>' : ''}
          ${regionType === 'defensive_structure' ? '<span style="display: inline-flex; align-items: center; padding: 8px 14px; border-radius: 22px; font-size: 13px; font-weight: 600; background: rgba(71, 85, 105, 0.8); color: white !important; border: 2px solid #475569;">🛡️ Försvarshinder</span>' : ''}
        </div>
        
        <div style="padding-top: 14px; border-top: 2px solid rgba(75, 85, 99, 0.6);">
          <p style="font-size: 13px; color: rgba(255,255,255,0.6) !important; margin: 0;">Vikingatiden (793-1066 e.Kr.)</p>
        </div>
      </div>
    `, {
      maxWidth: 420,
      className: 'viking-region-popup'
    });

  // Add click event to focus map on marker location
  marker.on('click', () => {
    if (onMarkerClick) {
      onMarkerClick(region);
    }
  });

  // Enhanced debug logging for successful marker creation
  if (regionType === 'defensive_structure') {
    console.log('✅ Successfully created defensive structure marker for:', region.vikingName);
  }

  return marker;
};
