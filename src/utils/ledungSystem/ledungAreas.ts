
export interface LedungArea {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  boundaries: Array<{ lat: number; lng: number }>;
  responsibility: string;
  shipQuota: number;
  historicalSignificance: string;
  keyLocations: string[];
  color: string;
  opacity: number;
  region: 'svealand' | 'gotaland' | 'kustomraden' | 'special';
  period: string;
}

// SVEALANDS LEDUNGSOMRÅDEN
export const UPPSALANDS_LEDUNG: LedungArea = {
  id: 'uppsalands_ledung',
  name: 'Uppsalands ledung',
  nameEn: 'Uppland Ledung',
  description: 'Centrerat kring Uppsala och Mälardalen',
  boundaries: [
    { lat: 60.5, lng: 16.0 },
    { lat: 60.5, lng: 19.0 },
    { lat: 59.8, lng: 19.0 },
    { lat: 59.8, lng: 16.0 }
  ],
  responsibility: 'Försvar av Mälarområdet och rikets kärnområde',
  shipQuota: 120,
  historicalSignificance: 'Kärnan i det svenska rikets militära makt, centrum för kungamakten',
  keyLocations: ['Uppsala', 'Sigtuna', 'Gamla Uppsala'],
  color: '#fbbf24', // amber/yellow - kunglig färg
  opacity: 0.3,
  region: 'svealand',
  period: '1100-1500'
};

export const SODERMANLANDS_LEDUNG: LedungArea = {
  id: 'sodermanlands_ledung',
  name: 'Södermanlands ledung',
  nameEn: 'Södermanland Ledung',
  description: 'Omfattade Södermanland',
  boundaries: [
    { lat: 59.8, lng: 16.0 },
    { lat: 59.8, lng: 18.5 },
    { lat: 58.8, lng: 18.5 },
    { lat: 58.8, lng: 16.0 }
  ],
  responsibility: 'Försvar av södra Mälardalen och östersjökusten',
  shipQuota: 80,
  historicalSignificance: 'Viktigt för kontrollen över Östersjöhandeln',
  keyLocations: ['Nyköping', 'Strängnäs', 'Mariefred'],
  color: '#10b981', // emerald
  opacity: 0.3,
  region: 'svealand',
  period: '1100-1500'
};

export const VASTMANLANDS_LEDUNG: LedungArea = {
  id: 'vastmanlands_ledung',
  name: 'Västmanlands ledung',
  nameEn: 'Västmanland Ledung',
  description: 'Täckte Västmanland',
  boundaries: [
    { lat: 60.5, lng: 15.0 },
    { lat: 60.5, lng: 17.0 },
    { lat: 59.3, lng: 17.0 },
    { lat: 59.3, lng: 15.0 }
  ],
  responsibility: 'Försvar av västra Mälardalen och bergslagen',
  shipQuota: 60,
  historicalSignificance: 'Viktigt för järnproduktion och handel med Norge',
  keyLocations: ['Västerås', 'Sala', 'Köping'],
  color: '#8b5cf6', // purple
  opacity: 0.3,
  region: 'svealand',
  period: '1100-1500'
};

export const NARKES_LEDUNG: LedungArea = {
  id: 'narkes_ledung',
  name: 'Närkes ledung',
  nameEn: 'Närke Ledung',
  description: 'Omfattade Närke',
  boundaries: [
    { lat: 59.5, lng: 14.0 },
    { lat: 59.5, lng: 15.5 },
    { lat: 58.8, lng: 15.5 },
    { lat: 58.8, lng: 14.0 }
  ],
  responsibility: 'Stöd till rikets inlandsförsvar',
  shipQuota: 40,
  historicalSignificance: 'Förband mellan Svealand och Götaland',
  keyLocations: ['Örebro', 'Kumla'],
  color: '#f59e0b', // amber
  opacity: 0.3,
  region: 'svealand',
  period: '1100-1500'
};

// GÖTALANDS LEDUNGSOMRÅDEN
export const OSTGOTALANDS_LEDUNG: LedungArea = {
  id: 'ostgotalands_ledung',
  name: 'Östgötalands ledung',
  nameEn: 'Östergötland Ledung',
  description: 'Centrerat kring Linköping',
  boundaries: [
    { lat: 59.0, lng: 14.5 },
    { lat: 59.0, lng: 16.5 },
    { lat: 57.8, lng: 16.5 },
    { lat: 57.8, lng: 14.5 }
  ],
  responsibility: 'Försvar av östra Götaland och vätternområdet',
  shipQuota: 90,
  historicalSignificance: 'Ett av Götalands mäktigaste områden',
  keyLocations: ['Linköping', 'Norrköping', 'Vadstena'],
  color: '#dc2626', // red
  opacity: 0.3,
  region: 'gotaland',
  period: '1100-1500'
};

export const VASTGOTALANDS_LEDUNG: LedungArea = {
  id: 'vastgotalands_ledung',
  name: 'Västgötalands ledung',
  nameEn: 'Västergötland Ledung',
  description: 'Med centrum i Skara',
  boundaries: [
    { lat: 59.0, lng: 12.0 },
    { lat: 59.0, lng: 14.5 },
    { lat: 57.5, lng: 14.5 },
    { lat: 57.5, lng: 12.0 }
  ],
  responsibility: 'Försvar av västkusten och gränsen mot Danmark/Norge',
  shipQuota: 100,
  historicalSignificance: 'Götalands religiösa och politiska centrum',
  keyLocations: ['Skara', 'Göteborg', 'Lidköping'],
  color: '#059669', // emerald
  opacity: 0.3,
  region: 'gotaland',
  period: '1100-1500'
};

export const SMALANDS_LEDUNG: LedungArea = {
  id: 'smalands_ledung',
  name: 'Smålands ledung',
  nameEn: 'Småland Ledung',
  description: 'Omfattade Småland (inklusive Kalmar)',
  boundaries: [
    { lat: 58.0, lng: 14.0 },
    { lat: 58.0, lng: 17.0 },
    { lat: 56.0, lng: 17.0 },
    { lat: 56.0, lng: 14.0 }
  ],
  responsibility: 'Försvar av sydöstra kusten och Kalmar sund',
  shipQuota: 70,
  historicalSignificance: 'Kontroll över Öland och Östersjörutterna',
  keyLocations: ['Växjö', 'Kalmar', 'Jönköping'],
  color: '#7c3aed', // violet
  opacity: 0.3,
  region: 'gotaland',
  period: '1100-1500'
};

export const HALLANDS_LEDUNG: LedungArea = {
  id: 'hallands_ledung',
  name: 'Hallands ledung',
  nameEn: 'Halland Ledung',
  description: 'När Halland tillhörde Sverige',
  boundaries: [
    { lat: 57.5, lng: 11.5 },
    { lat: 57.5, lng: 13.0 },
    { lat: 56.0, lng: 13.0 },
    { lat: 56.0, lng: 11.5 }
  ],
  responsibility: 'Försvar mot Danmark längs västkusten',
  shipQuota: 50,
  historicalSignificance: 'Gränsprovins mellan Sverige och Danmark',
  keyLocations: ['Halmstad', 'Varberg', 'Falkenberg'],
  color: '#be185d', // pink
  opacity: 0.3,
  region: 'gotaland',
  period: '1100-1500'
};

// KUSTOMRÅDENAS SPECIALOMRÅDEN
export const ROSLAGENS_LEDUNG: LedungArea = {
  id: 'roslagens_ledung',
  name: 'Roslagens ledung',
  nameEn: 'Roslagen Ledung',
  description: 'Norra Stockholms skärgård',
  boundaries: [
    { lat: 60.5, lng: 18.0 },
    { lat: 60.5, lng: 19.5 },
    { lat: 59.5, lng: 19.5 },
    { lat: 59.5, lng: 18.0 }
  ],
  responsibility: 'Försvar av Stockholms norra skärgård',
  shipQuota: 45,
  historicalSignificance: 'Specialiserat på sjöförsvar och skärgårdskrig',
  keyLocations: ['Norrtälje', 'Öregrund'],
  color: '#0ea5e9', // sky blue
  opacity: 0.3,
  region: 'kustomraden',
  period: '1100-1500'
};

export const TJUSTS_LEDUNG: LedungArea = {
  id: 'tjusts_ledung',
  name: 'Tjusts ledung',
  nameEn: 'Tjust Ledung',
  description: 'Delar av Kalmar län',
  boundaries: [
    { lat: 58.5, lng: 16.0 },
    { lat: 58.5, lng: 17.0 },
    { lat: 57.5, lng: 17.0 },
    { lat: 57.5, lng: 16.0 }
  ],
  responsibility: 'Försvar av mellersta östkusten',
  shipQuota: 35,
  historicalSignificance: 'Kontroll över handelsrutterna till Gotland',
  keyLocations: ['Västervik', 'Gamleby'],
  color: '#06b6d4', // cyan
  opacity: 0.3,
  region: 'kustomraden',
  period: '1100-1500'
};

export const ASPELUNDS_LEDUNG: LedungArea = {
  id: 'aspelunds_ledung',
  name: 'Aspelunds ledung',
  nameEn: 'Aspelund Ledung',
  description: 'Sydöstra Småland',
  boundaries: [
    { lat: 57.0, lng: 15.5 },
    { lat: 57.0, lng: 16.5 },
    { lat: 56.2, lng: 16.5 },
    { lat: 56.2, lng: 15.5 }
  ],
  responsibility: 'Försvar av sydöstra kusten',
  shipQuota: 30,
  historicalSignificance: 'Strategisk position vid Kalmar sund',
  keyLocations: ['Aspelund', 'Torsås'],
  color: '#8b5cf6', // purple
  opacity: 0.3,
  region: 'kustomraden',
  period: '1100-1500'
};

// SPECIALOMRÅDEN MED UNIK STÄLLNING
export const LISTERS_HARAD: LedungArea = {
  id: 'listers_harad',
  name: 'Listers härad',
  nameEn: 'Lister Hundred',
  description: 'Speciell ställning mellan Skåne och Blekinge',
  boundaries: [
    { lat: 56.3, lng: 14.2 },
    { lat: 56.3, lng: 15.2 },
    { lat: 55.8, lng: 15.2 },
    { lat: 55.8, lng: 14.2 }
  ],
  responsibility: 'Gränsförsvar och speciell administrativ ställning',
  shipQuota: 25,
  historicalSignificance: 'Självständig ställning vid sidan av Skåne och Blekinge',
  keyLocations: ['Listerby', 'Listerlandet'],
  color: '#64748b', // slate
  opacity: 0.3,
  region: 'special',
  period: '1100-1500'
};

export const OLANDS_LEDUNG: LedungArea = {
  id: 'olands_ledung',
  name: 'Ölands ledung',
  nameEn: 'Öland Ledung',
  description: 'Ölands eget ledungsområde',
  boundaries: [
    { lat: 57.4, lng: 16.3 },
    { lat: 57.4, lng: 17.1 },
    { lat: 56.0, lng: 17.1 },
    { lat: 56.0, lng: 16.3 }
  ],
  responsibility: 'Öns eget försvar och kontroll över Kalmar sund',
  shipQuota: 20,
  historicalSignificance: 'Egen administrativ organisation med fem härader',
  keyLocations: ['Borgholm', 'Köpingsvik'],
  color: '#f97316', // orange
  opacity: 0.3,
  region: 'special',
  period: '1100-1500'
};

export const GOTLANDS_TING: LedungArea = {
  id: 'gotlands_ting',
  name: 'Gotlands ting',
  nameEn: 'Gotland Ting',
  description: 'Gotlands unika organisation med 20 ting',
  boundaries: [
    { lat: 57.9, lng: 18.0 },
    { lat: 57.9, lng: 19.0 },
    { lat: 56.9, lng: 19.0 },
    { lat: 56.9, lng: 18.0 }
  ],
  responsibility: 'Handelskontroll och Östersjöförsvar',
  shipQuota: 40,
  historicalSignificance: 'Strategisk Hansestad med egen organisation, 20 ting istället för härader',
  keyLocations: ['Visby', 'Roma', 'Hemse'],
  color: '#eab308', // yellow
  opacity: 0.3,
  region: 'special',
  period: '1100-1500'
};

export const ALL_LEDUNG_AREAS: LedungArea[] = [
  // Svealand
  UPPSALANDS_LEDUNG,
  SODERMANLANDS_LEDUNG,
  VASTMANLANDS_LEDUNG,
  NARKES_LEDUNG,
  
  // Götaland
  OSTGOTALANDS_LEDUNG,
  VASTGOTALANDS_LEDUNG,
  SMALANDS_LEDUNG,
  HALLANDS_LEDUNG,
  
  // Kustområden
  ROSLAGENS_LEDUNG,
  TJUSTS_LEDUNG,
  ASPELUNDS_LEDUNG,
  
  // Specialområden
  LISTERS_HARAD,
  OLANDS_LEDUNG,
  GOTLANDS_TING
];

// Gruppera efter region för legend
export const LEDUNG_BY_REGION = {
  svealand: ALL_LEDUNG_AREAS.filter(area => area.region === 'svealand'),
  gotaland: ALL_LEDUNG_AREAS.filter(area => area.region === 'gotaland'),
  kustomraden: ALL_LEDUNG_AREAS.filter(area => area.region === 'kustomraden'),
  special: ALL_LEDUNG_AREAS.filter(area => area.region === 'special')
};

// Backward compatibility
export const LEDUNG_AREAS = ALL_LEDUNG_AREAS;
