
import { VikingLocation } from './types';

export const EASTERN_LOCATIONS: { [key: string]: VikingLocation } = {
  'novgorod': {
    lat: 58.5,
    lng: 31.3,
    name: 'Novgorod',
    description: 'Viktigt handelscentrum i Ryssland',
    category: 'trading_post'
  },
  'kiev': {
    lat: 50.5,
    lng: 30.5,
    name: 'Kiev',
    description: 'Huvudstad i Kievriket, väg till Konstantinopel',
    category: 'political_center'
  },
  'staraja_ladoga': {
    lat: 60.0,
    lng: 32.3,
    name: 'Staraja Ladoga',
    description: 'Tidig vikingabosättning i Ryssland',
    category: 'settlement'
  }
};
