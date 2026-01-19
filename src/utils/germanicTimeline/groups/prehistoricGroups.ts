
import { GermanicGroup } from '../groups';

export const PREHISTORIC_GROUPS: GermanicGroup[] = [
  // Paleolitikum
  {
    id: 'reindeer_hunters',
    name: 'Renjägare',
    nameEn: 'Reindeer Hunters',
    period: 'paleolithic',
    languageBranch: 'Pre-Germanic',
    lat: 56.0,
    lng: 13.0,
    startYear: -12000,
    endYear: -8000,
    description: 'Nomadiska jägar-samlargrupper som följde renhjordarna under istiden.',
    descriptionEn: 'Nomadic hunter-gatherer groups following reindeer herds during ice age.',
    significance: 'Första människorna i Skandinavien'
  },

  // Mesolitikum
  {
    id: 'maglemose_culture',
    name: 'Maglemosekultur',
    nameEn: 'Maglemose Culture',
    period: 'mesolithic',
    languageBranch: 'Pre-Germanic',
    lat: 55.6,
    lng: 12.5,
    startYear: -8000,
    endYear: -6000,
    description: 'Jägar-samlarkultur i skogsområden efter istidens slut.',
    descriptionEn: 'Hunter-gatherer culture in forest areas after end of ice age.',
    significance: 'Utvecklade avancerade träverktyg'
  },
  
  {
    id: 'ertebolle_culture',
    name: 'Erteböllekultur',
    nameEn: 'Ertebølle Culture',
    period: 'mesolithic',
    languageBranch: 'Pre-Germanic',
    lat: 55.8,
    lng: 11.8,
    startYear: -5400,
    endYear: -4000,
    description: 'Sen mesolitisk kultur med utvecklad keramik och kustnära bosättningar.',
    descriptionEn: 'Late Mesolithic culture with developed ceramics and coastal settlements.',
    significance: 'Övergång till neolitikum'
  },

  // Neolitikum
  {
    id: 'funnel_beaker',
    name: 'Trattbägarkultur',
    nameEn: 'Funnel Beaker Culture',
    period: 'neolithic',
    languageBranch: 'Pre-Germanic',
    lat: 55.5,
    lng: 13.5,
    startYear: -4000,
    endYear: -2800,
    description: 'Första jordbrukarna med megalitgravar och karakteristisk keramik.',
    descriptionEn: 'First farmers with megalithic tombs and characteristic ceramics.',
    significance: 'Introducerade jordbruk'
  },
  
  {
    id: 'pitted_ware',
    name: 'Gropkeramisk kultur',
    nameEn: 'Pitted Ware Culture',
    period: 'neolithic',
    languageBranch: 'Pre-Germanic',
    lat: 59.3,
    lng: 17.5,
    startYear: -3500,
    endYear: -2300,
    description: 'Kustnära kultur som kombinerade jakt och fiske med begränsat jordbruk.',
    descriptionEn: 'Coastal culture combining hunting and fishing with limited agriculture.',
    significance: 'Särpräglad skandinavisk utveckling'
  }
];
