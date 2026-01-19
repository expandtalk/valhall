
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { RoyalDynasty } from './types';

export const useRoyalDynasties = () => {
  return useQuery({
    queryKey: ['royal-dynasties'],
    queryFn: async () => {
      console.log('🏰 Loading royal dynasties...');
      const { data, error } = await supabase
        .from('royal_dynasties')
        .select('*')
        .order('period_start', { ascending: true });
      
      if (error) {
        console.error('Error loading royal dynasties:', error);
        throw error;
      }
      console.log('🏰 Royal dynasties loaded:', data?.length || 0, 'dynasties');
      return data as RoyalDynasty[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
