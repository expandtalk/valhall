
import { GermanicGroup } from '../groups';

export const VIKING_AGE_GROUPS: GermanicGroup[] = [
  // Vikingatid - huvudgrupper
  {
    id: 'vikings',
    name: 'Vikingarna',
    nameEn: 'Vikings',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 60.0,
    lng: 10.0,
    startYear: 793,
    endYear: 1066,
    description: 'Nordgermanska sjöfarare, handelsmän och krigare som expanderade över Europa.',
    descriptionEn: 'North Germanic seafarers, traders and warriors expanding across Europe.',
    significance: 'Dominerade handeln och politiken i norra Europa'
  },
  {
    id: 'danes',
    name: 'Danerna',
    nameEn: 'Danes',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 55.0,
    lng: 12.0,
    startYear: 793,
    endYear: 1066,
    description: 'Nordgermansk stam som bebodde nuvarande Danmark.',
    descriptionEn: 'North Germanic tribe inhabiting present-day Denmark.',
    significance: 'Grundade det danska riket och kontrollerade England under en tid'
  },
  
  // Kristna missionscenter
  {
    id: 'hamburg_mission',
    name: 'Hamburg (Missionscenter)',
    nameEn: 'Hamburg Mission Center',
    period: 'viking_age',
    languageBranch: 'West Germanic',
    lat: 53.55,
    lng: 9.99,
    startYear: 808,
    endYear: 1066,
    description: 'Ärkebiskopssäte grundat 808 e.Kr., Ansgars missionsbas till Skandinavien.',
    descriptionEn: 'Archbishopric founded 808 AD, Ansgar\'s missionary base to Scandinavia.',
    significance: 'Kristendomens centrum för nordisk mission'
  },
  {
    id: 'bremen_mission',
    name: 'Bremen (Missionscenter)',
    nameEn: 'Bremen Mission Center',
    period: 'viking_age',
    languageBranch: 'West Germanic',
    lat: 53.08,
    lng: 8.81,
    startYear: 793,
    endYear: 1066,
    description: 'Ärkebiskopssäte och missionscenter för Skandinavien.',
    descriptionEn: 'Archbishopric and mission center for Scandinavia.',
    significance: 'Ledde kristendomens spridning till norden'
  },

  // Frankiska riket
  {
    id: 'frankish_empire_viking',
    name: 'Frankiska riket',
    nameEn: 'Frankish Empire',
    period: 'viking_age',
    languageBranch: 'West Germanic',
    lat: 49.0,
    lng: 2.3,
    startYear: 793,
    endYear: 1066,
    description: 'Mäktigt europeiskt rike under Karl den Store och efterföljare.',
    descriptionEn: 'Powerful European empire under Charlemagne and successors.',
    significance: 'Vikingarna både handlade med och plundrade Frankerriket'
  },
  {
    id: 'paris_viking_target',
    name: 'Paris (Vikingamål)',
    nameEn: 'Paris (Viking Target)',
    period: 'viking_age',
    languageBranch: 'West Germanic',
    lat: 48.9,
    lng: 2.4,
    startYear: 793,
    endYear: 1066,
    description: 'Frankisk stad som belägrades av vikingar flera gånger.',
    descriptionEn: 'Frankish city besieged by Vikings multiple times.',
    significance: 'Viktigt mål för vikingaangrepp'
  },
  {
    id: 'rouen_normandy',
    name: 'Rouen (Normandie)',
    nameEn: 'Rouen (Normandy)',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 49.4,
    lng: 1.1,
    startYear: 911,
    endYear: 1066,
    description: 'Normandiskt centrum efter Rollos erövring 911.',
    descriptionEn: 'Norman center after Rollo\'s conquest in 911.',
    significance: 'Vikingarna etablerade Normandie'
  },

  // Handelsstäder
  {
    id: 'hedeby_trading',
    name: 'Hedeby',
    nameEn: 'Hedeby',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 54.5,
    lng: 9.6,
    startYear: 793,
    endYear: 1066,
    description: 'Danmarks största handelsstad vid Schleswig.',
    descriptionEn: 'Denmark\'s largest trading city at Schleswig.',
    significance: 'Viktigaste handelscentret i södra Skandinavien'
  },
  {
    id: 'ribe_trading',
    name: 'Ribe',
    nameEn: 'Ribe',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 55.3,
    lng: 8.8,
    startYear: 793,
    endYear: 1066,
    description: 'Danmarks äldsta stad och viktigt handelscentrum.',
    descriptionEn: 'Denmark\'s oldest city and important trading center.',
    significance: 'Tidigt kristet center i Danmark'
  },
  {
    id: 'kaupang_trading',
    name: 'Kaupang',
    nameEn: 'Kaupang',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 59.0,
    lng: 10.0,
    startYear: 793,
    endYear: 1066,
    description: 'Viktigt handelscentrum i Vestfold, Norge.',
    descriptionEn: 'Important trading center in Vestfold, Norway.',
    significance: 'Norges viktigaste handelsplats'
  },
  {
    id: 'birka_normalized',
    name: 'Birka',
    nameEn: 'Birka',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 59.3361,
    lng: 17.5453,
    startYear: 793,
    endYear: 975,
    description: 'Viktigt handelscentrum på Björkö i Mälaren, övergivet omkring 975.',
    descriptionEn: 'Important trading center on Björkö in Lake Mälaren, abandoned around 975.',
    significance: 'Sveriges viktigaste handelsplats under tidig vikingatid'
  },

  // Östväg och slaviska kontakter
  {
    id: 'novgorod_trading',
    name: 'Novgorod',
    nameEn: 'Novgorod',
    period: 'viking_age',
    languageBranch: 'Slavic',
    lat: 58.5,
    lng: 31.3,
    startYear: 793,
    endYear: 1066,
    description: 'Viktigt handelscentrum i Ryssland, del av östvägen.',
    descriptionEn: 'Important trading center in Russia, part of the eastern route.',
    significance: 'Början på vägen till Konstantinopel'
  },
  {
    id: 'kiev_trading',
    name: 'Kiev',
    nameEn: 'Kiev',
    period: 'viking_age',
    languageBranch: 'Slavic',
    lat: 50.5,
    lng: 30.5,
    startYear: 793,
    endYear: 1066,
    description: 'Huvudstad i Kievriket, väg till Konstantinopel.',
    descriptionEn: 'Capital of Kievan Rus, route to Constantinople.',
    significance: 'Slutpunkt på östersjövägen'
  },

  // Andra viktiga germanska stammar
  {
    id: 'saxons_viking_era',
    name: 'Saxarna (vikingatid)',
    nameEn: 'Saxons (Viking Era)',
    period: 'viking_age',
    languageBranch: 'West Germanic',
    lat: 53.0,
    lng: 8.0,
    startYear: 793,
    endYear: 1066,
    description: 'Saxar i norra Tyskland och England under vikingatiden.',
    descriptionEn: 'Saxons in northern Germany and England during Viking Age.',
    significance: 'Viktiga grannar till vikingarna'
  },
  {
    id: 'alamanni_viking_era',
    name: 'Alemannerna (vikingatid)',
    nameEn: 'Alemanni (Viking Era)',
    period: 'viking_age',
    languageBranch: 'West Germanic',
    lat: 48.0,
    lng: 8.0,
    startYear: 793,
    endYear: 1066,
    description: 'Alemannar i södra Tyskland under vikingatiden.',
    descriptionEn: 'Alemanni in southern Germany during Viking Age.',
    significance: 'Del av Heliga romerska riket'
  },
  {
    id: 'frisians_viking_era',
    name: 'Friserna (vikingatid)',
    nameEn: 'Frisians (Viking Era)',
    period: 'viking_age',
    languageBranch: 'West Germanic',
    lat: 53.2,
    lng: 5.8,
    startYear: 793,
    endYear: 1066,
    description: 'Friser vid Nordsjöns kust, viktiga handelspartners.',
    descriptionEn: 'Frisians at North Sea coast, important trading partners.',
    significance: 'Kontrollerade viktiga handelsrutter'
  },

  // Slaviska stammar
  {
    id: 'wends_viking_era',
    name: 'Venderna',
    nameEn: 'Wends',
    period: 'viking_age',
    languageBranch: 'Slavic',
    lat: 53.5,
    lng: 11.0,
    startYear: 793,
    endYear: 1066,
    description: 'Slaviska stammar i nuvarande norra Tyskland.',
    descriptionEn: 'Slavic tribes in present-day northern Germany.',
    significance: 'Vikingarna handlade och krigade med venderna'
  },
  {
    id: 'obotrites_viking_era',
    name: 'Obotriterna',
    nameEn: 'Obotrites',
    period: 'viking_age',
    languageBranch: 'Slavic',
    lat: 53.8,
    lng: 11.5,
    startYear: 793,
    endYear: 1066,
    description: 'Slavisk stam i Mecklenburg.',
    descriptionEn: 'Slavic tribe in Mecklenburg.',
    significance: 'Allierade med Frankerriket mot vikingarna'
  },

  // Viktiga städer
  {
    id: 'york_jorvik',
    name: 'York (Jorvik)',
    nameEn: 'York (Jorvik)',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 53.96,
    lng: -1.08,
    startYear: 866,
    endYear: 1066,
    description: 'Vikingastad i England, erövrad 866 e.Kr.',
    descriptionEn: 'Viking city in England, conquered 866 AD.',
    significance: 'Huvudstad i Danelagen'
  },
  {
    id: 'dublin_viking',
    name: 'Dublin',
    nameEn: 'Dublin',
    period: 'viking_age',
    languageBranch: 'North Germanic',
    lat: 53.3,
    lng: -6.3,
    startYear: 841,
    endYear: 1066,
    description: 'Vikingastad i Irland, grundad som longphort.',
    descriptionEn: 'Viking city in Ireland, founded as longphort.',
    significance: 'Centrum för vikingaaktivitet i Irland'
  }
];
