
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface FolkGroup {
  id: string;
  name: string;
  name_en: string;
  main_category: string;
  sub_category: string;
  dna_profile: any;
  language_family: string;
  language_subfamily: string;
  active_period_start: number;
  active_period_end: number;
  description: string;
  description_en: string;
  coordinates: any;
  historical_significance: string;
}

export const useFolkGroups = () => {
  const [folkGroups, setFolkGroups] = useState<FolkGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchFolkGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('folk_groups')
        .select('*')
        .order('name');

      if (error) throw error;
      setFolkGroups(data || []);
    } catch (error) {
      console.error('Error fetching folk groups:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta folkgrupper",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveFolkGroup = async (formData: any, currentEditItem: any) => {
    setIsLoading(true);
    try {
      // Parse DNA profile
      let dnaProfile = {};
      if (formData.dna_profile_text) {
        try {
          dnaProfile = JSON.parse(formData.dna_profile_text);
        } catch (e) {
          throw new Error('Ogiltig JSON-format för DNA-profil');
        }
      }

      // Prepare coordinates
      let coordinates = null;
      if (formData.lat && formData.lng) {
        coordinates = `(${formData.lng},${formData.lat})`;
      }

      const saveData = {
        name: formData.name,
        name_en: formData.name_en,
        main_category: formData.main_category,
        sub_category: formData.sub_category,
        language_family: formData.language_family,
        language_subfamily: formData.language_subfamily,
        active_period_start: formData.active_period_start ? parseInt(formData.active_period_start) : null,
        active_period_end: formData.active_period_end ? parseInt(formData.active_period_end) : null,
        description: formData.description,
        description_en: formData.description_en,
        historical_significance: formData.historical_significance,
        coordinates: coordinates,
        dna_profile: dnaProfile
      };

      let result;
      if (currentEditItem && currentEditItem.id) {
        result = await supabase
          .from('folk_groups')
          .update(saveData)
          .eq('id', currentEditItem.id)
          .select();
      } else {
        result = await supabase
          .from('folk_groups')
          .insert([saveData])
          .select();
      }

      if (result.error) throw result.error;

      toast({
        title: "Sparad",
        description: "Folkgrupp har sparats framgångsrikt"
      });

      fetchFolkGroups();
      return true;
    } catch (error) {
      console.error('Error saving folk group:', error);
      toast({
        title: "Fel",
        description: `Kunde inte spara folkgrupp: ${error instanceof Error ? error.message : 'Okänt fel'}`,
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFolkGroup = async (group: FolkGroup) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('folk_groups')
        .delete()
        .eq('id', group.id);

      if (error) throw error;

      toast({
        title: "Borttaget",
        description: "Folkgrupp har tagits bort framgångsrikt"
      });

      fetchFolkGroups();
    } catch (error) {
      console.error('Error deleting folk group:', error);
      toast({
        title: "Fel",
        description: `Kunde inte ta bort folkgrupp: ${error instanceof Error ? error.message : 'Okänt fel'}`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolkGroups();
  }, []);

  return {
    folkGroups,
    loading,
    isLoading,
    saveFolkGroup,
    deleteFolkGroup,
    fetchFolkGroups
  };
};
