
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { StagingInscription, StagingStats } from "@/types/staging";

export const useStagingData = (userId: string | undefined, isAdmin: boolean) => {
  const { toast } = useToast();
  const [stagingData, setStagingData] = useState<StagingInscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StagingStats>({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  });

  const updateStateAfterChange = (newData: StagingInscription[]) => {
    setStagingData(newData);
    const pending = newData.filter(item => item.status === 'pending').length || 0;
    const approved = newData.filter(item => item.status === 'approved').length || 0;
    const rejected = newData.filter(item => item.status === 'rejected').length || 0;
    setStats({
      pending,
      approved,
      rejected,
      total: newData.length || 0
    });
  };

  const fetchStagingData = async () => {
    try {
      setLoading(true);
      
      const BATCH_SIZE = 1000; // Supabase's default limit
      let allData: StagingInscription[] = [];
      let offset = 0;
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from('staging_inscriptions')
          .select('*')
          .order('created_at', { ascending: false })
          .range(offset, offset + BATCH_SIZE - 1);

        if (error) throw error;

        if (data && data.length > 0) {
          allData = [...allData, ...data as unknown as StagingInscription[]];
          offset += data.length;
          if (data.length < BATCH_SIZE) {
            hasMore = false;
          }
        } else {
          hasMore = false;
        }
      }

      updateStateAfterChange(allData);

    } catch (error) {
      console.error('Error fetching staging data:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta staging-data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const approveAllPending = async () => {
    if (!userId) {
      toast({
        title: "Autentisering krävs",
        description: "Du måste vara inloggad för att utföra denna åtgärd.",
        variant: "destructive"
      });
      return false;
    }

    const pendingItemsToApprove = stagingData.filter(item => item.status === 'pending');
    if (pendingItemsToApprove.length === 0) {
      toast({
        title: "Inga väntande objekt",
        description: "Det finns inga objekt att godkänna.",
        variant: "default"
      });
      return false;
    }

    const itemIds = pendingItemsToApprove.map(item => item.id);

    try {
      setLoading(true);

      const batchSize = 500;
      let approvedCount = 0;

      for (let i = 0; i < itemIds.length; i += batchSize) {
        const batch = itemIds.slice(i, i + batchSize);
        console.log(`Approving batch of ${batch.length} items...`);

        const { error } = await supabase
          .from('staging_inscriptions')
          .update({
            status: 'approved',
            expert_notes: 'Godkänd via masshantering.',
            reviewed_at: new Date().toISOString(),
            reviewed_by: userId
          })
          .in('id', batch);

        if (error) {
          throw error;
        }
        
        approvedCount += batch.length;
      }

      toast({
        title: "Massgodkännande lyckades",
        description: `${approvedCount} objekt har godkänts.`,
      });

      const updatedData = stagingData.map(item => 
        itemIds.includes(item.id) 
          ? { ...item, status: 'approved' as const, expert_notes: 'Godkänd via masshantering.', reviewed_at: new Date().toISOString(), reviewed_by: userId! } 
          : item
      );
      updateStateAfterChange(updatedData);
      
      return true;
    } catch (error) {
      console.error('Error bulk approving items:', error);
      toast({
        title: "Fel vid massgodkännande",
        description: `Ett fel uppstod: ${error instanceof Error ? error.message : 'Okänt fel'}`,
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (itemId: string, newStatus: 'approved' | 'rejected', notes?: string) => {
    if (!userId) {
        toast({
            title: "Autentisering krävs",
            description: "Du måste vara inloggad för att uppdatera status.",
            variant: "destructive"
        });
        return false;
    }
    try {
      const { error } = await supabase
        .from('staging_inscriptions')
        .update({
          status: newStatus,
          expert_notes: notes,
          reviewed_at: new Date().toISOString(),
          reviewed_by: userId
        })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: "Status uppdaterad",
        description: `Inskrift markerad som ${newStatus === 'approved' ? 'godkänd' : 'avvisad'}`,
      });
      
      const updatedData = stagingData.map(item =>
        item.id === itemId
          ? { ...item, status: newStatus, expert_notes: notes, reviewed_at: new Date().toISOString(), reviewed_by: userId }
          : item
      );
      updateStateAfterChange(updatedData);

      return true;
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera status",
        variant: "destructive"
      });
      return false;
    }
  };

  useEffect(() => {
    if (userId && isAdmin) {
      fetchStagingData();
    }
  }, [userId, isAdmin]);

  return {
    stagingData,
    loading,
    stats,
    fetchStagingData,
    updateStatus,
    approveAllPending
  };
};
