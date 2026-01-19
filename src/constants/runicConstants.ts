
// Status markers for runic inscriptions based on preservation and location
export const STATUS_MARKERS = {
  'preserved': 'Well preserved',
  'damaged': 'Damaged',
  'fragmentary': 'Fragmentary', 
  'lost': 'Lost',
  'underwater': 'Under vatten', // New status for underwater inscriptions
  'uncertain': 'Uncertain condition'
} as const;

// Period markers for runic inscriptions
export const PERIOD_MARKERS = {
  'elder_futhark': 'Elder Futhark (150-700 CE)',
  'younger_futhark': 'Younger Futhark (700-1100 CE)',
  'medieval': 'Medieval Runes (1100-1600 CE)',
  'viking_age': 'Viking Age (793-1066 CE)',
  'pre_viking': 'Pre-Viking (before 793 CE)',
  'late_viking': 'Late Viking (1000-1100 CE)'
} as const;

// Object categories for runic inscriptions
export const OBJECT_CATEGORIES = [
  { id: 'stone', label: 'Stone' },
  { id: 'jewelry', label: 'Jewelry' },
  { id: 'weapon', label: 'Weapon' },
  { id: 'tool', label: 'Tool' },
  { id: 'bone', label: 'Bone' },
  { id: 'wood', label: 'Wood' },
  { id: 'metal', label: 'Metal' },
  { id: 'textile', label: 'Textile' },
  { id: 'ceramic', label: 'Ceramic' },
  { id: 'glass', label: 'Glass' },
  { id: 'coin', label: 'Coin' },
  { id: 'other', label: 'Other' }
];

// Mapping of object types to categories
export const OBJECT_TYPE_MAPPINGS: { [key: string]: string } = {
  'runestone': 'stone',
  'gravestone': 'stone',
  'fragment of stone': 'stone',
  'stone fragment': 'stone',
  'bracteate': 'jewelry',
  'brooch': 'jewelry',
  'ring': 'jewelry',
  'pendant': 'jewelry',
  'sword': 'weapon',
  'axe': 'weapon',
  'spear': 'weapon',
  'arrowhead': 'weapon',
  'knife': 'tool',
  'needle': 'tool',
  'comb': 'bone',
  'amulet': 'other',
  'casket': 'wood',
  'staff': 'wood',
  'fitting': 'metal',
  'bell': 'metal',
  'bead': 'glass',
  'coin': 'coin',
  'textile fragment': 'textile',
  'ceramic fragment': 'ceramic',
  'unidentified object': 'other',
  'unknown': 'other'
};

// List of countries with runic inscriptions - updated to match database conventions
export const COUNTRIES = {
  'SE': 'Sweden',
  'DR': 'Denmark', 
  'N': 'Norway',
  'E': 'England',
  'IR': 'Ireland',
  'Sc': 'Scotland',
  'IS': 'Iceland',
  'FI': 'Finland',
  'EE': 'Estonia',
  'LV': 'Latvia',
  'LT': 'Lithuania',
  'DE': 'Germany',
  'NL': 'Netherlands',
  'GB': 'United Kingdom',
  'FR': 'France',
  'RU': 'Russia',
  'UA': 'Ukraine',
  'BY': 'Belarus',
  'PL': 'Poland',
  'CZ': 'Czech Republic',
  'AT': 'Austria',
  'CH': 'Switzerland',
  'IT': 'Italy',
  'GR': 'Greece',
  'TR': 'Turkey',
  'BG': 'Bulgaria',
  'RO': 'Romania',
  'HU': 'Hungary',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'HR': 'Croatia',
  'BA': 'Bosnia and Herzegovina',
  'RS': 'Serbia',
  'ME': 'Montenegro',
  'MK': 'North Macedonia',
  'AL': 'Albania',
  'XK': 'Kosovo'
};

// List of Swedish landscapes (landskap) - corrected format to match objects
export const SWEDISH_LANDSCAPES = {
  'U': 'Uppland',
  'Sö': 'Södermanland',
  'Ög': 'Östergötland',
  'Vg': 'Västergötland',
  'Sm': 'Småland',
  'Öl': 'Öland',
  'G': 'Gotland',
  'Sk': 'Skåne',
  'Hs': 'Hälsingland',
  'Jä': 'Jämtland',
  'Vs': 'Västmanland',
  'Nb': 'Närke',
  'Dl': 'Dalarna',
  'Bo': 'Bohuslän',
  'Hl': 'Halland',
  'Bl': 'Blekinge'
};

// List of Danish regions
export const DANISH_REGIONS = {
  'DR': 'Denmark',
  'Jylland': 'Jutland',
  'Zealand': 'Zealand',
  'Fyn': 'Funen'
};

// List of Norwegian regions
export const NORWEGIAN_REGIONS = {
  'N': 'Norway',
  'Oslo': 'Oslo',
  'Bergen': 'Bergen',
  'Oppland': 'Oppland',
  'Rogaland': 'Rogaland'
};

// List of English regions
export const ENGLISH_REGIONS = {
  'Yorkshire': 'Yorkshire',
  'Cumbria': 'Cumbria',
  'Northumberland': 'Northumberland',
  'London': 'London',
  'Kent': 'Kent'
};

// List of Irish regions
export const IRISH_REGIONS = {
  'Dublin': 'Dublin',
  'Cork': 'Cork',
  'Waterford': 'Waterford',
  'Kilkenny': 'Kilkenny'
};

// List of Scottish regions
export const SCOTTISH_REGIONS = {
  'Orkney': 'Orkney',
  'Shetland': 'Shetland',
  'Highland': 'Highland',
  'Argyll': 'Argyll and Bute'
};

// Viking destinations
export const VIKING_DESTINATIONS = {
  'birka': 'Birka',
  'hedeby': 'Hedeby',
  'kaupang': 'Kaupang',
  'ribe': 'Ribe',
  'trondheim': 'Trondheim',
  'york': 'York',
  'dublin': 'Dublin',
  'reykjavik': 'Reykjavik'
};

// Viking trade routes
export const VIKING_TRADE_ROUTES = {
  'western_route': 'Western Route (Atlantic)',
  'eastern_route': 'Eastern Route (Baltic-Black Sea)',
  'northern_route': 'Northern Route (Arctic)',
  'amber_road': 'Amber Road'
};

// Viking waterways
export const VIKING_WATERWAYS = {
  'dnieper': 'Dnieper River',
  'volga': 'Volga River',
  'thames': 'Thames River',
  'shannon': 'Shannon River',
  'baltic_sea': 'Baltic Sea',
  'north_sea': 'North Sea'
};

// List of Viking era locations
export const VIKING_LOCATIONS = [
  { id: 'destinations', label: 'Destinations' },
  { id: 'routes', label: 'Routes' },
  { id: 'settlements', label: 'Settlements' },
  { id: 'trade_centers', label: 'Trade Centers' },
  { id: 'battlefields', label: 'Battlefields' },
  { id: 'religious_sites', label: 'Religious Sites' }
];
