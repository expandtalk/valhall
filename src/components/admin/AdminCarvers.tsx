
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, User, Upload } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAdminOperations } from "@/hooks/useAdminOperations";
import { CarverImportModal } from './CarverImportModal';

interface Carver {
  id: string;
  name: string;
  description: string | null;
  period_active_start: number | null;
  period_active_end: number | null;
  region: string | null;
  country: string | null;
  language_code: string;
  created_at: string;
  updated_at: string;
}

export const AdminCarvers: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  
  const {
    handleEdit,
    handleDelete,
    handleAdd,
    editModalOpen,
    currentEditItem,
    currentEditType,
    closeEditModal,
    handleSaveEdit,
    isLoading: operationLoading
  } = useAdminOperations();

  const { data: carvers = [], isLoading, refetch } = useQuery({
    queryKey: ['carvers', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('carvers')
        .select('*')
        .order('name');

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,region.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Carver[];
    }
  });

  const handleDeleteCarver = async (carver: Carver) => {
    if (window.confirm(`Är du säker på att du vill ta bort runristaren "${carver.name}"?`)) {
      try {
        const { error } = await supabase
          .from('carvers')
          .delete()
          .eq('id', carver.id);

        if (error) throw error;

        toast({
          title: "Borttaget",
          description: `Runristaren "${carver.name}" har tagits bort`,
        });
        refetch();
      } catch (error) {
        toast({
          title: "Fel",
          description: `Kunde inte ta bort runristaren: ${error instanceof Error ? error.message : 'Okänt fel'}`,
          variant: "destructive"
        });
      }
    }
  };

  const formatPeriod = (start: number | null, end: number | null) => {
    if (!start && !end) return 'Okänd period';
    if (start && end) return `${start}-${end}`;
    if (start) return `från ${start}`;
    if (end) return `till ${end}`;
    return 'Okänd period';
  };

  if (isLoading) {
    return <div className="text-white">Laddar runristare...</div>;
  }

  return (
    <>
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-purple-400" />
            <CardTitle className="text-white">Runristare</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            Hantera information om runristare och deras verksamma perioder (Tabell: carvers)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Sök runristare..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            <Button
              onClick={() => setImportModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Importera data
            </Button>
            <Button
              onClick={() => handleAdd('Runristare')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Lägg till
            </Button>
          </div>

          <div className="grid gap-4">
            {carvers.map((carver) => (
              <div
                key={carver.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{carver.name}</h3>
                    {carver.description && (
                      <p className="text-slate-300 text-sm mt-1">{carver.description}</p>
                    )}
                    <div className="flex gap-4 mt-2 text-sm text-slate-400">
                      <span>Period: {formatPeriod(carver.period_active_start, carver.period_active_end)}</span>
                      {carver.region && <span>Region: {carver.region}</span>}
                      {carver.country && <span>Land: {carver.country}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit('Runristare', carver)}
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCarver(carver)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {carvers.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              {searchTerm ? 'Inga runristare hittades' : 'Inga runristare registrerade än'}
            </div>
          )}
        </CardContent>
      </Card>

      <CarverImportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImportComplete={() => {
          refetch();
          setImportModalOpen(false);
        }}
      />
    </>
  );
};
