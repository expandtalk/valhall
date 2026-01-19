
import { GermanicTimelinePeriod } from './types';

export const LATER_PERIODS: GermanicTimelinePeriod[] = [
  // Romersk järnålder (1-400 e.Kr.)
  {
    id: 'roman_iron',
    name: 'Romersk järnålder (1-400 e.Kr.)',
    nameEn: 'Roman Iron Age (1-400 CE)',
    startYear: 1,
    endYear: 400,
    description: 'Handel med Rom, importgods. Svear i Mälardalen, Götar i Götaland. Gamla Uppsala blir centrum.',
    descriptionEn: 'Trade with Rome, imported goods. Swedes in Mälardalen, Geats in Götaland. Old Uppsala becomes center.',
    color: '#B22222',
    keyFeatures: ['Handel med Rom', 'Svear i Mälardalen', 'Götar i Götaland', 'Gamla Uppsala centrum'],
    basicInfo: {
      climate: 'Relativt stabilt klimat',
      environment: 'Etablerat kulturlandskap',
      people: 'Svear och Götar som huvudgrupper',
      lifestyle: 'Jordbruk, handel och krigföring',
      technology: 'Avancerat järnhantverk, romerska influenser',
      society: 'Ökad social stratifiering, rika gravar'
    },
    basicInfoEn: {
      climate: 'Relatively stable climate',
      environment: 'Established cultural landscape',
      people: 'Swedes and Geats as main groups',
      lifestyle: 'Agriculture, trade and warfare',
      technology: 'Advanced ironwork, Roman influences',
      society: 'Increased social stratification, rich graves'
    },
    extendedInfo: {
      cultures: ['Svear (Mälardalen)', 'Götar (Götaland)'],
      settlements: ['Gamla Uppsala blir kultcentrum', 'Uppåkra (Skåne)', 'Helgö (Mälaren)'],
      tools: ['Avancerat järnhantverk', 'Romerska verktyg och vapen'],
      burials: ['Rika brandgravar', 'Importvaror', 'Romerska föremål'],
      trade: ['Bärnsten söderut mot romerska lyxvaror', 'Glas, metall, mynt'],
      wars: ['300-talets krig mot Rom', 'Expeditioner söderut'],
      religion: ['Offermossar med krigsbyte', 'Kultplatser etableras']
    },
    extendedInfoEn: {
      cultures: ['Swedes (Mälardalen)', 'Geats (Götaland)'],
      settlements: ['Old Uppsala becomes cult center', 'Uppåkra (Skåne)', 'Helgö (Mälaren)'],
      tools: ['Advanced ironwork', 'Roman tools and weapons'],
      burials: ['Rich cremation graves', 'Imported goods', 'Roman objects'],
      trade: ['Amber southward for Roman luxury goods', 'Glass, metal, coins'],
      wars: ['3rd century wars against Rome', 'Expeditions southward'],
      religion: ['Offering bogs with war booty', 'Cult places established']
    },
    coordinates: {
      northernLimit: 65,
      culturalCenters: [
        { name: 'Gamla Uppsala', lat: 59.9, lng: 17.6, significance: 'Blir centrum för Svear' },
        { name: 'Ismantorp', lat: 56.9, lng: 16.4, significance: 'Skandinaviens största ringborg' },
        { name: 'Eketorp', lat: 56.3, lng: 16.4, significance: 'Ringborg med tre byggnadsfaser' }
      ]
    }
  },
  
  // Folkvandringstid (400-550 e.Kr.)
  {
    id: 'migration_period',
    name: 'Folkvandringstid (400-550 e.Kr.)',
    nameEn: 'Migration Period (400-550 CE)',
    startYear: 400,
    endYear: 550,
    description: 'Tidiga folkvandringar österut och söderut. Helgö och Gamla Uppsala expanderar. Rika gravar med guldgubbar.',
    descriptionEn: 'Early migrations eastward and southward. Helgö and Old Uppsala expand. Rich graves with gold foil figures.',
    color: '#4682B4',
    keyFeatures: ['Folkvandringar österut', 'Helgö expanderar', 'Rika gravar', 'Guldgubbar'],
    basicInfo: {
      climate: 'Klimatförsämring, kyla och missväxt',
      environment: 'Övergivna områden, befolkningsrörelser',
      people: 'Krigsledare och deras följeslagare',
      lifestyle: 'Migration, krig och plundring',
      technology: 'Avancerat smyckeshantverk, guldarbete',
      society: 'Krigarkast, personlig lojalitet'
    },
    basicInfoEn: {
      climate: 'Climate deterioration, cold and crop failures',
      environment: 'Abandoned areas, population movements',
      people: 'War leaders and their retinues',
      lifestyle: 'Migration, warfare and plundering',
      technology: 'Advanced jewelry crafts, goldwork',
      society: 'Warrior class, personal loyalty'
    },
    extendedInfo: {
      cultures: ['Skandinaviska krigargrupper', 'Östgermaniska stammar'],
      settlements: ['Helgö expanderar', 'Gamla Uppsala'],
      tools: ['Avancerade vapen', 'Guldsmycken'],
      burials: ['Prakfulla båtgravar', 'Guldgubbar', 'Vapen och smycken'],
      trade: ['Östersjökontakter', 'Handel med Bysans'],
      migration: ['Goter till Italien', 'Vandaler till Afrika'],
      religion: ['Guldgubbar - kultiska föremål', 'Förändrade begravningsseder']
    },
    extendedInfoEn: {
      cultures: ['Scandinavian warrior groups', 'East Germanic tribes'],
      settlements: ['Helgö expands', 'Old Uppsala'],
      tools: ['Advanced weapons', 'Gold jewelry'],
      burials: ['Magnificent boat graves', 'Gold foil figures', 'Weapons and jewelry'],
      trade: ['Baltic contacts', 'Trade with Byzantium'],
      migration: ['Goths to Italy', 'Vandals to Africa'],
      religion: ['Gold foil figures - cultic objects', 'Changed burial customs']
    },
    coordinates: {
      northernLimit: 65,
      culturalCenters: [
        { name: 'Gamla Uppsala', lat: 59.9, lng: 17.6, significance: 'Expanderar som kultcentrum' },
        { name: 'Helgö', lat: 59.3, lng: 17.4, significance: 'Handels- och kultcentrum' }
      ]
    }
  },
  
  // Vendeltid (550-793 e.Kr.)
  {
    id: 'vendel_period',
    name: 'Vendeltid (550-793 e.Kr.)',
    nameEn: 'Vendel Period (550-793 CE)',
    startYear: 550,
    endYear: 793,
    description: 'Kultcentra: Gamla Uppsala (Odin/Frej-kult), Uppåkra. Tor-kultplatser som Torshälla, Ull-kultplatser som Ullevi.',
    descriptionEn: 'Cult centers: Old Uppsala (Odin/Frey cult), Uppåkra. Thor cult places like Torshälla, Ull cult places like Ullevi.',
    color: '#9932CC',
    keyFeatures: ['Gamla Uppsala Odin/Frej-kult', 'Uppåkra kultcentrum', 'Tor-kultplatser', 'Ull-kultplatser'],
    basicInfo: {
      climate: 'Stabilare klimat, bättre förutsättningar',
      environment: 'Återhämtning efter folkvandringstid',
      people: 'Konsoliderade kungadömen',
      lifestyle: 'Etablerade samhällen, handel och kult',
      technology: 'Utvecklad båtbyggnad, metallhantverk',
      society: 'Kungamakt konsolideras, Uppsala-riket',
      religion: 'Asatron institutionaliseras, templen byggs'
    },
    basicInfoEn: {
      climate: 'More stable climate, better conditions',
      environment: 'Recovery after migration period',
      people: 'Consolidated kingdoms',
      lifestyle: 'Established societies, trade and cult',
      technology: 'Developed shipbuilding, metalwork',
      society: 'Royal power consolidates, Uppsala kingdom',
      religion: 'Norse religion institutionalized, temples built'
    },
    extendedInfo: {
      cultures: ['Uppsala-riket', 'Götiska stammar'],
      settlements: ['Uppsala kultcentrum', 'Birka etableras som handelcentrum'],
      tools: ['Långskepp utvecklas', 'Avancerat metallarbete'],
      religion: ['Odin-, Tor-, Frej-kulter', 'Tempel vid Uppsala'],
      trade: ['Östersjöhandel utvecklas', 'Handelsrutter etableras'],
      burials: ['Vendel-båtgravar', 'Kunglighögar vid Uppsala']
    },
    extendedInfoEn: {
      cultures: ['Uppsala kingdom', 'Gothic tribes'],
      settlements: ['Uppsala cult center', 'Birka established as trading center'],
      tools: ['Longships developed', 'Advanced metalwork'],
      religion: ['Odin, Thor, Frey cults', 'Temple at Uppsala'],
      trade: ['Baltic trade develops', 'Trade routes established'],
      burials: ['Vendel boat graves', 'Royal mounds at Uppsala']
    },
    coordinates: {
      northernLimit: 65,
      culturalCenters: [
        { name: 'Gamla Uppsala', lat: 59.9, lng: 17.6, significance: 'Odin/Frej-kult' },
        { name: 'Uppåkra', lat: 55.7, lng: 13.1, significance: 'Kultcentrum' },
        { name: 'Torshälla', lat: 59.4, lng: 16.5, significance: 'Tor/Thor-kultplats' },
        { name: 'Ullevi', lat: 58.3, lng: 15.1, significance: 'Ull-kultplats' }
      ]
    }
  },
  
  // Vikingatid (793-1066 e.Kr.)
  {
    id: 'viking_age',
    name: 'Vikingatid (793-1066 e.Kr.)',
    nameEn: 'Viking Age (793-1066 CE)',
    startYear: 793,
    endYear: 1066,
    description: 'Runstenar i Uppland/Södermanland. Valdemars rutt österut. Viking Rivers till Konstantinopel. Kultplatser: Odensvi, Lund, Sigtuna.',
    descriptionEn: 'Rune stones in Uppland/Södermanland. Valdemar\'s route eastward. Viking Rivers to Constantinople. Cult places: Odensvi, Lund, Sigtuna.',
    color: '#8B0000',
    keyFeatures: ['Runstenar Uppland/Södermanland', 'Valdemars rutt', 'Viking Rivers', 'Handel Konstantinopel'],
    basicInfo: {
      climate: 'Relativt gynnsamt klimat för expansion',
      environment: 'Etablerat kulturlandskap',
      people: 'Vikingar - krigare, köpmän, bönder',
      lifestyle: 'Expansion, handel och kolonisation',
      technology: 'Runstenarnas guldålder - 2500+ stenar i Sverige',
      society: 'Vikingatåg till hela Europa och Nordamerika',
      religion: 'Övergång från asatro till kristendom'
    },
    basicInfoEn: {
      climate: 'Relatively favorable climate for expansion',
      environment: 'Established cultural landscape',
      people: 'Vikings - warriors, merchants, farmers',
      lifestyle: 'Expansion, trade and colonization',
      technology: 'Golden age of rune stones - 2500+ stones in Sweden',
      society: 'Viking expeditions to all of Europe and North America',
      religion: 'Transition from Norse religion to Christianity'
    },
    extendedInfo: {
      cultures: ['Svenska vikingar', 'Danska vikingar', 'Norska vikingar'],
      settlements: ['Birka', 'Sigtuna', 'Lund - handelscentra'],
      tools: ['Långskepp', 'Navigationsverktyg', 'Vapen och verktyg'],
      runestones: ['Uppland (1200+)', 'Södermanland (500+)', 'Minnesstenar över döda'],
      expeditions: ['Ingvarståget (1040-tal)', '30+ minnesstenar'],
      trade: ['Silver från arabländer', 'Pärlor från Indien', 'Silke från Kina'],
      religion: ['Kristendom kommer gradvis', 'Blandade traditioner'],
      kingdoms: ['Erik Segersäll', 'Olof Skötkonung', 'Anund Jakob'],
      dna: 'Skandinavisk spridning över Europa, genetisk påverkan',
      disasters: ['Stamford Bridge (1066)', 'Harald Hårdrådes död']
    },
    extendedInfoEn: {
      cultures: ['Swedish Vikings', 'Danish Vikings', 'Norwegian Vikings'],
      settlements: ['Birka', 'Sigtuna', 'Lund - trading centers'],
      tools: ['Longships', 'Navigation tools', 'Weapons and tools'],
      runestones: ['Uppland (1200+)', 'Södermanland (500+)', 'Memorial stones for the dead'],
      expeditions: ['Ingvar expedition (1040s)', '30+ memorial stones'],
      trade: ['Silver from Arab lands', 'Pearls from India', 'Silk from China'],
      religion: ['Christianity arrives gradually', 'Mixed traditions'],
      kingdoms: ['Erik the Victorious', 'Olof Skötkonung', 'Anund Jakob'],
      dna: 'Scandinavian spread across Europe, genetic impact',
      disasters: ['Stamford Bridge (1066)', 'Harald Hardrada\'s death']
    },
    interestingFinds: {
      title: 'Intressanta Fynd',
      titleEn: 'Interesting Finds',
      categories: [
        {
          name: 'Runstenar',
          nameEn: 'Runestones',
          items: [
            'Rök-stenen - 760 runor, krypterade meddelanden',
            'Ingvarsstenarna - 30+ stenar över Ingvarståget (1040-tal)',
            'Järlabanki-stenarna - rik man som rest många stenar'
          ],
          itemsEn: [
            'Rök stone - 760 runes, encrypted messages',
            'Ingvar stones - 30+ stones for Ingvar expedition (1040s)',
            'Järlabanki stones - rich man who erected many stones'
          ]
        },
        {
          name: 'Handelscentra',
          nameEn: 'Trading Centers',
          items: [
            'Birka - Svarta jorden full av fynd, pärlor från Indien',
            'Sigtuna - Adam av Bremen beskriver rikedomen',
            'Paviken (Gotland) - silverfynd, orientaliska mynt'
          ],
          itemsEn: [
            'Birka - Black earth full of finds, pearls from India',
            'Sigtuna - Adam of Bremen describes the wealth',
            'Paviken (Gotland) - silver finds, oriental coins'
          ]
        }
      ]
    },
    coordinates: {
      northernLimit: 70,
      culturalCenters: [
        { name: 'Odensvi', lat: 59.2, lng: 17.0, significance: 'Odin-kultplats' },
        { name: 'Lund', lat: 55.7, lng: 13.2, significance: 'Sent kultcentrum' },
        { name: 'Sigtuna', lat: 59.6, lng: 17.7, significance: 'Grundad ~980' },
        { name: 'Birka', lat: 59.3, lng: 17.5, significance: 'Handelsstad 750-950' },
        { name: 'Staraja Ladoga', lat: 60.0, lng: 32.3, significance: 'Första svenska handelsstation i Ryssland' }
      ]
    }
  }
];
