import { LegendPreset } from '@/types/legend';

export type UserRole = 'explorer' | 'linguist' | 'geographer' | 'researcher';

export const getRoleBasedLegendPresets = (role: UserRole): LegendPreset => {
  console.log(`👤 Getting role-based legend presets for: ${role}`);
  
  // Bas-inställningar - bara runstenar aktiverade
  const basePresets: LegendPreset = {
    runic_inscriptions: true,
    foreign_inscriptions: false, // Utländska runstenar av som standard
    archaeological_sites: false,
    viking_fortresses: false,
    viking_cities: false,
    viking_regions: false,
    germanic_groups: false,
    stake_barriers: false,
    valdemar_route: false,
    river_routes: false,
    carvers: false,
    gods: false,
    hundreds: false,
    parishes: false,
    religious_places: false,
    folk_groups: false,
    archaeological_finds: false,
    germanic_timeline: false,
    trade_routes: false,
    battle_sites: false,
    // Religious subcategories
    religious_odin: false,
    religious_thor: false,
    religious_frey: false,
    religious_freyja: false,
    religious_frigg: false,
    religious_ull: false,
    religious_njord: false,
    religious_other: false,
    // Status categories
    well_preserved: false,
    damaged: false,
    fragmentary: false,
    underwater: false,
    // Countries/regions
    finland: false,
    norway: false,
    denmark: false,
    sweden: false,
    // Viking fortress subtypes
    royal_center: false,
    ring_fortress: false,
    fortress: false,
    hillfort: false,
    longphort: false,
    coastal_defense: false
  };

  switch (role) {
    case 'explorer':
      console.log('🧭 Explorer: Grundläggande utforskning - runstenar + några viktiga kulturella element');
      return {
        ...basePresets,
        runic_inscriptions: true,
        religious_places: true,
        viking_fortresses: true,
      };

    case 'linguist':
      console.log('📚 Linguist: Fokus på inskrifter, carvers och språkliga element');
      return {
        ...basePresets,
        runic_inscriptions: true,
        carvers: true,
        gods: true, // Gudar kan vara viktiga för språkliga analyser
      };

    case 'geographer':
      console.log('🗺️ Cultural Geographer: Omfattande kulturell och geografisk kontext');
      return {
        ...basePresets,
        runic_inscriptions: true,
        archaeological_sites: true,
        viking_fortresses: true,
        viking_cities: true,
        viking_regions: true,
        folk_groups: true,
        hundreds: true,
        parishes: true,
        river_routes: true,
        trade_routes: true,
        germanic_groups: true,
        germanic_timeline: true,
      };

    case 'researcher':
      console.log('🔬 Researcher: Alla verktyg tillgängliga men minimalt aktiverade för ren vy');
      return {
        ...basePresets,
        runic_inscriptions: true,
        carvers: true,
        // Forskare har tillgång till allt men börjar minimalt
      };

    default:
      console.log('🧭 Default: Explorer mode');
      return {
        ...basePresets,
        runic_inscriptions: true,
        religious_places: true,
        viking_fortresses: true,
      };
  }
};

// Kombinera rollbaserade presets med fokus-presets
export const getCombinedLegendPresets = (role: UserRole, focus: string | null): LegendPreset => {
  const rolePresets = getRoleBasedLegendPresets(role);
  
  // Om det finns en specifik fokus, använd fokus-specifika inställningar
  if (focus) {
    console.log(`🎯 Combining role "${role}" with focus "${focus}"`);
    
    // Fokus-specifika override för alla roller
    const focusOverrides: Partial<LegendPreset> = {};
    
    switch (focus) {
      case 'rivers':
        Object.assign(focusOverrides, {
          river_routes: true,
          water_routes: true,
          trade_routes: true,
          valdemar_route: true,
          stake_barriers: true,
          viking_fortresses: false, // Dölja försvarsborgar för river focus
          viking_cities: true,
          runic_inscriptions: false, // Dölja runstenar för river focus
          religious_places: false, // Dölja religiösa platser (källor etc)
        });
        break;
        
      case 'fortresses':
        Object.assign(focusOverrides, {
          viking_fortresses: true,
          runic_inscriptions: true,
        });
        break;
        
      case 'carvers':
        Object.assign(focusOverrides, {
          carvers: true,
          runic_inscriptions: true,
        });
        break;
        
      case 'gods':
        Object.assign(focusOverrides, {
          gods: false,                    // Avaktivera gods legend item
          religious_places: true,         // Huvudkategori kultplatser
          runic_inscriptions: false,      // Avaktivera runstenar - ENDAST kultplatser
          // Aktivera ALLA gud-specifika kultplatser
          religious_odin: true,
          religious_thor: true,
          religious_frey: true,
          religious_freyja: true,
          religious_frigg: true,
          religious_ull: true,
          religious_njord: true,
          religious_other: true,
        });
        break;
        
      case 'hundreds':
        Object.assign(focusOverrides, {
          hundreds: true,
          runic_inscriptions: true,
        });
        break;
        
      case 'parishes':
        Object.assign(focusOverrides, {
          parishes: true,
          runic_inscriptions: true,
        });
        break;
        
      case 'folkGroups':
        Object.assign(focusOverrides, {
          folk_groups: true,
          runic_inscriptions: true,
        });
        break;
    }
    
    return { ...rolePresets, ...focusOverrides };
  }
  
  return rolePresets;
};