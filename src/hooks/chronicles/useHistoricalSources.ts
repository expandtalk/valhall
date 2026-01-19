
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { HistoricalSource } from './types';

export const useHistoricalSources = () => {
  return useQuery({
    queryKey: ['historical-sources'],
    queryFn: async () => {
      console.log('📚 Loading historical sources...');
      const { data, error } = await supabase
        .from('historical_sources')
        .select('*')
        .order('written_year', { ascending: true });
      
      if (error) {
        console.error('Error loading historical sources:', error);
        throw error;
      }
      console.log('📚 Historical sources loaded:', data?.length || 0, 'sources');
      return data as HistoricalSource[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
