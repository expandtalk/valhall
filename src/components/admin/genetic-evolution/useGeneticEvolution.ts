
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface GeneticEvent {
  id: string;
  event_name: string;
  event_name_en: string;
  period: string;
  year_start: number;
  year_end: number;
  genetic_change: string;
  population_impact: string;
  selection_strength: string;
  evidence_type: string;
  geographic_region: string;
  modern_frequency: number;
  description: string;
  description_en: string;
  related_genes: string[];
  evolutionary_advantage: string;
}

export const useGeneticEvolution = () => {
  const [geneticEvents, setGeneticEvents] = useState<GeneticEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data för demo - ersätts med riktig Supabase-data senare
  const mockGeneticEvents: GeneticEvent[] = [
    {
      id: '1',
      event_name: 'Laktostolerans uppkommer',
      event_name_en: 'Lactose tolerance emerges',
      period: 'neolithic',
      year_start: -5000,
      year_end: -2000,
      genetic_change: 'LCT-13910*T mutation',
      population_impact: 'Dramatisk ökning från 5% till 95%',
      selection_strength: 'very_strong',
      evidence_type: 'ancient_dna',
      geographic_region: 'Norra Europa',
      modern_frequency: 95,
      description: 'Den snabbaste kända positiva selektion hos människor. Möjliggjorde mjölkkonsumtion i vuxen ålder.',
      description_en: 'The fastest known positive selection in humans. Enabled adult milk consumption.',
      related_genes: ['LCT', 'MCM6'],
      evolutionary_advantage: '6% högre reproduktiv framgång, överlevnad under hungersnöd'
    },
    {
      id: '2',
      event_name: 'Ljus hud utvecklas',
      event_name_en: 'Light skin develops',
      period: 'bronze_age',
      year_start: -5000,
      year_end: -3000,
      genetic_change: 'SLC24A5, SLC45A2 varianter',
      population_impact: 'Från 63% mörk hud till 8%',
      selection_strength: 'strong',
      evidence_type: 'ancient_dna',
      geographic_region: 'Norra/Centrala Europa',
      modern_frequency: 90,
      description: 'Stark selektion för ljus pigmentering kopplat till vitamin D-produktion i låga ljusförhållanden.',
      description_en: 'Strong selection for light pigmentation linked to vitamin D production in low-light conditions.',
      related_genes: ['SLC24A5', 'SLC45A2', 'TYR'],
      evolutionary_advantage: 'Bättre vitamin D-syntes i nordliga breddgrader'
    },
    {
      id: '3',
      event_name: 'Yamna-folkets migration',
      event_name_en: 'Yamnaya migration',
      period: 'bronze_age',
      year_start: -4800,
      year_end: -4000,
      genetic_change: 'Längd-gener och pigmentgener',
      population_impact: 'Genetisk replacement 50-75%',
      selection_strength: 'strong',
      evidence_type: 'ancient_dna',
      geographic_region: 'Hela Europa',
      modern_frequency: 60,
      description: 'Yamna-kulturen från Pontisk-Kaspiska stäpperna förde med sig gener för längd och vissa pigmentdrag.',
      description_en: 'Yamnaya culture from Pontic-Caspian steppes brought genes for height and certain pigmentation traits.',
      related_genes: ['HMGA2', 'ACAN', 'various height genes'],
      evolutionary_advantage: 'Större kroppsstorlek, anpassning till klimat'
    },
    {
      id: '4',
      event_name: 'Ljusa ögon uppträder',
      event_name_en: 'Light eyes appear',
      period: 'mesolithic',
      year_start: -14000,
      year_end: -4000,
      genetic_change: 'OCA2/HERC2 mutationer',
      population_impact: 'Från 0% till 80% i Norden',
      selection_strength: 'moderate',
      evidence_type: 'ancient_dna',
      geographic_region: 'Norra/Västra Europa',
      modern_frequency: 80,
      description: 'Blå och gröna ögon utvecklas genom mutationer i OCA2/HERC2-generna.',
      description_en: 'Blue and green eyes develop through mutations in OCA2/HERC2 genes.',
      related_genes: ['OCA2', 'HERC2'],
      evolutionary_advantage: 'Möjlig ljuskänslighet, sexuell selektion'
    },
    {
      id: '5',
      event_name: 'Längd-selektion startar',
      event_name_en: 'Height selection begins',
      period: 'neolithic',
      year_start: -8000,
      year_end: -3000,
      genetic_change: 'Polygenetisk längd-selektion',
      population_impact: 'Norden blir längst i världen',
      selection_strength: 'strong',
      evidence_type: 'statistical',
      geographic_region: 'Norra/Centrala Europa',
      modern_frequency: 85,
      description: 'Stark selektion för längd i nordliga klimat, förstärkt av Yamna-migration.',
      description_en: 'Strong selection for height in northern climates, reinforced by Yamnaya migration.',
      related_genes: ['HMGA2', 'ACAN', 'GDF5', 'ZBTB38'],
      evolutionary_advantage: 'Klimatanpassning, näringseffektivitet'
    }
  ];

  const fetchGeneticEvents = async () => {
    try {
      // För nu använder vi mock data
      setGeneticEvents(mockGeneticEvents);
      setLoading(false);
      
      // TODO: Implementera riktig Supabase-fråga när tabellen skapats
      // const { data, error } = await supabase
      //   .from('genetic_evolution_events')
      //   .select('*')
      //   .order('year_start', { ascending: false });

      // if (error) throw error;
      // setGeneticEvents(data || []);
    } catch (error) {
      console.error('Error fetching genetic events:', error);
      toast({
        title: "Fel",
        description: "Kunde inte hämta genetiska händelser",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeneticEvents();
  }, []);

  return {
    geneticEvents,
    loading,
    isLoading,
    fetchGeneticEvents
  };
};
