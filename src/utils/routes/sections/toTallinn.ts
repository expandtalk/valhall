
import { RoutePoint } from '../types';

// Final section across Gulf of Finland to Tallinn via Estonian islands - EXAKTA KOORDINATER
export const toTallinnPoints: RoutePoint[] = [
  // === SEKTION 20: Över Finska viken ===
  {
    id: 'gulf_of_finland_crossing',
    name: 'Finska viken korsning',
    coordinates: { lat: 59.8000, lng: 25.0000 },
    description: 'Korsning av Finska viken',
    section: 'Finska viken'
  },

  // === SEKTION 21: Estniska öar ===
  {
    id: 'nargö',
    name: 'Nargö',
    coordinates: { lat: 59.55, lng: 24.52 },
    description: 'Nargö - estnisk ö på vägen till Tallinn',
    section: 'Estnisk skärgård',
    isMajorWaypoint: true
  },

  // === SEKTION 22: Tallinn - slutdestination - EXAKTA KOORDINATER ===
  {
    id: 'tallinn_approach',
    name: 'Tallinn approach',
    coordinates: { lat: 59.45, lng: 24.70 },
    description: 'Approach till Tallinn',
    section: 'Estnisk kust'
  },
  {
    id: 'tallinn',
    name: 'Reval (Tallinn)',
    coordinates: { lat: 59.437, lng: 24.754 },
    description: 'Reval (Tallinn) - slutdestination av Kung Valdemars segelled',
    section: 'Estnisk kust',
    isLotstation: true,
    isMajorWaypoint: true
  }
];
