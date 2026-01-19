
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Database } from "lucide-react";
import { InscriptionDetail } from "../InscriptionDetail";
import { useLanguage } from "@/hooks/useLanguage";

interface RunicInscription {
  id: string;
  signum: string;
  transliteration?: string;
  normalization?: string;
  translation_en?: string;
  translation_sv?: string;
  dating_text?: string;
  period_start?: number;
  period_end?: number;
  location?: string;
  province?: string;
  country?: string;
  object_type?: string;
  material?: string;
  rune_type?: string;
  style_group?: string;
  uncertainty_level?: string;
  complexity_level?: string;
  text_segments?: any;
  scholarly_notes?: string;
  historical_context?: string;
  paleographic_notes?: string;
  k_samsok_uri?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  created_at: string;
  updated_at: string;
}

interface ResultsListProps {
  inscriptions: RunicInscription[];
  isLoading: boolean;
  hasActiveSearch: boolean;
  expandedCards: Set<string>;
  onToggleExpanded: (id: string) => void;
  onResultClick?: (inscription: any) => void;
  onClearFilters: () => void;
  totalInscriptions: number;
  onInscriptionUpdate?: (updatedInscription: RunicInscription) => void;
}

export const ResultsList: React.FC<ResultsListProps> = ({
  inscriptions,
  isLoading,
  hasActiveSearch,
  expandedCards,
  onToggleExpanded,
  onResultClick,
  onClearFilters,
  totalInscriptions,
  onInscriptionUpdate
}) => {
  const { isSwedish } = useLanguage();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="animate-pulse">
                <div className="h-4 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded mb-4 w-3/4"></div>
                <div className="h-3 bg-white/20 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-white/20 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (inscriptions.length > 0) {
    return (
      <ScrollArea className="h-[600px]">
        <div className="space-y-4 pr-2">
          {inscriptions.map((inscription) => (
            <div 
              key={inscription.id}
              onClick={() => onResultClick?.(inscription)}
              className="cursor-pointer"
            >
              <InscriptionDetail
                inscription={inscription}
                isExpanded={expandedCards.has(inscription.id)}
                onToggle={() => onToggleExpanded(inscription.id)}
                onUpdate={onInscriptionUpdate}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (hasActiveSearch) {
    return (
      <div className="text-center py-12">
        <Search className="h-16 w-16 text-slate-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">
          {isSwedish ? 'Inga resultat hittades' : 'No results found'}
        </h3>
        <p className="text-slate-400">
          {isSwedish ? 'Inga inskrifter matchade dina sökkriterier' : 'No inscriptions matched your search criteria'}
        </p>
        <Button 
          onClick={onClearFilters}
          className="mt-4 bg-slate-600 hover:bg-slate-700"
        >
          {isSwedish ? 'Rensa alla filter' : 'Clear all filters'}
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <Database className="h-16 w-16 text-blue-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">
        {isSwedish ? 'Redo att utforska' : 'Ready to explore'}
      </h3>
      <p className="text-slate-400">
        {isSwedish ? 'Använd sök eller filter för att hitta inskrifter' : 'Use search or filters to find inscriptions'}
      </p>
      <p className="text-slate-500 text-sm mt-2">
        {totalInscriptions} {isSwedish ? 'inskrifter tillgängliga' : 'inscriptions available'}
      </p>
    </div>
  );
};
