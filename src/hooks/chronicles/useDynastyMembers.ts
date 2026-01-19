import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { HistoricalKing } from './types';

export const useDynastyMembers = (dynastyId?: string) => {
  return useQuery({
    queryKey: ['dynasty-members', dynastyId],
    queryFn: async () => {
      if (!dynastyId) return [];
      
      console.log('👑 Loading members for dynasty:', dynastyId);
      const { data, error } = await supabase
        .from('historical_kings')
        .select(`
          *,
          dynasty:royal_dynasties(*)
        `)
        .eq('dynasty_id', dynastyId)
        .order('reign_start', { ascending: true, nullsFirst: false });
      
      if (error) {
        console.error('Error loading dynasty members:', error);
        throw error;
      }
      
      console.log('👑 Dynasty members loaded:', data?.length || 0, 'members');
      return data as HistoricalKing[];
    },
    enabled: !!dynastyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};