// Viking Era Realms and Tribes (793-1066 CE)
export const VIKING_ERA_REALMS = {
  // Nordic Realms
  'svearike': 'Svearike',
  'gotaland': 'Götaland', 
  'danernas_land': 'Danernas land',
  'norges_riken': 'Norges riken',
  'jemtland': 'Jämtland',
  'halland': 'Halland',
  'skane': 'Skåne',
  
  // Viking Settlements & Kingdoms
  'danelagen': 'Danelagen',
  'jorvik': 'Jórvík (York)',
  'dublins_rike': 'Dublins kungadöme',
  'orkneyjarladom': 'Orkneyjarladom',
  'hebriderna': 'Hebriderna',
  'shetland': 'Hjaltland (Shetland)',
  'faroer': 'Färöarna',
  'island': 'Ísland',
  
  // Anglo-Saxon Kingdoms
  'wessex': 'Wessex',
  'mercia': 'Mercia', 
  'northumbria': 'Northumbria',
  'east_anglia': 'Östangeln',
  'kent': 'Kent',
  'essex': 'Essex',
  
  // Celtic Realms
  'dal_riata': 'Dal Riata',
  'gwynedd': 'Gwynedd',
  'powys': 'Powys',
  'munster': 'Munster',
  'leinster': 'Leinster',
  'ulster': 'Ulster',
  'connacht': 'Connacht',
  
  // Eastern European Realms
  'gardarike': 'Garðaríki (Kievriket)',
  'novgorods_republik': 'Novgorods republik',
  'bjarmaland': 'Bjarmaland',
  'permien': 'Permien',
  'bjarmien': 'Bjarmien',
  
  // Other Major Realms
  'frankerriket': 'Frankerriket',
  'bysantinska_riket': 'Bysantinska riket (Miklagard)',
  'andalus': 'Al-Andalus',
  'bulgariska_khaganatet': 'Bulgariska khaganatet',
  'magyar_stammar': 'Magyarstammar',
  'avarer': 'Avarer',
  'polanska_stammar': 'Polanska stammar'
};

export const VIKING_ERA_CATEGORIES = {
  'nordic_realms': 'Nordiska riken',
  'viking_settlements': 'Vikingabosättningar',  
  'anglo_saxon': 'Anglosaxiska riken',
  'celtic_realms': 'Keltiska riken',
  'eastern_european': 'Östeuropeiska riken',
  'other_realms': 'Andra riken'
};

export const REALM_CATEGORIES: { [key: string]: string } = {
  // Nordic Realms
  'svearike': 'nordic_realms',
  'gotaland': 'nordic_realms',
  'danernas_land': 'nordic_realms', 
  'norges_riken': 'nordic_realms',
  'jemtland': 'nordic_realms',
  'halland': 'nordic_realms',
  'skane': 'nordic_realms',
  
  // Viking Settlements
  'danelagen': 'viking_settlements',
  'jorvik': 'viking_settlements',
  'dublins_rike': 'viking_settlements',
  'orkneyjarladom': 'viking_settlements',
  'hebriderna': 'viking_settlements',
  'shetland': 'viking_settlements',
  'faroer': 'viking_settlements',
  'island': 'viking_settlements',
  
  // Anglo-Saxon
  'wessex': 'anglo_saxon',
  'mercia': 'anglo_saxon',
  'northumbria': 'anglo_saxon',
  'east_anglia': 'anglo_saxon',
  'kent': 'anglo_saxon',
  'essex': 'anglo_saxon',
  
  // Celtic
  'dal_riata': 'celtic_realms',
  'gwynedd': 'celtic_realms',
  'powys': 'celtic_realms',
  'munster': 'celtic_realms',
  'leinster': 'celtic_realms',
  'ulster': 'celtic_realms',
  'connacht': 'celtic_realms',
  
  // Eastern European
  'gardarike': 'eastern_european',
  'novgorods_republik': 'eastern_european',
  'bjarmaland': 'eastern_european',
  'permien': 'eastern_european',
  'bjarmien': 'eastern_european',
  
  // Other
  'frankerriket': 'other_realms',
  'bysantinska_riket': 'other_realms',
  'andalus': 'other_realms',
  'bulgariska_khaganatet': 'other_realms',
  'magyar_stammar': 'other_realms',
  'avarer': 'other_realms',
  'polanska_stammar': 'other_realms'
};

export const VIKING_TIME_PERIODS = {
  'early_viking': 'Tidig vikingatid (793-850)',
  'middle_viking': 'Medel vikingatid (850-950)', 
  'late_viking': 'Sen vikingatid (950-1066)',
  'all_viking': 'Hela vikingatiden (793-1066)'
};
