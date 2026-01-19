
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, TrendingUp, Dna, Edit, Trash2, Users } from "lucide-react";

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

interface GeneticEventCardProps {
  event: GeneticEvent;
  selectionColor: string;
  strengthText: string;
  isLoading: boolean;
}

export const GeneticEventCard: React.FC<GeneticEventCardProps> = ({
  event,
  selectionColor,
  strengthText,
  isLoading
}) => {
  const formatYear = (year: number): string => {
    if (year < 0) {
      return `${Math.abs(year)} f.Kr.`;
    }
    return `${year} e.Kr.`;
  };

  const getDuration = (start: number, end: number): string => {
    const duration = Math.abs(start - end);
    if (duration >= 1000) {
      return `${Math.round(duration / 1000)} tusen år`;
    }
    return `${duration} år`;
  };

  const getPeriodColor = (period: string) => {
    switch (period) {
      case 'paleolithic': return 'bg-gray-100 text-gray-800';
      case 'mesolithic': return 'bg-slate-100 text-slate-800';
      case 'neolithic': return 'bg-green-100 text-green-800';
      case 'bronze_age': return 'bg-amber-100 text-amber-800';
      case 'iron_age': return 'bg-orange-100 text-orange-800';
      case 'viking_age': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPeriodName = (period: string) => {
    switch (period) {
      case 'paleolithic': return 'Paleolitikum';
      case 'mesolithic': return 'Mesolitikum';
      case 'neolithic': return 'Neolitikum';
      case 'bronze_age': return 'Bronsålder';
      case 'iron_age': return 'Järnålder';
      case 'viking_age': return 'Vikingatid';
      default: return period;
    }
  };

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case 'ancient_dna': return '🧬';
      case 'modern_genetics': return '🔬';
      case 'archaeological': return '🏺';
      case 'statistical': return '📊';
      default: return '🔬';
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-lg">{event.event_name}</CardTitle>
            <p className="text-slate-300 text-sm">{event.event_name_en}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-white">
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-slate-400 hover:text-red-400">
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        
        {/* Period and Time Range */}
        <div className="flex justify-between items-center">
          <Badge className={getPeriodColor(event.period)}>
            {getPeriodName(event.period)}
          </Badge>
          <span className="text-slate-300 text-xs">
            {formatYear(event.year_start)} - {formatYear(event.year_end)}
          </span>
        </div>

        {/* Duration and Modern Frequency */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Varaktighet:</span>
            </div>
            <p className="text-slate-300 text-xs">{getDuration(event.year_start, event.year_end)}</p>
          </div>
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Modern frekvens:</span>
            </div>
            <p className="text-slate-300 text-xs">{event.modern_frequency}%</p>
          </div>
        </div>

        {/* Genetic Change */}
        <div className="bg-slate-800/50 rounded p-2">
          <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
            <Dna className="h-3 w-3" />
            <span>Genetisk förändring:</span>
          </div>
          <p className="text-slate-300 text-xs">{event.genetic_change}</p>
        </div>

        {/* Related Genes */}
        {event.related_genes && event.related_genes.length > 0 && (
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs">Relaterade gener:</div>
            <div className="flex flex-wrap gap-1">
              {event.related_genes.map((gene, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {gene}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Selection Strength and Evidence */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs">Selektionsstyrka:</div>
            <Badge className={selectionColor}>
              {strengthText}
            </Badge>
          </div>
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs">Bevistyp:</div>
            <div className="text-slate-300 text-xs flex items-center gap-1">
              <span>{getEvidenceIcon(event.evidence_type)}</span>
              <span className="capitalize">{event.evidence_type.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Geographic Region */}
        <div className="bg-slate-800/50 rounded p-2">
          <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>Geografisk region:</span>
          </div>
          <p className="text-slate-300 text-xs">{event.geographic_region}</p>
        </div>

        {/* Population Impact */}
        <div className="bg-slate-800/50 rounded p-2">
          <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>Befolkningspåverkan:</span>
          </div>
          <p className="text-slate-300 text-xs">{event.population_impact}</p>
        </div>

        {/* Description */}
        <div className="bg-slate-800/50 rounded p-2">
          <div className="text-slate-400 mb-1 text-xs">Beskrivning:</div>
          <p className="text-slate-300 text-xs leading-relaxed">{event.description}</p>
        </div>

        {/* Evolutionary Advantage */}
        {event.evolutionary_advantage && (
          <div className="bg-green-900/20 rounded p-2 border border-green-700/30">
            <div className="text-green-400 mb-1 text-xs">Evolutionär fördel:</div>
            <p className="text-green-300 text-xs">{event.evolutionary_advantage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
