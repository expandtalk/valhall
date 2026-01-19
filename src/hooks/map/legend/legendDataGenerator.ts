
import { filterCitiesByPeriod, getCategoryColor } from '@/hooks/useVikingCities';
import { getFortressMarkersByType } from '../useVikingFortressMarkers';
import { getPlacesForTimePeriod, getDeityPlaces } from '@/utils/religiousLocations/religiousPlacesData';
import { getStakeBarriers } from '../useStakeBarrierMarkers';
import { getArchaeologicalSitesForPeriod, getAllArchaeologicalSiteTypes, getArchaeologicalSiteTypeCount } from '@/utils/archaeologicalSites/archaeologicalSitesData';
import { 
  getAuthenticDeityColors, 
  getMutedCityColors, 
  getRunicInscriptionColor 
} from './colorUtils';
import {
  getFortressTypeLabel,
  getCityTypeLabel,
  getReligiousCategoryLabel,
  getMainReligiousCategoryLabel
} from './labelUtils';
import { RunicInscription, VikingFortress, VikingCity, LegendItem } from './types';

export const generateMapLegendData = (
  inscriptions: RunicInscription[],
  isVikingMode: boolean,
  fortresses: VikingFortress[],
  vikingCities: VikingCity[],
  selectedPeriod: string,
  enabledLegendItems: { [key: string]: boolean },
  selectedTimePeriod: string,
  t: (key: string) => string
): LegendItem[] => {
  const legendItems: LegendItem[] = [];

  // 1. Runstenar (Runic inscriptions) - first priority
  legendItems.push({
    id: 'runic_inscriptions',
    label: t('runicInscriptions'),
    color: getRunicInscriptionColor(isVikingMode),
    count: inscriptions.length,
    enabled: enabledLegendItems.runic_inscriptions !== false,
    type: 'primary'
  });

  // 2. Vikingacenter (Viking cities) - second priority
  if (isVikingMode) {
    addVikingCities(legendItems, vikingCities, selectedPeriod, enabledLegendItems, t);
  }

  // 3. Valdemars segelled - third priority (placeholder for future implementation)
  // TODO: Add Valdemar's sailing route when data is available

  // 4. Viktiga vattenvägar - fourth priority (placeholder for future implementation)
  // TODO: Add important waterways when data is available

  // 5. Vikingatida vägar - fifth priority  
  if (selectedTimePeriod === 'viking_age') {
    addVikingRoads(legendItems, enabledLegendItems, t);
  }

  // 6. Fornborgar (Hillforts) - sixth priority
  if (isVikingMode) {
    addVikingFortresses(legendItems, fortresses, enabledLegendItems, t);
  }

  // 7. Arkeologiska platser - seventh priority
  addArchaeologicalSites(legendItems, selectedTimePeriod, enabledLegendItems, t);

  // 8. Religiösa kultplatser - eighth priority
  addReligiousPlaces(legendItems, selectedTimePeriod, enabledLegendItems, t);
  
  // 9. Påläggningsanläggningar - ninth priority
  if (selectedTimePeriod === 'viking_age') {
    addStakeBarriers(legendItems, enabledLegendItems, t);
  }

  console.log('Generated legend items with authentic Viking colors, stake barriers, and language support:', legendItems);
  return legendItems;
};

const addVikingRoads = (
  legendItems: LegendItem[],
  enabledLegendItems: { [key: string]: boolean },
  t: (key: string) => string
) => {
  const roadChildren: LegendItem[] = [
    {
      id: 'road_rullstensas',
      label: t('runicInscriptions') === 'Runic Inscriptions' ? 'Esker Roads (main routes)' : 'Rullstensåsar (huvudvägar)',
      color: '#CD853F', // Peru brown
      count: 5,
      enabled: enabledLegendItems.road_rullstensas !== false,
      type: 'subcategory',
      parentId: 'viking_roads'
    },
    {
      id: 'road_halvagar',
      label: t('runicInscriptions') === 'Runic Inscriptions' ? 'Sunken roads' : 'Hålvägar',
      color: '#A0522D', // Sienna brown
      count: 2,
      enabled: enabledLegendItems.road_halvagar !== false,
      type: 'subcategory',
      parentId: 'viking_roads'
    },
    {
      id: 'road_vinteragar',
      label: t('runicInscriptions') === 'Runic Inscriptions' ? 'Winter/ice roads' : 'Vintervägar/isvägar',
      color: '#4682B4', // Steel blue
      count: 2,
      enabled: enabledLegendItems.road_vinteragar !== false,
      type: 'subcategory',
      parentId: 'viking_roads'
    },
    {
      id: 'road_landmarks',
      label: t('runicInscriptions') === 'Runic Inscriptions' ? 'Bridges and fords' : 'Broar och vadställen',
      color: '#2F4F4F', // Dark slate gray
      count: 5,
      enabled: enabledLegendItems.road_landmarks !== false,
      type: 'subcategory',
      parentId: 'viking_roads'
    }
  ];

  const totalRoadCount = roadChildren.reduce((sum, child) => sum + child.count, 0);
  
  legendItems.push({
    id: 'viking_roads',
    label: t('runicInscriptions') === 'Runic Inscriptions' ? 'Viking Age Roads' : 'Vikingatida vägar',
    color: '#8B4513', // Saddle brown
    count: totalRoadCount,
    enabled: enabledLegendItems.viking_roads !== false,
    type: 'category',
    children: roadChildren
  });
};

const addReligiousPlaces = (
  legendItems: LegendItem[],
  selectedTimePeriod: string,
  enabledLegendItems: { [key: string]: boolean },
  t: (key: string) => string
) => {
  const religiousPlacesForPeriod = getPlacesForTimePeriod(selectedTimePeriod);
  console.log(`Religious places for ${selectedTimePeriod}:`, religiousPlacesForPeriod.length);
  
  if (religiousPlacesForPeriod.length > 0) {
    // Main category for religious cult sites with language support
    legendItems.push({
      id: 'religious_places',
      label: getMainReligiousCategoryLabel(t),
      color: '#8B7D6B', // Bisque brown instead of strong purple
      count: religiousPlacesForPeriod.length,
      enabled: enabledLegendItems.religious_places !== false,
      type: 'category',
      children: []
    });

    // Subcategories for each deity active during the period
    const deities = ['thor', 'odin', 'frey', 'ull', 'njord', 'frigg', 'other'];
    const religiousChildren: LegendItem[] = [];
    const authenticColors = getAuthenticDeityColors();
    
    deities.forEach(deity => {
      const deityPlacesForPeriod = getDeityPlaces(deity, selectedTimePeriod);
      if (deityPlacesForPeriod.length > 0) {
        religiousChildren.push({
          id: `religious_${deity}`,
          label: getReligiousCategoryLabel(deity, t),
          color: authenticColors[deity],
          count: deityPlacesForPeriod.length,
          enabled: enabledLegendItems[`religious_${deity}`] !== false,
          type: 'subcategory',
          parentId: 'religious_places'
        });
      }
    });

    // Add children to main category
    const religiousMainCategory = legendItems.find(item => item.id === 'religious_places');
    if (religiousMainCategory) {
      religiousMainCategory.children = religiousChildren;
    }
  }
};

const addStakeBarriers = (
  legendItems: LegendItem[],
  enabledLegendItems: { [key: string]: boolean },
  t: (key: string) => string
) => {
  const stakeBarriers = getStakeBarriers();
  if (stakeBarriers.length > 0) {
    legendItems.push({
      id: 'stake_barriers',
      label: t('runicInscriptions') === 'Runic Inscriptions' ? 'Underwater Fortifications' : 'Undervattensanläggningar',
      color: '#1e40af', // Deep blue for underwater fortifications
      count: stakeBarriers.length,
      enabled: enabledLegendItems.stake_barriers !== false,
      type: 'primary'
    });
  }
};

const addVikingFortresses = (
  legendItems: LegendItem[],
  fortresses: VikingFortress[],
  enabledLegendItems: { [key: string]: boolean },
  t: (key: string) => string
) => {
  const fortressesByType = getFortressMarkersByType(fortresses);

  // Define fortress types and their authentic colors
  const fortressTypes = [
    { key: 'ring_fortresses', color: '#8B4513' }, // Saddle brown
    { key: 'hillforts', color: '#696969' },       // Dim gray
    { key: 'longphorts', color: '#556B2F' },      // Dark olive green
    { key: 'royal_centers', color: '#CD853F' },   // Peru
    { key: 'coastal_defenses', color: '#4682B4' }, // Steel blue
    { key: 'trading_posts', color: '#DAA520' },   // Goldenrod
    { key: 'linear_defenses', color: '#708090' }  // Slate gray
  ];

  fortressTypes.forEach(({ key, color }) => {
    const fortressesOfType = fortressesByType[key];
    if (fortressesOfType && fortressesOfType.length > 0) {
      const legendId = key === 'coastal_defenses' ? 'coastal_defense' : key;
      legendItems.push({
        id: legendId,
        label: getFortressTypeLabel(key, t),
        color,
        count: fortressesOfType.length,
        enabled: enabledLegendItems[legendId] !== false,
        type: 'primary'
      });
    }
  });
};

const addArchaeologicalSites = (
  legendItems: LegendItem[],
  selectedTimePeriod: string,
  enabledLegendItems: { [key: string]: boolean },
  t: (key: string) => string
) => {
  const sitesForPeriod = getArchaeologicalSitesForPeriod(selectedTimePeriod);
  console.log(`Archaeological sites for ${selectedTimePeriod}:`, sitesForPeriod.length);
  
  if (sitesForPeriod.length > 0) {
    // Get all site types for this period
    const siteTypes = getAllArchaeologicalSiteTypes(selectedTimePeriod);
    const archaeologicalChildren: LegendItem[] = [];
    
    // Define colors for archaeological site types
    const typeColors = {
      burial_site: '#8B4513',      // Saddle brown
      defense_wall: '#696969',     // Dim gray
      burial_field: '#CD853F',     // Peru
      cult_house: '#9932CC',       // Dark orchid
      rock_carving: '#2F4F4F',     // Dark slate gray
      fortress: '#A0522D',         // Sienna
      stone_wall_system: '#708090', // Slate gray
      ancient_shoreline: '#4682B4', // Steel blue
      village: '#DAA520',          // Goldenrod
      trading_post: '#228B22',     // Forest green
      hall_building: '#9932CC',    // Dark orchid
      settlement: '#CD853F'        // Peru
    };

    // Define labels for archaeological site types
    const typeLabels = {
      burial_site: t('runicInscriptions') === 'Runic Inscriptions' ? 'Burial Sites' : 'Gravplatser',
      defense_wall: t('runicInscriptions') === 'Runic Inscriptions' ? 'Defense Walls' : 'Försvarsvallar',
      burial_field: t('runicInscriptions') === 'Runic Inscriptions' ? 'Burial Fields' : 'Gravfält',
      cult_house: t('runicInscriptions') === 'Runic Inscriptions' ? 'Cult Houses' : 'Kulthus',
      rock_carving: t('runicInscriptions') === 'Runic Inscriptions' ? 'Rock Carvings' : 'Hällristningar',
      fortress: t('runicInscriptions') === 'Runic Inscriptions' ? 'Fortresses' : 'Fornborgar',
      stone_wall_system: t('runicInscriptions') === 'Runic Inscriptions' ? 'Stone Wall Systems' : 'Stensträngssystem',
      ancient_shoreline: t('runicInscriptions') === 'Runic Inscriptions' ? 'Ancient Shorelines' : 'Fornstrandlinjer',
      village: t('runicInscriptions') === 'Runic Inscriptions' ? 'Villages' : 'Byar',
      trading_post: t('runicInscriptions') === 'Runic Inscriptions' ? 'Trading Posts' : 'Handelsplatser',
      hall_building: t('runicInscriptions') === 'Runic Inscriptions' ? 'Hall Buildings' : 'Hallbyggnader',
      settlement: t('runicInscriptions') === 'Runic Inscriptions' ? 'Settlements' : 'Bosättningar'
    };
    
    siteTypes.forEach(type => {
      const count = getArchaeologicalSiteTypeCount(type, selectedTimePeriod);
      if (count > 0) {
        archaeologicalChildren.push({
          id: `archaeological_${type}`,
          label: typeLabels[type] || type.replace(/_/g, ' '),
          color: typeColors[type] || '#666666',
          count,
          enabled: enabledLegendItems[`archaeological_${type}`] !== false,
          type: 'subcategory',
          parentId: 'archaeological_sites'
        });
      }
    });

    // Main category for archaeological sites
    legendItems.push({
      id: 'archaeological_sites',
      label: t('runicInscriptions') === 'Runic Inscriptions' ? 'Archaeological Sites' : 'Arkeologiska platser',
      color: '#8B7D6B', // Bisque brown
      count: sitesForPeriod.length,
      enabled: enabledLegendItems.archaeological_sites !== false,
      type: 'category',
      children: archaeologicalChildren
    });
  }
};

const addVikingCities = (
  legendItems: LegendItem[],
  vikingCities: VikingCity[],
  selectedPeriod: string,
  enabledLegendItems: { [key: string]: boolean },
  t: (key: string) => string
) => {
  const filteredCities = filterCitiesByPeriod(vikingCities, selectedPeriod);
  console.log('Generating legend for cities:', filteredCities.length, 'cities');
  
  const cityCategories = ['religious_center', 'trading_post', 'koping', 'established_city', 'gotlandic_center'];
  const mutedCityColors = getMutedCityColors();
  
  cityCategories.forEach(category => {
    const citiesInCategory = filteredCities.filter(city => city.category === category);
    console.log(`Category ${category}: ${citiesInCategory.length} cities`);
    if (citiesInCategory.length > 0) {
      legendItems.push({
        id: category,
        label: getCityTypeLabel(category, t),
        color: mutedCityColors[category] || getCategoryColor(category),
        count: citiesInCategory.length,
        enabled: enabledLegendItems[category] !== false,
        type: 'primary'
      });
    }
  });
};
