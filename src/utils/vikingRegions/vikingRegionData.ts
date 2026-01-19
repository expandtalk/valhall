import { VikingRegion } from './types';

export const VIKING_REGIONS: VikingRegion[] = [
  // SKANDINAVISKA HANDELSSTÄDER - De viktigaste under vikingatiden
  {
    lat: 54.5,
    lng: 9.6,
    vikingName: 'Hedeby',
    modernName: 'Haddeby (Schleswig)',
    description: 'Nordens största och viktigaste handelsstad under vikingatiden med cirka 2000 invånare omkring år 970. Köpmän från hela Europa kom hit för handel.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },
  {
    lat: 59.3361,
    lng: 17.5453,
    vikingName: 'Birka',
    modernName: 'Björkö, Stockholms län',
    description: 'Sveriges viktigaste handelsstad under tidig vikingatid (750-970). Belägen på Björkö i Mälaren, en knutpunkt för handel mellan öst och väst.',
    category: 'nordic',
    timeperiod: 'early_viking',
    type: 'major_trading_city'
  },
  {
    lat: 55.3,
    lng: 8.8,
    vikingName: 'Ribe',
    modernName: 'Ribe',
    description: 'En av Skandinaviens första stadsliknande samhällen och Danmarks äldsta stad. Viktig handelsplats och tidigt kristet centrum från 700-talet.',
    category: 'nordic',
    timeperiod: 'early_viking',
    type: 'major_trading_city'
  },
  {
    lat: 59.0,
    lng: 10.0,
    vikingName: 'Kaupang',
    modernName: 'Larvik, Vestfold',
    description: 'Norges största handelsplats under vikingatiden. Centrum för handel i södra Norge med förbindelser till hela Europa.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },
  {
    lat: 59.6,
    lng: 17.7,
    vikingName: 'Sigtuna',
    modernName: 'Sigtuna',
    description: 'Ersatte Birka som Sveriges huvudsakliga handelsstad från slutet av 900-talet. Grundades av Erik Segersäll omkring 980.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'major_trading_city'
  },
  {
    lat: 57.6,
    lng: 18.3,
    vikingName: 'Visby',
    modernName: 'Visby, Gotland',
    description: 'Gotlands huvudstad och viktigt handelscentrum. Ön var känd för sina enorma silverskattar från östlig handel.',
    category: 'baltic',
    timeperiod: 'all_viking',
    type: 'major_trading_city'
  },
  {
    lat: 63.4,
    lng: 10.4,
    vikingName: 'Niðaróss',
    modernName: 'Trondheim',
    description: 'Viktig norsk handels- och kungastad. Grundades av Olav Tryggvason år 997 och blev Norges religiösa centrum.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'major_trading_city'
  },
  {
    lat: 59.3,
    lng: 10.4,
    vikingName: 'Túnsberg',
    modernName: 'Tønsberg',
    description: 'Grundades 871 och räknas som Norges äldsta stad. Viktig handelsplats vid Vestfjorden.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },
  {
    lat: 55.7,
    lng: 13.2,
    vikingName: 'Lund',
    modernName: 'Lund',
    description: 'Efterträdde Uppåkra som regionens huvudcentrum på order av Harald Blåtand. Blev Danmarks religiösa centrum.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'major_trading_city'
  },
  {
    lat: 56.9,
    lng: 16.7,
    vikingName: 'Köpingsvik',
    modernName: 'Borgholm, Öland',
    description: 'Ölands största handelsplats under vikingatiden. Strategiskt läge för handel över Östersjön.',
    category: 'baltic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },

  // VÄSTEUROPEISKA VIKINGASTÄDER
  {
    lat: 53.3,
    lng: -6.3,
    vikingName: 'Dyflin',
    modernName: 'Dublin',
    description: 'Grundades av vikingar som longphort år 841. Blev Irlands viktigaste handelsstad och centrum för vikingaaktivitet.',
    category: 'celtic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },
  {
    lat: 53.9,
    lng: -1.1,
    vikingName: 'Jórvík',
    modernName: 'York',
    description: 'Erövrades av vikingar 866 och blev huvudstad i Danelagen. En av Europas främsta handelsstäder under vikingatiden.',
    category: 'anglo_saxon',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },

  // ÖSTEUROPEISKA HANDELSSTÄDER
  {
    lat: 60.0,
    lng: 32.3,
    vikingName: 'Aldeigjuborg',
    modernName: 'Staraja Ladoga',
    description: 'En av vikingatidens första och viktigaste handelsstationer i östra Europa. Grundat på 750-talet vid Volchovfloden.',
    category: 'slavic',
    timeperiod: 'early_viking',
    type: 'major_trading_city'
  },
  {
    lat: 58.5,
    lng: 31.3,
    vikingName: 'Holmgård',
    modernName: 'Novgorod',
    description: 'Vikingahövdingen Ruriks huvudstad och centrum för handel med Bysans. Viktigt nav på vägen till Konstantinopel.',
    category: 'slavic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },
  {
    lat: 50.5,
    lng: 30.5,
    vikingName: 'Kænugarður',
    modernName: 'Kiev',
    description: 'Huvudstad i Kievrus och centrum för den stora handelsrutten till Konstantinopel. Kontrollerades av nordmän.',
    category: 'slavic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },
  {
    lat: 54.9,
    lng: 49.1,
    vikingName: 'Bulghar',
    modernName: 'Bolgar, Tatarstan',
    description: 'Volga-bulgarernas huvudstad och viktig handelsstation på Volga-rutten. Centrum för pälshandel och silverutbyte.',
    category: 'turkic',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },

  // STORA EUROPEISKA STÄDER (vikingamål)
  {
    lat: 41.0,
    lng: 28.9,
    vikingName: 'Miklagarður',
    modernName: 'Istanbul (Konstantinopel)',
    description: 'Bysantinska rikets huvudstad med 150-200,000 invånare. Slutmål för den stora östliga handelsrutten.',
    category: 'byzantine',
    timeperiod: 'all_viking',
    type: 'imperial_capital'
  },
  {
    lat: 48.9,
    lng: 2.3,
    vikingName: 'París',
    modernName: 'Paris',
    description: 'Frankiska rikets stora stad som belägrades av vikingar flera gånger, bl.a. av Ragnar Lodbrok 845.',
    category: 'frankish',
    timeperiod: 'middle_viking',
    type: 'imperial_capital'
  },
  {
    lat: 51.5,
    lng: 0.1,
    vikingName: 'Lundenwic',
    modernName: 'London',
    description: 'Viktigt frankiskt/anglosaxiskt handelscentrum som attackerades av vikingar flera gånger.',
    category: 'anglo_saxon',
    timeperiod: 'middle_viking',
    type: 'major_trading_city'
  },
  {
    lat: 50.9,
    lng: 6.9,
    vikingName: 'Colonia',
    modernName: 'Köln',
    description: 'En av kontinentens största städer med 40-60,000 invånare. Viktig för handel med kontinenten.',
    category: 'frankish',
    timeperiod: 'all_viking',
    type: 'major_trading_city'
  },

// SVENSKA FÖRSVARSVALL
  {
    lat: 58.4847,
    lng: 16.1747,
    vikingName: 'Götavirke (Nord)',
    modernName: 'Västra Husby',
    description: 'Norra delen av Götavirke - en 3,5 km lång försvarsvall i Östergötland som var i bruk 800-1000 e.Kr. Skyddade mot angrepp från söder.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'defensive_wall'
  },
  {
    lat: 58.4658,
    lng: 16.1603,
    vikingName: 'Götavirke (Syd)',
    modernName: 'Hylinge',
    description: 'Södra delen av Götavirke-vallen. Tillsammans med den norra delen bildade denna vall ett effektivt försvar för det svenska riket.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'defensive_wall'
  },

  // TRELLEBORG-BEFÄSTNINGAR
  {
    lat: 55.3819,
    lng: 11.4581,
    vikingName: 'Trelleborg',
    modernName: 'Trelleborg, Själland',
    description: 'Den mest kända av de danska ringborgarna. Byggd under Harald Blåtand 980-talet som en perfekt cirkulär befästning.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },
  {
    lat: 56.9927,
    lng: 9.2642,
    vikingName: 'Aggersborg',
    modernName: 'Aggersborg, Limfjorden',
    description: 'Den största av Trelleborg-befästningarna med 240 meters diameter. Kunde hysa över 1000 krigare.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },
  {
    lat: 56.6000,
    lng: 9.7667,
    vikingName: 'Fyrkat',
    modernName: 'Fyrkat, Jylland',
    description: 'Välbevarad Trelleborg-befästning med fyra portar och 16 långhus. Centrum för vikingatidens militära organisation.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },
  {
    lat: 55.4038,
    lng: 10.4024,
    vikingName: 'Nonnebakken',
    modernName: 'Odense',
    description: 'Trelleborg-befästning i Odense som kontrollerade Fyn och handelsrutterna genom Danmark.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },

  // DANEVIRKE - Nordens största försvarsanläggning
  {
    lat: 54.0,
    lng: 9.1,
    vikingName: 'Danevirke (Hollingsted)',
    modernName: 'Hollingsted',
    description: 'Danevirkes västra startpunkt vid Hollingsted - Hedebys "Nordsjöhamn". Härifrån sträckte sig den 30 km långa försvarsmuern österut.',
    category: 'nordic',
    timeperiod: 'all_viking',
    type: 'fortress'
  },
  {
    lat: 54.25,
    lng: 9.4,
    vikingName: 'Danevirke (Centrum)',
    modernName: 'Danevirke',
    description: 'Centrum av Danevirke-vallen som förseglade den 16 km breda Schleswig-näset. Skyddade Danmark från angrepp söderifrån.',
    category: 'nordic',
    timeperiod: 'all_viking',
    type: 'fortress'
  },
  {
    lat: 54.5,
    lng: 9.9,
    vikingName: 'Danevirke (Egernförde)',
    modernName: 'Egernförde',
    description: 'Danevirkes östra slutpunkt vid Östersjön. Här slutade den mäktiga försvarsmuern som skyddade hela Danmark.',
    category: 'nordic',
    timeperiod: 'all_viking',
    type: 'fortress'
  },

  // SVENSKA FÖRSVARSVALL
  {
    lat: 58.4847,
    lng: 16.1747,
    vikingName: 'Götavirke (Nord)',
    modernName: 'Västra Husby',
    description: 'Norra delen av Götavirke - en 3,5 km lång försvarsvall i Östergötland som var i bruk 800-1000 e.Kr. Skyddade mot angrepp från söder.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'defensive_wall'
  },
  {
    lat: 58.4658,
    lng: 16.1603,
    vikingName: 'Götavirke (Syd)',
    modernName: 'Hylinge',
    description: 'Södra delen av Götavirke-vallen. Tillsammans med den norra delen bildade denna vall ett effektivt försvar för det svenska riket.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'defensive_wall'
  },

  // TRELLEBORG-BEFÄSTNINGAR
  {
    lat: 55.3819,
    lng: 11.4581,
    vikingName: 'Trelleborg',
    modernName: 'Trelleborg, Själland',
    description: 'Den mest kända av de danska ringborgarna. Byggd under Harald Blåtand 980-talet som en perfekt cirkulär befästning.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },
  {
    lat: 56.9927,
    lng: 9.2642,
    vikingName: 'Aggersborg',
    modernName: 'Aggersborg, Limfjorden',
    description: 'Den största av Trelleborg-befästningarna med 240 meters diameter. Kunde hysa över 1000 krigare.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },
  {
    lat: 56.6000,
    lng: 9.7667,
    vikingName: 'Fyrkat',
    modernName: 'Fyrkat, Jylland',
    description: 'Välbevarad Trelleborg-befästning med fyra portar och 16 långhus. Centrum för vikingatidens militära organisation.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },
  {
    lat: 55.4038,
    lng: 10.4024,
    vikingName: 'Nonnebakken',
    modernName: 'Odense',
    description: 'Trelleborg-befästning i Odense som kontrollerade Fyn och handelsrutterna genom Danmark.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'ring_fortress'
  },

  // PÅLSPÄRRAR OCH UNDERVATTENSHINDER
  {
    lat: 59.3278,
    lng: 18.0717,
    vikingName: 'Norrström pålspärr',
    modernName: 'Stockholm (Helgeandsholmen)',
    description: 'Pålspärr mellan Helgeandsholmen och Stadsholmen som kontrollerade farleden genom Stockholm.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'defensive_structure'
  },
  {
    lat: 59.3333,
    lng: 17.5333,
    vikingName: 'Birka undervattenshinder',
    modernName: 'Björkö',
    description: 'Undervattenshinder runt handelsplatsen Birka för att skydda hamnen och kontrollera tillträdet.',
    category: 'nordic',
    timeperiod: 'early_viking',
    type: 'defensive_structure'
  },
  {
    lat: 59.6167,
    lng: 17.7167,
    vikingName: 'Sigtuna pålspärr',
    modernName: 'Sigtuna',
    description: 'Pålspärrar vid Sigtunas hamn för att kontrollera handeln och försvara staden.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'defensive_structure'
  },
  {
    lat: 54.4903,
    lng: 9.5647,
    vikingName: 'Hedeby hamnspärr',
    modernName: 'Hedeby',
    description: 'Omfattande pålkonstruktioner i Hedebys hamn för att skydda och kontrollera den viktiga handelsplatsen.',
    category: 'nordic',
    timeperiod: 'middle_viking',
    type: 'defensive_structure'
  },
  {
    lat: 58.4833,
    lng: 16.3167,
    vikingName: 'Söderköping pålspärr',
    modernName: 'Söderköping',
    description: 'Pålspärr vid sammanflödet av Storån och Lillån för att kontrollera tillträdet till handelsplatsen.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'defensive_structure'
  },
  {
    lat: 58.0167,
    lng: 12.1500,
    vikingName: 'Lödöse pålspärr',
    modernName: 'Lödöse',
    description: 'Pålspärrar vid Göta älv för att kontrollera handeln och försvara den viktiga handelsplatsen.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'defensive_structure'
  },
  {
    lat: 59.3281,
    lng: 18.0686,
    vikingName: 'Helgeandsholmen befästning',
    modernName: 'Stockholm',
    description: 'Kompletterande befästning till pålspärren som kontrollerade Stockholms strategiska läge.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'fortress'
  },
  {
    lat: 59.9139,
    lng: 10.7522,
    vikingName: 'Viken',
    modernName: 'Oslo',
    description: 'Viken var ett historiskt landskap runt Oslofjorden, som under vikingatiden var en viktig del av Danmark och Norge. Regionen var känd för sin sjöfart och handel.',
    category: 'nordic',
    timeperiod: 'all_viking',
    type: 'kingdom'
  },
  {
    lat: 55.5903,
    lng: 13.0000,
    vikingName: 'Skåne',
    modernName: 'Malmö',
    description: 'Skåne var under vikingatiden en del av Danmark och ett viktigt område för jordbruk och handel. Regionen var också känd för sina många skeppssättningar och runstenar.',
    category: 'nordic',
    timeperiod: 'all_viking',
    type: 'kingdom'
  },
  {
    lat: 64.1353,
    lng: -21.8952,
    vikingName: 'Ísland',
    modernName: 'Reykjavik',
    description: 'Island koloniserades av nordmän under 800-talet. Ön blev en fristat och ett viktigt centrum för vikingakultur och litteratur.',
    category: 'discoveries',
    timeperiod: 'middle_viking',
    type: 'discovery'
  },
  {
    lat: 51.5944,
    lng: -55.5344,
    vikingName: 'Vinland',
    modernName: "L'Anse aux Meadows",
    description: 'Leifs bas (Leifsbudir) vid L\'Anse aux Meadows - den enda arkeologiskt bekräftade nordiska bosättningen i Nordamerika. Här etablerades den första europeiska bosättningen i Amerika omkring år 1000.',
    category: 'discoveries',
    timeperiod: 'late_viking',
    type: 'discovery'
  },
  {
    lat: 56.6621,
    lng: 16.5075,
    vikingName: 'Torslunda',
    modernName: 'Torslunda, Öland',
    description: 'Torslunda på Öland är känt för sina vendeltida bronsplåtar med mytologiska motiv. Platsen var ett viktigt centrum under vendel- och vikingatiden.',
    category: 'nordic',
    timeperiod: 'early_viking',
    type: 'religious_center'
  },
  {
    lat: 59.8575,
    lng: 17.6400,
    vikingName: 'Gamla Uppsala',
    modernName: 'Gamla Uppsala',
    description: 'Gamla Uppsala var ett viktigt religiöst och politiskt centrum under vikingatiden. Här låg Uppsala högar, en kungsgård och ett tempel.',
    category: 'nordic',
    timeperiod: 'all_viking',
    type: 'religious_center'
  },
  {
    lat: 65.0000,
    lng: -70.0000,
    vikingName: 'Helluland',
    modernName: 'Baffin Island',
    description: 'Helluland ("Stenplattans land") var nordmännens namn på Baffin Island. Den första platsen som Leif Eriksson nådde på sin resa västerut från Grönland.',
    category: 'discoveries',
    timeperiod: 'late_viking',
    type: 'discovery'
  },
  {
    lat: 54.0000,
    lng: -60.0000,
    vikingName: 'Markland',
    modernName: 'Labrador',
    description: 'Markland ("Skogslandet") var nordmännens namn på Labradorhalvön. Känt för sina täta skogar som gav vikingarna värdefull ved.',
    category: 'discoveries',
    timeperiod: 'late_viking',
    type: 'discovery'
  },
  {
    lat: 59.6039,
    lng: 16.5448,
    vikingName: 'Västra Aros',
    modernName: 'Västerås',
    description: 'Västra Aros (Västerås) var en viktig handelsplats vid Mälaren under vikingatiden. Staden hade strategisk betydelse för handel och transport.',
    category: 'nordic',
    timeperiod: 'late_viking',
    type: 'city'
  },
  {
    lat: 49.4431,
    lng: 1.0993,
    vikingName: 'Rouen',
    modernName: 'Rouen, Normandie',
    description: 'Rouen blev huvudstad i Normandie efter att vikingarna etablerat sig där på 900-talet. Centrum för den normandiska kulturen.',
    category: 'germanic',
    timeperiod: 'late_viking',
    type: 'city'
  }
];

// Export with the expected name for backward compatibility
export const ALL_VIKING_REGIONS = VIKING_REGIONS;
