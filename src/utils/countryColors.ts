
// Country colors based on ethnic/cultural groups and DNA research connections
export const getCountryColors = (country?: string, region?: string) => {
  const countryColorMap: { [key: string]: { background: string; text: string; border: string } } = {
    // Nordic countries
    'sweden': { background: '#006aa7', text: '#ffcd00', border: '#ffcd00' }, // Blue background, yellow text
    'sverige': { background: '#006aa7', text: '#ffcd00', border: '#ffcd00' },
    
    // Danish/Danish cultural sphere - RED as requested for Danerna, Ribe, Hedeby
    'denmark': { background: '#c8102e', text: '#ffffff', border: '#ffffff' }, // Danish red with white text
    'danmark': { background: '#c8102e', text: '#ffffff', border: '#ffffff' },
    'danerna': { background: '#c8102e', text: '#ffffff', border: '#ffffff' }, // Folkslaget Danerna
    'ribe': { background: '#c8102e', text: '#ffffff', border: '#ffffff' }, // Staden Ribe
    'hedeby': { background: '#c8102e', text: '#ffffff', border: '#ffffff' }, // Staden Hedeby
    
    'norway': { background: '#ef2b2d', text: '#ffffff', border: '#002868' }, // Red background, white text, blue border
    'norge': { background: '#ef2b2d', text: '#ffffff', border: '#002868' },
    'iceland': { background: '#02529c', text: '#ffffff', border: '#dc1e35' }, // Blue background, white text, red border
    'island': { background: '#02529c', text: '#ffffff', border: '#dc1e35' },
    'finland': { background: '#003580', text: '#ffffff', border: '#ffffff' }, // Blue background, white text
    'suomi': { background: '#003580', text: '#ffffff', border: '#ffffff' },
    
    // Germanic regions
    'germany': { background: '#000000', text: '#ffce00', border: '#dd0000' }, // Black background, yellow text, red border
    'tyskland': { background: '#000000', text: '#ffce00', border: '#dd0000' },
    'austria': { background: '#ed2939', text: '#ffffff', border: '#ffffff' }, // Red background, white text
    'österrike': { background: '#ed2939', text: '#ffffff', border: '#ffffff' },
    'netherlands': { background: '#21468b', text: '#ffffff', border: '#ae1c28' }, // Blue background, white text, red border
    'nederländerna': { background: '#21468b', text: '#ffffff', border: '#ae1c28' },
    
    // Slavic regions
    'poland': { background: '#dc143c', text: '#ffffff', border: '#ffffff' }, // Red background, white text
    'polen': { background: '#dc143c', text: '#ffffff', border: '#ffffff' },
    'russia': { background: '#0039a6', text: '#ffffff', border: '#d52b1e' }, // Blue background, white text, red border
    'ryssland': { background: '#0039a6', text: '#ffffff', border: '#d52b1e' },
    'ukraine': { background: '#0057b7', text: '#ffd700', border: '#ffd700' }, // Blue background, yellow text
    'ukraina': { background: '#0057b7', text: '#ffd700', border: '#ffd700' },
    'czechia': { background: '#11457e', text: '#ffffff', border: '#d7141a' }, // Blue background, white text, red border
    'tjeckien': { background: '#11457e', text: '#ffffff', border: '#d7141a' },
    
    // Baltic regions
    'estonia': { background: '#0072ce', text: '#ffffff', border: '#000000' }, // Blue background, white text, black border
    'estland': { background: '#0072ce', text: '#ffffff', border: '#000000' },
    'latvia': { background: '#9e3039', text: '#ffffff', border: '#ffffff' }, // Red background, white text
    'lettland': { background: '#9e3039', text: '#ffffff', border: '#ffffff' },
    'lithuania': { background: '#006a44', text: '#fdb900', border: '#c1272d' }, // Green background, yellow text, red border
    'litauen': { background: '#006a44', text: '#fdb900', border: '#c1272d' },
    
    // British Isles
    'england': { background: '#ce1124', text: '#ffffff', border: '#ffffff' }, // Red background, white text
    'ireland': { background: '#169b62', text: '#ffffff', border: '#ff883e' }, // Green background, white text, orange border
    'irland': { background: '#169b62', text: '#ffffff', border: '#ff883e' },
    'scotland': { background: '#005eb8', text: '#ffffff', border: '#ffffff' }, // Blue background, white text
    'skottland': { background: '#005eb8', text: '#ffffff', border: '#ffffff' },
    
    // Atlantic regions
    'faroe_islands': { background: '#ed2939', text: '#ffffff', border: '#005eb8' }, // Red background, white text, blue border
    'färöarna': { background: '#ed2939', text: '#ffffff', border: '#005eb8' },
    'greenland': { background: '#d00c33', text: '#ffffff', border: '#ffffff' }, // Red background, white text
    'grönland': { background: '#d00c33', text: '#ffffff', border: '#ffffff' },
    
    // Celtic regions
    'celtic': { background: '#169b62', text: '#ffffff', border: '#ff883e' }, // Green background, white text, orange border
    'keltisk': { background: '#169b62', text: '#ffffff', border: '#ff883e' },
    
    // Germanic tribal regions based on DNA/cultural connections
    'west_germanic': { background: '#000000', text: '#ffce00', border: '#dd0000' }, // German colors for West Germanic
    'east_germanic': { background: '#7c3aed', text: '#ffffff', border: '#fbbf24' }, // Purple background, white text, gold border
    'north_germanic': { background: '#006aa7', text: '#ffcd00', border: '#ffffff' }, // Swedish colors for North Germanic
  };

  // Language branch mappings
  const languageBranchMap: { [key: string]: string } = {
    'North Germanic': 'north_germanic',
    'West Germanic': 'west_germanic',
    'East Germanic': 'east_germanic',
    'Celtic': 'celtic',
  };

  // Try exact country match first
  const countryKey = country?.toLowerCase();
  if (countryKey && countryColorMap[countryKey]) {
    return countryColorMap[countryKey];
  }

  // Try language branch mapping
  if (region && languageBranchMap[region]) {
    const mappedKey = languageBranchMap[region];
    if (countryColorMap[mappedKey]) {
      return countryColorMap[mappedKey];
    }
  }

  // Default neutral dark color with good contrast
  return { background: '#1e293b', text: '#f1f5f9', border: '#64748b' };
};

// Helper function to determine if we should use light or dark text
export const getContrastColor = (backgroundColor: string): string => {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return light or dark text based on background luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
};
