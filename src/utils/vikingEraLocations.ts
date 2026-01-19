
import { VikingLocation } from './vikingEraLocations/types';
import { SCANDINAVIAN_LOCATIONS } from './vikingEraLocations/scandinavianLocations';
import { BALTIC_LOCATIONS } from './vikingEraLocations/balticLocations';
import { EASTERN_LOCATIONS } from './vikingEraLocations/easternLocations';
import { WESTERN_LOCATIONS } from './vikingEraLocations/westernLocations';
import { RELIGIOUS_LOCATIONS } from './vikingEraLocations/religiousLocations';
import { ATLANTIC_LOCATIONS } from './vikingEraLocations/atlanticLocations';

export const VIKING_ERA_LOCATIONS: { [key: string]: VikingLocation } = {
  ...SCANDINAVIAN_LOCATIONS,
  ...BALTIC_LOCATIONS,
  ...EASTERN_LOCATIONS,
  ...WESTERN_LOCATIONS,
  ...RELIGIOUS_LOCATIONS,
  ...ATLANTIC_LOCATIONS
};

export const getVikingEraLocation = (key: string): VikingLocation | null => {
  return VIKING_ERA_LOCATIONS[key] || null;
};

export const getAllVikingLocations = (): VikingLocation[] => {
  return Object.values(VIKING_ERA_LOCATIONS);
};

export const getLocationsByCategory = (category: string): VikingLocation[] => {
  return Object.values(VIKING_ERA_LOCATIONS).filter(loc => loc.category === category);
};
