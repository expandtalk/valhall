
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Map, ExternalLink, Save, Eye, EyeOff } from 'lucide-react';

const DEFAULT_BASE_LAYERS = [
  {
    id: 'modern_osm',
    name: 'Modern OpenStreetMap',
    description: 'Standard modern karta',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    type: 'tile',
    attribution: '© OpenStreetMap contributors',
    active: true,
    historical: false
  },
  {
    id: 'lantmateriet_modern',
    name: 'Lantmäteriet - Modern',
    description: 'Lantmäteriets moderna topografiska karta',
    url: 'https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/{token}/1.0.0/topowebb/default/3857/{z}/{y}/{x}.png',
    type: 'wmts',
    attribution: '© Lantmäteriet',
    active: false,
    historical: false,
    requiresToken: true
  },
  {
    id: 'lantmateriet_historical_1800s',
    name: 'Lantmäteriet - 1800-tal',
    description: 'Historiska kartor från 1800-talet',
    url: 'https://api.lantmateriet.se/historiska-kartor/1800/{z}/{x}/{y}.png',
    type: 'tile',
    attribution: '© Lantmäteriet',
    active: false,
    historical: true,
    periods: ['viking_age', 'vendel_period']
  },
  {
    id: 'geological_bedrock',
    name: 'Geologisk - Berggrund',
    description: 'SGU:s berggrundskarta',
    url: 'https://resource.sgu.se/service/wms',
    type: 'wms',
    layers: 'berggrund_1milj',
    attribution: '© SGU',
    active: false,
    historical: false
  }
];

export const MapBaseLayerManager: React.FC = () => {
  const [baseLayers, setBaseLayers] = useState(DEFAULT_BASE_LAYERS);
  const [editingLayer, setEditingLayer] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleAddNew = () => {
    setEditingLayer({
      id: '',
      name: '',
      description: '',
      url: '',
      type: 'tile',
      attribution: '',
      active: false,
      historical: false,
      periods: []
    });
    setIsAddingNew(true);
  };

  const handleEdit = (layer: any) => {
    setEditingLayer({ ...layer });
    setIsAddingNew(false);
  };

  const handleSave = () => {
    if (isAddingNew) {
      setBaseLayers(prev => [...prev, { ...editingLayer, id: Date.now().toString() }]);
    } else {
      setBaseLayers(prev => prev.map(layer => 
        layer.id === editingLayer.id ? editingLayer : layer
      ));
    }
    
    setEditingLayer(null);
    setIsAddingNew(false);
    setHasUnsavedChanges(true);
  };

  const handleDelete = (layerId: string) => {
    setBaseLayers(prev => prev.filter(layer => layer.id !== layerId));
    setHasUnsavedChanges(true);
  };

  const handleToggleActive = (layerId: string) => {
    setBaseLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, active: !layer.active } : layer
    ));
    setHasUnsavedChanges(true);
  };

  const getLayerTypeIcon = (type: string) => {
    switch (type) {
      case 'tile': return '🗺️';
      case 'wms': return '🌍';
      case 'wmts': return '📍';
      default: return '❓';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/60 backdrop-blur-md border-slate-600/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Map className="h-5 w-5" />
                Kartunderlag & Baskartor
              </CardTitle>
              <p className="text-slate-300 text-sm mt-1">
                Hantera olika kartunderlag från Lantmäteriet, SGU och andra källor
              </p>
            </div>
            
            <div className="flex gap-2">
              {hasUnsavedChanges && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-1" />
                  Spara alla
                </Button>
              )}
              <Button onClick={handleAddNew} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Lägg till kartlager
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Layer List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {baseLayers.map((layer) => (
          <Card key={layer.id} className={`backdrop-blur-md border-2 transition-all duration-200 ${
            layer.active 
              ? 'bg-green-800/40 border-green-500/50 shadow-lg shadow-green-500/10' 
              : 'bg-slate-800/40 border-slate-600/30'
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getLayerTypeIcon(layer.type)}</span>
                    <CardTitle className="text-white text-base">{layer.name}</CardTitle>
                    {layer.historical && (
                      <Badge variant="outline" className="text-amber-300 border-amber-500">
                        Historisk
                      </Badge>
                    )}
                    {layer.active ? (
                      <Badge className="bg-green-600 text-white flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        Aktiv
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-400 border-slate-500 flex items-center gap-1">
                        <EyeOff className="h-3 w-3" />
                        Inaktiv
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm mt-1">{layer.description}</p>
                </div>
                
                <div className="flex items-center gap-1">
                  <Button onClick={() => handleEdit(layer)} variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => handleDelete(layer.id)} variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="text-xs text-slate-400 font-mono bg-slate-900/30 p-2 rounded">
                {layer.url}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Label className="text-slate-300 text-sm font-medium">Aktivera lager</Label>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={layer.active}
                      onCheckedChange={() => handleToggleActive(layer.id)}
                      className={`transition-all duration-200 ${
                        layer.active 
                          ? 'data-[state=checked]:bg-green-600' 
                          : 'data-[state=unchecked]:bg-slate-600'
                      }`}
                    />
                    <span className={`text-xs font-medium ${
                      layer.active ? 'text-green-400' : 'text-slate-400'
                    }`}>
                      {layer.active ? 'PÅ' : 'AV'}
                    </span>
                  </div>
                </div>
                
                <Badge variant="outline" className="text-slate-300 border-slate-500">
                  {layer.type.toUpperCase()}
                </Badge>
              </div>

              {layer.historical && layer.periods && (
                <div className="text-xs text-slate-400">
                  <strong>Perioder:</strong> {layer.periods.join(', ')}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal - simplified inline editor */}
      {editingLayer && (
        <Card className="bg-slate-800/90 backdrop-blur-md border-slate-600/50 border-2">
          <CardHeader>
            <CardTitle className="text-white">
              {isAddingNew ? 'Lägg till nytt kartlager' : 'Redigera kartlager'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Namn</Label>
                <Input
                  value={editingLayer.name}
                  onChange={(e) => setEditingLayer(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
              </div>
              
              <div>
                <Label className="text-white">Typ</Label>
                <Select
                  value={editingLayer.type}
                  onValueChange={(value) => setEditingLayer(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tile">Tile Layer</SelectItem>
                    <SelectItem value="wms">WMS</SelectItem>
                    <SelectItem value="wmts">WMTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-white">Beskrivning</Label>
              <Textarea
                value={editingLayer.description}
                onChange={(e) => setEditingLayer(prev => ({ ...prev, description: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>

            <div>
              <Label className="text-white">URL</Label>
              <Input
                value={editingLayer.url}
                onChange={(e) => setEditingLayer(prev => ({ ...prev, url: e.target.value }))}
                className="bg-slate-700/50 border-slate-600 text-white font-mono"
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Switch
                  checked={editingLayer.historical}
                  onCheckedChange={(checked) => setEditingLayer(prev => ({ ...prev, historical: checked }))}
                  className="data-[state=checked]:bg-amber-600"
                />
                <Label className="text-white font-medium">Historisk karta</Label>
                <span className={`text-xs ${editingLayer.historical ? 'text-amber-400' : 'text-slate-400'}`}>
                  {editingLayer.historical ? 'JA' : 'NEJ'}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Switch
                  checked={editingLayer.active}
                  onCheckedChange={(checked) => setEditingLayer(prev => ({ ...prev, active: checked }))}
                  className="data-[state=checked]:bg-green-600"
                />
                <Label className="text-white font-medium">Aktivera som standard</Label>
                <span className={`text-xs ${editingLayer.active ? 'text-green-400' : 'text-slate-400'}`}>
                  {editingLayer.active ? 'PÅ' : 'AV'}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingLayer(null)}>
                Avbryt
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                {isAddingNew ? 'Lägg till' : 'Spara'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
