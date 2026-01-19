
interface ArchaeologicalFind {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  period: 'paleolithic' | 'mesolithic' | 'neolithic' | 'bronze_age' | 'iron_age' | 'migration_period' | 'vendel_period' | 'viking_age';
  culture: string;
  significance: string;
  description: string;
  startYear: number;
  endYear: number;
  country: string;
  findType: 'settlement' | 'burial' | 'artifacts' | 'human_remains' | 'weapons' | 'boats' | 'cave' | 'workshop' | 'trade' | 'ritual' | 'city' | 'boat_graves' | 'royal_burial' | 'metalwork' | 'trading_post' | 'trading_city' | 'raid';
}

export const ARCHAEOLOGICAL_FINDS: ArchaeologicalFind[] = [
  {
    id: 'birka_grave_750',
    name: 'Birka krigargrav 750',
    nameEn: 'Birka Warrior Grave 750',
    lat: 59.4033,
    lng: 17.5431,
    period: 'viking_age',
    culture: 'Viking',
    description: 'En av de mest välbevarade vikingatida krigargravarna med vapen och smycken.',
    significance: 'Visar på krigarkulturen under tidig vikingatid',
    startYear: 750,
    endYear: 900,
    country: 'Sweden',
    findType: 'burial'
  },
  {
    id: 'gotland_silver_hoard',
    name: 'Gotlands silverskattar',
    nameEn: 'Gotland Silver Hoards',
    lat: 57.4684,
    lng: 18.4867,
    period: 'viking_age',
    culture: 'Viking',
    description: 'Över 700 silverskattar från vikingatiden har hittats på Gotland.',
    significance: 'Vittnar om Gotlands roll som handelscentrum',
    startYear: 800,
    endYear: 1100,
    country: 'Sweden',
    findType: 'artifacts'
  },
  {
    id: 'uppakra_settlement',
    name: 'Uppåkra centrumplats',
    nameEn: 'Uppåkra Central Place',
    lat: 55.7206,
    lng: 13.0761,
    period: 'vendel_period',
    culture: 'Vendel',
    description: 'En av Skandinaviens största järnålders- och vikingatida centrumplatser.',
    significance: 'Viktig handels- och kultplats under vendel- och vikingatid',
    startYear: 550,
    endYear: 800,
    country: 'Sweden',
    findType: 'settlement'
  },
  {
    id: 'gamla_uppsala_temple',
    name: 'Gamla Uppsala tempel',
    nameEn: 'Old Uppsala Temple',
    lat: 59.8985,
    lng: 17.6320,
    period: 'vendel_period',
    culture: 'Vendel',
    description: 'Platsen för det berömda templet som beskrevs av Adam av Bremen.',
    significance: 'Centralt religiöst centrum för fornnordisk religion',
    startYear: 550,
    endYear: 800,
    country: 'Sweden',
    findType: 'ritual'
  },
  {
    id: 'oseberg_ship',
    name: 'Osebergsskeppet',
    nameEn: 'Oseberg Ship',
    lat: 59.4167,
    lng: 10.4167,
    period: 'viking_age',
    culture: 'Viking',
    description: 'Ett av de mest välbevarade vikingaskeppen, begravt omkring 834 e.Kr.',
    significance: 'Ger unik inblick i vikingatidens skeppsbyggnad och begravningsritualer',
    startYear: 834,
    endYear: 834,
    country: 'Norway',
    findType: 'boat_graves'
  },
  {
    id: 'hedeby_settlement',
    name: 'Hedeby handelsplats',
    nameEn: 'Hedeby Trading Post',
    lat: 54.4914,
    lng: 9.5658,
    period: 'viking_age',
    culture: 'Viking',
    description: 'En av Nordeuropas viktigaste handelsplatser under vikingatiden.',
    significance: 'Knutpunkt för handel mellan Nord- och Centraleuropa',
    startYear: 808,
    endYear: 1066,
    country: 'Germany',
    findType: 'trading_city'
  }
];

export const getFindsInPeriod = (finds: ArchaeologicalFind[], period: string): ArchaeologicalFind[] => {
  if (period === 'all') return finds;
  
  return finds.filter(find => find.period === period);
};

export const getFindsByType = (finds: ArchaeologicalFind[], type: string): ArchaeologicalFind[] => {
  return finds.filter(find => find.findType === type);
};

// Export types and functions needed by other modules
export type { ArchaeologicalFind };
export { getFindIcon, getFindColor } from './archaeologicalFinds/helpers';
export { clusterFinds, getClusterIcon, type FindCluster } from './archaeologicalFinds/clustering';
