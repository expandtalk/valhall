
import { VikingLocation } from './types';

export const ATLANTIC_LOCATIONS: { [key: string]: VikingLocation } = {
  'reykjavik': {
    lat: 64.1,
    lng: -21.9,
    name: 'Reykjavik',
    description: 'Isländsk bosättning',
    category: 'settlement'
  },
  'torshavn': {
    lat: 62.0,
    lng: -6.8,
    name: 'Tórshavn',
    description: 'Färöisk bosättning',
    category: 'settlement'
  },
  'helluland_baffin': {
    lat: 65.0000,
    lng: -70.0000,
    name: 'Helluland (Baffin Island)',
    description: 'Helluland - "Stenplattans land", troligen Baffin Island enligt de isländska sagorna',
    category: 'exploration'
  },
  'helluland_labrador': {
    lat: 58.0000,
    lng: -64.0000,
    name: 'Helluland (Norra Labrador)', 
    description: 'Alternativ lokalisering av Helluland - "Stenplattans land" i norra Labrador',
    category: 'exploration'
  },
  'markland_central': {
    lat: 54.0000,
    lng: -60.0000,
    name: 'Markland (Central Labrador)',
    description: 'Markland - "Skogslandet", central Labradorkusten där nordmännen fann stora skogar',
    category: 'exploration'
  },
  'markland_nova_scotia': {
    lat: 45.0000,
    lng: -63.0000,
    name: 'Markland (Nova Scotia)',
    description: 'Alternativ lokalisering av Markland - "Skogslandet" i Nova Scotia',
    category: 'exploration'
  },
  'lanse_aux_meadows': {
    lat: 51.5944,
    lng: -55.5344,
    name: "L'Anse aux Meadows",
    description: 'Leifs bas (Leifsbudir) - den enda arkeologiskt bekräftade nordiska bosättningen i Nordamerika. UNESCO-världsarv från omkring år 1000.',
    category: 'exploration'
  },
  'vinland_st_lawrence': {
    lat: 47.8000,
    lng: -61.0000,
    name: 'Vinland (St. Lawrence-bukten)',
    description: 'Troligt utforskningsområde för Vinland - "Druvlandet" vid St. Lawrence-bukten',
    category: 'exploration'
  },
  'vinland_new_brunswick': {
    lat: 46.5000,
    lng: -66.0000,
    name: 'Vinland (New Brunswick)',
    description: 'New Brunswick - trolig plats där nordmännen hittade druvorna som gav Vinland dess namn. Botaniska bevis stöder denna teori.',
    category: 'exploration'
  },
  'vinland_pei': {
    lat: 46.2500,
    lng: -63.0000,
    name: 'Vinland (Prince Edward Island)',
    description: 'Prince Edward Island - ett av de troliga utforskningsområdena för Vinland',
    category: 'exploration'
  },
  'bay_st_lawrence': {
    lat: 47.0500,
    lng: -60.4000,
    name: 'Bay St. Lawrence',
    description: 'Trolig plats för druvfyndet som beskrivs i sagorna, Nova Scotia',
    category: 'exploration'
  },
  'straumfjord': {
    lat: 51.7500,
    lng: -56.7500,
    name: 'Straumfjörð',
    description: 'Straumfjörð från sagorna - troligen Belle Isle-sundet mellan Newfoundland och Labrador',
    category: 'exploration'
  }
};
