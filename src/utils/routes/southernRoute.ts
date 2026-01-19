
import { RoutePoint } from './types';

// Southern route sections: Utlängan to Kalmar - direct route over water
export const southernRoutePoints: RoutePoint[] = [
  // === SEKTION 1: Utlängan - startpunkt ===
  {
    id: 'utlangan',
    name: 'Utlängan',
    coordinates: { lat: 56.0474, lng: 15.7697 }, // Utlängan fyr
    description: 'Utlängan fyr - officiell startpunkt för Kung Valdemars segelled',
    section: 'Utlängan start',
    isLotstation: true,
    isMajorWaypoint: true
  },

  // === SEKTION 2: Direkt över vatten mot Kalmar ===
  {
    id: 'open_water_1',
    name: 'Öppet vatten 1',
    coordinates: { lat: 56.1500, lng: 15.9000 },
    description: 'Över öppet vatten från Utlängan mot Kalmar',
    section: 'Över vatten till Kalmar'
  },
  {
    id: 'open_water_2',
    name: 'Öppet vatten 2',
    coordinates: { lat: 56.3000, lng: 16.0000 },
    description: 'Fortsatt över öppet vatten',
    section: 'Över vatten till Kalmar'
  },
  {
    id: 'open_water_3',
    name: 'Öppet vatten 3',
    coordinates: { lat: 56.4500, lng: 16.1500 },
    description: 'Närmre Kalmar över vatten',
    section: 'Över vatten till Kalmar'
  },

  // === SEKTION 3: Approach till Kalmar ===
  {
    id: 'kalmar_approach',
    name: 'Kalmar approach',
    coordinates: { lat: 56.6000, lng: 16.3000 },
    description: 'Approach till Kalmar från söder',
    section: 'Kalmar approach'
  },

  // === SEKTION 4: Kalmar - destination ===
  {
    id: 'kalmar',
    name: 'Kalmar',
    coordinates: { lat: 56.6621, lng: 16.3627 }, // Kalmar stad koordinater
    description: 'Kalmar - viktig medeltida handelsstad och kunglig residens',
    section: 'Kalmar',
    isLotstation: true,
    isMajorWaypoint: true
  }
];
