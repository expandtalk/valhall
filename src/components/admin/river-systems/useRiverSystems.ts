import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface RiverSystem {
  id: string;
  name: string;
  name_en: string;
  description?: string;
  period: string;
  significance?: string;
  historical_significance?: string;
  color: string;
  width: number;
  importance: 'primary' | 'secondary';
  type?: string;
  total_length_km?: number;
  coordinates?: RiverCoordinate[];
}

export interface RiverCoordinate {
  id: string;
  sequence_order: number;
  latitude: number;
  longitude: number;
  name?: string;
  name_en?: string;
  description?: string;
  is_trading_post: boolean;
  is_portage: boolean;
}

export const useRiverSystems = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch river systems with coordinates
  const { data: riverSystems, isLoading } = useQuery({
    queryKey: ['river-systems'],
    queryFn: async (): Promise<RiverSystem[]> => {
      const { data: systems, error: systemsError } = await supabase
        .from('river_systems')
        .select('*')
        .order('name');

      if (systemsError) throw systemsError;

      // Fetch coordinates for each system
      const systemsWithCoordinates = await Promise.all(
        systems.map(async (system) => {
          const { data: coordinates, error: coordsError } = await supabase
            .from('river_coordinates')
            .select('*')
            .eq('river_system_id', system.id)
            .order('sequence_order');

          if (coordsError) throw coordsError;

          return {
            ...system,
            importance: (system.importance === 'primary' ? 'primary' : 'secondary') as 'primary' | 'secondary',
            coordinates: coordinates || []
          };
        })
      );

      return systemsWithCoordinates;
    }
  });

  // Create river system
  const createRiverSystem = useMutation({
    mutationFn: async (data: { 
      riverSystem: Omit<RiverSystem, 'id' | 'coordinates'>;
      coordinates: Omit<RiverCoordinate, 'id'>[]
    }) => {
      // Create river system
      const { data: system, error: systemError } = await supabase
        .from('river_systems')
        .insert([data.riverSystem])
        .select()
        .single();

      if (systemError) throw systemError;

      // Create coordinates if provided
      if (data.coordinates.length > 0) {
        const coordinatesWithSystemId = data.coordinates.map(coord => ({
          ...coord,
          river_system_id: system.id
        }));

        const { error: coordsError } = await supabase
          .from('river_coordinates')
          .insert(coordinatesWithSystemId);

        if (coordsError) throw coordsError;
      }

      return system;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['river-systems'] });
      toast({
        title: "Vattenväg skapad",
        description: "Den nya vattenvägen har lagts till framgångsrikt"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte skapa vattenväg: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Update river system
  const updateRiverSystem = useMutation({
    mutationFn: async ({ id, data }: { 
      id: string; 
      data: { 
        riverSystem: Partial<RiverSystem>;
        coordinates: Omit<RiverCoordinate, 'id'>[]
      }
    }) => {
      // Update river system
      const { error: systemError } = await supabase
        .from('river_systems')
        .update(data.riverSystem)
        .eq('id', id);

      if (systemError) throw systemError;

      // Delete existing coordinates
      const { error: deleteError } = await supabase
        .from('river_coordinates')
        .delete()
        .eq('river_system_id', id);

      if (deleteError) throw deleteError;

      // Insert new coordinates
      if (data.coordinates.length > 0) {
        const coordinatesWithSystemId = data.coordinates.map(coord => ({
          ...coord,
          river_system_id: id
        }));

        const { error: coordsError } = await supabase
          .from('river_coordinates')
          .insert(coordinatesWithSystemId);

        if (coordsError) throw coordsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['river-systems'] });
      toast({
        title: "Vattenväg uppdaterad",
        description: "Vattenvägen har uppdaterats framgångsrikt"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte uppdatera vattenväg: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Add coordinate to existing river system
  const addCoordinate = useMutation({
    mutationFn: async ({ riverSystemId, coordinate }: { 
      riverSystemId: string; 
      coordinate: Omit<RiverCoordinate, 'id'>
    }) => {
      const { error } = await supabase
        .from('river_coordinates')
        .insert([{
          ...coordinate,
          river_system_id: riverSystemId
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['river-systems'] });
      toast({
        title: "Koordinat tillagd",
        description: "Den nya koordinaten har lagts till framgångsrikt"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte lägga till koordinat: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Delete river system
  const deleteRiverSystem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('river_systems')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['river-systems'] });
      toast({
        title: "Vattenväg borttagen",
        description: "Vattenvägen har tagits bort framgångsrikt"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte ta bort vattenväg: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  return {
    riverSystems,
    isLoading,
    createRiverSystem,
    updateRiverSystem,
    addCoordinate,
    deleteRiverSystem
  };
};