
import { RoutePoint } from '../types';

// Åland archipelago section with specific islands - EXAKTA KOORDINATER
export const alandSectionPoints: RoutePoint[] = [
  // === SEKTION 16: Över Ålands hav ===
  {
    id: 'ålands_hav_crossing',
    name: 'Ålands hav korsning',
    coordinates: { lat: 60.0500, lng: 19.8000 },
    description: 'Korsning av Ålands hav',
    section: 'Ålands hav'
  },

  // === SEKTION 17: Åland öar - EXAKTA KOORDINATER ===
  {
    id: 'mariehamn_area',
    name: 'Mariehamn området',
    coordinates: { lat: 60.0973, lng: 19.9345 },
    description: 'Mariehamn området (medeltida hamn)',
    section: 'Åland',
    isMajorWaypoint: true
  },
  {
    id: 'lemböte',
    name: 'Lemböte',
    coordinates: { lat: 60.080, lng: 20.003 },
    description: 'Lemböte - åländsk mellanstation',
    section: 'Åland',
    isMajorWaypoint: true
  },
  {
    id: 'föglö',
    name: 'Föglö',
    coordinates: { lat: 60.015, lng: 20.414 },
    description: 'Föglö - åländsk skärgårdsö',
    section: 'Åland',
    isMajorWaypoint: true
  },
  {
    id: 'kökar',
    name: 'Kökar',
    coordinates: { lat: 59.921, lng: 20.910 },
    description: 'Kökar - viktig åländsk mellanstation',
    section: 'Åland',
    isLotstation: true,
    isMajorWaypoint: true
  }
];
