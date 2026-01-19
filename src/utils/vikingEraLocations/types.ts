
export interface VikingLocation {
  lat: number;
  lng: number;
  name: string;
  description: string;
  category: 'trading_post' | 'political_center' | 'settlement' | 'fortress' | 'exploration' | 'religious_center';
}
