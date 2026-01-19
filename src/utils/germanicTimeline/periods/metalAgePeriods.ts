
import { GermanicTimelinePeriod } from './types';

export const METAL_AGE_PERIODS: GermanicTimelinePeriod[] = [
  // Bronsålder (1,700-500 f.Kr.)
  {
    id: 'bronze_age',
    name: 'Bronsålder (1,700-500 f.Kr.)',
    nameEn: 'Bronze Age (1,700-500 BCE)',
    startYear: -1700,
    endYear: -500,
    description: 'Omfattande hällristningar med skepp och solvagnar. Rituella deponeringar och offerkällor. Hela Skandinavien koloniserad.',
    descriptionEn: 'Extensive rock carvings with ships and sun chariots. Ritual depositions and offering springs. All of Scandinavia colonized.',
    color: '#CD853F',
    keyFeatures: ['Omfattande hällristningar', 'Skepp och solvagnar', 'Rituella deponeringar', 'Hela Skandinavien koloniserad'],
    basicInfo: {
      climate: 'Varmperiod, gynnsamt för jordbruk',
      environment: 'Etablerade skogar och jordbrukslandskap',
      people: 'Hierarkiskt samhälle med elit och hantverkare',
      lifestyle: 'Jordbruk, handel och hantverk',
      technology: 'Bronsmetallurgi, avancerade verktyg och vapen',
      society: 'Hierarkiskt, rika elitgravar'
    },
    basicInfoEn: {
      climate: 'Warm period, favorable for agriculture',
      environment: 'Established forests and agricultural landscape',
      people: 'Hierarchical society with elite and craftspeople',
      lifestyle: 'Agriculture, trade and crafts',
      technology: 'Bronze metallurgy, advanced tools and weapons',
      society: 'Hierarchical, rich elite graves'
    },
    extendedInfo: {
      cultures: ['Nordisk bronsålderkultur'],
      settlements: ['Befästa höjder', 'Handelscentra'],
      tools: ['Utvecklad båtbyggnad', 'Handel över Östersjön'],
      metalwork: ['Koppar från Alperna + tenn från Cornwall = brons (10% tenn)'],
      art: ['Tanum, Tanumshede - skepp, solvagnar, människor, djur', 'Aspeberget (Tanum) - "bröllopscenen"'],
      burials: ['Rika kvinno- och mannagravar', 'Bronsföremål', 'Guldspiralringar'],
      trade: ['Bärnsten norrut mot metallföremål söderut'],
      religion: ['Solkult (solvagnar)', 'Skeppskult', 'Fruktbarhetskult'],
      climate: ['Varmperiod', 'Gynnsamt för jordbruk'],
      disasters: ['Hekla-utbrott (1159 f.Kr.) - vulkanaska över Skandinavien', 'Klimatförsämring - kyla, övergivna gårdar']
    },
    extendedInfoEn: {
      cultures: ['Nordic Bronze Age culture'],
      settlements: ['Fortified heights', 'Trading centers'],
      tools: ['Advanced shipbuilding', 'Trade across the Baltic'],
      metalwork: ['Copper from Alps + tin from Cornwall = bronze (10% tin)'],
      art: ['Tanum, Tanumshede - ships, sun chariots, humans, animals', 'Aspeberget (Tanum) - "wedding scene"'],
      burials: ['Rich female and male graves', 'Bronze objects', 'Gold spiral rings'],
      trade: ['Amber northward for metal objects southward'],
      religion: ['Sun cult (sun chariots)', 'Ship cult', 'Fertility cult'],
      climate: ['Warm period', 'Favorable for agriculture'],
      disasters: ['Hekla eruption (1159 BCE) - volcanic ash over Scandinavia', 'Climate deterioration - cold, abandoned farms']
    },
    interestingFinds: {
      title: 'Intressanta Fynd',
      titleEn: 'Interesting Finds',
      categories: [
        {
          name: 'Rika Gravar',
          nameEn: 'Rich Graves',
          items: [
            'Borum Eshøj (Danmark) - träkistor, textiler, bronsföremål bevarade',
            'Egtved-flickan (Danmark) - 16-årig kvinna, ull från Österrike',
            'Skrydstrup-kvinnan (Danmark) - guldspiral i håret, importerad ull'
          ],
          itemsEn: [
            'Borum Eshøj (Denmark) - wooden coffins, textiles, bronze objects preserved',
            'Egtved Girl (Denmark) - 16-year-old woman, wool from Austria',
            'Skrydstrup Woman (Denmark) - gold spiral in hair, imported wool'
          ]
        },
        {
          name: 'Hällristningar',
          nameEn: 'Rock Carvings',
          items: [
            'Tanumshede - 3000+ hällristningar, skepp, krigare, ceremonier',
            'Aspeberget (Tanum) - "bröllopscenen", rituella handlingar',
            'Fossum - krigarsymbolik, vapen, sköldar'
          ],
          itemsEn: [
            'Tanumshede - 3000+ rock carvings, ships, warriors, ceremonies',
            'Aspeberget (Tanum) - "wedding scene", ritual actions',
            'Fossum - warrior symbolism, weapons, shields'
          ]
        }
      ]
    },
    coordinates: {
      northernLimit: 70,
      culturalCenters: [
        { name: 'Tanumshede', lat: 58.7, lng: 11.3, significance: 'Europas rikaste hällristningsområde' },
        { name: 'Nämforsen', lat: 63.2, lng: 18.8, significance: 'Skandinaviens nordligaste stora hällristningsområde' },
        { name: 'Himmelstalund', lat: 58.6, lng: 16.2, significance: '1700+ bilder' }
      ]
    }
  },
  
  // Förromersk järnålder (500 f.Kr.-1 e.Kr.)
  {
    id: 'pre_roman_iron',
    name: 'Förromersk järnålder (500 f.Kr.-1 e.Kr.)',
    nameEn: 'Pre-Roman Iron Age (500 BCE-1 CE)',
    startYear: -500,
    endYear: 1,
    description: 'Germanska folkgrupper: Kimber, teutoner, svear, götar. Lokala stammar etableras. Tidiga offerplatser.',
    descriptionEn: 'Germanic tribes: Cimbri, Teutons, Swedes, Geats. Local tribes established. Early offering places.',
    color: '#708090',
    keyFeatures: ['Germanska folkgrupper', 'Kimber, teutoner', 'Svear, götar', 'Tidiga offerplatser'],
    basicInfo: {
      climate: 'Klimatförsämring, svalare och fuktigare',
      environment: 'Skogstillväxt, mindre jordbruksmark',
      people: 'Germanska stammar etableras',
      lifestyle: 'Stammsamhällen, jordbruk och boskapsskötsel',
      technology: 'Järnets genombrott, järnutvinning lokalt',
      society: 'Stammsamhällen, lokala hövdingar'
    },
    basicInfoEn: {
      climate: 'Climate deterioration, cooler and wetter',
      environment: 'Forest growth, less agricultural land',
      people: 'Germanic tribes established',
      lifestyle: 'Tribal societies, agriculture and animal husbandry',
      technology: 'Iron breakthrough, local iron extraction',
      society: 'Tribal societies, local chieftains'
    },
    extendedInfo: {
      cultures: ['Kimber', 'Teutoner', 'Svear', 'Götar'],
      settlements: ['Befästa anläggningar', 'Samhällscentra'],
      tools: ['Järnframställning i rasugnar', 'Järnverktyg blir vanliga'],
      burials: ['Vapengravfält', 'Första större vapenansamlingar'],
      trade: ['Handelskontakter söderut', 'Järn mot importvaror'],
      migration: ['Kimber och teutoner vandrar söderut (113-101 f.Kr.)'],
      religion: ['Offermossar', 'Vapen och värdeföremål offras i mossar']
    },
    extendedInfoEn: {
      cultures: ['Cimbri', 'Teutons', 'Swedes', 'Geats'],
      settlements: ['Fortified installations', 'Community centers'],
      tools: ['Iron production in shaft furnaces', 'Iron tools become common'],
      burials: ['Weapon burial grounds', 'First larger weapon assemblages'],
      trade: ['Trade contacts southward', 'Iron for imported goods'],
      migration: ['Cimbri and Teutons migrate south (113-101 BCE)'],
      religion: ['Offering bogs', 'Weapons and valuables sacrificed in bogs']
    },
    coordinates: {
      northernLimit: 65,
      culturalCenters: []
    }
  }
];
