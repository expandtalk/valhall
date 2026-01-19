import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, ArrowRight, Save, AlertCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DuplicateGroup {
  canonical_signum: string;
  duplicates: Array<{
    id: string;
    signum: string;
    location?: string;
    parish?: string;
    transliteration?: string;
  }>;
}

export const SignumManagement: React.FC = () => {
  const [duplicateGroups, setDuplicateGroups] = useState<DuplicateGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMappings, setSelectedMappings] = useState<Record<string, { primary: string; alternatives: string[] }>>({});
  const { toast } = useToast();

  useEffect(() => {
    loadDuplicateSignums();
  }, []);

  const loadDuplicateSignums = async () => {
    setIsLoading(true);
    try {
      // Hitta alla signum som förekommer mer än en gång
      const { data, error } = await supabase
        .from('runic_inscriptions')
        .select('id, signum, location, parish, transliteration')
        .order('signum');

      if (error) throw error;

      // Gruppera efter signum och hitta dubletter
      const signumGroups: Record<string, typeof data> = {};
      data?.forEach(inscription => {
        const normalizedSignum = inscription.signum.trim().toUpperCase();
        if (!signumGroups[normalizedSignum]) {
          signumGroups[normalizedSignum] = [];
        }
        signumGroups[normalizedSignum].push(inscription);
      });

      // Filtrera till endast grupper med fler än en inskrift
      const duplicates: DuplicateGroup[] = Object.entries(signumGroups)
        .filter(([_, inscriptions]) => inscriptions.length > 1)
        .map(([signum, inscriptions]) => ({
          canonical_signum: signum,
          duplicates: inscriptions
        }));

      setDuplicateGroups(duplicates);
      
      // Initialisera mappningar
      const initialMappings: Record<string, { primary: string; alternatives: string[] }> = {};
      duplicates.forEach(group => {
        initialMappings[group.canonical_signum] = {
          primary: group.duplicates[0].id, // Första som standard primär
          alternatives: group.duplicates.slice(1).map(d => d.id)
        };
      });
      setSelectedMappings(initialMappings);

    } catch (error) {
      console.error('Error loading duplicate signums:', error);
      toast({
        title: "Fel",
        description: "Kunde inte ladda dubbletter av signum",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setPrimaryInscription = (groupSignum: string, inscriptionId: string) => {
    setSelectedMappings(prev => {
      const group = duplicateGroups.find(g => g.canonical_signum === groupSignum);
      if (!group) return prev;

      const allIds = group.duplicates.map(d => d.id);
      const alternatives = allIds.filter(id => id !== inscriptionId);

      return {
        ...prev,
        [groupSignum]: {
          primary: inscriptionId,
          alternatives
        }
      };
    });
  };

  const applySignumMappings = async () => {
    setIsLoading(true);
    try {
      // Först kör migrationen för att skapa kolumnerna
      const migrationSql = `
        -- Lägg till primary_signum och alternative_signum kolumner
        ALTER TABLE runic_inscriptions 
        ADD COLUMN IF NOT EXISTS primary_signum TEXT,
        ADD COLUMN IF NOT EXISTS alternative_signum TEXT[];

        -- Skapa index för bättre prestanda
        CREATE INDEX IF NOT EXISTS idx_runic_inscriptions_primary_signum 
        ON runic_inscriptions(primary_signum);

        CREATE INDEX IF NOT EXISTS idx_runic_inscriptions_alternative_signum 
        ON runic_inscriptions USING GIN(alternative_signum);
      `;

      // Först måste vi köra migrationen via Supabase migration tool
      // För nu, bara uppdatera befintliga data

      // Visa varning att migrationen måste köras först
      toast({
        title: "Kräver migration",
        description: "Du måste först köra migrationen för att lägga till primary_signum och alternative_signum kolumner",
        variant: "destructive"
      });
      
      return;

      toast({
        title: "Klart!",
        description: `Uppdaterade ${Object.keys(selectedMappings).length} signum-grupper`,
        variant: "default"
      });

      // Ladda om data
      await loadDuplicateSignums();

    } catch (error) {
      console.error('Error applying signum mappings:', error);
      toast({
        title: "Fel",
        description: "Kunde inte tillämpa signum-mappningar",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGroups = duplicateGroups.filter(group =>
    group.canonical_signum.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.duplicates.some(d => 
      d.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.parish?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            Signum-hantering
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Hantera dubletter av signum. Välj vilket som ska vara primärt och vilka som ska vara alternativa.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sök signum, plats eller socken..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button 
              onClick={applySignumMappings}
              disabled={isLoading || Object.keys(selectedMappings).length === 0}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Tillämpa mappningar ({Object.keys(selectedMappings).length})
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            Hittade {duplicateGroups.length} signum med dubletter
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Laddar...</div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredGroups.map(group => (
            <Card key={group.canonical_signum}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Signum: {group.canonical_signum}
                  <Badge variant="secondary" className="ml-2">
                    {group.duplicates.length} dubletter
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.duplicates.map(inscription => {
                    const isSelected = selectedMappings[group.canonical_signum]?.primary === inscription.id;
                    return (
                      <div 
                        key={inscription.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                            : 'border-border hover:border-purple-300'
                        }`}
                        onClick={() => setPrimaryInscription(group.canonical_signum, inscription.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="font-medium flex items-center gap-2">
                              {inscription.signum}
                              {isSelected && (
                                <Badge variant="default" className="bg-purple-600">
                                  Primär
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {inscription.location && `${inscription.location}, `}
                              {inscription.parish}
                            </div>
                            {inscription.transliteration && (
                              <div className="text-sm text-muted-foreground italic">
                                {inscription.transliteration}
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <ArrowRight className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};