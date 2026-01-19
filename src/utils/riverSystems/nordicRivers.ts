export interface RiverRoute {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  coordinates: Array<{
    lat: number;
    lng: number;
    name?: string;
    nameEn?: string;
    description?: string;
    isTradingPost?: boolean;
    isPortage?: boolean;
  }>;
  period: string;
  significance: string;
  historicalSignificance: string;
  color: string;
  width: number;
  type?: string;
  importance?: string;
  connectedSystems?: string[];
}

export const NORDIC_RIVERS: RiverRoute[] = [
  // === SVENSKA FLODER ===
  {
    id: 'ljungbyan',
    name: 'Ljungbyån',
    nameEn: 'Ljungby River',
    description: 'Ljungbyån börjar i Hossmo strax söder om Kalmar och flödar genom småländska skogarna. 6,2 mil lång å med viktig historisk betydelse.',
    coordinates: [
      { lat: 56.63, lng: 16.32, name: 'Hossmo (källområde)' },
      { lat: 56.64, lng: 16.28, name: 'Krankelösa' },
      { lat: 56.66, lng: 16.24, name: 'Öbbestorp' },
      { lat: 56.68, lng: 16.20, name: 'Harby' },
      { lat: 56.70, lng: 16.16, name: 'Källstorp' },
      { lat: 56.71, lng: 16.35, name: 'Kalmarsund' }
    ],
    period: 'Viking Age',
    significance: 'Transportväg för handel från Smålands inre delar till Kalmar och kusten.',
    historicalSignificance: 'Viktig vattenled för transport till och från Kalmar.',
    color: '#0369a1',
    width: 4,
    importance: 'secondary'
  },
  {
    id: 'helgea',
    name: 'Helgeå',
    nameEn: 'Helge River',
    description: 'Helgeå rinner genom Skåne och Blekinge och mynnar i Hanöbukten. En av Sydsveriges viktigaste floder.',
    coordinates: [
      { lat: 56.20, lng: 13.90, name: 'Helgeå källa' },
      { lat: 56.15, lng: 14.25, name: 'Kristianstad', isTradingPost: true },
      { lat: 56.10, lng: 14.55, name: 'Hanöbukten' }
    ],
    period: 'Viking Age',
    significance: 'Viktig transportled genom Skåne och Blekinge till Östersjön.',
    historicalSignificance: 'Möjliggjorde handel mellan inlandet och kusten i sydöstra Sverige.',
    color: '#0369a1',
    width: 5,
    importance: 'primary'
  },
  {
    id: 'morrumssan',
    name: 'Mörrumsån',
    nameEn: 'Mörrums River',
    description: 'Mörrumsån rinner genom Blekinge och mynnar vid Karlshamn. Känd för sitt laxfiske redan under vikingatiden.',
    coordinates: [
      { lat: 56.30, lng: 14.50, name: 'Mörrumsån övre lopp' },
      { lat: 56.18, lng: 14.87, name: 'Karlshamn', isTradingPost: true }
    ],
    period: 'Viking Age',
    significance: 'Viktigt för laxfiske och handel i Blekinge.',
    historicalSignificance: 'Laxen från Mörrumsån var en viktig handelsvara under vikingatiden.',
    color: '#0369a1',
    width: 4,
    importance: 'secondary'
  },
  {
    id: 'dalalven',
    name: 'Dalälven',
    nameEn: 'Dal River',
    description: 'Dalälven är en av Sveriges längsta floder och rinner från Dalarna till Östersjön vid Gävle. Viktig transportled för järn och andra varor.',
    coordinates: [
      { lat: 60.60, lng: 12.50, name: 'Dalälvens källområde' },
      { lat: 60.67, lng: 17.14, name: 'Gävle', isTradingPost: true },
      { lat: 60.72, lng: 17.20, name: 'Gävlebukten' }
    ],
    period: 'Viking Age',
    significance: 'Huvudväg för transport av järn och andra varor från Dalarna till kusten.',
    historicalSignificance: 'Möjliggjorde export av svenskt järn under vikingatiden.',
    color: '#0369a1',
    width: 6,
    importance: 'primary'
  },
  {
    id: 'eman',
    name: 'Emån',
    nameEn: 'Em River',
    description: 'Emån kommer från Storesjön (286 m.ö.h.) på småländska höglandet och rinner 4 472 km² avrinningsområde genom åtta kommuner till Östersjön vid Em.',
    coordinates: [
      { lat: 57.3000, lng: 14.2000, name: 'Storesjön (källområde)', isTradingPost: true },
      { lat: 57.2500, lng: 14.3500, name: 'Lillesjön' },
      { lat: 57.1500, lng: 14.6000, name: 'Eksjö', isTradingPost: true },
      { lat: 57.0000, lng: 14.9000, name: 'Vetlanda', isTradingPost: true },
      { lat: 56.9000, lng: 15.2000, name: 'Hultsfred' },
      { lat: 56.8000, lng: 15.5000, name: 'Högsby' },
      { lat: 56.7000, lng: 15.8000, name: 'Mönsterås', isTradingPost: true },
      { lat: 56.6500, lng: 16.1000, name: 'Oskarshamn', isTradingPost: true },
      { lat: 56.6200, lng: 16.4500, name: 'Em (mynning i Kalmarsund)' }
    ],
    period: 'Viking Age',
    significance: 'En av Sveriges viktigaste handelsvägar från höglandet till kusten.',
    historicalSignificance: 'Möjliggjorde handel mellan Smålands inre delar och Östersjön, viktig för järn- och glashandel.',
    color: '#0369a1',
    width: 5,
    importance: 'primary'
  },
  {
    id: 'ronnebyran',
    name: 'Ronnebyån',
    nameEn: 'Ronneby River',
    description: 'Ronnebyån är cirka 85 km lång, börjar i sjön Rottnen (149 m.ö.h.) och rinner söderut genom Blekinge till Östersjön.',
    coordinates: [
      { lat: 56.85, lng: 14.85, name: 'Rottnen (källa)', isTradingPost: true },
      { lat: 56.75, lng: 14.90, name: 'Knäsjön' },
      { lat: 56.65, lng: 14.95, name: 'Veden' },
      { lat: 56.55, lng: 15.00, name: 'Hammaren' },
      { lat: 56.45, lng: 15.05, name: 'Viren' },
      { lat: 56.35, lng: 15.10, name: 'Bastsjön' },
      { lat: 56.25, lng: 15.15, name: 'Hobergssjön' },
      { lat: 56.22, lng: 15.25, name: 'Kallinge', isTradingPost: true },
      { lat: 56.21, lng: 15.27, name: 'Ronneby', isTradingPost: true },
      { lat: 56.20, lng: 15.28, name: 'Ronneby brunn' },
      { lat: 56.18, lng: 15.30, name: 'Ronnebyhamn' },
      { lat: 56.16, lng: 15.32, name: 'Ronnebyfjärden (mynning)' }
    ],
    period: 'Viking Age',
    significance: 'Viktig å i Blekinge för transport av varor från inlandet till kusten.',
    historicalSignificance: 'Centrala transportled för Blekinges handel med omvärlden.',
    color: '#0369a1',
    width: 4,
    importance: 'secondary'
  },

  // === TIDIGARE DEFINIERADE FLODER ===
  {
    id: 'daugava',
    name: 'Daugava',
    nameEn: 'Daugava River',
    description: 'The Daugava is a large river rising in the Valdai Hills, flowing through Russia, Belarus, and Latvia into the Gulf of Riga.',
    coordinates: [
      { lat: 55.65, lng: 32.43, name: 'Source in Valdai Hills' },
      { lat: 56.95, lng: 24.10, name: 'Riga' },
      { lat: 57.03, lng: 24.20, name: 'Gulf of Riga' }
    ],
    period: 'Viking Age',
    significance: 'Important trade route connecting the Baltic Sea with inland Russia and Belarus.',
    historicalSignificance: 'Important trade route connecting the Baltic Sea with inland Russia and Belarus.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'volkhov',
    name: 'Volkhov',
    nameEn: 'Volkhov River',
    description: 'The Volkhov River connects Lake Ilmen with Lake Ladoga, a crucial part of the trade route from the Varangians to the Greeks.',
    coordinates: [
      { lat: 58.52, lng: 31.27, name: 'Lake Ilmen' },
      { lat: 59.95, lng: 32.32, name: 'Lake Ladoga' },
      { lat: 59.33, lng: 31.17, name: 'Veliky Novgorod' }
    ],
    period: 'Viking Age',
    significance: 'Key segment of the trade route from the Varangians to the Greeks, facilitating trade between Scandinavia and the Byzantine Empire.',
    historicalSignificance: 'Key segment of the trade route from the Varangians to the Greeks, facilitating trade between Scandinavia and the Byzantine Empire.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'dnipro',
    name: 'Dnipro',
    nameEn: 'Dnipro River',
    description: 'The Dnipro River flows from Russia through Belarus and Ukraine to the Black Sea, serving as a major trade artery.',
    coordinates: [
      { lat: 54.85, lng: 33.23, name: 'Source near Smolensk' },
      { lat: 50.50, lng: 30.52, name: 'Kyiv' },
      { lat: 46.63, lng: 32.60, name: 'Black Sea' }
    ],
    period: 'Viking Age',
    significance: 'Major trade route used by the Vikings to access the Black Sea and trade with the Byzantine Empire.',
    historicalSignificance: 'Major trade route used by the Vikings to access the Black Sea and trade with the Byzantine Empire.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'sviatoiNos',
    name: 'Sviatoi Nos',
    nameEn: 'Sviatoi Nos',
    description: 'Sviatoi Nos, a cape on the Kola Peninsula, was a significant landmark for navigation along the Northern Sea Route.',
    coordinates: [
      { lat: 68.15, lng: 39.50, name: 'Sviatoi Nos Cape' }
    ],
    period: 'Viking Age',
    significance: 'Important navigational point for Vikings exploring and trading along the northern coasts of Russia.',
    historicalSignificance: 'Important navigational point for Vikings exploring and trading along the northern coasts of Russia.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'neva',
    name: 'Neva',
    nameEn: 'Neva River',
    description: 'The Neva River connects Lake Ladoga with the Gulf of Finland, providing a direct route to the Baltic Sea.',
    coordinates: [
      { lat: 60.70, lng: 30.12, name: 'Lake Ladoga' },
      { lat: 59.93, lng: 30.33, name: 'St. Petersburg (Neva Delta)' }
    ],
    period: 'Viking Age',
    significance: 'Facilitated access to Lake Ladoga and the interior waterways of Russia, crucial for trade and exploration.',
    historicalSignificance: 'Facilitated access to Lake Ladoga and the interior waterways of Russia, crucial for trade and exploration.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'gotaAlv',
    name: 'Göta älv',
    nameEn: 'Göta älv River',
    description: 'Göta älv connects Lake Vänern with the Kattegat, serving as a vital waterway for trade and transport in Sweden.',
    coordinates: [
      { lat: 58.58, lng: 13.50, name: 'Lake Vänern' },
      { lat: 57.70, lng: 11.93, name: 'Lödöse' }
    ],
    period: 'Viking Age',
    significance: 'Enabled trade and transport between Lake Vänern and the Kattegat, supporting settlements and trade in the region.',
    historicalSignificance: 'Enabled trade and transport between Lake Vänern and the Kattegat, supporting settlements and trade in the region.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'stangan',
    name: 'Stångån',
    nameEn: 'Stångån River',
    description: 'The natural river that flows through Söderköping to Slätbaken (Baltic Sea), crucial for medieval trade.',
    coordinates: [
      { lat: 58.4833, lng: 16.3167, name: 'Söderköping', isTradingPost: true },
      { lat: 58.5, lng: 16.4, name: 'Slätbaken (Baltic Sea)' }
    ],
    period: 'Viking Age',
    significance: 'Made Söderköping an important medieval trading town.',
    historicalSignificance: 'Made Söderköping an important medieval trading town.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'peipus',
    name: 'Peipus',
    nameEn: 'Lake Peipus',
    description: 'Lake Peipus, on the border of Estonia and Russia, was a significant body of water for trade and transport.',
    coordinates: [
      { lat: 58.53, lng: 27.70, name: 'Lake Peipus' }
    ],
    period: 'Viking Age',
    significance: 'Facilitated trade and transport between the Baltic regions and inland Russia.',
    historicalSignificance: 'Facilitated trade and transport between the Baltic regions and inland Russia.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'nemunas',
    name: 'Nemunas',
    nameEn: 'Nemunas River',
    description: 'The Nemunas River flows through Belarus and Lithuania to the Curonian Lagoon, providing access to the Baltic Sea.',
    coordinates: [
      { lat: 54.10, lng: 24.00, name: 'Nemunas River' },
      { lat: 55.33, lng: 21.13, name: 'Curonian Lagoon' }
    ],
    period: 'Viking Age',
    significance: 'Enabled trade and transport between inland areas and the Baltic Sea.',
    historicalSignificance: 'Enabled trade and transport between inland areas and the Baltic Sea.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'oder',
    name: 'Oder',
    nameEn: 'Oder River',
    description: 'The Oder River flows through the Czech Republic, Poland, and Germany to the Baltic Sea, serving as a trade route.',
    coordinates: [
      { lat: 49.92, lng: 17.40, name: 'Oder River Source' },
      { lat: 53.55, lng: 14.53, name: 'Szczecin' },
      { lat: 53.98, lng: 14.27, name: 'Baltic Sea (Oder Lagoon)' }
    ],
    period: 'Viking Age',
    significance: 'Facilitated trade and transport between Central Europe and the Baltic Sea.',
    historicalSignificance: 'Facilitated trade and transport between Central Europe and the Baltic Sea.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'vistula',
    name: 'Vistula',
    nameEn: 'Vistula River',
    description: 'The Vistula River flows through Poland to the Baltic Sea, serving as a major trade and transport route.',
    coordinates: [
      { lat: 49.61, lng: 19.20, name: 'Vistula River Source' },
      { lat: 54.35, lng: 18.65, name: 'Gdańsk' },
      { lat: 54.40, lng: 18.80, name: 'Baltic Sea (Vistula Lagoon)' }
    ],
    period: 'Viking Age',
    significance: 'Enabled trade and transport within Poland and to the Baltic Sea.',
    historicalSignificance: 'Enabled trade and transport within Poland and to the Baltic Sea.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'elba',
    name: 'Elbe',
    nameEn: 'Elbe River',
    description: 'The Elbe River flows through the Czech Republic and Germany to the North Sea, serving as a major trade route.',
    coordinates: [
      { lat: 50.77, lng: 12.67, name: 'Elbe River Source' },
      { lat: 53.55, lng: 9.98, name: 'Hamburg' },
      { lat: 53.88, lng: 8.77, name: 'North Sea (Elbe Estuary)' }
    ],
    period: 'Viking Age',
    significance: 'Connected inland areas with the North Sea, facilitating trade and transport.',
    historicalSignificance: 'Connected inland areas with the North Sea, facilitating trade and transport.',
    color: '#0369a1',
    width: 6
  },
  {
    id: 'rhine',
    name: 'Rhine',
    nameEn: 'Rhine River',
    description: 'The Rhine River flows through Switzerland, Germany, France, and the Netherlands to the North Sea, serving as a major trade route.',
    coordinates: [
      { lat: 46.55, lng: 8.63, name: 'Rhine River Source' },
      { lat: 51.23, lng: 6.78, name: 'Düsseldorf' },
      { lat: 51.92, lng: 4.48, name: 'North Sea (Rhine Delta)' }
    ],
    period: 'Viking Age',
    significance: 'Enabled trade and transport between inland Europe and the North Sea.',
    historicalSignificance: 'Enabled trade and transport between inland Europe and the North Sea.',
    color: '#0369a1',
    width: 6
  }
];

export const NORDIC_RIVER_SYSTEMS = NORDIC_RIVERS;
