
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, TrendingUp, MapPin } from "lucide-react";

interface EyeColor {
  id: string;
  color_name: string;
  color_name_en: string;
  global_frequency_percent: number;
  rarity_rank: number;
  genetic_complexity: string;
  main_genes: string[];
  evolutionary_advantage: string;
  historical_origin: string;
  cultural_associations: string;
  light_sensitivity_level: string;
  health_protection_level: string;
}

interface EyeColorRegion {
  id: string;
  eye_color_id: string;
  region_name: string;
  country: string;
  frequency_percent: number;
  genetic_significance: string;
  population_notes: string;
}

interface EyeColorsTabProps {
  filteredColors: EyeColor[];
  eyeColorRegions: EyeColorRegion[];
}

export const EyeColorsTab: React.FC<EyeColorsTabProps> = ({ filteredColors, eyeColorRegions }) => {
  const getRarityColor = (rank: number) => {
    if (rank <= 2) return 'bg-purple-100 text-purple-800';
    if (rank <= 4) return 'bg-blue-100 text-blue-800';
    if (rank <= 6) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-orange-100 text-orange-800';
      case 'very_complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRegionsForColor = (colorId: string) => {
    return eyeColorRegions.filter(region => region.eye_color_id === colorId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredColors.map((color) => {
        const regions = getRegionsForColor(color.id);
        return (
          <Card key={color.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-white text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  {color.color_name}
                </CardTitle>
                <Badge className={getRarityColor(color.rarity_rank)}>
                  #{color.rarity_rank}
                </Badge>
              </div>
              <CardDescription className="text-slate-300">
                {color.color_name_en}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-slate-300 text-sm">
                  <TrendingUp className="h-4 w-4 inline mr-1" />
                  {color.global_frequency_percent}% globalt
                </div>
                <Badge className={getComplexityColor(color.genetic_complexity)}>
                  {color.genetic_complexity.replace('_', ' ')}
                </Badge>
              </div>

              {color.main_genes && color.main_genes.length > 0 && (
                <div className="text-slate-300 text-sm">
                  <strong>Huvudgener:</strong> {color.main_genes.join(', ')}
                </div>
              )}

              {color.evolutionary_advantage && (
                <div className="text-slate-200 text-sm">
                  <strong>Evolutionär fördel:</strong> {color.evolutionary_advantage}
                </div>
              )}

              {color.historical_origin && (
                <div className="text-slate-300 text-sm">
                  <strong>Historiskt ursprung:</strong> {color.historical_origin}
                </div>
              )}

              {regions.length > 0 && (
                <div className="text-slate-300 text-sm">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  <strong>Regioner:</strong> {regions.length} dokumenterade
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
