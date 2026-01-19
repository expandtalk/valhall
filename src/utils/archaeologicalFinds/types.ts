
export interface ArchaeologicalFind {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  period: string;
  culture: string;
  significance: string;
  description: string;
  startYear: number;
  endYear: number;
  country: string;
  findType: 'settlement' | 'burial' | 'boat_graves' | 'artifacts' | 'weapons' | 'workshop' | 'trading_city' | 'ritual' | 'city' | 'human_remains' | 'boats' | 'cave' | 'trade' | 'royal_burial' | 'metalwork' | 'trading_post' | 'raid' | 'rock_carving';
}

export interface FindCluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  finds: ArchaeologicalFind[];
}
