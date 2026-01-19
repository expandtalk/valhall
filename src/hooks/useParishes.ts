
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

export interface Parish {
  id: string;
  name: string;
  code: string | null;
}

export const useParishes = () => {
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchParishes = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('parishes')
        .select('id, name, code')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching parishes:', error);
        toast({
          title: "Error fetching data",
          description: "Could not fetch parishes data.",
          variant: "destructive",
        });
      } else {
        setParishes(data as Parish[]);
      }
      setIsLoading(false);
    };

    fetchParishes();
  }, []);

  return { parishes, isLoading };
};
