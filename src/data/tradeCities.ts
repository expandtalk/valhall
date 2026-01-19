export interface TradeCity {
  id: string;
  name: string;
  nameEn: string;
  coordinates: { lat: number; lng: number };
  importance: 'major' | 'regional' | 'minor';
  period: string;
  periodStart: number;
  periodEnd: number;
  description: string;
  descriptionEn: string;
  type: 'capital' | 'trading_post' | 'fortress' | 'port';
}

export const TRADE_CITIES: TradeCity[] = [
  {
    id: 'uppsala',
    name: 'Uppsala/Mälaren',
    nameEn: 'Uppsala/Mälaren',
    coordinates: { lat: 59.8586, lng: 17.6389 },
    importance: 'major',
    period: '700-1200',
    periodStart: 700,
    periodEnd: 1200,
    description: 'Sveriges religiösa och politiska centrum under vikingatiden',
    descriptionEn: "Sweden's religious and political center during the Viking Age",
    type: 'capital'
  },
  {
    id: 'sigtuna',
    name: 'Sigtuna',
    nameEn: 'Sigtuna',
    coordinates: { lat: 59.6197, lng: 17.7239 },
    importance: 'major',
    period: '980-1200',
    periodStart: 980,
    periodEnd: 1200,
    description: 'Sveriges första riktiga stad, grundad ca 980',
    descriptionEn: "Sweden's first true city, founded circa 980",
    type: 'trading_post'
  },
  {
    id: 'ladoga',
    name: 'Staraja Ladoga',
    nameEn: 'Staraya Ladoga',
    coordinates: { lat: 60.1272, lng: 32.2963 },
    importance: 'major',
    period: '753-1200',
    periodStart: 753,
    periodEnd: 1200,
    description: 'Äldsta ryska staden, viktig varjagisk handelsplats',
    descriptionEn: 'Oldest Russian city, important Varangian trading post',
    type: 'trading_post'
  },
  {
    id: 'novgorod',
    name: 'Novgorod',
    nameEn: 'Novgorod',
    coordinates: { lat: 58.5219, lng: 31.2756 },
    importance: 'major',
    period: '859-1478',
    periodStart: 859,
    periodEnd: 1478,
    description: 'Stor medeltida handelsrepublik, knutpunkt för öst-västhandel',
    descriptionEn: 'Great medieval trading republic, hub for east-west trade',
    type: 'capital'
  },
  {
    id: 'kiev',
    name: 'Kiev',
    nameEn: 'Kyiv',
    coordinates: { lat: 50.4501, lng: 30.5234 },
    importance: 'major',
    period: '882-1240',
    periodStart: 882,
    periodEnd: 1240,
    description: 'Kievrikets huvudstad, "Ryska städernas moder"',
    descriptionEn: 'Capital of Kievan Rus, "Mother of Russian Cities"',
    type: 'capital'
  },
  {
    id: 'constantinople',
    name: 'Konstantinopel',
    nameEn: 'Constantinople',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    importance: 'major',
    period: '330-1453',
    periodStart: 330,
    periodEnd: 1453,
    description: 'Bysantinska rikets huvudstad, viktigaste handelsmålet i öst',
    descriptionEn: 'Capital of Byzantine Empire, most important trade destination in the east',
    type: 'capital'
  },
  {
    id: 'bulgar',
    name: 'Volga Bulgarien',
    nameEn: 'Volga Bulgaria',
    coordinates: { lat: 56.8519, lng: 53.2115 },
    importance: 'major',
    period: '660-1240',
    periodStart: 660,
    periodEnd: 1240,
    description: 'Turkiskt rike vid Volga, viktigt handelscentrum för muslimsk handel',
    descriptionEn: 'Turkic state on the Volga, important trading center for Muslim trade',
    type: 'trading_post'
  },
  {
    id: 'atil',
    name: 'Atil (Khazarriket)',
    nameEn: 'Atil (Khazar Khaganate)',
    coordinates: { lat: 46.1, lng: 48.0 },
    importance: 'major',
    period: '650-969',
    periodStart: 650,
    periodEnd: 969,
    description: 'Khazarernas huvudstad vid Volgadelta',
    descriptionEn: 'Khazar capital at Volga delta',
    type: 'capital'
  },
  {
    id: 'arkhangelsk',
    name: 'Arkhangelsk (Bjarmia)',
    nameEn: 'Arkhangelsk (Bjarmia)',
    coordinates: { lat: 64.5467, lng: 40.5467 },
    importance: 'regional',
    period: '800-1200',
    periodStart: 800,
    periodEnd: 1200,
    description: 'Bjarmia-området vid Vita havet, känt från isländska sagor',
    descriptionEn: 'Bjarmia region by White Sea, known from Icelandic sagas',
    type: 'trading_post'
  },
  {
    id: 'prague',
    name: 'Prag',
    nameEn: 'Prague',
    coordinates: { lat: 50.0755, lng: 14.4378 },
    importance: 'major',
    period: '870-1200',
    periodStart: 870,
    periodEnd: 1200,
    description: 'Viktigt centraleuropeiskt handelscentrum',
    descriptionEn: 'Important Central European trading center',
    type: 'capital'
  },
  {
    id: 'rome',
    name: 'Rom',
    nameEn: 'Rome',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    importance: 'major',
    period: '-500-1200',
    periodStart: -500,
    periodEnd: 1200,
    description: 'Det västromerska rikets centrum, viktig för bärnstenshandel',
    descriptionEn: 'Center of Western Roman Empire, important for amber trade',
    type: 'capital'
  },
  {
    id: 'venice',
    name: 'Venedig',
    nameEn: 'Venice',
    coordinates: { lat: 45.4408, lng: 12.3155 },
    importance: 'major',
    period: '697-1200',
    periodStart: 697,
    periodEnd: 1200,
    description: 'Viktig handelsrepublik och hamn mot öst',
    descriptionEn: 'Important trading republic and gateway to the east',
    type: 'port'
  },
  {
    id: 'gdansk',
    name: 'Gdańsk',
    nameEn: 'Gdańsk',
    coordinates: { lat: 54.35, lng: 18.65 },
    importance: 'regional',
    period: '997-1200',
    periodStart: 997,
    periodEnd: 1200,
    description: 'Viktig östersjöhamn på bärnstensrutten',
    descriptionEn: 'Important Baltic port on the amber route',
    type: 'port'
  },
  {
    id: 'baghdad',
    name: 'Bagdad',
    nameEn: 'Baghdad',
    coordinates: { lat: 33.3152, lng: 44.3661 },
    importance: 'major',
    period: '762-1258',
    periodStart: 762,
    periodEnd: 1258,
    description: 'Abbasidkalifatets huvudstad, viktig för silverhandel',
    descriptionEn: 'Capital of Abbasid Caliphate, important for silver trade',
    type: 'capital'
  }
];

export const getCitiesByTimePeriod = (year: number) => {
  return TRADE_CITIES.filter(
    city => year >= city.periodStart && year <= city.periodEnd
  );
};

export const getCitiesByImportance = (importance: TradeCity['importance']) => {
  return TRADE_CITIES.filter(city => city.importance === importance);
};
