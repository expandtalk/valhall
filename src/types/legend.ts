
export interface LegendPreset {
  runic_inscriptions: boolean;
  archaeological_sites: boolean;
  viking_fortresses: boolean;
  viking_cities: boolean;
  viking_regions: boolean;
  germanic_groups: boolean;
  stake_barriers: boolean;
  valdemar_route: boolean;
  river_routes: boolean;
  carvers: boolean;
  gods: boolean;
  hundreds: boolean;
  parishes: boolean;
  [key: string]: boolean; // Index signature to allow string keys
}
