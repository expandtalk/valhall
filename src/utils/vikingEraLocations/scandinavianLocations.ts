
import { VikingLocation } from './types';

export const SCANDINAVIAN_LOCATIONS: { [key: string]: VikingLocation } = {
  'uppsala': {
    lat: 59.9,
    lng: 17.6,
    name: 'Västra Aros/Uppsala',
    description: 'Religiöst och politiskt centrum',
    category: 'political_center'
  },
  'sigtuna': {
    lat: 59.6,
    lng: 17.7,
    name: 'Sigtuna',
    description: 'Kunglig stad och myntningsplats',
    category: 'political_center'
  },
  'hedeby': {
    lat: 54.5,
    lng: 9.6,
    name: 'Hedeby',
    description: 'Största handelsstad i Danmark, vid Schleswig',
    category: 'trading_post'
  },
  'ribe': {
    lat: 55.3,
    lng: 8.8,
    name: 'Ribe',
    description: 'Danmarks äldsta stad och handelscentrum',
    category: 'trading_post'
  },
  'roskilde': {
    lat: 55.6,
    lng: 12.1,
    name: 'Roskilde',
    description: 'Dansk kunglig residensstad',
    category: 'political_center'
  },
  'trondheim': {
    lat: 63.4,
    lng: 10.4,
    name: 'Nidaros/Trondheim',
    description: 'Viktigt politiskt centrum i Norge',
    category: 'political_center'
  },
  'kaupang': {
    lat: 59.0,
    lng: 10.0,
    name: 'Kaupang',
    description: 'Handelsplats i Vestfold, Norge',
    category: 'trading_post'
  },
  'bergen': {
    lat: 60.4,
    lng: 5.3,
    name: 'Bergen',
    description: 'Viktig hamnstad på Norges västkust',
    category: 'trading_post'
  },
  'koping': {
    lat: 59.516,
    lng: 15.994,
    name: 'Köping',
    description: 'Handelsplats vid Mälaren, viktig för järnhandel från Bergslagen',
    category: 'trading_post'
  }
};
