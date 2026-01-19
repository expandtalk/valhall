
interface RunicInscription {
  id: string;
  signum: string;
  location?: string;
  province?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  raw_data?: any;
  placement?: string;
  height_above_sea?: number;
}

// Function to detect if inscription is underwater
export const isUnderwaterInscription = (inscription: RunicInscription): boolean => {
  // Check raw_data for placement information
  if (inscription.raw_data) {
    const placement = inscription.raw_data.placement || inscription.raw_data.Placering;
    if (placement && typeof placement === 'string') {
      const placementLower = placement.toLowerCase();
      if (placementLower.includes('under vatten') || 
          placementLower.includes('underwater') ||
          placementLower.includes('i vatten')) {
        return true;
      }
    }
    
    // Check height above sea level (0m often indicates underwater)
    const heightData = inscription.raw_data.height_above_sea || 
                      inscription.raw_data['Höjd över havet'] ||
                      inscription.raw_data.elevation;
    if (heightData) {
      const heightStr = String(heightData).toLowerCase();
      if (heightStr.includes('0 m') || heightStr === '0') {
        return true;
      }
    }
  }
  
  // Check location field for underwater indicators
  if (inscription.location) {
    const locationLower = inscription.location.toLowerCase();
    if (locationLower.includes('under vatten') || 
        locationLower.includes('underwater') ||
        locationLower.includes('harbour') ||
        locationLower.includes('hamn')) {
      return true;
    }
  }
  
  return false;
};
