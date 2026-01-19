
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

export interface Hundred {
  id: string;
  name: string;
}

export const useHundreds = () => {
  const [hundreds, setHundreds] = useState<Hundred[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchHundreds = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('hundreds')
        .select('id, name')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching hundreds:', error);
        toast({
          title: "Error fetching data",
          description: "Could not fetch hundreds data.",
          variant: "destructive",
        });
      } else {
        setHundreds(data as Hundred[]);
      }
      setIsLoading(false);
    };

    fetchHundreds();
  }, []);

  return { hundreds, isLoading };
};
