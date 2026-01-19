
import { supabase } from "@/integrations/supabase/client";
import { ParsedFornfyndEntry, convertSWEREF99ToWGS84 } from "./fornfyndParser";

export const importFornfyndEntries = async (entries: ParsedFornfyndEntry[]) => {
  console.log(`Starting import of ${entries.length} detailed Fornfynd entries...`);
  
  // Convert to database format
  const inscriptions = entries.map(entry => {
    let coordinates = null;
    if (entry.coordinates_sweref99) {
      const wgs84 = convertSWEREF99ToWGS84(
        entry.coordinates_sweref99.north, 
        entry.coordinates_sweref99.east
      );
      coordinates = `POINT(${wgs84.lng} ${wgs84.lat})`;
    }

    return {
      signum: entry.l_number, // Use L-number as signum
      transliteration: entry.transliteration,
      location: entry.parish,
      parish: entry.parish,
      municipality: entry.municipality,
      county: entry.county,
      province: entry.landscape,
      country: 'Sweden',
      lamningsnumber: entry.l_number,
      cultural_classification: entry.cultural_classification,
      data_source: 'fornfynd_detailed',
      object_type: entry.object_type,
      scholarly_notes: [
        entry.description,
        entry.antiquarian_comment,
        entry.location_description,
        `Skadestatus: ${entry.damage_level}`,
        `Undersökt: ${entry.investigation_status}`,
        entry.terrain_description,
        entry.vegetation
      ].filter(Boolean).join(' | '),
      period_start: 800, // Default Viking Age dating
      period_end: 1100,
      dating_text: '800-1100 (estimated)',
      complexity_level: 'unknown' as const,
      normalization: null,
      translation_en: null,
      translation_sv: null,
      coordinates: coordinates,
      condition_notes: entry.damage_level,
      historical_context: entry.antiquarian_comment,
      created_at: new Date().toISOString()
    };
  });

  // Check for existing entries using L-number to avoid duplicates
  const existingCheck = await supabase
    .from('runic_inscriptions')
    .select('lamningsnumber, signum')
    .in('lamningsnumber', inscriptions.map(i => i.lamningsnumber));

  const existingLNumbers = new Set(existingCheck.data?.map(r => r.lamningsnumber) || []);

  const newInscriptions = inscriptions.filter(inscription => 
    !existingLNumbers.has(inscription.lamningsnumber)
  );

  if (newInscriptions.length === 0) {
    return {
      totalImported: 0,
      totalDuplicates: inscriptions.length,
      message: "Alla poster finns redan (baserat på L-nummer)."
    };
  }

  // Import in batches of 50 to avoid database limits
  const batchSize = 50;
  let totalImported = 0;

  for (let i = 0; i < newInscriptions.length; i += batchSize) {
    const batch = newInscriptions.slice(i, i + batchSize);
    const { data, error } = await supabase
      .from('runic_inscriptions')
      .insert(batch)
      .select();

    if (error) {
      console.error(`Batch ${i / batchSize + 1} import error:`, error);
      throw error;
    }

    totalImported += data?.length || 0;
    console.log(`Imported batch ${i / batchSize + 1}: ${data?.length || 0} records`);
  }

  console.log(`Successfully imported ${totalImported} detailed Fornfynd entries`);
  
  return {
    totalImported,
    totalDuplicates: inscriptions.length - newInscriptions.length,
    message: `Lade till ${totalImported} runristningar från Fornfynd med exakta koordinater (hoppade över ${inscriptions.length - newInscriptions.length} duplikater)`
  };
};
