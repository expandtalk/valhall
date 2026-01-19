import type { Coordinates } from '@/types/common';

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

// Generate unique offset for each inscription based on its ID
export const generateUniqueOffset = <T extends Coordinates>(inscription: RunicInscription, baseCoords: T): T => {
  // Use inscription ID to generate consistent but unique offsets
  const hash = inscription.id.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Convert hash to a reasonable offset (max ~5km from center)
  const latOffset = ((hash % 1000) / 1000 - 0.5) * 0.1; // ±0.05 degrees (~5km)
  const lngOffset = (((hash >> 10) % 1000) / 1000 - 0.5) * 0.1; // ±0.05 degrees
  
  return {
    ...baseCoords,
    lat: baseCoords.lat + latOffset,
    lng: baseCoords.lng + lngOffset
  };
};
