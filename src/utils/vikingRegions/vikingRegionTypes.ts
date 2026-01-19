
export interface VikingRegion {
  lat: number;
  lng: number;
  vikingName: string;
  modernName: string;
  description: string;
  category: 'nordic' | 'germanic' | 'slavic' | 'celtic' | 'baltic' | 'other' | 'discoveries' | 'christian' | 'byzantine' | 'frankish' | 'anglo_saxon' | 'turkic';
  timeperiod: 'early_viking' | 'middle_viking' | 'late_viking' | 'all_viking';
  type?: 'tribe' | 'kingdom' | 'city' | 'religious_center' | 'discovery' | 'major_trading_city' | 'imperial_capital' | 'fortress' | 'defensive_structure' | 'defensive_wall' | 'ring_fortress';
}
