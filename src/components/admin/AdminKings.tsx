import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Crown, Plus, Edit, Trash2, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface King {
  id: string;
  name: string;
  region: string;
  dynasty?: string;
  reign_start?: number;
  reign_end?: number;
  status: 'legendary' | 'semi_legendary' | 'historical' | 'disputed';
  runestone_mentions: boolean;
  archaeological_evidence: boolean;
  description?: string;
}

const SAMPLE_KINGS: King[] = [
  {
    id: '1',
    name: 'Erik Segersäll',
    region: 'Sverige',
    dynasty: 'Ynglingar',
    reign_start: 970,
    reign_end: 995,
    status: 'historical',
    runestone_mentions: true,
    archaeological_evidence: true,
    description: 'Kung av Sverige, far till Olof Skötkonung'
  },
  {
    id: '2',
    name: 'Valdemar den Store',
    region: 'Danmark',
    dynasty: 'Estridsen',
    reign_start: 1157,
    reign_end: 1182,
    status: 'historical',
    runestone_mentions: false,
    archaeological_evidence: true,
    description: 'Kung av Danmark, genomförde Valdemars segelled'
  },
  {
    id: '3',
    name: 'Harald Blåtand',
    region: 'Danmark',
    dynasty: 'Jelling',
    reign_start: 958,
    reign_end: 986,
    status: 'historical',
    runestone_mentions: true,
    archaeological_evidence: true,
    description: 'Kung av Danmark och Norge, kristnade Danmark'
  }
];

export const AdminKings: React.FC = () => {
  const [kings, setKings] = useState<King[]>(SAMPLE_KINGS);
  const [isAddingKing, setIsAddingKing] = useState(false);
  const [editingKing, setEditingKing] = useState<King | null>(null);
  const { toast } = useToast();

  const [newKing, setNewKing] = useState<Partial<King>>({
    name: '',
    region: '',
    dynasty: '',
    status: 'disputed',
    runestone_mentions: false,
    archaeological_evidence: false,
    description: ''
  });

  const handleAddKing = () => {
    if (!newKing.name || !newKing.region) {
      toast({
        title: "Fel",
        description: "Namn och region är obligatoriska fält",
        variant: "destructive"
      });
      return;
    }

    const king: King = {
      id: (kings.length + 1).toString(),
      name: newKing.name!,
      region: newKing.region!,
      dynasty: newKing.dynasty,
      reign_start: newKing.reign_start,
      reign_end: newKing.reign_end,
      status: newKing.status || 'disputed',
      runestone_mentions: newKing.runestone_mentions || false,
      archaeological_evidence: newKing.archaeological_evidence || false,
      description: newKing.description
    };

    setKings([...kings, king]);
    setNewKing({
      name: '', region: '', dynasty: '', status: 'disputed',
      runestone_mentions: false, archaeological_evidence: false, description: ''
    });
    setIsAddingKing(false);

    toast({
      title: "Kung tillagd",
      description: `${king.name} har lagts till i databasen`
    });
  };

  const handleDeleteKing = (id: string) => {
    const king = kings.find(k => k.id === id);
    setKings(kings.filter(k => k.id !== id));
    toast({
      title: "Kung borttagen",
      description: `${king?.name} har tagits bort från databasen`
    });
  };

  const getStatusColor = (status: King['status']) => {
    switch (status) {
      case 'historical': return 'bg-green-500';
      case 'semi_legendary': return 'bg-yellow-500';
      case 'legendary': return 'bg-purple-500';
      case 'disputed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: King['status']) => {
    switch (status) {
      case 'historical': return 'Historisk';
      case 'semi_legendary': return 'Delvis legendär';
      case 'legendary': return 'Legendär';
      case 'disputed': return 'Omtvistad';
      default: return 'Okänd';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Crown className="h-6 w-6" />
            Nordiska Kungar
          </h2>
          <p className="text-slate-300 mt-1">
            Hantera kungalängder och historiska härskare
          </p>
        </div>
        <Button
          onClick={() => setIsAddingKing(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Lägg till kung
        </Button>
      </div>

      {/* Add King Form */}
      {isAddingKing && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Lägg till ny kung</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">Namn *</Label>
                <Input
                  id="name"
                  value={newKing.name}
                  onChange={(e) => setNewKing({...newKing, name: e.target.value})}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="t.ex. Erik Segersäll"
                />
              </div>
              <div>
                <Label htmlFor="region" className="text-white">Region *</Label>
                <Select onValueChange={(value) => setNewKing({...newKing, region: value})}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Välj region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sverige">Sverige</SelectItem>
                    <SelectItem value="Danmark">Danmark</SelectItem>
                    <SelectItem value="Norge">Norge</SelectItem>
                    <SelectItem value="Island">Island</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dynasty" className="text-white">Dynasti</Label>
                <Input
                  id="dynasty"
                  value={newKing.dynasty}
                  onChange={(e) => setNewKing({...newKing, dynasty: e.target.value})}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="t.ex. Ynglingar"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-white">Status</Label>
                <Select onValueChange={(value) => setNewKing({...newKing, status: value as King['status']})}>
                  <SelectTrigger className="bg-white/5 border-white/20 text-white">
                    <SelectValue placeholder="Välj status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="historical">Historisk</SelectItem>
                    <SelectItem value="semi_legendary">Delvis legendär</SelectItem>
                    <SelectItem value="legendary">Legendär</SelectItem>
                    <SelectItem value="disputed">Omtvistad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reign_start" className="text-white">Regeringsstart</Label>
                <Input
                  id="reign_start"
                  type="number"
                  value={newKing.reign_start || ''}
                  onChange={(e) => setNewKing({...newKing, reign_start: parseInt(e.target.value)})}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="År"
                />
              </div>
              <div>
                <Label htmlFor="reign_end" className="text-white">Regeringsslut</Label>
                <Input
                  id="reign_end"
                  type="number"
                  value={newKing.reign_end || ''}
                  onChange={(e) => setNewKing({...newKing, reign_end: parseInt(e.target.value)})}
                  className="bg-white/5 border-white/20 text-white"
                  placeholder="År"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-white">Beskrivning</Label>
              <Textarea
                id="description"
                value={newKing.description}
                onChange={(e) => setNewKing({...newKing, description: e.target.value})}
                className="bg-white/5 border-white/20 text-white"
                placeholder="Beskrivning av kungen..."
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleAddKing} className="bg-green-600 hover:bg-green-700">
                Spara kung
              </Button>
              <Button onClick={() => setIsAddingKing(false)} variant="outline">
                Avbryt
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kings List */}
      <div className="grid gap-4">
        {kings.map((king) => (
          <Card key={king.id} className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Crown className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-xl font-bold text-white">{king.name}</h3>
                    <Badge className={`${getStatusColor(king.status)} text-white`}>
                      {getStatusLabel(king.status)}
                    </Badge>
                  </div>
                  
                  <div className="text-slate-300 space-y-1">
                    <p><strong>Region:</strong> {king.region}</p>
                    {king.dynasty && <p><strong>Dynasti:</strong> {king.dynasty}</p>}
                    {(king.reign_start || king.reign_end) && (
                      <p><strong>Regeringstid:</strong> {king.reign_start || '?'} - {king.reign_end || '?'}</p>
                    )}
                    {king.description && <p><strong>Beskrivning:</strong> {king.description}</p>}
                  </div>

                  <div className="flex gap-2 mt-3">
                    {king.runestone_mentions && (
                      <Badge variant="outline" className="text-orange-400 border-orange-400">
                        <Shield className="h-3 w-3 mr-1" />
                        Nämnd på runsten
                      </Badge>
                    )}
                    {king.archaeological_evidence && (
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        Arkeologiska bevis
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingKing(king)}
                    className="border-white/20 text-white hover:bg-white/5"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteKing(king.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {kings.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-12 text-center">
            <Crown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Inga kungar har lagts till än</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};