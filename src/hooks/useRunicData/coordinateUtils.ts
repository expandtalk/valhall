
// Global PostgreSQL point parser for the entire site
export const parseCoordinates = (coordinatesData: any): { lat: number; lng: number } | null => {
  if (!coordinatesData) return null;
  
  // Handle different formats of coordinates from database
  if (typeof coordinatesData === 'string') {
    // Parse PostgreSQL point format "(x,y)" or "POINT(x y)" or "(longitude,latitude)"
    let match = coordinatesData.match(/\(([^,\s]+)[,\s]+([^)]+)\)/);
    
    // Also handle POINT(x y) format from PostGIS
    if (!match) {
      match = coordinatesData.match(/POINT\(([^,\s]+)\s+([^)]+)\)/);
    }
    
    if (match) {
      const x = parseFloat(match[1]);
      const y = parseFloat(match[2]);
      
      // PostgreSQL point format is typically (x,y) where x=longitude, y=latitude
      // Scandinavian coordinates: Latitude: ~55-71°N, Longitude: ~5-31°E
      if (y >= 55 && y <= 71 && x >= 5 && x <= 31) {
        return { lng: x, lat: y };
      }
      
      // If that doesn't work, try swapped
      if (x >= 55 && x <= 71 && y >= 5 && y <= 31) {
        return { lng: y, lat: x };
      }
      
      // For coordinates outside Scandinavia (like global data), return as-is
      if (Math.abs(x) <= 180 && Math.abs(y) <= 90) {
        return { lng: x, lat: y };
      }
    }
  } else if (coordinatesData && typeof coordinatesData === 'object') {
    // Already parsed object
    if (coordinatesData.lat !== undefined && coordinatesData.lng !== undefined) {
      return { lat: coordinatesData.lat, lng: coordinatesData.lng };
    }
    if (coordinatesData.x !== undefined && coordinatesData.y !== undefined) {
      // Assume x=longitude, y=latitude
      return { lng: coordinatesData.x, lat: coordinatesData.y };
    }
    // Handle array format [lng, lat] or [lat, lng]
    if (Array.isArray(coordinatesData) && coordinatesData.length === 2) {
      const [first, second] = coordinatesData;
      // Check which order makes sense for Scandinavia
      if (second >= 55 && second <= 71 && first >= 5 && first <= 31) {
        return { lng: first, lat: second };
      }
      if (first >= 55 && first <= 71 && second >= 5 && second <= 31) {
        return { lng: second, lat: first };
      }
      // For non-Scandinavian coordinates
      if (Math.abs(first) <= 180 && Math.abs(second) <= 90) {
        return { lng: first, lat: second };
      }
    }
  }
  
  return null;
};
