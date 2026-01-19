
// Marker priority system to show only one icon per location
// even when a place has multiple properties

export interface MarkerLocation {
  lat: number;
  lng: number;
  tolerance?: number; // Default 0.001 degrees (~100m)
}

export interface MarkerData {
  location: MarkerLocation;
  type: string;
  priority: number;
  name: string;
  data: any;
}

// Priority levels (higher number = higher priority)
export const MARKER_PRIORITIES = {
  // Viking era specific
  'imperial_capital': 100,
  'royal_center': 90,
  'ring_fortress': 85,
  'major_trading_city': 80,
  'fortress': 75,
  'hillfort': 70,
  'longphort': 65,
  'coastal_defense': 60,
  'defensive_structure': 55,
  'stake_barriers': 50,
  'trading_post': 45,
  'religious_places': 40,
  'viking_city': 35,
  'settlement': 30,
  
  // Archaeological and historical
  'archaeological_finds': 25,
  'germanic_timeline': 20,
  'runic_inscriptions': 15,
  
  // Lowest priority
  'viking_locations': 10
} as const;

export type MarkerType = keyof typeof MARKER_PRIORITIES;

// Check if two locations are close enough to be considered the same place
export const areLocationsClose = (
  loc1: MarkerLocation, 
  loc2: MarkerLocation, 
  tolerance: number = 0.001
): boolean => {
  const latDiff = Math.abs(loc1.lat - loc2.lat);
  const lngDiff = Math.abs(loc1.lng - loc2.lng);
  const usedTolerance = Math.min(loc1.tolerance || tolerance, loc2.tolerance || tolerance);
  
  return latDiff <= usedTolerance && lngDiff <= usedTolerance;
};

// Manager class to handle marker deduplication
export class MarkerDeduplicationManager {
  private markers: MarkerData[] = [];
  
  addMarker(marker: MarkerData): boolean {
    // Check if there's already a marker at this location
    const existingIndex = this.markers.findIndex(existing => 
      areLocationsClose(existing.location, marker.location)
    );
    
    if (existingIndex >= 0) {
      const existing = this.markers[existingIndex];
      
      // If new marker has higher priority, replace the existing one
      if (marker.priority > existing.priority) {
        console.log(`🔄 Replacing ${existing.type} (${existing.priority}) with ${marker.type} (${marker.priority}) at ${marker.name}`);
        this.markers[existingIndex] = marker;
        return true; // Show this marker
      } else {
        console.log(`⏭️ Skipping ${marker.type} (${marker.priority}) - ${existing.type} (${existing.priority}) has higher priority at ${marker.name}`);
        return false; // Don't show this marker
      }
    } else {
      // No existing marker at this location, add it
      this.markers.push(marker);
      console.log(`✅ Adding ${marker.type} (${marker.priority}) at ${marker.name}`);
      return true;
    }
  }
  
  clear(): void {
    this.markers = [];
  }
  
  getMarkers(): MarkerData[] {
    return [...this.markers];
  }
  
  getMarkerCount(): number {
    return this.markers.length;
  }
}

// Global instance for the current map session
export const globalMarkerManager = new MarkerDeduplicationManager();

// Helper function to get priority for a marker type
export const getMarkerPriority = (type: string): number => {
  const priority = MARKER_PRIORITIES[type as MarkerType];
  if (priority === undefined) {
    console.warn(`Unknown marker type: ${type}, using priority 1`);
    return 1;
  }
  return priority;
};

// Helper function to reset marker manager (call when map is reinitialized)
export const resetMarkerManager = (): void => {
  globalMarkerManager.clear();
  console.log('🔄 Marker deduplication manager reset');
};
