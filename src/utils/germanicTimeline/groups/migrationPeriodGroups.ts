
import { GermanicGroup } from '../groups';

export const MIGRATION_PERIOD_GROUPS: GermanicGroup[] = [
  // Folkvandringstid
  {
    id: 'franks',
    name: 'Frankerna',
    nameEn: 'Franks',
    period: 'migration_period',
    languageBranch: 'West Germanic',
    lat: 48.0,
    lng: 2.0,
    startYear: 400,
    endYear: 550,
    description: 'Västgermansk stam som erövrade nuvarande Frankrike och grundade Frankerriket.',
    descriptionEn: 'West Germanic tribe conquering present-day France and founding the Frankish Empire.',
    significance: 'Lade grunden till det moderna Frankrike och Tyskland'
  },
  {
    id: 'alamanni',
    name: 'Alemannerna',
    nameEn: 'Alemanni',
    period: 'migration_period',
    languageBranch: 'West Germanic',
    lat: 48.0,
    lng: 8.0,
    startYear: 400,
    endYear: 550,
    description: 'Västgermansk stam som bebodde nuvarande södra Tyskland och Schweiz.',
    descriptionEn: 'West Germanic tribe inhabiting present-day southern Germany and Switzerland.',
    significance: 'Gav namn åt det moderna Tyskland (Allemagne)'
  },
  {
    id: 'angles',
    name: 'Anglerna',
    nameEn: 'Angles',
    period: 'migration_period',
    languageBranch: 'West Germanic',
    lat: 55.0,
    lng: -1.5,
    startYear: 400,
    endYear: 550,
    description: 'Västgermansk stam som tillsammans med saxarna erövrade England.',
    descriptionEn: 'West Germanic tribe that conquered England together with the Saxons.',
    significance: 'Gav namn åt England (England)'
  }
];
