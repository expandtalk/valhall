
export interface PeriodData {
  id: string;
  name: string;
  start: number;
  end: number;
  description: string;
}

export const HISTORICAL_PERIODS: PeriodData[] = [
  {
    id: 'neolithic',
    name: 'Yngre stenåldern',
    start: -2500,
    end: -1700,
    description: 'De äldsta beläggen för offerkällor'
  },
  {
    id: 'bronze_age',
    name: 'Bronsåldern',
    start: -1700,
    end: -500,
    description: 'Soldyrkan och hällristningar'
  },
  {
    id: 'early_iron_age',
    name: 'Äldre järnålder',
    start: -500,
    end: 400,
    description: 'Första tempelbyggnader etableras'
  },
  {
    id: 'migration_period',
    name: 'Folkvandringstid',
    start: 400,
    end: 550,
    description: 'Gudanamn i ortnamn etableras'
  },
  {
    id: 'vendel_period',
    name: 'Vendeltid',
    start: 550,
    end: 800,
    description: 'Fortsatt utveckling av kultplatser'
  },
  {
    id: 'viking_age',
    name: 'Vikingatiden',
    start: 800,
    end: 1050,
    description: 'Systematisering av kultplatser och Husaby-systemet'
  },
  {
    id: 'transition_period',
    name: 'Övergångsperioden',
    start: 1000,
    end: 1100,
    description: 'Kristnandet och transformation'
  },
  {
    id: 'medieval',
    name: 'Medeltiden',
    start: 1050,
    end: 1500,
    description: 'Kristna helgonkällor och Birgittakult'
  }
];

export const getPeriodForYear = (year: number): PeriodData | null => {
  return HISTORICAL_PERIODS.find(period => year >= period.start && year <= period.end) || null;
};

export const getActivePeriods = (selectedTimePeriod: string): string[] => {
  switch (selectedTimePeriod) {
    case 'bronze_age':
      return ['neolithic', 'bronze_age'];
    case 'iron_age':
      return ['neolithic', 'bronze_age', 'early_iron_age'];
    case 'migration_period':
      return ['neolithic', 'bronze_age', 'early_iron_age', 'migration_period'];
    case 'vendel_period':
      return ['neolithic', 'bronze_age', 'early_iron_age', 'migration_period', 'vendel_period'];
    case 'viking_age':
      return ['neolithic', 'bronze_age', 'early_iron_age', 'migration_period', 'vendel_period', 'viking_age'];
    case 'medieval':
      return ['neolithic', 'bronze_age', 'early_iron_age', 'migration_period', 'vendel_period', 'viking_age', 'transition_period', 'medieval'];
    case 'all':
      return ['neolithic', 'bronze_age', 'early_iron_age', 'migration_period', 'vendel_period', 'viking_age', 'transition_period', 'medieval'];
    default:
      return ['viking_age']; // Default till vikingatiden
  }
};
