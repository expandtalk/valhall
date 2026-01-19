import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ChristianSite {
  id: string;
  name: string;
  name_en?: string;
  coordinates: [number, number]; // [lng, lat]
  site_type: 'monastery' | 'church' | 'holy_place' | 'bishopric' | 'hospital';
  religious_order?: 'cistercian' | 'benedictine' | 'franciscan' | 'dominican' | 'birgittine' | 'carthusian' | 'johanniter' | 'other';
  founded_year?: number;
  dissolved_year?: number;
  period: 'early_christian' | 'medieval' | 'late_medieval';
  status: 'active' | 'ruins' | 'church_remains' | 'historical' | 'archaeological';
  significance_level: 'very_high' | 'high' | 'medium' | 'low';
  description?: string;
  description_en?: string;
  historical_notes?: string;
  current_condition?: string;
  region?: string;
  county?: string;
  province?: string;
  created_at: string;
  updated_at: string;
}

export const useChristianSites = (filters?: {
  period?: string[];
  siteType?: string[];
  religiousOrder?: string[];
  status?: string[];
  significanceLevel?: string[];
}) => {
  return useQuery({
    queryKey: ['christian-sites', filters],
    queryFn: async () => {
      console.log('🕊️ Fetching Christian sites...');
      
      let query = supabase
        .from('christian_sites')
        .select('*');

      // Apply filters if provided
      if (filters?.period && filters.period.length > 0) {
        query = query.in('period', filters.period);
      }
      
      if (filters?.siteType && filters.siteType.length > 0) {
        query = query.in('site_type', filters.siteType);
      }
      
      if (filters?.religiousOrder && filters.religiousOrder.length > 0) {
        query = query.in('religious_order', filters.religiousOrder);
      }
      
      if (filters?.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }
      
      if (filters?.significanceLevel && filters.significanceLevel.length > 0) {
        query = query.in('significance_level', filters.significanceLevel);
      }

      const { data, error } = await query.order('founded_year', { ascending: true });

      if (error) {
        console.error('❌ Error fetching Christian sites:', error);
        throw error;
      }

      // Transform coordinates from PostGIS point to [lng, lat] array
      const transformedData = data?.map(site => {
        let coordinates: [number, number] = [0, 0];
        
        if (site.coordinates && typeof site.coordinates === 'string') {
          // Parse PostGIS POINT format: "POINT(lng lat)" or "(lng,lat)"
          const coordStr = site.coordinates;
          const match = coordStr.match(/\(([^)]+)\)/);
          if (match) {
            const parts = match[1].split(/[,\s]+/);
            if (parts.length >= 2) {
              coordinates = [parseFloat(parts[0]), parseFloat(parts[1])];
            }
          }
        }
        
        return {
          ...site,
          coordinates
        };
      }) as ChristianSite[];

      console.log(`✅ Fetched ${transformedData?.length || 0} Christian sites`);
      return transformedData || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Helper function to get sites by period
export const useChristianSitesByPeriod = (period: 'early_christian' | 'medieval' | 'late_medieval') => {
  return useChristianSites({ period: [period] });
};

// Helper function to get sites by religious order
export const useChristianSitesByOrder = (order: string) => {
  return useChristianSites({ religiousOrder: [order] });
};

// Helper function to get sites by type
export const useChristianSitesByType = (type: string) => {
  return useChristianSites({ siteType: [type] });
};