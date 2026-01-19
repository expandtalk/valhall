// Swedish cities and locations
export const locationCoords: { [key: string]: { lat: number; lng: number } } = {
  // Swedish cities and locations
  'kalmar': { lat: 56.6634, lng: 16.3567 },
  'stockholm': { lat: 59.3293, lng: 18.0686 },
  'göteborg': { lat: 57.7089, lng: 11.9746 },
  'malmö': { lat: 55.6050, lng: 13.0038 },
  'uppsala': { lat: 59.8586, lng: 17.6389 },
  'linköping': { lat: 58.4108, lng: 15.6214 },
  'västerås': { lat: 59.6162, lng: 16.5528 },
  'örebro': { lat: 59.2753, lng: 15.2134 },
  'norrköping': { lat: 58.5877, lng: 16.1924 },
  'helsingborg': { lat: 56.0465, lng: 12.6945 },
  'jönköping': { lat: 57.7826, lng: 14.1618 },
  'lund': { lat: 55.7047, lng: 13.1910 },
  'umeå': { lat: 63.8258, lng: 20.2630 },
  'gävle': { lat: 60.6749, lng: 17.1413 },
  'borås': { lat: 57.7210, lng: 12.9401 },
  'eskilstuna': { lat: 59.3667, lng: 16.5077 },
  'karlstad': { lat: 59.3793, lng: 13.5036 },
  'växjö': { lat: 56.8777, lng: 14.8091 },
  'halmstad': { lat: 56.6745, lng: 12.8578 },
  'sundsvall': { lat: 62.3908, lng: 17.3069 },

  // Dalarna locations
  'Älvdalen': { lat: 61.2167, lng: 14.1167 },
  'Transtrand': { lat: 60.6000, lng: 13.4667 },
  'Malung': { lat: 60.6833, lng: 13.7167 },
  'Enviken': { lat: 60.7167, lng: 15.8167 },
  'Floda': { lat: 60.6167, lng: 16.2833 },
  'Hedemora': { lat: 60.2833, lng: 15.9833 },
  'Våmhus': { lat: 60.8667, lng: 14.8333 },
  'Orsa': { lat: 61.1167, lng: 14.6167 },

  // Blekinge locations
  'Mjällby': { lat: 56.2833, lng: 14.8167 },
  'Listerby': { lat: 56.1167, lng: 15.1833 },
  'Sturkö': { lat: 56.1167, lng: 15.1167 },
  'Karlskrona': { lat: 56.1606, lng: 15.5866 },
  'Ronneby': { lat: 56.2069, lng: 15.2756 },
  'Sölvesborg': { lat: 56.0506, lng: 14.5797 },
  'Karlshamn': { lat: 56.1706, lng: 14.8619 },

  // ✅ FIXED: Separated coordinates for overlapping locations with proper spacing
  'Ullevi': { lat: 58.3850, lng: 13.1580 }, // Ullevi, Västergötland
  'Mjärdevi': { lat: 58.4180, lng: 15.6350 }, // Mjärdevi, Östergötland (moved further east)
  
  // ✅ FIXED: Lund and Uppåkra separated properly
  'Lund': { lat: 55.7047, lng: 13.1910 }, // Lund stad
  'Uppåkra': { lat: 55.6667, lng: 13.1694 }, // Uppåkra - 5 km söder om Lund
  
  // ✅ FIXED: Sigtuna and Trefaldighetskällan separated
  'Sigtuna': { lat: 59.6197, lng: 17.7239 }, // Sigtuna stad
  'Trefaldighetskällan': { lat: 59.6100, lng: 17.7150 }, // Trefaldighetskällan - lite sydväst

  // Province codes and famous locations
  'U': { lat: 59.8586, lng: 17.6389 }, // Uppland - Uppsala
  'Sö': { lat: 59.2753, lng: 15.2134 }, // Södermanland - Örebro  
  'Ög': { lat: 58.4108, lng: 15.6214 }, // Östergötland - Linköping
  'Sm': { lat: 56.8777, lng: 14.8091 }, // Småland - Växjö
  'Hs': { lat: 56.6745, lng: 12.8578 }, // Halland - Halmstad
  'Sk': { lat: 55.6050, lng: 13.0038 }, // Skåne - Malmö
  'Bl': { lat: 56.1606, lng: 15.5866 }, // Blekinge - Karlskrona
  'Dl': { lat: 60.6833, lng: 13.7167 }, // Dalarna - Malung
  'Vg': { lat: 57.7089, lng: 11.9746 }, // Västergötland - Göteborg
  'Vs': { lat: 59.6162, lng: 16.5528 }, // Västmanland - Västerås
  'Vr': { lat: 59.3793, lng: 13.5036 }, // Värmland - Karlstad
  'N': { lat: 63.4305, lng: 10.3951 }, // Norway - Trondheim
  'DR': { lat: 55.7558, lng: 9.1221 }, // Denmark - Jelling
  
  // Famous runestones - exact coordinates
  'Rök': { lat: 58.2953, lng: 14.8372 },
  'Jelling': { lat: 55.7558, lng: 9.1221 },
  'Kragehul': { lat: 54.9167, lng: 11.9833 },
  'Gripsholm': { lat: 59.3969, lng: 17.1167 },
  'Sö 333': { lat: 59.0167, lng: 16.9500 }
};

// ✅ NEW: Eastern trade routes with unique IDs and the new rivers added
export const ALL_EASTERN_ROUTES = [
  // 1. Daugava route (Riga to Dnieper)
  {
    id: 'daugava-route',
    name: 'Daugava-rutten',
    nameEn: 'Daugava Route',
    color: '#1e40af',
    width: 4,
    importance: 'primary',
    type: 'river_route',
    period: '800-1100 CE',
    description: 'Huvudled från Östersjön via Riga till Dnjepr och Svarta havet',
    historicalSignificance: 'En av vikingatidens viktigaste östliga handelsrutter till Konstantinopel',
    coordinates: [
      { lat: 56.9496, lng: 24.1052, name: 'Riga', isTradingPost: true, description: 'Viktig östersjöhamn och handelscentrum' },
      { lat: 56.5, lng: 25.5, name: 'Daugava uppströms' },
      { lat: 55.8, lng: 26.5, name: 'Daugava-Dnjepr portage', isPortage: true, description: 'Viktig bärställe mellan floderna' },
      { lat: 50.4501, lng: 30.5234, name: 'Kiev', isTradingPost: true, description: 'Huvudstad i Kievriket' }
    ]
  },

  // 2. Volchov route (Novgorod/Staraja Ladoga)
  {
    id: 'volchov-route',
    name: 'Volchov-rutten',
    nameEn: 'Volchov Route', 
    color: '#7c3aed',
    width: 4,
    importance: 'primary',
    type: 'river_route',
    period: '750-1100 CE',
    description: 'Färdväg via Finska viken, Neva och Ladoga till Novgorod',
    historicalSignificance: 'Viktig koppling mellan Östersjön och ryska inlandet',
    coordinates: [
      { lat: 59.9311, lng: 30.3609, name: 'St. Petersburg/Neva', isTradingPost: true },
      { lat: 60.1, lng: 32.3, name: 'Ladoga' },
      { lat: 60.1272, lng: 32.2963, name: 'Staraja Ladoga', isTradingPost: true, description: 'Äldsta ryska staden, viktig handelsplats' },
      { lat: 58.5219, lng: 31.2756, name: 'Novgorod', isTradingPost: true, description: 'Stor handelsrepublik' }
    ]
  },

  // 3. Göta älv route (Kungälv/Lödöse)
  {
    id: 'gota-alv-route',
    name: 'Göta älv-rutten',
    nameEn: 'Göta River Route',
    color: '#059669',
    width: 3,
    importance: 'secondary',
    type: 'river_route', 
    period: '900-1200 CE',
    description: 'Västlig handelsled via Göta älv från Kattegatt',
    historicalSignificance: 'Viktig västlig hamn och förbindelse till kontinenten',
    coordinates: [
      { lat: 57.8708, lng: 11.9886, name: 'Kungälv', isTradingPost: true, description: 'Kungahälla - äldsta staden vid Göta älv' },
      { lat: 58.0, lng: 12.3, name: 'Lödöse', isTradingPost: true, description: 'Viktig medeltida handelsstad' },
      { lat: 58.2, lng: 12.6, name: 'Lilla Edet', isPortage: true, description: 'Forsar som begränsade sjöfarten' }
    ]
  },

  // 4. Akerselva route (Oslo)
  {
    id: 'akerselva-route',
    name: 'Akerselva-rutten',
    nameEn: 'Akerselva Route',
    color: '#dc2626',
    width: 2,
    importance: 'tertiary',
    type: 'river_route',
    period: '1000-1200 CE', 
    description: 'Lokalflod genom Oslo, etablerad som handelsplats 1048',
    historicalSignificance: 'Harald Hardradas handelsplats, blev Oslo',
    coordinates: [
      { lat: 59.9127, lng: 10.7461, name: 'Oslo (Ánslo)', isTradingPost: true, description: 'Grundad 1040, handelsplats från 1048' },
      { lat: 59.95, lng: 10.72, name: 'Maridalsvannet', description: 'Akerselvas källa' }
    ]
  },

  // 5. Klarälven route 
  {
    id: 'klaralven-route',
    name: 'Klarälven-rutten',
    nameEn: 'Klarälven Route',
    color: '#2563eb',
    width: 3,
    importance: 'secondary',
    type: 'river_route',
    period: '700-1200 CE',
    description: 'Transportled mellan Norge och Sverige via Värmland',
    historicalSignificance: 'Pulsåder genom Värmland, naturlig kommunikationsled',
    coordinates: [
      { lat: 62.05, lng: 12.58, name: 'Klarälvens källa', description: 'Härjedalen' },
      { lat: 61.5, lng: 12.8, name: 'Trysilelva (Norge)', description: 'Norska delen av Klarälven' },
      { lat: 60.5, lng: 13.2, name: 'Värmland', description: 'Genom Värmland' },
      { lat: 59.3793, lng: 13.5036, name: 'Karlstad', isTradingPost: true, description: 'Mynning i Vänern' }
    ]
  },

  // 6. Torneälven route
  {
    id: 'tornealven-route',
    name: 'Torneälven-rutten', 
    nameEn: 'Torne River Route',
    color: '#7c2d12',
    width: 2,
    importance: 'tertiary',
    type: 'river_route',
    period: '800-1200 CE',
    description: 'Gränsflod mellan Sverige och Finland, nordlig handelsled',
    historicalSignificance: 'Viktig för handel och transport i norr',
    coordinates: [
      { lat: 68.4, lng: 20.2, name: 'Torneälvens källa' },
      { lat: 65.8458, lng: 24.1481, name: 'Torneälvens mynning', isTradingPost: true }
    ]
  },

  // 7. Piteälven route  
  {
    id: 'pitealven-route',
    name: 'Piteälven-rutten',
    nameEn: 'Pite River Route',
    color: '#92400e', 
    width: 2,
    importance: 'tertiary',
    type: 'river_route',
    period: '800-1200 CE',
    description: 'Norrländsk flod, handelsled i norr',
    historicalSignificance: 'Del av norrländska handelsnätverket',
    coordinates: [
      { lat: 66.0, lng: 19.5, name: 'Piteälvens källa' },
      { lat: 65.3125, lng: 21.4852, name: 'Piteå', isTradingPost: true }
    ]
  },

  // 8. Trave route (Lübeck)
  {
    id: 'trave-route',
    name: 'Trave-rutten',
    nameEn: 'Trave Route', 
    color: '#1f2937',
    width: 3,
    importance: 'secondary',
    type: 'river_route',
    period: '800-1200 CE',
    description: 'Tyskt handelscentrum vid Östersjön',
    historicalSignificance: 'Lübeck utvecklades från slavisk bosättning Liubice (819)',
    coordinates: [
      { lat: 53.8647, lng: 10.6865, name: 'Lübeck', isTradingPost: true, description: 'Utvecklades från Liubice (819-1138)' },
      { lat: 53.9, lng: 10.7, name: 'Liubice (gammal)', isTradingPost: true, description: 'Slavisk bosättning 819-1138' }
    ]
  }
];

// Legacy export for compatibility
export const EASTERN_TRADE_ROUTES = ALL_EASTERN_ROUTES;
