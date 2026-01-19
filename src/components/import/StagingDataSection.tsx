
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { StagingStatsCards } from "./StagingStatsCards";
import { StagingTable } from "./StagingTable";
import { StagingDetailModal } from "./StagingDetailModal";
import { useStagingData } from "@/hooks/useStagingData";
import { StagingInscription } from "@/types/staging";
import { createSampleStagingData } from "@/utils/createSampleStagingData";
import { useToast } from "@/components/ui/use-toast";

export const StagingDataSection: React.FC = () => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const { stagingData, loading, stats, updateStatus, fetchStagingData, approveAllPending } = useStagingData(user?.id, isAdmin);
  const [selectedItem, setSelectedItem] = useState<StagingInscription | null>(null);
  const { toast } = useToast();

  const handleStatusUpdate = async (itemId: string, newStatus: 'approved' | 'rejected', notes?: string) => {
    const success = await updateStatus(itemId, newStatus, notes);
    if (success) {
      setSelectedItem(null);
    }
  };

  const handleCreateSampleData = async () => {
    const success = await createSampleStagingData();
    if (success) {
      toast({
        title: "Exempel-data skapad",
        description: "3 exempel-inskrifter med konflikter har lagts till i staging",
      });
      fetchStagingData();
    } else {
      toast({
        title: "Fel",
        description: "Kunde inte skapa exempel-data",
        variant: "destructive"
      });
    }
  };

  if (!user || !isAdmin) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-8 text-center">
          <p className="text-slate-300">Du måste vara inloggad som administratör för att komma åt staging-data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StagingStatsCards stats={stats} />

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Staging Data - Kräver Expertgranskning
              </CardTitle>
              <CardDescription className="text-slate-300">
                Inskrifter med konflikter eller osäkerheter som behöver manuell granskning
              </CardDescription>
            </div>
            {stats.pending > 0 && !loading && (
              <Button
                onClick={approveAllPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Godkänn alla väntande ({stats.pending})
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          {stagingData.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-slate-300 mb-4">
                Ingen staging-data finns ännu. Skapa exempel-data för att se hur systemet fungerar.
              </p>
              <Button 
                onClick={handleCreateSampleData}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Skapa exempel-data
              </Button>
            </div>
          )}
          
          {(stagingData.length > 0 || loading) && (
            <StagingTable 
              stagingData={stagingData}
              loading={loading}
              onSelectItem={setSelectedItem}
            />
          )}
        </CardContent>
      </Card>

      <StagingDetailModal
        selectedItem={selectedItem}
        onApprove={(itemId) => handleStatusUpdate(itemId, 'approved')}
        onReject={(itemId) => handleStatusUpdate(itemId, 'rejected')}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};
