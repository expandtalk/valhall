// Icon generation utilities for map markers with Viking Age authentic colors

import { getCountryColors } from '@/utils/countryColors';

export const getRunicIcon = (isUnderwater: boolean) => {
  if (isUnderwater) {
    // Wave/water icon for underwater inscriptions
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>';
  } else {
    // R rune for runic inscriptions - thicker stroke for better visibility
    return '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><path d="M6 4h8c2.2 0 4 1.8 4 4 0 1.5-.8 2.8-2 3.4L20 16h-3l-3-4h-2v4H6V4zm6 6c.6 0 1-.4 1-1s-.4-1-1-1H12v2h0z"/></svg>';
  }
};

// VIKING AGE AUTHENTIC COLORS - Updated with historical pigments
export const createRunicMarker = (country?: string, isUnderwater: boolean = false) => {
  // Authentic Viking Age colors based on natural dyes and materials
  const runicColors = {
    background: '#8B4513', // Saddle brown - naturbrunt från oblekt ull
    text: '#F4F1E8', // Oblekt ull-färg
    border: '#A0342A' // Krapp-rött för kontrast
  };
  
  const icon = getRunicIcon(isUnderwater);
  
  return `<div style="
    background: ${runicColors.background};
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 2px solid ${runicColors.border};
    box-shadow: 0 2px 4px rgba(44, 24, 16, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${runicColors.text};
  ">${icon}</div>`;
};

export const createGermanicGroupMarker = (groupName: string, languageBranch: string) => {
  // Skip Danish cultural groups that are already handled by Viking region markers
  if (groupName.toLowerCase().includes('danerna') || 
      groupName.toLowerCase().includes('ribe') || 
      groupName.toLowerCase().includes('hedeby')) {
    return null;
  }
  
  // Use Viking Age authentic colors for Germanic groups
  const vikingColors = {
    'North Germanic': { background: '#8B4513', border: '#A0342A', text: '#F4F1E8' }, // Naturbrunt
    'West Germanic': { background: '#6B5B47', border: '#2C1810', text: '#E8E3D3' }, // Björkbark-grå
    'East Germanic': { background: '#A0342A', border: '#8B4513', text: '#F4F1E8' }, // Krapp-rött
    'Celtic': { background: '#3A5F7A', border: '#2C1810', text: '#E8E3D3' }, // Vejde-blå (sparsamt)
    'Baltic': { background: '#D4B429', border: '#8B4513', text: '#2C1810' }, // Vejde-gul
    'West Slavic': { background: '#6B5B47', border: '#A0342A', text: '#F4F1E8' } // Björkbark-grå
  };
  
  const colors = vikingColors[languageBranch] || { background: '#8B4513', border: '#A0342A', text: '#F4F1E8' };
  const shortName = getShortDisplayName(groupName);
  const icon = getGermanicGroupIcon(languageBranch);
  const textLength = shortName.length;
  const minWidth = Math.max(100, textLength * 8 + 40);

  return `<div style="
    background: ${colors.background};
    min-width: ${minWidth}px;
    height: 32px;
    border-radius: 16px;
    border: 2px solid ${colors.border};
    box-shadow: 0 4px 8px rgba(44, 24, 16, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: bold;
    color: ${colors.text};
    text-align: center;
    padding: 0 12px;
    white-space: nowrap;
    gap: 6px;
    text-shadow: 1px 1px 2px rgba(44, 24, 16, 0.8);
    backdrop-filter: blur(4px);
  ">
    <span style="font-size: 14px; color: ${colors.text};">${icon}</span>
    <span style="color: ${colors.text};">${shortName}</span>
  </div>`;
};

export const createArchaeologicalMarker = (findName: string, culture: string) => {
  // Viking Age archaeological marker colors
  const vikingArchColors = {
    background: '#A0342A', // Krapp-rött för fynd
    border: '#8B4513', // Naturbrunt för ram
    text: '#F4F1E8' // Oblekt ull för text
  };
  
  const shortName = findName.split(' ')[0];
  const icon = getArchaeologicalIcon(culture);
  const textLength = shortName.length;
  const minWidth = Math.max(80, textLength * 8 + 30);

  return `<div style="
    background: ${vikingArchColors.background};
    min-width: ${minWidth}px;
    height: 28px;
    border-radius: 14px;
    border: 2px solid ${vikingArchColors.border};
    box-shadow: 0 2px 6px rgba(44, 24, 16, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    color: ${vikingArchColors.text};
    text-align: center;
    padding: 0 8px;
    white-space: nowrap;
    gap: 4px;
    text-shadow: 1px 1px 2px rgba(44, 24, 16, 0.8);
  ">
    <span style="font-size: 12px; color: ${vikingArchColors.text};">${icon}</span>
    <span style="color: ${vikingArchColors.text};">${shortName}</span>
  </div>`;
};

// Helper functions remain the same
const getShortDisplayName = (groupName: string): string => {
  const shortNames: { [key: string]: string } = {
    'Geatas/Gautar': 'Gautar',
    'Langobarderna': 'Longobard',
    'Anglerna': 'Angles',
    'Juterna': 'Jutes',
    'Obotriterna': 'Obotrit',
    'Kurländare': 'Kurland',
    'Finnar': 'Finnar',
    'Pruzzi': 'Pruzzi',
    'Virdar/Värend': 'Värend',
    'Svíþjóð': 'Svearnas land'
  };
  
  return shortNames[groupName] || groupName;
};

const getGermanicGroupIcon = (languageBranch: string): string => {
  const icons: { [key: string]: string } = {
    'North Germanic': '⚔️',
    'West Germanic': '🛡️', 
    'East Germanic': '🏰',
    'Proto-Germanic': '🗿',
    'Pre-Germanic': '🏹',
    'Celtic': '🍀',
    'Italic': '🏛️',
    'Finno-Ugric': '🐻',
    'West Slavic': '⚜️',
    'Baltic': '🌲',
    'Thracian': '🐎'
  };
  return icons[languageBranch] || '👥';
};

const getArchaeologicalIcon = (culture: string): string => {
  const icons: { [key: string]: string } = {
    'Nordisk bronsålder': '🔨',
    'Germansk järnålder': '⚔️',
    'Vendeltid': '🛡️',
    'Vikingatid': '⚓',
    'Keltisk kultur': '🍀',
    'Slavisk kultur': '⚜️',
    'Baltisk kultur': '🌲',
    'Romersk järnålder': '🏛️',
    'Folkvandringstid': '🐎'
  };
  return icons[culture] || '🏺';
};
