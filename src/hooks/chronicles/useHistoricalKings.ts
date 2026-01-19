
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { HistoricalKing } from './types';
import { sortHistoricalKings, filterByRulerType } from './utils/sortingUtils';

export const useHistoricalKings = (region?: string, rulerType?: string, gender?: string) => {
  return useQuery({
    queryKey: ['historical-kings', region, rulerType, gender],
    queryFn: async () => {
      console.log('👑 Loading historical rulers for region:', region || 'all', 'type:', rulerType || 'all', 'gender:', gender || 'all');
      let query = supabase
        .from('historical_kings')
        .select(`
          *,
          dynasty:royal_dynasties(*)
        `);
      
      if (region && region !== 'all') {
        query = query.eq('region', region);
      }

      // Only apply gender filter at database level if gender is explicitly set and not 'all'
      if (gender && gender !== 'all') {
        console.log('🔍 Applying gender filter at database level:', gender);
        query = query.eq('gender', gender);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error loading historical kings:', error);
        throw error;
      }
      
      // Type assertion with proper type checking
      const typedData = (data || []).map(king => ({
        ...king,
        gender: king.gender as 'male' | 'female' | 'unknown'
      })) as HistoricalKing[];
      
      console.log('📊 Raw data from database:', typedData?.length || 0, 'rulers');
      console.log('📊 Raw data by gender:', typedData?.reduce((acc, k) => {
        acc[k.gender] = (acc[k.gender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>));
      
      // Filter by ruler type if specified
      let filteredData = filterByRulerType(typedData, rulerType);
      
      console.log('📊 Data after ruler type filtering:', filteredData?.length || 0, 'rulers');
      console.log('📊 After ruler type filter by gender:', filteredData?.reduce((acc, k) => {
        acc[k.gender] = (acc[k.gender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>));
      
      // Sort chronologically
      const sortedData = sortHistoricalKings(filteredData);
      
      console.log('👑 Historical rulers loaded and sorted:', sortedData?.length || 0, 'rulers');
      console.log('📊 Final data by gender:', sortedData?.reduce((acc, k) => {
        acc[k.gender] = (acc[k.gender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>));
      
      return sortedData;
    },
    staleTime: 30 * 1000, // Reduced to 30 seconds to ensure fresh data
  });
};
