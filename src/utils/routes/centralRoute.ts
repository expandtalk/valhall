
import { RoutePoint } from './types';

// Central route sections: Kalmar to Stockholm - following waterways and archipelago
export const centralRoutePoints: RoutePoint[] = [
  // === SEKTION 7: Från Kalmar norrut längs Smålandskusten ===
  {
    id: 'kalmar_exit_north',
    name: 'Kalmar ut nord',
    coordinates: { lat: 56.7000, lng: 16.3800 },
    description: 'Ut från Kalmar norrut i Kalmar Sund',
    section: 'Från Kalmar'
  },
  {
    id: 'småland_coast_north_1',
    name: 'Smålandskust nord 1',
    coordinates: { lat: 56.8000, lng: 16.4500 },
    description: 'Norrut längs Smålands östkust',
    section: 'Småland östkust'
  },
  {
    id: 'småland_coast_north_2',
    name: 'Smålandskust nord 2',
    coordinates: { lat: 56.9000, lng: 16.5500 },
    description: 'Fortsatt längs Smålands östkust',
    section: 'Småland östkust'
  },

  // === SEKTION 8: Västervik område ===
  {
    id: 'västervik_approach',
    name: 'Västervik approach',
    coordinates: { lat: 57.0000, lng: 16.6000 },
    description: 'Approach till Västervik',
    section: 'Västervik'
  },
  {
    id: 'västervik',
    name: 'Västervik',
    coordinates: { lat: 57.0574, lng: 16.6364 },
    description: 'Västervik - viktig medeltida hamn',
    section: 'Västervik',
    isLotstation: true,
    isMajorWaypoint: true
  },

  // === SEKTION 9: Tjust skärgård - genom inre farleden ===
  {
    id: 'tjust_inner_1',
    name: 'Tjust inre farled 1',
    coordinates: { lat: 57.1500, lng: 16.7000 },
    description: 'Inre farleden genom Tjust skärgård',
    section: 'Tjust skärgård'
  },
  {
    id: 'tjust_inner_2',
    name: 'Tjust inre farled 2',
    coordinates: { lat: 57.2500, lng: 16.8000 },
    description: 'Fortsatt genom Tjust skärgård',
    section: 'Tjust skärgård'
  },
  {
    id: 'loftahammar',
    name: 'Loftahammar',
    coordinates: { lat: 57.3106, lng: 16.9492 },
    description: 'Loftahammar - viktig skärgårdshamn',
    section: 'Tjust skärgård',
    isMajorWaypoint: true
  },

  // === SEKTION 10: Östergötlands skärgård ===
  {
    id: 'östergötland_approach',
    name: 'Östergötland approach',
    coordinates: { lat: 57.4000, lng: 17.0000 },
    description: 'Approach till Östergötlands skärgård',
    section: 'Östergötland'
  },
  {
    id: 'arkösund',
    name: 'Arkösund',
    coordinates: { lat: 58.6794, lng: 17.1056 },
    description: 'Arkösund - viktig skärgårdshamn i Östergötland',
    section: 'Östergötland',
    isLotstation: true,
    isMajorWaypoint: true
  },

  // === SEKTION 11: Söderköping - KORRIGERADE KOORDINATER ===
  {
    id: 'söderköping',
    name: 'Söderköping',
    coordinates: { lat: 58.4833, lng: 16.3167 },
    description: 'Söderköping - viktig medeltida handelsstad vid Göta kanal',
    section: 'Östergötland',
    isLotstation: true,
    isMajorWaypoint: true
  },

  // === SEKTION 12: Södra Stockholms skärgård - EXAKTA KOORDINATER ===
  {
    id: 'utö',
    name: 'Utö',
    coordinates: { lat: 58.9, lng: 17.9 },
    description: 'Utö - historiska järngruvor i södra skärgården',
    section: 'Södra Stockholm skärgård',
    isMajorWaypoint: true
  },
  {
    id: 'ornö',
    name: 'Ornö',
    coordinates: { lat: 58.9, lng: 18.2 },
    description: 'Ornö - största ön i södra skärgården',
    section: 'Södra Stockholm skärgård',
    isMajorWaypoint: true
  },
  {
    id: 'dalarö',
    name: 'Dalarö',
    coordinates: { lat: 59.133, lng: 18.406 },
    description: 'Dalarö - viktig skärgårdshamn och tullstation',
    section: 'Södra Stockholm skärgård',
    isMajorWaypoint: true
  },

  // === SEKTION 13: Mellersta Stockholm skärgård - EXAKTA KOORDINATER ===
  {
    id: 'nämdö',
    name: 'Nämdö',
    coordinates: { lat: 59.1, lng: 18.7 },
    description: 'Nämdö - skärgårdsö på vägen norrut',
    section: 'Mellersta Stockholm skärgård',
    isMajorWaypoint: true
  },
  {
    id: 'runmarö',
    name: 'Runmarö',
    coordinates: { lat: 59.2, lng: 18.8 },
    description: 'Runmarö - stora ön med sankmarker och sjöar',
    section: 'Mellersta Stockholm skärgård',
    isMajorWaypoint: true
  },
  {
    id: 'sandhamn',
    name: 'Sandhamn',
    coordinates: { lat: 59.287, lng: 18.909 },
    description: 'Sandhamn - yttre skärgårdens viktigaste hamn',
    section: 'Mellersta Stockholm skärgård',
    isLotstation: true,
    isMajorWaypoint: true
  },
  {
    id: 'möja',
    name: 'Möja',
    coordinates: { lat: 59.4, lng: 18.9 },
    description: 'Möja - populär ö i mellanskärgården',
    section: 'Mellersta Stockholm skärgård',
    isMajorWaypoint: true
  },

  // === SEKTION 14: Stockholm stad - EXAKTA KOORDINATER ===
  {
    id: 'stockholm',
    name: 'Stockholm',
    coordinates: { lat: 59.333, lng: 18.065 },
    description: 'Stockholm - medeltida handelsstad',
    section: 'Stockholm',
    isLotstation: true,
    isMajorWaypoint: true
  }
];
