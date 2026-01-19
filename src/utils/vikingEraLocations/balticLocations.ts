
import { VikingLocation } from './types';

export const BALTIC_LOCATIONS: { [key: string]: VikingLocation } = {
  // Gotland - Huvudcentrum
  'visby': {
    lat: 57.6349,
    lng: 18.2948,
    name: 'Visby',
    description: 'Vikingatidens viktigaste handelscentrum i Östersjön, enorma silverskatter',
    category: 'trading_post'
  },
  'paviken': {
    lat: 57.2667,
    lng: 18.3833,
    name: 'Paviken',
    description: 'Viktigt handelscentrum före Visby, med omfattande metallhantverk',
    category: 'trading_post'
  },
  'frojel': {
    lat: 57.1500,
    lng: 18.2000,
    name: 'Fröjel',
    description: 'Stor vikingabosättning med rikt gravmaterial och runstenar',
    category: 'settlement'
  },
  'stenkyrka': {
    lat: 57.7833,
    lng: 18.5167,
    name: 'Stenkyrka',
    description: 'Vikingahamn och handelsplats på norra Gotland',
    category: 'trading_post'
  },

  // Öland - Fästningar och centra
  'borgholm': {
    lat: 56.8781,
    lng: 16.6536,
    name: 'Borgholm',
    description: 'Medeltida borg på plats för äldre vikingafästning',
    category: 'fortress'
  },
  'eketorp': {
    lat: 56.2892,
    lng: 16.4478,
    name: 'Eketorp',
    description: 'Välbevarad ringborg från vikingatid, utgrävd och rekonstruerad',
    category: 'fortress'
  },
  'graborg': {
    lat: 56.7500,
    lng: 16.6000,
    name: 'Gråborg',
    description: 'Stor ringborg från vendel-/vikingatid, Ölands största förhistoriska fästning',
    category: 'fortress'
  },
  'ismantorp': {
    lat: 56.7167,
    lng: 16.5833,
    name: 'Ismantorp',
    description: 'Välbevarad ringborg med 88 husfundament, troligen från 400-600 e.Kr',
    category: 'fortress'
  },
  'sandby_borg': {
    lat: 56.3167,
    lng: 16.4500,
    name: 'Sandby borg',
    description: 'Ringborg från 400-talet med dramatisk slutscen, "Pompei från vikingatiden"',
    category: 'fortress'
  },
  'karlevi': {
    lat: 56.6642,
    lng: 16.5294,
    name: 'Karlevi',
    description: 'Känd runsten med skaldevers, viktig vikingamonument',
    category: 'settlement'
  },
  'resmo': {
    lat: 56.5167,
    lng: 16.4500,
    name: 'Resmo',
    description: 'Vikingacentrum med kyrka och fornborg',
    category: 'settlement'
  },

  // Övriga viktiga Östersjöplatser
  'bornholm_slamrebjerg': {
    lat: 55.1667,
    lng: 14.8833,
    name: 'Slamrebjerg (Bornholm)',
    description: 'Vikingafästning och handelsplats på Bornholm',
    category: 'fortress'
  },
  'koparby': {
    lat: 55.1333,
    lng: 14.7500,
    name: 'Koparby (Bornholm)',
    description: 'Vikingabosättning med runstenar på Bornholm',
    category: 'settlement'
  }
};
