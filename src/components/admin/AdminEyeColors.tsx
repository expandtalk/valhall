
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Dna, Globe, TrendingUp } from "lucide-react";
import { useEyeColors } from './eye-colors/useEyeColors';
import { EyeColorCard } from './eye-colors/EyeColorCard';

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

export const AdminEyeColors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  const {
    eyeColors,
    loading,
    isLoading
  } = useEyeColors();

  const filteredColors = eyeColors.filter(color => {
    const matchesSearch = color.color_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.color_name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.historical_origin?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesComplexity = selectedComplexity === 'all' || color.genetic_complexity === selectedComplexity;
    return matchesSearch && matchesComplexity;
  });

  const complexityTypes = [
    { id: 'all', name: 'Alla typer' },
    { id: 'single_mutation', name: 'Enkel mutation' },
    { id: 'polygenic', name: 'Polygenetisk' },
    { id: 'dominant_trait', name: 'Dominant drag' }
  ];

  const getRarityColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-purple-100 text-purple-800';
      case 2: return 'bg-emerald-100 text-emerald-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-blue-100 text-blue-800';
      case 6: return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-white">Laddar ögonfärger...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="h-6 w-6" />
            Ögonfärger - Genetisk Forskning
          </CardTitle>
          <CardDescription className="text-slate-300">
            Komplett databas över ögonfärgers genetik, geografisk fördelning och evolutionära ursprung
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Genetisk komplexitet</label>
              <select 
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2"
              >
                {complexityTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Sök</label>
              <Input
                placeholder="Sök efter ögonfärger..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-white/20 text-white"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-slate-300">
              Visar {filteredColors.length} av {eyeColors.length} ögonfärger
            </p>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-white border-white/20">
                <Dna className="h-3 w-3 mr-1" />
                Genetisk forskning
              </Badge>
              <Badge variant="outline" className="text-white border-white/20">
                <Globe className="h-3 w-3 mr-1" />
                Global fördelning
              </Badge>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-purple-500/20 border-purple-500/30">
              <CardContent className="p-4">
                <div className="text-purple-300 text-sm">Sällsyntaste</div>
                <div className="text-white font-bold">Grå (1%)</div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-500/20 border-emerald-500/30">
              <CardContent className="p-4">
                <div className="text-emerald-300 text-sm">Keltisk koppling</div>
                <div className="text-white font-bold">Gröna (86%)</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/20 border-blue-500/30">
              <CardContent className="p-4">
                <div className="text-blue-300 text-sm">Nordisk</div>
                <div className="text-white font-bold">Blå (75%)</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-500/20 border-amber-500/30">
              <CardContent className="p-4">
                <div className="text-amber-300 text-sm">Vanligaste</div>
                <div className="text-white font-bold">Bruna (60%)</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredColors
          .sort((a, b) => a.rarity_rank - b.rarity_rank)
          .map((color) => (
          <EyeColorCard
            key={color.id}
            color={color}
            rarityColor={getRarityColor(color.rarity_rank)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
