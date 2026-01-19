export interface ArchaeologicalSite {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'burial_site' | 'defense_wall' | 'burial_field' | 'cult_house' | 'rock_carving' | 
        'fortress' | 'stone_wall_system' | 'ancient_shoreline' | 'village' | 'trading_post' |
        'hall_building' | 'settlement';
  period: string[];
  establishedPeriod: string;
  description: string;
  details?: string;
  evidence: ('archaeological' | 'historical_record' | 'geological' | 'reconstruction')[];
  region: string;
  country: string;
  sources: string[];
  dimensions?: string;
  findings?: string[];
  specialFeatures?: string[];
}

// Import function from chronology to get active periods
import { getActivePeriods } from '../religiousLocations/chronology';

export const getArchaeologicalSitesForPeriod = (selectedTimePeriod: string): ArchaeologicalSite[] => {
  const activePeriods = getActivePeriods(selectedTimePeriod);
  return ARCHAEOLOGICAL_SITES.filter(site => 
    site.period.some(period => activePeriods.includes(period))
  );
};

export const getSitesByType = (type: string, selectedTimePeriod?: string) => {
  const sites = selectedTimePeriod ? 
    getArchaeologicalSitesForPeriod(selectedTimePeriod) : 
    ARCHAEOLOGICAL_SITES;
  return sites.filter(site => site.type === type);
};

export const getAllArchaeologicalSiteTypes = (selectedTimePeriod: string): string[] => {
  const sitesForPeriod = getArchaeologicalSitesForPeriod(selectedTimePeriod);
  const types = new Set(sitesForPeriod.map(site => site.type));
  return Array.from(types);
};

export const getArchaeologicalSiteTypeCount = (type: string, selectedTimePeriod: string): number => {
  const sitesForPeriod = getArchaeologicalSitesForPeriod(selectedTimePeriod);
  return sitesForPeriod.filter(site => site.type === type).length;
};

export const ARCHAEOLOGICAL_SITES: ArchaeologicalSite[] = [
  // ✅ RÖSARINGSÅSEN
  {
    id: 'rosaringsasen',
    name: 'Rösaringsåsen',
    coordinates: { lat: 59.4944, lng: 17.2869 },
    type: 'burial_site',
    period: ['migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'migration_period',
    description: 'Sveriges näst största gravhög med processionsväg och omfattande gravfält',
    details: 'Området innehåller Sveriges näst största gravhög (50 m diameter, 7 m hög), processionsväg från 500-talet, skeppssättningar och över 200 gravar. Möjligen kultplats för Ynglingaätten.',
    evidence: ['archaeological'],
    region: 'Uppland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    dimensions: '50 m diameter, 7 m hög',
    findings: ['Gravhög', 'Processionsväg', 'Skeppssättningar', 'Över 200 gravar'],
    specialFeatures: ['Ynglingaättens kultplats']
  },

  // ✅ FÖRSVARSVALLAR - ÅSAR
  {
    id: 'billingen_vastergotland',
    name: 'Billingen',
    coordinates: { lat: 58.4833, lng: 13.5500 },
    type: 'defense_wall',
    period: ['early_iron_age', 'migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'early_iron_age',
    description: 'Platåberg med flera fornborgar vid Borgunda och Stenstorp',
    details: 'Platåberg med flera fornborgar, särskilt vid Borgunda och Stenstorp. Naturlig försvarsposition 230 m över slätten.',
    evidence: ['archaeological'],
    region: 'Västergötland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    dimensions: '230 m över slätten',
    findings: ['Fornborgar vid Borgunda', 'Fornborgar vid Stenstorp'],
    specialFeatures: ['Strategisk höjd över slätten']
  },
  {
    id: 'kinnekulle',
    name: 'Kinnekulle',
    coordinates: { lat: 58.5950, lng: 13.3950 },
    type: 'defense_wall',
    period: ['bronze_age', 'early_iron_age', 'migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'bronze_age',
    description: 'Husaby fornborg på platån med strategisk utsikt över Vänern',
    details: 'Husaby fornborg på platån, strategisk utsikt över Vänern. Flera försvarsanläggningar från olika perioder.',
    evidence: ['archaeological'],
    region: 'Västergötland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Husaby fornborg', 'Försvarsanläggningar'],
    specialFeatures: ['Utsikt över Vänern']
  },
  {
    id: 'omberg',
    name: 'Omberg',
    coordinates: { lat: 58.3333, lng: 14.6500 },
    type: 'defense_wall',
    period: ['early_iron_age', 'migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'early_iron_age',
    description: 'Flera fornborgar med kontroll över Vättern',
    details: 'Flera fornborgar: Borgberget (58.3456° N, 14.6234° E), Hjässaborgen, Queen Ommas borg. Kontroll över Vättern.',
    evidence: ['archaeological'],
    region: 'Östergötland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Borgberget', 'Hjässaborgen', 'Queen Ommas borg'],
    specialFeatures: ['Kontroll över Vättern']
  },

  // ✅ GRAVFÄLT VISINGSÖ
  {
    id: 'stroja_gravfalt',
    name: 'Ströja gravfält',
    coordinates: { lat: 58.0589, lng: 14.3042 },
    type: 'burial_field',
    period: ['migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'migration_period',
    description: 'Visingsös största gravfält med över 200 gravar',
    details: 'Över 200 gravar, både högar och stensättningar. Visingsös största gravfält.',
    evidence: ['archaeological'],
    region: 'Småland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['200+ gravar', 'Högar', 'Stensättningar'],
    specialFeatures: ['Visingsös största gravfält']
  },
  {
    id: 'kumlaby_kyrka_gravfalt',
    name: 'Kumlaby kyrka gravfält',
    coordinates: { lat: 58.0264, lng: 14.3431 },
    type: 'burial_field',
    period: ['vendel_period', 'viking_age', 'transition_period'],
    establishedPeriod: 'vendel_period',
    description: 'Gravfält med domarringar runt kyrkan från 1100-talet',
    details: 'Gravfält med domarringar och stensättningar runt kyrkan från 1100-talet.',
    evidence: ['archaeological'],
    region: 'Småland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Domarringar', 'Stensättningar'],
    specialFeatures: ['Kontinuitet till kristen tid']
  },

  // ✅ KULTHUS (updating existing Gamla Uppsala and Uppåkra, adding Lunda)
  {
    id: 'lunda_sodermanland_kulthus',
    name: 'Lunda kulthus',
    coordinates: { lat: 59.0472, lng: 16.9194 },
    type: 'cult_house',
    period: ['vendel_period', 'viking_age'],
    establishedPeriod: 'vendel_period',
    description: 'Hallbyggnad tolkad som kulthus med rituella depositioner',
    details: 'Hallbyggnad med stolphål, tolkad som kulthus. Ovanliga fynd av djurben och rituella depositioner.',
    evidence: ['archaeological'],
    region: 'Södermanland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Stolphål', 'Djurben', 'Rituella depositioner'],
    specialFeatures: ['Kultbyggnad']
  },

  // ✅ HÄLLRISTNINGAR
  {
    id: 'tanumshede',
    name: 'Tanumshede hällristningar',
    coordinates: { lat: 58.7228, lng: 11.3256 },
    type: 'rock_carving',
    period: ['bronze_age'],
    establishedPeriod: 'bronze_age',
    description: 'UNESCO världsarv med över 1500 figurer',
    details: 'UNESCO världsarv. Vitlycke museum vid 58.7208° N, 11.3347° E. Över 1500 figurer.',
    evidence: ['archaeological'],
    region: 'Bohuslän',
    country: 'Sverige',
    sources: ['UNESCO', 'Vitlycke museum'],
    findings: ['1500+ figurer'],
    specialFeatures: ['UNESCO världsarv', 'Vitlycke museum']
  },
  {
    id: 'namforsen',
    name: 'Nämforsen hällristningar',
    coordinates: { lat: 62.9939, lng: 16.4119 },
    type: 'rock_carving',
    period: ['neolithic', 'bronze_age'],
    establishedPeriod: 'neolithic',
    description: 'Norra Europas största samling med 2600 hällristningar',
    details: '2600 hällristningar, mest älgar. Norra Europas största samling. Shamanistiska motiv.',
    evidence: ['archaeological'],
    region: 'Ångermanland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['2600 hällristningar', 'Älgmotiv', 'Shamanistiska motiv'],
    specialFeatures: ['Norra Europas största samling']
  },
  {
    id: 'himmelstalund',
    name: 'Himmelstalund hällristningar',
    coordinates: { lat: 58.3722, lng: 15.5264 },
    type: 'rock_carving',
    period: ['bronze_age'],
    establishedPeriod: 'bronze_age',
    description: 'Östergötlands största hällristningsområde',
    details: 'Östergötlands största hällristningsområde. Skepp, människor, djur på flera hällar.',
    evidence: ['archaeological'],
    region: 'Östergötland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Skepp', 'Människor', 'Djur'],
    specialFeatures: ['Östergötlands största område']
  },
  {
    id: 'jarrestad',
    name: 'Järrestad hällristningar',
    coordinates: { lat: 55.4744, lng: 14.1569 },
    type: 'rock_carving',
    period: ['bronze_age'],
    establishedPeriod: 'bronze_age',
    description: 'Hällristningar vid skeppssättning, nära Ales stenar',
    details: 'Skeppssättning och hällristningar. Ales stenar ligger 15 km öster om här.',
    evidence: ['archaeological'],
    region: 'Skåne',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Skeppssättning', 'Hällristningar'],
    specialFeatures: ['Nära Ales stenar']
  },

  // ✅ ÖLANDS BORGAR
  {
    id: 'sandby_borg',
    name: 'Sandby borg',
    coordinates: { lat: 56.4853, lng: 16.5719 },
    type: 'fortress',
    period: ['migration_period'],
    establishedPeriod: 'migration_period',
    description: 'Ringborg med massakrerad befolkning, "Ölands Pompeji"',
    details: 'Ringborg 95 m diameter. Massakrerad befolkning påträffad, "Ölands Pompeji".',
    evidence: ['archaeological'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    dimensions: '95 m diameter',
    findings: ['Massakrerade kroppar'],
    specialFeatures: ['"Ölands Pompeji"', 'Övergiven ca 480 e.Kr.']
  },
  {
    id: 'graborg',
    name: 'Gråborg',
    coordinates: { lat: 56.6439, lng: 16.6581 },
    type: 'fortress',
    period: ['migration_period', 'vendel_period', 'viking_age', 'transition_period', 'medieval'],
    establishedPeriod: 'migration_period',
    description: 'Ölands största fornborg med 7 m höga kalkstensmurar',
    details: 'Ölands största fornborg, 210x160 meter. Kalkstensmurar upp till 7 m höga.',
    evidence: ['archaeological'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    dimensions: '210x160 meter',
    findings: ['Kalkstensmurar'],
    specialFeatures: ['Ölands största fornborg', 'Murar upp till 7 m höga']
  },
  {
    id: 'ismantorp',
    name: 'Ismantorp',
    coordinates: { lat: 56.7408, lng: 16.6244 },
    type: 'fortress',
    period: ['migration_period', 'vendel_period'],
    establishedPeriod: 'migration_period',
    description: 'Perfekt rund ringborg med 88 husgrunder och 9 portar',
    details: 'Perfekt rund ringborg, 125 m diameter. 88 husgrunder, 9 portar. Bäst bevarad.',
    evidence: ['archaeological'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    dimensions: '125 m diameter',
    findings: ['88 husgrunder', '9 portar'],
    specialFeatures: ['Perfekt rund', 'Bäst bevarad']
  },
  {
    id: 'traby_borg',
    name: 'Träby borg',
    coordinates: { lat: 57.2031, lng: 16.9742 },
    type: 'fortress',
    period: ['early_iron_age', 'migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'early_iron_age',
    description: 'Fornborg på norra Öland med strategisk placering',
    details: 'Fornborg på norra Öland, mindre än de andra. Strategisk placering.',
    evidence: ['archaeological'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    specialFeatures: ['Strategisk placering', 'Norra Öland']
  },
  {
    id: 'triberga_borg',
    name: 'Triberga borg',
    coordinates: { lat: 56.8267, lng: 16.7208 },
    type: 'fortress',
    period: ['early_iron_age', 'migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'early_iron_age',
    description: 'Oval fornborg på mellersta Öland',
    details: 'Oval fornborg 140x100 meter på mellersta Öland.',
    evidence: ['archaeological'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    dimensions: '140x100 meter',
    specialFeatures: ['Oval form', 'Mellersta Öland']
  },

  // ✅ STENSTRÄNGSSYSTEM
  {
    id: 'ryckelsby_ostergotland',
    name: 'Ryckelsby stensträngssystem',
    coordinates: { lat: 58.2789, lng: 15.9536 },
    type: 'stone_wall_system',
    period: ['early_iron_age', 'migration_period'],
    establishedPeriod: 'early_iron_age',
    description: 'Omfattande system av stensträngar som avgränsar åkrar och betesmarker',
    details: 'Omfattande system av stensträngar som avgränsar åkrar och betesmarker.',
    evidence: ['archaeological'],
    region: 'Östergötland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    specialFeatures: ['Avgränsar åkrar och betesmarker']
  },
  {
    id: 'gamla_uppsala_stenstranger',
    name: 'Gamla Uppsala stensträngssystem',
    coordinates: { lat: 59.8978, lng: 17.6339 },
    type: 'stone_wall_system',
    period: ['early_iron_age', 'migration_period', 'vendel_period', 'viking_age'],
    establishedPeriod: 'early_iron_age',
    description: 'Stensträngssystem som markerar heliga områden',
    details: 'Stensträngssystem norr och öster om högarna. Markerar heliga områden.',
    evidence: ['archaeological'],
    region: 'Uppland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    specialFeatures: ['Markerar heliga områden', 'Kring kungshögarna']
  },
  {
    id: 'vallhagar_gotland',
    name: 'Vallhagar stensträngssystem',
    coordinates: { lat: 57.4056, lng: 18.5522 },
    type: 'stone_wall_system',
    period: ['early_iron_age', 'migration_period'],
    establishedPeriod: 'early_iron_age',
    description: 'Välbevarat stensträngssystem med husgrunder från järnåldern',
    details: 'Välbevarat stensträngssystem med husgrunder från järnåldern.',
    evidence: ['archaeological'],
    region: 'Gotland',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Husgrunder från järnåldern'],
    specialFeatures: ['Välbevarat system']
  },

  // ✅ ANCYLUSVALLEN (GEOLOGISKA FORNMINNEN)
  {
    id: 'byxelkrok_ancylusvall',
    name: 'Byxelkrok Ancylusvall',
    coordinates: { lat: 57.3222, lng: 17.0208 },
    type: 'ancient_shoreline',
    period: ['postglacial'],
    establishedPeriod: 'postglacial',
    description: '9000 år gammal strandlinje från Ancylussjön',
    details: 'Tydlig vall 5-10 m över havet. Geologiskt minnesmärke från Ancylussjön.',
    evidence: ['geological'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Geologiska undersökningar'],
    dimensions: '5-10 m över havet',
    specialFeatures: ['9000 år gammal', 'Geologiskt minnesmärke']
  },
  {
    id: 'boda_byrum_ancylusvall',
    name: 'Böda-Byrum Ancylusvall',
    coordinates: { lat: 57.2600, lng: 17.0400 },
    type: 'ancient_shoreline',
    period: ['postglacial'],
    establishedPeriod: 'postglacial',
    description: 'Ancylusvall längs östkusten, tydlig vid Böda kronopark',
    details: 'Vallen löper parallellt med östkusten, särskilt tydlig vid Böda kronopark.',
    evidence: ['geological'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Geologiska undersökningar'],
    specialFeatures: ['Parallell med östkusten', 'Tydlig vid Böda kronopark']
  },

  // ✅ JÄRNÅLDERSBYAR OCH REKONSTRUKTIONER
  {
    id: 'eketorp',
    name: 'Eketorp',
    coordinates: { lat: 56.2953, lng: 16.4847 },
    type: 'village',
    period: ['migration_period', 'vendel_period', 'transition_period', 'medieval'],
    establishedPeriod: 'migration_period',
    description: 'Rekonstruerad ringborg med museum och levande fornby',
    details: 'Rekonstruerad ringborg med 53 hus. Museum och levande fornby sommartid.',
    evidence: ['archaeological', 'reconstruction'],
    region: 'Öland',
    country: 'Sverige',
    sources: ['Eketorp museum'],
    findings: ['53 hus'],
    specialFeatures: ['Rekonstruerad', 'Levande museum', 'Två byggnadsfaser: 300-650 e.Kr. och 1000-1300 e.Kr.']
  },
  {
    id: 'gene_fornby',
    name: 'Gene fornby',
    coordinates: { lat: 63.4472, lng: 18.5333 },
    type: 'village',
    period: ['early_iron_age', 'migration_period'],
    establishedPeriod: 'early_iron_age',
    description: 'Rekonstruerad järnåldersgård från 200-600 e.Kr.',
    details: 'Rekonstruerad gård från 200-600 e.Kr. Långhus, verkstäder, djurhus.',
    evidence: ['archaeological', 'reconstruction'],
    region: 'Ångermanland',
    country: 'Sverige',
    sources: ['Gene fornby museum'],
    findings: ['Långhus', 'Verkstäder', 'Djurhus'],
    specialFeatures: ['Rekonstruerad gård', 'Museum']
  },
  {
    id: 'foteviken',
    name: 'Foteviken',
    coordinates: { lat: 55.4547, lng: 12.8244 },
    type: 'village',
    period: ['viking_age'],
    establishedPeriod: 'viking_age',
    description: 'Rekonstruerad vikingastad med årlig festival',
    details: 'Museum med rekonstruerad vikingastad. Årlig vikingafestival.',
    evidence: ['reconstruction'],
    region: 'Skåne',
    country: 'Sverige',
    sources: ['Foteviken museum'],
    specialFeatures: ['Rekonstruerad vikingastad', 'Årlig festival']
  },
  {
    id: 'storholmen_norrbotten',
    name: 'Storholmen',
    coordinates: { lat: 65.5833, lng: 22.2000 },
    type: 'trading_post',
    period: ['vendel_period', 'viking_age'],
    establishedPeriod: 'vendel_period',
    description: 'Handelsplats vid Torneälven med kontakter österut',
    details: 'Handelsplats vid Torneälven. Fynd visar kontakter österut.',
    evidence: ['archaeological'],
    region: 'Norrbotten',
    country: 'Sverige',
    sources: ['Arkeologiska undersökningar'],
    findings: ['Handelsföremål'],
    specialFeatures: ['Kontakter österut', 'Vid Torneälven']
  },
  {
    id: 'birka',
    name: 'Birka',
    coordinates: { lat: 59.3350, lng: 17.5447 },
    type: 'trading_post',
    period: ['vendel_period', 'viking_age'],
    establishedPeriod: 'vendel_period',
    description: 'Sveriges första stad med museum och rekonstruerade hus',
    details: 'Sveriges första stad. Museum, rekonstruerade hus, stadsvall. UNESCO världsarv.',
    evidence: ['archaeological', 'reconstruction'],
    region: 'Uppland',
    country: 'Sverige',
    sources: ['Birka museum', 'UNESCO'],
    findings: ['Stadsvall', 'Handelsföremål', 'Gravar'],
    specialFeatures: ['Sveriges första stad', 'UNESCO världsarv', '750-975 e.Kr.']
  }
];