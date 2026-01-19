
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dna, Globe, Shield, Sun, Lightbulb } from "lucide-react";

interface EyeColor {
  id: string;
  color_name: string;
  color_name_en: string;
  global_frequency_percent: number;
  rarity_rank: number;
  genetic_complexity: string;
  main_genes: string[];
  historical_origin: string;
  evolutionary_advantage: string;
  light_sensitivity_level: string;
  health_protection_level: string;
  cultural_associations: string;
}

interface EyeColorCardProps {
  color: EyeColor;
  rarityColor: string;
  isLoading: boolean;
}

export const EyeColorCard: React.FC<EyeColorCardProps> = ({
  color,
  rarityColor,
  isLoading
}) => {
  const getComplexityIcon = (complexity: string) => {
    switch (complexity) {
      case 'single_mutation': return <Lightbulb className="h-3 w-3" />;
      case 'polygenic': return <Dna className="h-3 w-3" />;
      case 'dominant_trait': return <Shield className="h-3 w-3" />;
      default: return <Dna className="h-3 w-3" />;
    }
  };

  const getComplexityText = (complexity: string) => {
    switch (complexity) {
      case 'single_mutation': return 'Enkel mutation';
      case 'polygenic': return 'Polygenetisk';
      case 'dominant_trait': return 'Dominant drag';
      default: return complexity;
    }
  };

  const getSensitivityIcon = (level: string) => {
    switch (level) {
      case 'high': return '🔆';
      case 'medium': return '🌤️';
      case 'low': return '☀️';
      default: return '🌤️';
    }
  };

  const getProtectionIcon = (level: string) => {
    switch (level) {
      case 'high': return '🛡️';
      case 'medium': return '🔒';
      case 'low': return '⚠️';
      default: return '🔒';
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-lg">{color.color_name}</CardTitle>
            <p className="text-slate-300 text-sm">{color.color_name_en}</p>
            <p className="text-slate-400 text-xs">#{color.rarity_rank} sällsyntast</p>
          </div>
          <Badge className={rarityColor}>
            {color.global_frequency_percent}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        
        {/* Genetic Complexity */}
        <div className="bg-slate-800/50 rounded p-2">
          <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
            {getComplexityIcon(color.genetic_complexity)}
            <span>Genetisk komplexitet:</span>
          </div>
          <p className="text-slate-300 text-xs">{getComplexityText(color.genetic_complexity)}</p>
        </div>

        {/* Main Genes */}
        {color.main_genes && color.main_genes.length > 0 && (
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
              <Dna className="h-3 w-3" />
              <span>Huvudgener:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {color.main_genes.map((gene, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {gene}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Historical Origin */}
        {color.historical_origin && (
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
              <Globe className="h-3 w-3" />
              <span>Historiskt ursprung:</span>
            </div>
            <p className="text-slate-300 text-xs">{color.historical_origin}</p>
          </div>
        )}

        {/* Health and Sensitivity Info */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs">Ljuskänslighet:</div>
            <div className="text-slate-300 text-xs flex items-center gap-1">
              <span>{getSensitivityIcon(color.light_sensitivity_level)}</span>
              <span className="capitalize">{color.light_sensitivity_level}</span>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs">Hälsoskydd:</div>
            <div className="text-slate-300 text-xs flex items-center gap-1">
              <span>{getProtectionIcon(color.health_protection_level)}</span>
              <span className="capitalize">{color.health_protection_level}</span>
            </div>
          </div>
        </div>

        {/* Cultural Associations */}
        {color.cultural_associations && (
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs">Kulturella kopplingar:</div>
            <p className="text-slate-300 text-xs">{color.cultural_associations}</p>
          </div>
        )}

        {/* Evolutionary Advantage */}
        {color.evolutionary_advantage && color.evolutionary_advantage !== 'Okänd' && (
          <div className="bg-green-900/20 rounded p-2 border border-green-700/30">
            <div className="text-green-400 mb-1 text-xs">Evolutionär fördel:</div>
            <p className="text-green-300 text-xs">{color.evolutionary_advantage}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
