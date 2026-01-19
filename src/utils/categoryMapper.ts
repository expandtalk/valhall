
import { supabase } from "@/integrations/supabase/client";

export interface ArtefactMapping {
  id: string;
  artefact_name: string;
  language: string;
  category_mapping: string | null;
  created_at: string;
}

export const getCategoryMapping = async (artefactName: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from('rundata_artefacts')
      .select('category_mapping')
      .eq('artefact_name', artefactName.toLowerCase())
      .single();

    if (error) {
      console.log(`No mapping found for artefact: ${artefactName}`);
      return null;
    }

    return data?.category_mapping || null;
  } catch (error) {
    console.error('Error fetching category mapping:', error);
    return null;
  }
};

export const getAllArtefactMappings = async (): Promise<ArtefactMapping[]> => {
  try {
    const { data, error } = await supabase
      .from('rundata_artefacts')
      .select('*')
      .order('artefact_name');

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error fetching all artefact mappings:', error);
    return [];
  }
};
