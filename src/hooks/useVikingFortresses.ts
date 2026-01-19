
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VikingFortress {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  fortress_type: string;
  construction_period?: string;
  construction_start?: number;
  construction_end?: number;
  diameter_meters?: number;
  area_hectares?: number;
  description?: string;
  country: string;
  region?: string;
  status: string;
  unesco_site: boolean;
  excavated: boolean;
  historical_significance?: string;
}

export const useVikingFortresses = (enabled: boolean = false) => {
  const [fortresses, setFortresses] = useState<VikingFortress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Convert PostgreSQL point to coordinates object
  const parseCoordinates = (coordinatesData: any): { lat: number; lng: number } | null => {
    if (!coordinatesData) return null;
    
    // Handle different formats of coordinates from database
    if (typeof coordinatesData === 'string') {
      // Parse PostgreSQL point format "(x,y)"
      const match = coordinatesData.match(/\(([^,]+),([^)]+)\)/);
      if (match) {
        return {
          lng: parseFloat(match[1]),
          lat: parseFloat(match[2])
        };
      }
    } else if (coordinatesData && typeof coordinatesData === 'object') {
      // Already parsed object
      if (coordinatesData.lat && coordinatesData.lng) {
        return coordinatesData;
      }
      if (coordinatesData.x && coordinatesData.y) {
        return { lng: coordinatesData.x, lat: coordinatesData.y };
      }
    }
    
    return null;
  };

  useEffect(() => {
    if (!enabled) {
      setFortresses([]);
      return;
    }

    const fetchFortresses = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error: supabaseError } = await supabase
          .from('viking_fortresses')
          .select('*')
          .order('name');

        if (supabaseError) {
          console.error('Error fetching viking fortresses:', supabaseError);
          setError('Failed to load viking fortresses');
          return;
        }

        // Process coordinates for each fortress
        const processedFortresses = (data || []).map(fortress => ({
          ...fortress,
          coordinates: parseCoordinates(fortress.coordinates)
        })).filter(fortress => fortress.coordinates !== null) as VikingFortress[];

        console.log(`Loaded ${processedFortresses.length} viking fortresses`);
        setFortresses(processedFortresses);

      } catch (error) {
        console.error('Error loading viking fortresses:', error);
        setError('Failed to load viking fortresses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFortresses();
  }, [enabled]);

  return { fortresses, isLoading, error };
};
