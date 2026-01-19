
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Link, Upload } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CarverInscriptionImportModal } from './CarverInscriptionImportModal';

interface CarverInscription {
  carverinscriptionid: string;
  carverid: string;
  inscriptionid: string;
  attribution: 'attributed' | 'signed' | 'similar' | 'signed on pair stone';
  certainty: boolean;
  notes: string | null;
  lang: string;
  created_at: string;
  updated_at: string;
  carvers: {
    name: string;
  };
  runic_inscriptions: {
    signum: string;
    location: string | null;
  };
}

const attributionLabels: Record<string, string> = {
  'attributed': 'Tillskriven',
  'signed': 'Signerad',
  'similar': 'Liknande stil',
  'signed on pair stone': 'Signerad på parsten'
};

export const AdminCarverInscriptions: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttribution, setFilterAttribution] = useState<string>('all');
  const [importModalOpen, setImportModalOpen] = useState(false);

  const { data: carverInscriptions = [], isLoading, refetch } = useQuery({
    queryKey: ['carver_inscription', searchTerm, filterAttribution],
    queryFn: async () => {
      // Note: We need to use raw SQL query since the table uses BYTEA fields
      // This is a simplified version - in production you'd want proper joins
      let query = supabase
        .from('carver_inscription')
        .select('*')
        .order('created_at', { ascending: false });

      if (filterAttribution && filterAttribution !== 'all') {
        query = query.eq('attribution', filterAttribution as 'attributed' | 'signed' | 'similar' | 'signed on pair stone');
      }

      const { data, error } = await query;
      if (error) throw error;
      
      // Since we can't do proper joins with BYTEA fields easily, 
      // we'll return the basic data for now
      return data.map((item: any) => ({
        ...item,
        carvers: { name: 'Carver Name' }, // Placeholder
        runic_inscriptions: { signum: 'Signum', location: 'Location' } // Placeholder
      })) as CarverInscription[];
    }
  });

  const handleDeleteRelationship = async (relationship: CarverInscription) => {
    if (window.confirm(`Är du säker på att du vill ta bort denna koppling?`)) {
      try {
        const { error } = await supabase
          .from('carver_inscription')
          .delete()
          .eq('carverinscriptionid', relationship.carverinscriptionid);

        if (error) throw error;

        toast({
          title: "Borttaget",
          description: "Kopplingen har tagits bort",
        });
        refetch();
      } catch (error) {
        toast({
          title: "Fel",
          description: `Kunde inte ta bort kopplingen: ${error instanceof Error ? error.message : 'Okänt fel'}`,
          variant: "destructive"
        });
      }
    }
  };

  if (isLoading) {
    return <div className="text-white">Laddar kopplingar...</div>;
  }

  return (
    <>
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Link className="h-5 w-5 text-orange-400" />
            <CardTitle className="text-white">Runristare-Inskrifter</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            Hantera kopplingar mellan runristare och deras inskrifter (Tabell: carver_inscription)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Sök kopplingar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-white/50"
            />
            <Select value={filterAttribution} onValueChange={setFilterAttribution}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Filtrera attribution" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla</SelectItem>
                {Object.entries(attributionLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setImportModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Importera data
            </Button>
            <Button
              onClick={() => toast({ title: "Info", description: "Lägg till funktion kommer snart" })}
              className="bg-orange-600 hover:bg-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Lägg till koppling
            </Button>
          </div>

          <div className="grid gap-4">
            {carverInscriptions.map((relationship) => (
              <div
                key={relationship.carverinscriptionid}
                className="bg-white/5 rounded-lg p-4 border border-white/10"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-white font-semibold">{relationship.carvers.name}</span>
                      <span className="text-slate-400">→</span>
                      <span className="text-blue-400 font-medium">{relationship.runic_inscriptions.signum}</span>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-slate-300">
                      <span className={`px-2 py-1 rounded text-xs ${
                        relationship.attribution === 'signed' ? 'bg-green-500/20 text-green-300' :
                        relationship.attribution === 'attributed' ? 'bg-blue-500/20 text-blue-300' :
                        relationship.attribution === 'similar' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {attributionLabels[relationship.attribution]}
                      </span>
                      
                      <span className={`px-2 py-1 rounded text-xs ${
                        relationship.certainty ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {relationship.certainty ? 'Säker' : 'Osäker'}
                      </span>
                    </div>

                    {relationship.runic_inscriptions.location && (
                      <p className="text-slate-400 text-sm mt-1">
                        Plats: {relationship.runic_inscriptions.location}
                      </p>
                    )}
                    
                    {relationship.notes && (
                      <p className="text-slate-300 text-sm mt-2 italic">
                        Anteckningar: {relationship.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toast({ title: "Info", description: "Redigera funktion kommer snart" })}
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteRelationship(relationship)}
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {carverInscriptions.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              {searchTerm || filterAttribution ? 'Inga kopplingar hittades' : 'Inga kopplingar registrerade än'}
            </div>
          )}
        </CardContent>
      </Card>

      <CarverInscriptionImportModal
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
