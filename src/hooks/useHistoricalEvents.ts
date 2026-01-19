
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface HistoricalEvent {
  id: string;
  year_start: number;
  year_end?: number;
  event_name: string;
  event_name_en: string;
  description?: string;
  description_en?: string;
  event_type: string;
  significance_level: string;
  region_affected?: string[];
  sources?: string[];
  created_at: string;
  updated_at: string;
}

export const useHistoricalEvents = () => {
  return useQuery({
    queryKey: ['historical-events'],
    queryFn: async () => {
      console.log('🏛️ Fetching historical events...');
      
      const { data, error } = await supabase
        .from('historical_events')
        .select('*')
        .order('year_start', { ascending: true });

      if (error) {
        console.error('❌ Error fetching historical events:', error);
        throw error;
      }

      console.log(`✅ Fetched ${data?.length || 0} historical events`);
      return data as HistoricalEvent[];
    },
  });
};
