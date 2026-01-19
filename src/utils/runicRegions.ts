
import { 
  SWEDISH_LANDSCAPES, 
  DANISH_REGIONS, 
  NORWEGIAN_REGIONS, 
  ENGLISH_REGIONS, 
  IRISH_REGIONS,
  SCOTTISH_REGIONS,
  VIKING_DESTINATIONS,
  VIKING_TRADE_ROUTES,
  VIKING_WATERWAYS
} from '@/constants/runicConstants';

export const getRegionsForCountry = (countryCode: string, isVikingMode: boolean = false) => {
  if (isVikingMode) {
    // Return Viking geography regardless of country selection
    switch (countryCode) {
      case 'destinations':
        return VIKING_DESTINATIONS;
      case 'routes':
        return VIKING_TRADE_ROUTES;
      case 'waterways':
        return VIKING_WATERWAYS;
      default:
        return VIKING_DESTINATIONS; // Default to destinations
    }
  }

  // Traditional country-based regions
  switch (countryCode) {
    case 'SE':
      return SWEDISH_LANDSCAPES;
    case 'DR':
      return DANISH_REGIONS;
    case 'N':
      return NORWEGIAN_REGIONS;
    case 'E':
      return ENGLISH_REGIONS;
    case 'IR':
      return IRISH_REGIONS;
    case 'Sc':
      return SCOTTISH_REGIONS;
    default:
      return {};
  }
};

export const getRegionLabel = (countryCode: string, isVikingMode: boolean = false): string => {
  if (isVikingMode) {
    switch (countryCode) {
      case 'destinations':
        return 'Viking Destinations';
      case 'routes':
        return 'Trade Routes';
      case 'waterways':
        return 'Waterways & Rivers';
      default:
        return 'Viking Destinations';
    }
  }

  switch (countryCode) {
    case 'SE':
      return 'Swedish Landscapes';
    case 'DR':
      return 'Danish Regions';
    case 'N':
      return 'Norwegian Regions';
    case 'E':
      return 'English Regions';
    case 'IR':
      return 'Irish Regions';
    case 'Sc':
      return 'Scottish Regions';
    default:
      return 'Regions';
  }
};

export const getVikingGeographyOptions = () => {
  return [
    { value: 'destinations', label: 'Viking Destinations' },
    { value: 'routes', label: 'Trade Routes' },
    { value: 'waterways', label: 'Waterways & Rivers' }
  ];
};
