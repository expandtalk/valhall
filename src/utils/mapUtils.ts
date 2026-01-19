// Utility functions for map operations

export const zoomToLocation = (location: string, navigate: (url: string) => void) => {
  // Create a URL that will trigger a map zoom to the specific location
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('searchQuery', location);
  currentUrl.searchParams.set('zoomTo', location);
  navigate(currentUrl.pathname + currentUrl.search);
};

// Swedish region coordinates for map centering
export const getLocationCoordinates = (location: string): [number, number] | null => {
  const coordinates: Record<string, [number, number]> = {
    // Swedish regions
    'uppland': [59.85, 17.65],
    'södermanland': [59.20, 16.55],
    'östergötland': [58.40, 15.62],
    'västergötland': [58.20, 13.00],
    'småland': [57.00, 14.50],
    'öland': [56.70, 16.70],
    'gotland': [57.50, 18.50],
    'skåne': [55.70, 13.20],
    'halland': [56.50, 12.85],
    'blekinge': [56.16, 15.05],
    'bohuslän': [58.30, 11.50],
    'dalsland': [58.80, 12.30],
    'värmland': [59.80, 13.50],
    'närke': [59.20, 15.20],
    'västmanland': [59.60, 16.55],
    'dalarna': [60.60, 15.60],
    'gävleborg': [61.70, 17.15],
    'hälsingland': [61.60, 16.20],
    'jämtland': [63.18, 14.64],
    'härjedalen': [62.08, 13.84],
    'medelpad': [62.40, 17.30],
    'ångermanland': [63.25, 18.71],
    'västerbotten': [64.75, 20.95],
    'norrbotten': [67.85, 20.22],
    
    // Norwegian regions
    'norge': [60.47, 8.47],
    'norway': [60.47, 8.47],
    'vestfold': [59.40, 10.40],
    'akershus': [59.95, 11.05],
    'oslo': [59.91, 10.75],
    'buskerud': [60.20, 9.60],
    'telemark': [59.20, 8.60],
    'rogaland': [58.87, 6.15],
    'hordaland': [60.39, 6.33],
    'sogn og fjordane': [61.20, 6.70],
    'møre og romsdal': [62.73, 7.16],
    'sør-trøndelag': [63.43, 10.39],
    'nord-trøndelag': [64.46, 12.30],
    'nordland': [67.28, 14.40],
    'troms': [69.65, 18.96],
    'finnmark': [70.07, 25.48],
    
    // Danish regions
    'danmark': [56.26, 9.50],
    'denmark': [56.26, 9.50],
    'jylland': [56.15, 9.50],
    'jutland': [56.15, 9.50],
    'fyn': [55.40, 10.40],
    'sjælland': [55.68, 11.57],
    'bornholm': [55.13, 14.92],
    
    // Special parishes
    'åland': [60.22, 19.95],
    
    // Default coordinates
    'sverige': [62.00, 15.00],
    'sweden': [62.00, 15.00],
  };
  
  const key = location.toLowerCase();
  return coordinates[key] || null;
};