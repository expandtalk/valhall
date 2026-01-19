
export const getDefaultLegendStates = () => ({
  // ✅ ALWAYS ON per default (huvudinnehåll + historisk kontext)
  'runic_inscriptions': true,
  'valdemars_route': true, // ✅ Default enabled for prominence
  'valdemar_route': true, // ✅ Alternative naming also enabled
  'river_routes': true,
  'land_routes': true,    // 🔧 FIX: Lägg till landvägar som standard
  
  // ✅ MOSTLY ON but can be turned off (viktigt för Viking mode)
  'ring_fortress': true,
  'hillfort': true,
  'longphort': true,
  'royal_center': true,
  'trading_post_fortress': true,
  'religious_center': true,
  'viking_settlement': true,
  'coastal_defense': true,
  'adapted_fortress': true,
  
  // ✅ Country/region based - ON for major countries
  'sweden': true,
  'norway': true,
  'denmark': true,
  'iceland': true,
  
  // ✅ AKTIVERAT: Religious places nu ON per default så användaren ser dem!
  'religious_places': true,
  
  // ✅ AKTIVERAT: Religious subcategories nu ON per default så användaren ser dem!
  'religious_thor': true,
  'religious_odin': true,
  'religious_frey': true,
  'religious_frigg': true,
  'religious_ull': true,
  'religious_njord': true,
  'religious_other': true,
  
  // ✅ ÅTERSTÄLLT: Fler synliga men avstängda alternativ för upptäckt
  'archaeological_finds': false,
  'germanic_timeline': false,
  'stake_barriers': false,
  'viking_cities': false,
  'viking_fortresses': false,
  'trade_routes': false,
  'battle_sites': false,
  
  // ❌ Status-baserade - OFF per default men synliga
  'well_preserved': false,
  'damaged': false,
  'fragmentary': false,
  'underwater': false,
  
  // ❌ Minor countries/regions - OFF per default men synliga för upptäckt
  'finland': false,
  'estonia': false,
  'russia': false,
  'ukraine': false,
  'england': false,
  'ireland': false,
  'scotland': false,
  'faroe_islands': false,
  'greenland': false,
  
  // ❌ Viking region categories - OFF per default men synliga
  'nordic': false,
  'germanic': false,
  'slavic': false,
  'celtic': false,
  'baltic': false,
  'discoveries': false,
  'christian': false
});
