
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Types for database entities
export interface DatabaseSite {
  id: string;
  name: string;
  location: string;
  parish?: string;
  county?: string;
  country: string;
  coordinates?: { x: number; y: number };
  period: string;
  dating?: string;
  description?: string;
  burial_type?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseIndividual {
  id: string;
  site_id?: string;
  sample_id: string;
  genetic_sex?: 'XY' | 'XX';
  archaeological_sex?: 'male' | 'female';
  age?: string;
  grave_number?: string;
  grave_goods?: string[];
  radiocarbon?: string;
  y_haplogroup?: string;
  mt_haplogroup?: string;
  ancestry?: any;
  isotopes?: any;
  burial_context?: string;
  museums_inventory?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabaseMarker {
  id: string;
  marker_type: 'mtDNA' | 'Y-DNA' | 'Autosomal';
  haplogroup?: string;
  gene?: string;
  frequency?: number;
  origin: string;
  description?: string;
  modern_distribution?: string;
  significance?: string;
  study_evidence?: string;
  geographic_spread?: string;
  time_introduction?: string;
  created_at: string;
  updated_at: string;
}

export interface DatabasePeriod {
  id: string;
  name: string;
  name_en: string;
  time_range: string;
  description?: string;
  genetic_characteristics?: string;
  created_at: string;
  updated_at: string;
}

// Hook for fetching archaeological sites
export const useArchaeologicalSites = () => {
  return useQuery({
    queryKey: ['archaeological-sites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('archaeological_sites')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as DatabaseSite[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching genetic individuals
export const useGeneticIndividuals = (siteId?: string) => {
  return useQuery({
    queryKey: ['genetic-individuals', siteId],
    queryFn: async () => {
      let query = supabase
        .from('genetic_individuals')
        .select('*')
        .order('sample_id');
      
      if (siteId) {
        query = query.eq('site_id', siteId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as DatabaseIndividual[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching genetic markers
export const useGeneticMarkers = (markerType?: string) => {
  return useQuery({
    queryKey: ['genetic-markers', markerType],
    queryFn: async () => {
      let query = supabase
        .from('genetic_markers')
        .select('*')
        .order('marker_type', { ascending: true });
      
      if (markerType && markerType !== 'all') {
        query = query.eq('marker_type', markerType);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as DatabaseMarker[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for fetching historical periods
export const useHistoricalPeriods = () => {
  return useQuery({
    queryKey: ['historical-periods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('historical_periods')
        .select('*')
        .order('time_range');
      
      if (error) throw error;
      return data as DatabasePeriod[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Hook for creating new archaeological site
export const useCreateSite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (site: Omit<DatabaseSite, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('archaeological_sites')
        .insert(site)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archaeological-sites'] });
    },
  });
};

// Hook for creating new genetic individual
export const useCreateIndividual = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (individual: Omit<DatabaseIndividual, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('genetic_individuals')
        .insert(individual)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genetic-individuals'] });
    },
  });
};

// Hook for creating new genetic marker
export const useCreateMarker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (marker: Omit<DatabaseMarker, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('genetic_markers')
        .insert(marker)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genetic-markers'] });
    },
  });
};

// Hook for bulk importing study data
export const useBulkImportStudyData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      sites: Omit<DatabaseSite, 'id' | 'created_at' | 'updated_at'>[];
      individuals: Omit<DatabaseIndividual, 'id' | 'created_at' | 'updated_at'>[];
      markers: Omit<DatabaseMarker, 'id' | 'created_at' | 'updated_at'>[];
      periods: Omit<DatabasePeriod, 'id' | 'created_at' | 'updated_at'>[];
    }) => {
      console.log('Starting bulk import of study data...');
      
      // Import sites first
      const { data: sitesData, error: sitesError } = await supabase
        .from('archaeological_sites')
        .insert(data.sites)
        .select();
      
      if (sitesError) {
        console.error('Error importing sites:', sitesError);
        throw sitesError;
      }
      
      // Import markers
      const { data: markersData, error: markersError } = await supabase
        .from('genetic_markers')
        .insert(data.markers)
        .select();
      
      if (markersError) {
        console.error('Error importing markers:', markersError);
        throw markersError;
      }
      
      // Import periods
      const { data: periodsData, error: periodsError } = await supabase
        .from('historical_periods')
        .insert(data.periods)
        .select();
      
      if (periodsError) {
        console.error('Error importing periods:', periodsError);
        throw periodsError;
      }
      
      // Map individuals to site IDs
      const individualsWithSiteIds = data.individuals.map(individual => {
        const matchingSite = sitesData?.find(site => 
          data.sites.find(originalSite => 
            originalSite.name === site.name && 
            individual.site_id === originalSite.name // Assuming site_id in study data is site name
          )
        );
        
        return {
          ...individual,
          site_id: matchingSite?.id || null
        };
      });
      
      // Import individuals
      const { data: individualsData, error: individualsError } = await supabase
        .from('genetic_individuals')
        .insert(individualsWithSiteIds)
        .select();
      
      if (individualsError) {
        console.error('Error importing individuals:', individualsError);
        throw individualsError;
      }
      
      console.log('Bulk import completed successfully');
      return {
        sites: sitesData,
        markers: markersData,
        periods: periodsData,
        individuals: individualsData
      };
    },
    onSuccess: () => {
      console.log('Invalidating all genetic data queries...');
      queryClient.invalidateQueries({ queryKey: ['archaeological-sites'] });
      queryClient.invalidateQueries({ queryKey: ['genetic-individuals'] });
      queryClient.invalidateQueries({ queryKey: ['genetic-markers'] });
      queryClient.invalidateQueries({ queryKey: ['historical-periods'] });
    },
  });
};
