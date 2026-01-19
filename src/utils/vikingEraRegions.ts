
import { VikingRegion } from './vikingRegions/types';
import { VIKING_REGION_CATEGORIES } from './vikingRegions/vikingRegionCategories';
import { VIKING_REGIONS } from './vikingRegions/vikingRegionData';

// Re-export for backward compatibility - using export type for TypeScript
export type { VikingRegion } from './vikingRegions/types';
export { VIKING_REGION_CATEGORIES } from './vikingRegions/vikingRegionCategories';

export const VIKING_ERA_REGIONS = VIKING_REGIONS;
export const ALL_VIKING_REGIONS = VIKING_REGIONS;

export const getVikingRegions = (): VikingRegion[] => {
  return VIKING_REGIONS;
};

export const getVikingRegionsByCategory = (category: string): VikingRegion[] => {
  return VIKING_REGIONS.filter(region => region.category === category);
};

export const getVikingRegionsByPeriod = (period: string): VikingRegion[] => {
  if (period === 'all') return VIKING_REGIONS;
  return VIKING_REGIONS.filter(region => 
    region.timeperiod === period || region.timeperiod === 'all_viking'
  );
};
