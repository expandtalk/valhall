
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { HistoricalKing, KingSourceMention, KingInscriptionLink } from './types';

// Hook for creating new king
export const useCreateKing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (king: Omit<HistoricalKing, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('historical_kings')
        .insert(king)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historical-kings'] });
    },
  });
};

// Hook for creating new source mention
export const useCreateSourceMention = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (mention: Omit<KingSourceMention, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('king_source_mentions')
        .insert(mention)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['king-source-mentions'] });
    },
  });
};

// Hook for creating new inscription link
export const useCreateInscriptionLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (link: Omit<KingInscriptionLink, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('king_inscription_links')
        .insert(link)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['king-inscription-links'] });
    },
  });
};
