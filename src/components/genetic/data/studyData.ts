
import { GeneticStudyData } from '../types';

// Enhanced study data based on "The genetic history of Scandinavia from the Roman Iron Age to the present"
export const studyData: GeneticStudyData = {
  markers: [
    // Y-chromosomal markers (paternal lineages)
    {
      id: 'ydna-r1b',
      type: 'Y-DNA',
      haplogroup: 'R1b1a1b1a1a2c',
      frequency: 15,
      origin: 'British-Irish Isles',
      description: 'British-Irish karakteristisk Y-kromosom haplogrupp',
      modernDistribution: 'Hög frekvens i Storbritannien och Irland',
      significance: 'Indikerar genflöde från Brittiska öarna under vikingatiden',
      studyEvidence: 'Funnen hos vikingatida individer (VK31, VK405) och medeltida (wes008)',
      geographicSpread: 'Hela Skandinavien från vikingatiden',
      timeIntroduction: 'Viking Age (750-950 CE)'
    },
    {
      id: 'ydna-i1',
      type: 'Y-DNA',
      haplogroup: 'I1',
      frequency: 45,
      origin: 'Skandinavien',
      description: 'Dominant skandinavisk Y-kromosom haplogrupp',
      modernDistribution: 'Mycket hög frekvens i Sverige och Norge',
      significance: 'Den "nordiska" haploggruppen - ursprunglig skandinavisk befolkning',
      studyEvidence: 'Kontinuerlig närvaro från förvikingatid till nutid',
      geographicSpread: 'Hela Skandinavien',
      timeIntroduction: 'Pre-Viking (före 750 CE)'
    },
    {
      id: 'ydna-n1a1',
      type: 'Y-DNA',
      haplogroup: 'N1a1',
      frequency: 25,
      origin: 'Uralisk population',
      description: 'Uralisk-associerad Y-kromosom haplogrupp',
      modernDistribution: 'Nord-syd gradient i Skandinavien',
      significance: 'Associerad med den nord-sydliga genetiska gradienten',
      studyEvidence: 'Sex förvikingatida bärare (200-520 CE) från östra Sverige',
      geographicSpread: 'Främst norra Sverige och Norge',
      timeIntroduction: 'Pre-Viking (200-520 CE)'
    },
    // Mitochondrial DNA markers (maternal lineages)
    {
      id: 'mtdna-h1',
      type: 'mtDNA',
      haplogroup: 'H1',
      frequency: 35,
      origin: 'Europeisk',
      description: 'Vanligaste mitokondrielle haploggruppen i Europa',
      modernDistribution: 'Hög frekvens över hela Europa',
      significance: 'Spårar kvinnliga migrationsmönster under vikingatiden',
      studyEvidence: 'Kontinuerlig närvaro genom alla tidsperioder',
      geographicSpread: 'Hela Skandinavien',
      timeIntroduction: 'Pre-Viking'
    },
    {
      id: 'mtdna-u5b1b1a',
      type: 'mtDNA',
      haplogroup: 'U5b1b1a',
      frequency: 8,
      origin: 'Samisk/Uralisk',
      description: 'Samisk-karakteristisk mitokondriell haplogrupp',
      modernDistribution: 'Norra Skandinavien och samiska områden',
      significance: 'Markör för uralisk ancestry och samisk befolkning',
      studyEvidence: 'Funnen hos vikingatida individ VK518 från norra Norge',
      geographicSpread: 'Norra Norge och Sverige',
      timeIntroduction: 'Viking Age i dokumenterade prover'
    }
  ],
  periods: [
    {
      id: 'pre-viking',
      name: 'Förvikingatid',
      name_en: 'Pre-Viking',
      timeRange: '1-749 CE',
      description: 'Romersk järnålder och folkvandringstid',
      geneticCharacteristics: 'Låg nivå av icke-lokal ancestry, etablerad skandinavisk baseline'
    },
    {
      id: 'viking',
      name: 'Vikingatid',
      name_en: 'Viking Age',
      timeRange: '750-949 CE',
      description: 'Tidig vikingatid med intensifierade kontakter',
      geneticCharacteristics: 'Markant genflöde från British-Irish och Eastern Baltic'
    },
    {
      id: 'late-viking',
      name: 'Senvikingatid',
      name_en: 'Late Viking',
      timeRange: '950-1099 CE',
      description: 'Sen vikingatid och kristianisering',
      geneticCharacteristics: 'Fortsatt genflöde från öster och väster'
    },
    {
      id: 'medieval',
      name: 'Medeltid',
      name_en: 'Medieval',
      timeRange: '1100-1349 CE',
      description: 'Kristen medeltid',
      geneticCharacteristics: 'Stabilisering av genetisk sammansättning'
    },
    {
      id: 'post-medieval',
      name: 'Senmedeltid',
      name_en: 'Post-Medieval',
      timeRange: '1350-1850 CE',
      description: 'Sen medeltid till modern tid',
      geneticCharacteristics: 'Minskning av vissa externa ancestry komponenter'
    }
  ],
  sites: [
    {
      id: 'alsike',
      name: 'Alsike',
      location: 'Tuna in Alsike parish',
      parish: 'Alsike',
      county: 'Uppland',
      country: 'Sweden',
      coordinates: { lat: 59.9167, lng: 17.7167 },
      period: 'Viking',
      dating: '540-1050 CE',
      description: 'Kända för sina båtgravar och kammargravar under plan mark. Platsen användes för begravningar under hela vikingatiden med en lucka på c. 200 år.',
      burialType: 'Båtgravar och kammargravar',
      individuals: [
        {
          id: 'als001',
          siteId: 'alsike',
          sampleId: 'als001',
          geneticSex: 'XY',
          archaeologicalSex: 'male',
          graveNumber: 'XIV',
          age: 'adult',
          graveGoods: ['sword', 'silver belt fittings', 'garnet cloisonné buckle'],
          radiocarbon: '540/550–610/620 CE',
          burialContext: 'Weapon burial with unique garnet cloisonné belt buckle',
          museumsInventory: 'SHM 10035, 10289, 20061'
        },
        {
          id: 'als007',
          siteId: 'alsike',
          sampleId: 'als007',
          geneticSex: 'XY',
          graveNumber: 'XII',
          age: 'adult',
          graveGoods: ['weapons', 'horses', 'dogs', 'birds'],
          radiocarbon: '950–1000 CE',
          burialContext: 'Double burial with weapons and animals',
          museumsInventory: 'SHM 10035, 10289, 20061'
        }
      ]
    },
    {
      id: 'kronan',
      name: 'Kronan',
      location: 'Off the coast of Öland, near Hulterstad',
      parish: 'Hulterstad',
      county: 'Kalmar',
      country: 'Sweden',
      coordinates: { lat: 56.7167, lng: 16.8833 },
      period: 'Post-Medieval',
      dating: '1676 CE',
      description: 'Det kungliga örlogsfartyget Kronan sjönk 1676. Besättningen på 850 man representerar ett tvärsnitt av dåtidens manliga befolkning.',
      burialType: 'Skeppsvrak',
      individuals: [
        {
          id: 'kro006',
          siteId: 'kronan',
          sampleId: 'kro006',
          geneticSex: 'XY',
          age: '12-60 years',
          ancestry: { uralic: 15 },
          burialContext: 'Crew member with Uralic ancestry, possibly from northern Sweden',
          museumsInventory: 'Kalmar County Museum, Kronan 26C K18'
        },
        {
          id: 'kro009',
          siteId: 'kronan',
          sampleId: 'kro009',
          geneticSex: 'XY',
          yHaplogroup: 'N1a1',
          ancestry: { uralic: 20 },
          burialContext: 'Crew member carrying Uralic Y-haplogroup N1a1',
          museumsInventory: 'Kalmar County Museum, Kronan 31C K1'
        }
      ]
    },
    {
      id: 'sala',
      name: 'Sala',
      location: 'By the river Sagån at Sala',
      parish: 'Sala',
      county: 'Västmanland',
      country: 'Sweden',
      coordinates: { lat: 59.9167, lng: 16.6167 },
      period: 'Viking',
      dating: '800-1000 CE',
      description: 'Vikingatida båtgravar vid Salas gamla silversmältverk på Brytilsholmen i Sagån.',
      burialType: 'Båtgravar',
      individuals: [
        {
          id: 'sal002',
          siteId: 'sala',
          sampleId: 'sal002',
          geneticSex: 'XX',
          archaeologicalSex: 'female',
          graveNumber: '2',
          age: 'adult',
          graveGoods: ['oval brooches', 'equal-armed brooch', 'wooden box'],
          radiocarbon: '950–1000 CE',
          ancestry: { british_irish: 100 },
          isotopes: { strontium: 'local' },
          burialContext: 'Female with full British-Irish ancestry but local strontium signature',
          museumsInventory: 'SHM11357'
        }
      ]
    },
    {
      id: 'sandby-borg',
      name: 'Sandby borg',
      location: 'Öland',
      parish: 'Sandby',
      county: 'Kalmar',
      country: 'Sweden',
      coordinates: { lat: 56.8833, lng: 16.7000 },
      period: 'Pre-Viking',
      dating: 'Late 5th century (400-550 CE)',
      description: 'Ringfort från folkvandringstiden där en stor del av befolkningen dödades i en organiserad attack.',
      burialType: 'Massacre victims in situ',
      individuals: [
        {
          id: 'snb018',
          siteId: 'sandby-borg',
          sampleId: 'snb018',
          geneticSex: 'XX',
          age: 'young adult',
          burialContext: 'Only identified female among massacre victims',
          museumsInventory: 'Kalmar County Museum'
        },
        {
          id: 'snb017',
          siteId: 'sandby-borg',
          sampleId: 'snb017',
          geneticSex: 'XY',
          age: '6–8 years',
          burialContext: 'Child victim found in house 4',
          museumsInventory: 'Kalmar County Museum'
        }
      ]
    }
  ],
  individuals: [] // This will be populated from the sites data
};

// Flatten individuals from sites for easier access
studyData.individuals = studyData.sites.flatMap(site => site.individuals);
