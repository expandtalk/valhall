
export interface VikingLocation {
  id?: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
  category: string;
  country?: string;
  period_start?: number;
  period_end?: number;
  [key: string]: any;
}
