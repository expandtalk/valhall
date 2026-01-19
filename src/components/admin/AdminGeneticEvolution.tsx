
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dna, Clock, Users, MapPin, TrendingUp, Plus, Edit, Trash2 } from "lucide-react";
import { useGeneticEvolution } from './genetic-evolution/useGeneticEvolution';
import { GeneticEventCard } from './genetic-evolution/GeneticEventCard';

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

export const AdminGeneticEvolution: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const {
    geneticEvents,
    loading,
    isLoading
  } = useGeneticEvolution();

  const filteredEvents = geneticEvents.filter(event => {
    const matchesSearch = event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.genetic_change.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.geographic_region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = selectedPeriod === 'all' || event.period === selectedPeriod;
    const matchesType = selectedType === 'all' || event.evidence_type === selectedType;
    return matchesSearch && matchesPeriod && matchesType;
  });

  const periods = [
    { id: 'all', name: 'Alla perioder' },
    { id: 'paleolithic', name: 'Paleolitikum' },
    { id: 'mesolithic', name: 'Mesolitikum' },
    { id: 'neolithic', name: 'Neolitikum' },
    { id: 'bronze_age', name: 'Bronsålder' },
    { id: 'iron_age', name: 'Järnålder' },
    { id: 'viking_age', name: 'Vikingatid' }
  ];

  const evidenceTypes = [
    { id: 'all', name: 'Alla bevis' },
    { id: 'ancient_dna', name: 'Forntida DNA' },
    { id: 'modern_genetics', name: 'Modern genetik' },
    { id: 'archaeological', name: 'Arkeologisk' },
    { id: 'statistical', name: 'Statistisk analys' }
  ];

  const getSelectionColor = (strength: string) => {
    switch (strength) {
      case 'very_strong': return 'bg-red-100 text-red-800';
      case 'strong': return 'bg-orange-100 text-orange-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'weak': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStrengthText = (strength: string) => {
    switch (strength) {
      case 'very_strong': return 'Mycket stark';
      case 'strong': return 'Stark';
      case 'moderate': return 'Måttlig';
      case 'weak': return 'Svag';
      default: return strength;
    }
  };

  if (loading) {
    return <div className="text-white">Laddar genetiska händelser...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Dna className="h-6 w-6" />
            Genetisk Evolution - Administration
          </CardTitle>
          <CardDescription className="text-slate-300">
            Hantera genetiska milstolpar och evolutionära händelser för tidslinjen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Period</label>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Bevistyp</label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2"
              >
                {evidenceTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Sök</label>
              <Input
                placeholder="Sök genetiska händelser..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-800 border-white/20 text-white"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-slate-300">
              Visar {filteredEvents.length} av {geneticEvents.length} genetiska händelser
            </p>
            <div className="flex gap-2">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Lägg till händelse
              </Button>
              <Badge variant="outline" className="text-white border-white/20">
                <Dna className="h-3 w-3 mr-1" />
                Evolutionsforskning
              </Badge>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-red-500/20 border-red-500/30">
              <CardContent className="p-4">
                <div className="text-red-300 text-sm">Starkaste selektion</div>
                <div className="text-white font-bold">Laktostolerans</div>
                <div className="text-red-200 text-xs">6% reproduktiv fördel</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-500/20 border-blue-500/30">
              <CardContent className="p-4">
                <div className="text-blue-300 text-sm">Snabbaste förändring</div>
                <div className="text-white font-bold">3,000 år</div>
                <div className="text-blue-200 text-xs">5% → 95% frekvens</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/20 border-purple-500/30">
              <CardContent className="p-4">
                <div className="text-purple-300 text-sm">Yamna-migration</div>
                <div className="text-white font-bold">4,800 år sedan</div>
                <div className="text-purple-200 text-xs">Längd + pigment</div>
              </CardContent>
            </Card>
            <Card className="bg-amber-500/20 border-amber-500/30">
              <CardContent className="p-4">
                <div className="text-amber-300 text-sm">Ljus hud</div>
                <div className="text-white font-bold">5,000 år</div>
                <div className="text-amber-200 text-xs">63% → 8% mörk hud</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents
          .sort((a, b) => b.year_start - a.year_start)
          .map((event) => (
          <GeneticEventCard
            key={event.id}
            event={event}
            selectionColor={getSelectionColor(event.selection_strength)}
            strengthText={getStrengthText(event.selection_strength)}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};
