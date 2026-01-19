
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { KingSourceMention } from './types';

export const useKingSourceMentions = (kingId?: string) => {
  return useQuery({
    queryKey: ['king-source-mentions', kingId],
    queryFn: async () => {
      let query = supabase
        .from('king_source_mentions')
        .select(`
          *,
          king:historical_kings(*),
          source:historical_sources(*)
        `)
        .order('created_at', { ascending: false });
      
      if (kingId) {
        query = query.eq('king_id', kingId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as KingSourceMention[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
