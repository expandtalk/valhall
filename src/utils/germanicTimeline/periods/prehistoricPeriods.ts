
import { GermanicTimelinePeriod } from './types';

export const PREHISTORIC_PERIODS: GermanicTimelinePeriod[] = [
  // Paleolitikum (före 10,000 f.Kr.)
  {
    id: 'paleolithic',
    name: 'Paleolitikum (före 10,000 f.Kr.)',
    nameEn: 'Paleolithic (before 10,000 BCE)',
    startYear: -45000,
    endYear: -10000,
    description: 'Inlandsis täckte större delen av Skandinavien. Hamburgkulturen (13,000-11,000 f.Kr.) längst söderut.',
    descriptionEn: 'Ice sheet covered most of Scandinavia. Hamburg culture (13,000-11,000 BCE) in the far south.',
    color: '#8B7355',
    keyFeatures: ['Inlandsis', 'Hamburgkulturen', 'Flintverktyg', 'Renpilsspetsar'],
    basicInfo: {
      climate: 'Istid, inlandsisen smälter',
      environment: 'Tundra och tajga, permafrost',
      people: 'Neandertalare (tidigt), sedan Homo sapiens',
      lifestyle: 'Nomadiska jägar-samlare grupper'
    },
    basicInfoEn: {
      climate: 'Ice age, ice sheet melts',
      environment: 'Tundra and taiga, permafrost',
      people: 'Neanderthals (early), then Homo sapiens',
      lifestyle: 'Nomadic hunter-gatherer groups'
    },
    extendedInfo: {
      cultures: ['Hamburgkultur (sydligaste Skandinavien)', 'Ahrensburgkultur'],
      settlements: ['Säsongsläger', 'Grottor i södra Sverige'],
      tools: ['Stenverktyg', 'Spjutspetsar', 'Skrapor'],
      megafauna: ['Mammutar', 'Ullhårig noshörning', 'Sabeltandade katter', 'Jättebävrar', 'Höhlebjörnar'],
      dna: 'Första mänskliga genetiska spår i Norden',
      contemporary: ['Lascaux-målningar i Frankrike', 'Första amerikanska bosättningar'],
      disasters: ['Laacher See-vulkanutbrott (12,900 år sedan)', 'Younger Dryas - plötslig återkyla']
    },
    extendedInfoEn: {
      cultures: ['Hamburg culture (southernmost Scandinavia)', 'Ahrensburg culture'],
      settlements: ['Seasonal camps', 'Caves in southern Sweden'],
      tools: ['Stone tools', 'Spearpoints', 'Scrapers'],
      megafauna: ['Mammoths', 'Woolly rhinoceros', 'Saber-toothed cats', 'Giant beavers', 'Cave bears'],
      dna: 'First human genetic traces in the North',
      contemporary: ['Lascaux paintings in France', 'First American settlements'],
      disasters: ['Laacher See volcanic eruption (12,900 years ago)', 'Younger Dryas - sudden cooling']
    },
    interestingFinds: {
      title: 'Intressanta Fynd',
      titleEn: 'Interesting Finds',
      categories: [
        {
          name: 'Fynd & Boplatser',
          nameEn: 'Finds & Settlements',
          items: [
            'Segebro (Skåne) - äldsta mänskliga spår i Sverige (9000 f.Kr.)',
            'Hamburgkultur-boplatser - renfångst, säsongsläger',
            'Stenverktyg - skrapor, sticklar, spjutspetsar av flinta'
          ],
          itemsEn: [
            'Segebro (Skåne) - oldest human traces in Sweden (9000 BCE)',
            'Hamburg culture settlements - reindeer hunting, seasonal camps',
            'Stone tools - scrapers, burins, flint spearpoints'
          ]
        }
      ]
    },
    coordinates: {
      northernLimit: 60,
      culturalCenters: []
    }
  },
  
  // Mesolitikum (10,000-4,000 f.Kr.)
  {
    id: 'mesolithic',
    name: 'Mesolitikum (10,000-4,000 f.Kr.)',
    nameEn: 'Mesolithic (10,000-4,000 BCE)',
    startYear: -10000,
    endYear: -4000,
    description: 'Landhöjning och post-glacial rebound. Maglemose, Kongemose och Ertebølle-kulturer. Mesolitiska gravar som Skateholm.',
    descriptionEn: 'Land uplift and post-glacial rebound. Maglemose, Kongemose and Ertebølle cultures. Mesolithic graves like Skateholm.',
    color: '#A0522D',
    keyFeatures: ['Landhöjning', 'Maglemose-kulturen', 'Skateholm-gravar', 'Mikroliter', 'Benkrokar'],
    basicInfo: {
      climate: 'Uppvärmning, inlandsisen smälter',
      environment: 'Skogar etableras, havet stiger',
      people: 'Jägare-samlare, fiske blir viktigt',
      lifestyle: 'Jägare-samlare, fiske blir viktigt',
      technology: 'Mikrolitvapen, fiskeredskap'
    },
    basicInfoEn: {
      climate: 'Warming, ice sheet melts',
      environment: 'Forests establish, sea level rises',
      people: 'Hunter-gatherers, fishing becomes important',
      lifestyle: 'Hunter-gatherers, fishing becomes important',
      technology: 'Microlith weapons, fishing equipment'
    },
    extendedInfo: {
      cultures: ['Maglemosekultur', 'Kongemosekultur', 'Ertebøllekultur'],
      settlements: ['Skateholm (Skåne) - rika gravar med hundbegravningar', 'Ageröd (Skåne) - vinterboplats', 'Tågerup (Skåne) - 9000 års kontinuerlig bosättning'],
      tools: ['Pilspetsar', 'Fiskkrokar', 'Kanoter'],
      burials: ['Komplexa gravskick', 'Röd ockra', 'Personliga tillhörigheter', 'Hundbegravningar som människor'],
      trade: ['Första långdistanshandel (flinta, bärnsten)'],
      dna: 'Västeuropeiska jägare-samlare gener dominerar',
      animals: ['Älg', 'Björn', 'Varg', 'Säl - anpassning till skogslandskap'],
      disasters: ['Storegga-skredet (6100 f.Kr.) - tsunami drabbar Västkusten', 'Östersjöns genombrott - saltvatten in']
    },
    extendedInfoEn: {
      cultures: ['Maglemose culture', 'Kongemose culture', 'Ertebølle culture'],
      settlements: ['Skateholm (Skåne) - rich graves with dog burials', 'Ageröd (Skåne) - winter settlement', 'Tågerup (Skåne) - 9000 years continuous settlement'],
      tools: ['Arrowheads', 'Fishhooks', 'Canoes'],
      burials: ['Complex burial customs', 'Red ochre', 'Personal belongings', 'Dogs buried as humans'],
      trade: ['First long-distance trade (flint, amber)'],
      dna: 'Western European hunter-gatherer genes dominate',
      animals: ['Elk', 'Bear', 'Wolf', 'Seal - adaptation to forest landscape'],
      disasters: ['Storegga slide (6100 BCE) - tsunami hits West Coast', 'Baltic Sea breakthrough - saltwater intrusion']
    },
    coordinates: {
      northernLimit: 62,
      culturalCenters: [
        { name: 'Skateholm', lat: 55.4, lng: 13.2, significance: 'Europas största mesolitiska begravningsplats' },
        { name: 'Vedbæk', lat: 55.9, lng: 12.6, significance: 'Mesolitiska familjegravar' },
        { name: 'Stora Köpinge', lat: 55.5, lng: 14.0, significance: 'Tidigaste kända gravar i Sverige' }
      ]
    }
  },
  
  // Neolitikum (4,000-1,700 f.Kr.)
  {
    id: 'neolithic',
    name: 'Neolitikum (4,000-1,700 f.Kr.)',
    nameEn: 'Neolithic (4,000-1,700 BCE)',
    startYear: -4000,
    endYear: -1700,
    description: 'Trattbägarkultur och Stridsyxekultur. Expansion norrut till 64°N. Första hällristningar vid Tanumshede.',
    descriptionEn: 'Funnel Beaker culture and Battle Axe culture. Expansion north to 64°N. First rock carvings at Tanumshede.',
    color: '#6B8E23',
    keyFeatures: ['Trattbägarkultur', 'Stridsyxekultur', 'Första hällristningar', 'Expansion norrut'],
    basicInfo: {
      climate: 'Varmt klimat, optimala förhållanden för jordbruk',
      environment: 'Skogar etablerade, öppna områden för jordbruk',
      people: 'Jordbrukare och boskapsskötare',
      lifestyle: 'Övergång till jordbruk och boskapsskötsel',
      technology: 'Slipade stenyxor, keramik utvecklas',
      society: 'Första permanenta bosättningar',
      religion: 'Megalitgravar, hällkistor'
    },
    basicInfoEn: {
      climate: 'Warm climate, optimal conditions for agriculture',
      environment: 'Established forests, open areas for farming',
      people: 'Farmers and animal herders',
      lifestyle: 'Transition to agriculture and animal husbandry',
      technology: 'Polished stone axes, pottery develops',
      society: 'First permanent settlements',
      religion: 'Megalithic graves, stone cists'
    },
    extendedInfo: {
      cultures: ['Trattbägarkultur (jordbruk kommer)', 'Stridsyxekultur (indoeuropeisk påverkan)'],
      settlements: ['Megalitgravar (dös)', 'Första permanenta bosättningar'],
      tools: ['Flintdolkar', 'Stridsyxor', 'Keramik'],
      agriculture: ['Vete', 'Korn', 'Domesticerade djur (nöt, svin, får)'],
      burials: ['Megalitgravar (dös)', 'Kollektiva begravningar'],
      art: ['Tidiga petroglyfier vid Tanumshede'],
      dna: 'Anatoliska bönder blandas med lokala jägare-samlare',
      religion: ['Solkult', 'Fruktbarhetskult', 'Förfäderstro'],
      wars: ['Ötzi (Alperna, 3300 f.Kr.) - pilspets i ryggen', 'Territoriella konflikter - befästa höjder']
    },
    extendedInfoEn: {
      cultures: ['Funnel Beaker culture (agriculture arrives)', 'Battle Axe culture (Indo-European influence)'],
      settlements: ['Megalithic graves (dolmen)', 'First permanent settlements'],
      tools: ['Flint daggers', 'Battle axes', 'Pottery'],
      agriculture: ['Wheat', 'Barley', 'Domesticated animals (cattle, pigs, sheep)'],
      burials: ['Megalithic graves (dolmen)', 'Collective burials'],
      art: ['Early petroglyphs at Tanumshede'],
      dna: 'Anatolian farmers mix with local hunter-gatherers',
      religion: ['Sun cult', 'Fertility cult', 'Ancestor worship'],
      wars: ['Ötzi (Alps, 3300 BCE) - arrowhead in back', 'Territorial conflicts - fortified heights']
    },
    coordinates: {
      northernLimit: 64,
      culturalCenters: [
        { name: 'Tanumshede', lat: 58.7, lng: 11.3, significance: 'Första hällristningar' }
      ]
    }
  }
];
