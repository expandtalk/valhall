
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface VikingName {
  id: string;
  name: string;
  gender: 'male' | 'female';
  meaning: string;
  etymology?: string;
  historical_info?: string;
  frequency: number;
  regions: string[];
  created_at: string;
  updated_at: string;
}

export interface VikingNamesStats {
  total_names: number;
  male_names: number;
  female_names: number;
  total_frequency: number;
}

export const useVikingNames = () => {
  return useQuery({
    queryKey: ['viking-names'],
    queryFn: async (): Promise<VikingName[]> => {
      const { data, error } = await supabase
        .from('viking_names')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching Viking names:', error);
        throw error;
      }

      // Type assertion to ensure proper typing
      return (data || []).map(item => ({
        ...item,
        gender: item.gender as 'male' | 'female'
      }));
    },
  });
};

export const useVikingNamesStats = () => {
  return useQuery({
    queryKey: ['viking-names-stats'],
    queryFn: async (): Promise<VikingNamesStats> => {
      const { data, error } = await supabase
        .rpc('get_viking_names_stats');

      if (error) {
        console.error('Error fetching Viking names stats:', error);
        throw error;
      }

      return data?.[0] || { total_names: 0, male_names: 0, female_names: 0, total_frequency: 0 };
    },
  });
};
