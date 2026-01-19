
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { KingInscriptionLink } from './types';

export const useKingInscriptionLinks = (kingId?: string) => {
  return useQuery({
    queryKey: ['king-inscription-links', kingId],
    queryFn: async () => {
      let query = supabase
        .from('king_inscription_links')
        .select('*')
        .order('evidence_strength', { ascending: false });
      
      if (kingId) {
        query = query.eq('king_id', kingId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as KingInscriptionLink[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
