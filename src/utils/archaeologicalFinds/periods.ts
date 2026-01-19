
export const ARCHAEOLOGICAL_PERIODS = [
  {
    id: 'all',
    name: 'Alla perioder',
    nameEn: 'All Periods',
    startYear: -400000,
    endYear: 1100,
    color: '#6b7280'
  },
  {
    id: 'paleolithic',
    name: 'Paleolitikum',
    nameEn: 'Paleolithic',
    startYear: -400000,
    endYear: -10000,
    color: '#7c3aed'
  },
  {
    id: 'mesolithic',
    name: 'Mesolitikum',
    nameEn: 'Mesolithic', 
    startYear: -10000,
    endYear: -4000,
    color: '#2563eb'
  },
  {
    id: 'neolithic',
    name: 'Neolitikum',
    nameEn: 'Neolithic',
    startYear: -4000,
    endYear: -1800,
    color: '#059669'
  },
  {
    id: 'bronze_age',
    name: 'Bronsåldern',
    nameEn: 'Bronze Age',
    startYear: -1800,
    endYear: -500,
    color: '#d97706'
  },
  {
    id: 'iron_age',
    name: 'Järnåldern',
    nameEn: 'Iron Age',
    startYear: -500,
    endYear: 375,
    color: '#dc2626'
  },
  {
    id: 'migration_period',
    name: 'Folkvandringstiden',
    nameEn: 'Migration Period',
    startYear: 375,
    endYear: 550,
    color: '#9333ea'
  },
  {
    id: 'vendel_period',
    name: 'Vendeltiden',
    nameEn: 'Vendel Period',
    startYear: 550,
    endYear: 800,
    color: '#ea580c'
  },
  {
    id: 'viking_age',
    name: 'Vikingatiden',
    nameEn: 'Viking Age',
    startYear: 800,
    endYear: 1100,
    color: '#b91c1c'
  }
] as const;
