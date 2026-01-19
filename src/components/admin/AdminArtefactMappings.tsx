
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Edit, Plus, Database } from "lucide-react";
import { getAllArtefactMappings, ArtefactMapping } from '@/utils/categoryMapper';
import { useToast } from "@/components/ui/use-toast";

export const AdminArtefactMappings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mappings, setMappings] = useState<ArtefactMapping[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const categories = [
    { id: 'all', name: 'Alla kategorier' },
    { id: 'memorial-stones', name: 'Minnesstenar' },
    { id: 'religious-ritual', name: 'Religiösa & Rituella' },
    { id: 'weapons-tools', name: 'Vapen & Verktyg' },
    { id: 'jewelry-personal', name: 'Smycken & Personligt' },
    { id: 'currency-trade', name: 'Valuta & Handel' },
    { id: 'household', name: 'Hushållsföremål' },
    { id: 'structural', name: 'Strukturella element' },
    { id: 'other', name: 'Övrigt' }
  ];

  useEffect(() => {
    const fetchMappings = async () => {
      try {
        const data = await getAllArtefactMappings();
        setMappings(data);
      } catch (error) {
        toast({
          title: "Fel",
          description: "Kunde inte hämta artefakt-mappningar",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMappings();
  }, [toast]);

  const filteredMappings = mappings.filter(mapping => {
    const matchesSearch = mapping.artefact_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || mapping.category_mapping === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryColors = {
    'memorial-stones': 'bg-purple-100 text-purple-800',
    'religious-ritual': 'bg-blue-100 text-blue-800',
    'weapons-tools': 'bg-red-100 text-red-800',
    'jewelry-personal': 'bg-pink-100 text-pink-800',
    'currency-trade': 'bg-amber-100 text-amber-800',
    'household': 'bg-green-100 text-green-800',
    'structural': 'bg-gray-100 text-gray-800',
    'other': 'bg-slate-100 text-slate-800'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Laddar artefakt-mappningar...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="h-6 w-6" />
            Artefakt-mappningar
          </CardTitle>
          <CardDescription className="text-slate-300">
            Hantera mappning av Rundata-artefakter till kategorier
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Kategori</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Sök artefakt</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Sök efter artefakter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-800 border-white/20 text-white pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-slate-300">
              Visar {filteredMappings.length} av {mappings.length} artefakter
            </p>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              disabled
            >
              <Plus className="h-4 w-4 mr-2" />
              Lägg till mapping (kommer snart)
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMappings.map((mapping) => (
          <Card key={mapping.id} className="bg-white/5 backdrop-blur-md border-white/10">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-white text-sm font-medium">
                    {mapping.artefact_name}
                  </CardTitle>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-slate-300 hover:text-white h-6 w-6 p-0"
                  disabled
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {mapping.category_mapping ? (
                <Badge className={categoryColors[mapping.category_mapping as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
                  {mapping.category_mapping}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-slate-400 border-slate-400">
                  Ingen kategori
                </Badge>
              )}
              
              <div className="text-xs text-slate-400">
                Språk: {mapping.language}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMappings.length === 0 && (
        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-8 text-center">
            <p className="text-slate-300">Inga artefakter hittades med de valda kriterierna.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
