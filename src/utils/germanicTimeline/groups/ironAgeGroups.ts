
import { GermanicGroup } from '../groups';

export const IRON_AGE_GROUPS: GermanicGroup[] = [
  // Förromersk järnålder
  {
    id: 'early_germanic_tribes',
    name: 'Tidiga germanska stammar',
    nameEn: 'Early Germanic Tribes',
    period: 'pre_roman_iron',
    languageBranch: 'Proto-Germanic',
    lat: 54.0,
    lng: 9.0,
    startYear: -500,
    endYear: 1,
    description: 'Lösa stammar som talade urgermanska och bebodde nuvarande norra Tyskland.',
    descriptionEn: 'Loose tribes speaking Proto-Germanic and inhabiting present-day northern Germany.',
    significance: 'Ursprunget till germansk språk och kultur'
  },

  // Romersk järnålder
  {
    id: 'goths',
    name: 'Goterna',
    nameEn: 'Goths',
    period: 'roman_iron',
    languageBranch: 'East Germanic',
    lat: 52.0,
    lng: 21.0,
    startYear: 1,
    endYear: 400,
    description: 'Östgermansk stam som vandrade från Östersjön till Svarta havet.',
    descriptionEn: 'East Germanic tribe migrating from the Baltic Sea to the Black Sea.',
    significance: 'Skapade ett mäktigt rike i nuvarande Ukraina'
  },
  {
    id: 'vandals',
    name: 'Vandalerna',
    nameEn: 'Vandals',
    period: 'roman_iron',
    languageBranch: 'East Germanic',
    lat: 50.0,
    lng: 8.0,
    startYear: 1,
    endYear: 400,
    description: 'Östgermansk stam känd för sina plundringar och erövringar.',
    descriptionEn: 'East Germanic tribe known for its looting and conquests.',
    significance: 'Erövrade Nordafrika och plundrade Rom'
  },
  {
    id: 'saxons',
    name: 'Saxarna',
    nameEn: 'Saxons',
    period: 'roman_iron',
    languageBranch: 'West Germanic',
    lat: 53.0,
    lng: 8.0,
    startYear: 1,
    endYear: 400,
    description: 'Västgermansk stam som bebodde nuvarande norra Tyskland och England.',
    descriptionEn: 'West Germanic tribe inhabiting present-day northern Germany and England.',
    significance: 'Erövrade England och grundade den anglosaxiska kulturen'
  }
];
