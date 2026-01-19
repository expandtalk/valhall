// Utility functions for Viking region display properties

export const getRegionColors = (vikingName: string, modernName: string) => {
  const regionColorMap: { [key: string]: { background: string; text: string; border: string } } = {
    // Nordic countries - using modern flag colors
    'Daneland': { background: '#c8102e', text: '#ffffff', border: '#ffffff' }, // Danish red with white text
    'Danmark': { background: '#c8102e', text: '#ffffff', border: '#ffffff' },
    'Svitjod': { background: '#006aa7', text: '#fecc00', border: '#fecc00' }, // Swedish blue with yellow text
    'Norge': { background: '#ba0c2f', text: '#ffffff', border: '#00205b' }, // Norwegian red with white text
    'Norðrvegr': { background: '#ba0c2f', text: '#ffffff', border: '#00205b' },
    
    // Germanic peoples - using relevant flag/regional colors
    'Langobarderna': { background: '#006aa7', text: '#fecc00', border: '#fecc00' }, // Swedish colors (modern connection)
    'Frankerriket': { background: '#002654', text: '#ffffff', border: '#ed2939' }, // French tricolor
    'Sachsen': { background: '#000000', text: '#dd0000', border: '#ffce00' }, // German colors
    'Saxarna': { background: '#000000', text: '#dd0000', border: '#ffce00' },
    'Friserna': { background: '#ff4f00', text: '#ffffff', border: '#ffffff' }, // Orange (Dutch connection)
    'Anglerna': { background: '#c8102e', text: '#ffffff', border: '#012169' }, // English red
    'Juterna': { background: '#c8102e', text: '#ffffff', border: '#ffffff' }, // Danish red
    
    // Baltic peoples
    'Kurländare': { background: '#9e3039', text: '#ffffff', border: '#ffffff' }, // Latvian maroon
    'Litauer': { background: '#fdb913', text: '#006a44', border: '#c1272d' }, // Lithuanian colors
    'Pruzzi': { background: '#000000', text: '#ffffff', border: '#dd0000' }, // Prussian/German colors
    
    // Slavic peoples
    'Polaber': { background: '#ffffff', text: '#dc143c', border: '#dc143c' }, // Polish white with red text
    'Obotriterna': { background: '#0072ce', text: '#ffffff', border: '#ffffff' }, // Slavic blue
    'Rugier': { background: '#0072ce', text: '#ffffff', border: '#ffffff' },
    'Gårdarike': { background: '#ffffff', text: '#0039a6', border: '#d52b1e' }, // Russian white with blue text
    
    // Celtic peoples
    'Irländare': { background: '#169b62', text: '#ffffff', border: '#ff883e' }, // Irish green
    'Skottar': { background: '#005eb8', text: '#ffffff', border: '#ffffff' }, // Scottish blue
    'Walesare': { background: '#00b04f', text: '#ffffff', border: '#dd0000' }, // Welsh green
    
    // Greek regions
    'Grekland': { background: '#0d5eaf', text: '#ffffff', border: '#ffffff' }, // Greek blue
    'Byzans': { background: '#0d5eaf', text: '#ffffff', border: '#ffffff' },
    
    // Others
    'Island': { background: '#0048e0', text: '#ffffff', border: '#dc1e35' }, // Icelandic blue
    'Grönland': { background: '#ffffff', text: '#d00c33', border: '#d00c33' }, // Greenlandic white with red text
    'Finnar': { background: '#003580', text: '#ffffff', border: '#ffffff' }, // Finnish blue
    'Samer': { background: '#0066cc', text: '#ffcc00', border: '#cc0000' }, // Sami flag colors
    'Avarerna': { background: '#436f4d', text: '#ffffff', border: '#ce2939' }, // Hungarian-inspired
    'Bulgarerna': { background: '#ffffff', text: '#00966e', border: '#d62612' }, // Bulgarian colors
    'Khazarerna': { background: '#8b4513', text: '#ffd700', border: '#ffd700' }, // Brown and gold
  };

  // Try to find by Viking name first, then modern name, then default
  return regionColorMap[vikingName] || 
         regionColorMap[modernName] || 
         { background: '#1f2937', text: '#fbbf24', border: '#fbbf24' }; // Default amber
};

export const getRegionIcon = (vikingName: string, modernName: string, category: string) => {
  // NO ICONS - just return empty string for clean text-only display
  return '';
};

export const getCategoryColors = () => {
  return {
    'nordic': '#fbbf24',      // amber
    'germanic': '#10b981',    // emerald
    'slavic': '#8b5cf6',      // violet
    'celtic': '#06b6d4',      // cyan
    'baltic': '#f59e0b',      // orange
    'discoveries': '#ef4444', // red
    'christian': '#dc2626',   // red for Christian centers
    'other': '#6b7280'        // gray
  };
};
