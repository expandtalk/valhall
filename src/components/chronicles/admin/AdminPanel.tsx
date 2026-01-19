import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Shield, Edit, Trash2 } from 'lucide-react';
import { useHistoricalKings } from '@/hooks/chronicles';
import { useIsAdmin } from '@/hooks/useAuth';
import { AddKingDialog } from './AddKingDialog';
import { EditKingDialog } from './EditKingDialog';
import { useToast } from '@/hooks/use-toast';
import type { HistoricalKing } from '@/hooks/chronicles';

interface AdminPanelProps {
  selectedRegion?: string;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ selectedRegion }) => {
  const { isAdmin } = useIsAdmin();
  const { data: kings, refetch } = useHistoricalKings(selectedRegion);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingKing, setEditingKing] = useState<HistoricalKing | null>(null);
  const { toast } = useToast();

  if (!isAdmin) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center text-slate-300">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <p>Admin-behörighet krävs för att hantera kungalängden</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleKingAdded = () => {
    refetch();
    setIsAddDialogOpen(false);
    toast({
      title: "Kung tillagd",
      description: "Den nya kungen har lagts till i kungalängden",
    });
  };

  const handleKingUpdated = () => {
    refetch();
    setEditingKing(null);
    toast({
      title: "Kung uppdaterad",
      description: "Kungen har uppdaterats framgångsrikt",
    });
  };

  const handleDeleteKing = async (kingId: string) => {
    // TODO: Implement delete functionality
    toast({
      title: "Funktionalitet kommer snart",
      description: "Radering av kungar kommer att implementeras",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin - Hantera Kungalängd
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-primary hover:bg-primary/80"
          >
            <Plus className="h-4 w-4 mr-2" />
            Lägg till ny kung
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kings?.map((king) => (
          <Card key={king.id} className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg">{king.name}</CardTitle>
              <p className="text-slate-300 text-sm">
                {king.region} • {king.reign_start}–{king.reign_end || 'pågående'}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingKing(king)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteKing(king.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddKingDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onKingAdded={handleKingAdded}
      />

      {editingKing && (
        <EditKingDialog
          king={editingKing}
          isOpen={!!editingKing}
          onClose={() => setEditingKing(null)}
          onKingUpdated={handleKingUpdated}
        />
      )}
    </div>
  );
};