
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface EyeColor {
  id: string;
  color_name: string;
  color_name_en: string;
  global_frequency_percent: number;
  rarity_rank: number;
  genetic_complexity: string;
  main_genes: string[];
  historical_origin: string;
  evolutionary_advantage: string;
  light_sensitivity_level: string;
  health_protection_level: string;
  cultural_associations: string;
}

interface EyeColorRegion {
  id: string;
  eye_color_id: string;
  region_name: string;
  country: string;
  frequency_percent: number;
  population_notes: string;
  genetic_significance: string;
}

interface EyeColorGenetics {
  id: string;
  eye_color_id: string;
  gene_name: string;
  gene_function: string;
  mutation_type: string;
  research_notes: string;
}

export const useEyeColors = () => {
  const [eyeColors, setEyeColors] = useState<EyeColor[]>([]);
  const [eyeColorRegions, setEyeColorRegions] = useState<EyeColorRegion[]>([]);
  const [eyeColorGenetics, setEyeColorGenetics] = useState<EyeColorGenetics[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchEyeColors = async () => {
    try {
      const { data, error } = await supabase
        .from('eye_colors')
        .select('*')
        .order('rarity_rank');

      if (error) throw error;
      setEyeColors(data || []);
    } catch (error) {
      console.error('Error fetching eye colors:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta ögonfärger",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchEyeColorRegions = async () => {
    try {
      const { data, error } = await supabase
        .from('eye_color_regions')
        .select('*')
        .order('frequency_percent', { ascending: false });

      if (error) throw error;
      setEyeColorRegions(data || []);
    } catch (error) {
      console.error('Error fetching eye color regions:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta regionala data",
        variant: "destructive"
      });
    }
  };

  const fetchEyeColorGenetics = async () => {
    try {
      const { data, error } = await supabase
        .from('eye_color_genetics')
        .select('*')
        .order('gene_name');

      if (error) throw error;
      setEyeColorGenetics(data || []);
    } catch (error) {
      console.error('Error fetching eye color genetics:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta genetiska data",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchEyeColors();
    fetchEyeColorRegions();
    fetchEyeColorGenetics();
  }, []);

  return {
    eyeColors,
    eyeColorRegions,
    eyeColorGenetics,
    loading,
    isLoading,
    fetchEyeColors,
    fetchEyeColorRegions,
    fetchEyeColorGenetics
  };
};
