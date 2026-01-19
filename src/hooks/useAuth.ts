import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useIsAdmin = () => {
  const { data: isAdmin = false, isLoading } = useQuery({
    queryKey: ['is-admin'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .rpc('is_admin');
      
      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return data || false;
    },
  });

  return { isAdmin, isLoading };
};