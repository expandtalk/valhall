
import { supabase } from "@/integrations/supabase/client";

export const createSampleStagingData = async () => {
  const sampleData = [
    {
      original_signum: "U 337",
      source_database: "Rundata",
      transliteration: "kunar : auk : tuki : litu : raisa : stain : þansi : aft : kuþlaf : faþur : sin : han : was : saR : maþr : i : liþi",
      translation_en: "Gunnar and Toki had this stone raised after Gudleif, their father. He was the man who was most...",
      location: "Granby, Uppland",
      coordinates: "59.7543,17.6291",
      dating_text: "ca 1000-1100? möjligen senare",
      object_type: "memorial-stones", // Using mapped category
      conflict_reasons: ["dating_vague", "gps_uncertainty"],
      raw_data: {
        "original_location": "Granby socken, Uppland",
        "uncertainty_notes": "Datering osäker, GPS-koordinater approximativa",
        "original_object_type": "runsten"
      },
      status: "pending"
    },
    {
      original_signum: "Sö 154",
      source_database: "Rundata", 
      transliteration: "kristr : hialbi : hans : salu",
      translation_en: "May Christ help his soul",
      location: "Tumbo, Södermanland",
      coordinates: "59.1234,17.8765",
      dating_text: "1000-1100",
      object_type: "memorial-stones", // Using mapped category
      conflict_reasons: ["duplicate_suspected", "location_conflict"],
      raw_data: {
        "duplicate_candidate": "Similar inscription found nearby",
        "location_notes": "Exact location disputed",
        "original_object_type": "runsten"
      },
      status: "pending"
    },
    {
      original_signum: "N 184",
      source_database: "NIyR",
      transliteration: "þorsteinn : auk : eysteinn : þeir : reistu : stein : þenna : eptir : þorkel : broþur : sinn",
      translation_en: "Thorstein and Eystein, they raised this stone after Thorkel, their brother",
      location: "Alstad, Oppland, Norge",
      coordinates: "61.2345,10.1234",
      dating_text: "1000-1050",
      object_type: "memorial-stones", // Using mapped category
      conflict_reasons: ["signum_conflict"],
      raw_data: {
        "conflict_note": "Signum already exists in database with different data",
        "original_object_type": "runesten"
      },
      status: "pending"
    }
  ];

  try {
    const { error } = await supabase
      .from('staging_inscriptions')
      .insert(sampleData);

    if (error) {
      console.error('Error creating sample staging data:', error);
      return false;
    }

    console.log('Sample staging data created successfully');
    return true;
  } catch (error) {
    console.error('Error creating sample staging data:', error);
    return false;
  }
};
