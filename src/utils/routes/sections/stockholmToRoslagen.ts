
import { RoutePoint } from '../types';

// Stockholm to Roslagen coastal section through the archipelago - EXAKTA KOORDINATER
export const stockholmToRoslagenPoints: RoutePoint[] = [
  // === SEKTION 15: Norra Stockholm skärgård - EXAKTA KOORDINATER ===
  {
    id: 'blidö',
    name: 'Blidö',
    coordinates: { lat: 59.6, lng: 19.1 },
    description: 'Blidö - norra skärgården',
    section: 'Norra Stockholm skärgård',
    isMajorWaypoint: true
  },
  {
    id: 'arholma',
    name: 'Arholma',
    coordinates: { lat: 59.8, lng: 19.2 },
    description: 'Arholma - yttersta ön i norra skärgården',
    section: 'Yttersta skärgården',
    isLotstation: true,
    isMajorWaypoint: true
  }
];
