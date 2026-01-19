
import { supabase } from '@/integrations/supabase/client';

export interface AdditionalFolkGroup {
  name: string;
  name_en: string;
  main_category: 'germanic' | 'celtic' | 'slavic' | 'finno_ugric' | 'baltic' | 'other';
  sub_category: string;
  coordinates?: { lat: number; lng: number };
  active_period_start: number;
  active_period_end: number;
  description: string;
  description_en: string;
  historical_significance?: string;
  language_family?: string;
  language_subfamily?: string;
  dna_profile?: any;
}

export const additionalFolkGroups: AdditionalFolkGroup[] = [
  // Germanic groups
  {
    name: 'Daner',
    name_en: 'Danes',
    main_category: 'germanic',
    sub_category: 'north_germanic',
    coordinates: { lat: 56.0, lng: 10.0 },
    active_period_start: -500,
    active_period_end: 1100,
    description: 'Nordgermansk folkgrupp som bosatte sig i Danmark och bildade grunden för det danska riket.',
    description_en: 'North Germanic people who settled in Denmark and formed the foundation of the Danish kingdom.',
    historical_significance: 'Grundade Danmark, viktiga aktörer under vikingatiden',
    language_family: 'Indo-European',
    language_subfamily: 'Germanic',
    dna_profile: { "Y_DNA": { "I1": 35, "R1b": 25, "R1a": 20 } }
  },
  {
    name: 'Langobarderna',
    name_en: 'Lombards',
    main_category: 'germanic',
    sub_category: 'east_germanic',
    coordinates: { lat: 45.5, lng: 10.0 },
    active_period_start: 100,
    active_period_end: 774,
    description: 'Germansk folkgrupp från Skandinavien som migrerade till Italien och etablerade Langobardiska riket.',
    description_en: 'Germanic people from Scandinavia who migrated to Italy and established the Lombard Kingdom.',
    historical_significance: 'Härskade över norra Italien 568-774 e.Kr.',
    language_family: 'Indo-European',
    language_subfamily: 'Germanic'
  },
  {
    name: 'Virdar',
    name_en: 'Värend People',
    main_category: 'germanic',
    sub_category: 'south_swedish',
    coordinates: { lat: 56.88, lng: 14.81 },
    active_period_start: 500,
    active_period_end: 1200,
    description: 'Gammal benämning på befolkningen i folklandet Värend kring Växjö.',
    description_en: 'Ancient designation for the population in the folk land of Värend around Växjö.',
    historical_significance: 'En av de äldsta namngivna folkgrupperna i Sverige',
    language_family: 'Indo-European',
    language_subfamily: 'Germanic'
  },
  {
    name: 'Normander',
    name_en: 'Normans',
    main_category: 'germanic',
    sub_category: 'viking_settlers',
    coordinates: { lat: 49.0, lng: -0.5 },
    active_period_start: 911,
    active_period_end: 1200,
    description: 'Vikingar som fick Normandie som län under franska kronan år 911.',
    description_en: 'Vikings who received Normandy as a fief under the French crown in 911.',
    historical_significance: 'Erövrade England 1066 under Vilhelm Erövraren',
    language_family: 'Indo-European',
    language_subfamily: 'Germanic'
  },

  // Paleo-Balkan groups  
  {
    name: 'Thraker',
    name_en: 'Thracians',
    main_category: 'other',
    sub_category: 'paleo_balkan',
    coordinates: { lat: 42.0, lng: 25.0 },
    active_period_start: -3000,
    active_period_end: 600,
    description: 'Indoeuropeisk folkgrupp i östra Balkan.',
    description_en: 'Indo-European people of eastern Balkans.',
    historical_significance: 'Dominerade östra Balkan under tusentals år',
    language_family: 'Indo-European',
    language_subfamily: 'Thracian'
  },
  {
    name: 'Illyrer',
    name_en: 'Illyrians',
    main_category: 'other',
    sub_category: 'paleo_balkan',
    coordinates: { lat: 42.5, lng: 19.0 },
    active_period_start: -2000,
    active_period_end: 600,
    description: 'Indoeuropeisk folkgrupp på västra Balkanhalvön.',
    description_en: 'Indo-European people of western Balkans.',
    historical_significance: 'Behärskade västra Balkan i över 2000 år',
    language_family: 'Indo-European',
    language_subfamily: 'Illyrian'
  },
  {
    name: 'Daker',
    name_en: 'Dacians',
    main_category: 'other',
    sub_category: 'daco_thracian',
    coordinates: { lat: 45.5, lng: 25.0 },
    active_period_start: -700,
    active_period_end: 275,
    description: 'Thrakisk folkgrupp i nuvarande Rumänien.',
    description_en: 'Thracian people in present-day Romania.',
    historical_significance: 'Erövrades av Rom under kejsar Trajan 106 e.Kr.',
    language_family: 'Indo-European',
    language_subfamily: 'Thracian'
  },

  // Celtic groups
  {
    name: 'Helveter',
    name_en: 'Helvetii',
    main_category: 'celtic',
    sub_category: 'central_celtic',
    coordinates: { lat: 46.8, lng: 8.2 },
    active_period_start: -200,
    active_period_end: 50,
    description: 'Keltisk folkgrupp i nuvarande Schweiz som gav landet namnet Helvetia.',
    description_en: 'Celtic people in present-day Switzerland who gave the country the name Helvetia.',
    historical_significance: 'Besegrades av Julius Caesar år 58 f.Kr.',
    language_family: 'Indo-European',
    language_subfamily: 'Celtic'
  },
  {
    name: 'Bojer',
    name_en: 'Boii',
    main_category: 'celtic',
    sub_category: 'central_celtic',
    coordinates: { lat: 49.0, lng: 14.0 },
    active_period_start: -400,
    active_period_end: 50,
    description: 'Keltiskt folk som fanns i Gallien, norra Italien och Böhmen.',
    description_en: 'Celtic people found in Gaul, northern Italy and Bohemia.',
    historical_significance: 'Gav troligen namn åt Böhmen',
    language_family: 'Indo-European',
    language_subfamily: 'Celtic'
  },
  {
    name: 'Briganter',
    name_en: 'Brigantes',
    main_category: 'celtic',
    sub_category: 'british',
    coordinates: { lat: 54.0, lng: -2.0 },
    active_period_start: -200,
    active_period_end: 400,
    description: 'Britannisk keltisk folkstam mellan Tyne och Humber.',
    description_en: 'British Celtic tribe between Tyne and Humber.',
    historical_significance: 'Mäktigaste stammen på Storbritannien vid romarnas invasion',
    language_family: 'Indo-European',
    language_subfamily: 'Celtic'
  }
];

export const createAdditionalFolkGroups = async () => {
  console.log('🏛️ Creating additional historical folk groups...');
  
  try {
    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;
    
    for (const group of additionalFolkGroups) {
      console.log(`🔄 Processing: ${group.name}`);
      
      // Check if group already exists
      const { data: existingGroup, error: checkError } = await supabase
        .from('folk_groups')
        .select('id')
        .eq('name', group.name)
        .maybeSingle();
      
      if (checkError) {
        console.error(`❌ Error checking for existing group ${group.name}:`, checkError);
        errorCount++;
        continue;
      }
      
      if (existingGroup) {
        console.log(`⚠️ Group already exists: ${group.name}`);
        skippedCount++;
        continue;
      }
      
      // Create the insert data object
      const insertData: any = {
        name: group.name,
        name_en: group.name_en,
        main_category: group.main_category,
        sub_category: group.sub_category,
        active_period_start: group.active_period_start,
        active_period_end: group.active_period_end,
        description: group.description,
        description_en: group.description_en,
        historical_significance: group.historical_significance || null,
        language_family: group.language_family || null,
        language_subfamily: group.language_subfamily || null,
        dna_profile: group.dna_profile || {}
      };

      // Add coordinates if provided using PostgreSQL POINT format
      if (group.coordinates) {
        console.log(`📍 Adding coordinates for ${group.name}: lat=${group.coordinates.lat}, lng=${group.coordinates.lng}`);
        
        // Use PostgreSQL POINT format: POINT(longitude latitude)
        insertData.coordinates = `POINT(${group.coordinates.lng} ${group.coordinates.lat})`;
      }

      console.log(`💾 Inserting ${group.name}${group.coordinates ? ' with coordinates' : ' without coordinates'}`);
      const { data, error } = await supabase
        .from('folk_groups')
        .insert(insertData)
        .select('id');

      if (error) {
        console.error(`❌ Error creating folk group ${group.name}:`, error);
        errorCount++;
      } else {
        console.log(`✅ Created folk group: ${group.name}`, data);
        successCount++;
      }
    }

    console.log(`🎉 Import completed! Success: ${successCount}, Errors: ${errorCount}, Skipped: ${skippedCount}`);
    
    if (successCount > 0) {
      return { success: true, successCount, errorCount, skippedCount };
    } else if (skippedCount > 0 && errorCount === 0) {
      return { success: true, successCount: 0, errorCount: 0, skippedCount, message: 'Alla folkgrupper fanns redan' };
    } else {
      return { success: false, errorCount, message: 'Inga nya folkgrupper kunde läggas till' };
    }
  } catch (error) {
    console.error('💥 Fatal error in createAdditionalFolkGroups:', error);
    return { success: false, error: error.message || 'Okänt fel uppstod' };
  }
};
