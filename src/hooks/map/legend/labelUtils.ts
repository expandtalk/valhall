
export const getMainReligiousCategoryLabel = (t: (key: string) => string): string => {
  return t('religiousCultSites');
};

export const getReligiousCategoryLabel = (deity: string, t: (key: string) => string): string => {
  switch (deity) {
    case 'thor':
      return t('thorCultSites');
    case 'odin':
      return t('odinCultSites');
    case 'frey':
      return t('freyCultSites');
    case 'ull':
      return t('ullCultSites');
    case 'njord':
      return t('njordCultSites');
    case 'frigg':
      return t('friggCultSites');
    default:
      return t('otherCultSites');
  }
};

export const getFortressTypeLabel = (fortressType: string, t: (key: string) => string): string => {
  const labels: { [key: string]: string } = {
    'ring_fortresses': 'Ring Fortresses',
    'hillforts': 'Hillforts',
    'longphorts': 'Longphorts',
    'royal_centers': 'Royal Centers',
    'coastal_defenses': 'Coastal Defense',
    'trading_posts': 'Trading Posts',
    'linear_defenses': 'Linear Defenses'
  };
  
  return labels[fortressType] || fortressType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const getCityTypeLabel = (cityType: string, t: (key: string) => string): string => {
  const labels: { [key: string]: string } = {
    'religious_center': 'Religious Centers',
    'trading_post': 'Trading Places',
    'koping': 'Market Towns',
    'established_city': 'Established Cities',
    'gotlandic_center': 'Gotlandic Centers'
  };
  
  return labels[cityType] || cityType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Function to clean labels by removing color prefixes
export const cleanLabelText = (label: string): string => {
  // Remove color prefixes and clean up the text
  return label
    .replace(/^(red|purple|green|yellow|blue|brown|orange|white|black|gray|grey)/i, '')
    .replace(/^(Ring|Hill|Long|Royal|Coastal|Trading|Religious|Market|Established|Gotlandic|Runic)/i, '$1')
    .replace(/^([A-Z][a-z]+)([A-Z])/g, '$1 $2') // Add space between camelCase words
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase
    .replace(/^[a-z]/, (match) => match.toUpperCase()) // Capitalize first letter
    .trim();
};
