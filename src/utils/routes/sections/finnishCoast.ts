
import { RoutePoint } from '../types';

// Finnish coast section with specific waypoints - EXAKTA KOORDINATER
export const finnishCoastPoints: RoutePoint[] = [
  // === SEKTION 18: Skärgårdshavet ===
  {
    id: 'archipelago_sea_crossing',
    name: 'Skärgårdshavet korsning',
    coordinates: { lat: 60.1500, lng: 21.5000 },
    description: 'Genom Skärgårdshavet',
    section: 'Skärgårdshavet'
  },
  {
    id: 'åbo_turku',
    name: 'Åbo (Turku)',
    coordinates: { lat: 60.4518, lng: 22.2666 },
    description: 'Åbo (Turku) - viktig finsk medeltida stad',
    section: 'Finska kusten',
    isLotstation: true,
    isMajorWaypoint: true
  },

  // === SEKTION 19: Längs finska kusten - EXAKTA KOORDINATER ===
  {
    id: 'hangö',
    name: 'Hangö (Hanko)',
    coordinates: { lat: 59.832, lng: 22.971 },
    description: 'Hangö - Finlands sydligaste udde',
    section: 'Finska kusten',
    isLotstation: true,
    isMajorWaypoint: true
  },
  {
    id: 'tvärminne',
    name: 'Tvärminne',
    coordinates: { lat: 59.845, lng: 23.240 },
    description: 'Tvärminne - nära Hangö',
    section: 'Finska kusten',
    isMajorWaypoint: true
  },
  {
    id: 'porkala',
    name: 'Porkala',
    coordinates: { lat: 59.983, lng: 24.433 },
    description: 'Porkala - udde väster om Helsingfors',
    section: 'Finska kusten',
    isLotstation: true,
    isMajorWaypoint: true
  },
  {
    id: 'helsinki_medieval',
    name: 'Helsingfors (medeltida)',
    coordinates: { lat: 60.1699, lng: 24.9384 },
    description: 'Helsingfors - medeltida finsk handelsplats',
    section: 'Finska kusten',
    isMajorWaypoint: true
  }
];
