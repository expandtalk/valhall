
// Viking Age authentic colors - based on natural dyes and materials
export const getAuthenticDeityColors = () => {
  return {
    'thor': '#A0342A',    // Krapp-rött - madder red for the thunder god
    'odin': '#2C1810',    // Järnsvart - iron black for the all-father
    'frey': '#D4B429',    // Vejde-gul - weld yellow for fertility god
    'ull': '#6B5B47',     // Björkbark-grå - birch bark gray for winter god
    'njord': '#3A5F7A',   // Vejde-blå - limited blue for sea god
    'frigg': '#8B4513',   // Naturbrunt - natural brown for home goddess
    'other': '#6B5B47'    // Björkbark-grå for unknown/mixed cult sites
  };
};

// Muted Viking Age colors for cities
export const getMutedCityColors = () => {
  return {
    'religious_center': '#8B4513',  // Naturbrunt
    'trading_post': '#A0342A',     // Krapp-rött
    'koping': '#D4B429',           // Vejde-gul
    'established_city': '#6B5B47', // Björkbark-grå
    'gotlandic_center': '#3A5F7A'  // Vejde-blå (sparsamt)
  };
};

// Get runic inscription color based on mode
export const getRunicInscriptionColor = (isVikingMode: boolean): string => {
  return isVikingMode ? '#8B4513' : '#ef4444'; // Naturbrunt för Viking mode
};
