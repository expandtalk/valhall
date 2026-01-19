
import { VikingLocation } from './types';

export const WESTERN_LOCATIONS: { [key: string]: VikingLocation } = {
  'york': {
    lat: 53.9,
    lng: -1.1,
    name: 'Jorvik/York',
    description: 'Vikingastad i England, erövrad 866 e.Kr.',
    category: 'political_center'
  },
  'dublin': {
    lat: 53.3,
    lng: -6.3,
    name: 'Dublin',
    description: 'Vikingastad i Irland',
    category: 'political_center'
  },
  'isle_of_man': {
    lat: 54.236,
    lng: -4.548,
    name: 'Isle of Man',
    description: 'Vikingabosättning från 800-talet, norsk kontroll till 1265',
    category: 'settlement'
  },
  'rouen': {
    lat: 49.4,
    lng: 1.1,
    name: 'Rouen',
    description: 'Normandiskt centrum i Frankrike',
    category: 'political_center'
  },
  'paris': {
    lat: 48.9,
    lng: 2.4,
    name: 'Paris',
    description: 'Frankisk stad, vikingamål',
    category: 'political_center'
  }
};
