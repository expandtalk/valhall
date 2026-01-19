import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, MapPin, Ship, Anchor } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { RiverSystem, RiverCoordinate } from './useRiverSystems';

interface RiverSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  system?: RiverSystem | null;
  isLoading: boolean;
}

export const RiverSystemModal: React.FC<RiverSystemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  system,
  isLoading
}) => {
  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    description: '',
    period: 'Viking Age',
    significance: '',
    historical_significance: '',
    color: '#0369a1',
    width: 4,
    importance: 'secondary' as 'primary' | 'secondary',
    type: '',
    total_length_km: ''
  });

  const [coordinates, setCoordinates] = useState<Omit<RiverCoordinate, 'id'>[]>([]);

  useEffect(() => {
    if (system) {
      setFormData({
        name: system.name || '',
        name_en: system.name_en || '',
        description: system.description || '',
        period: system.period || 'Viking Age',
        significance: system.significance || '',
        historical_significance: system.historical_significance || '',
        color: system.color || '#0369a1',
        width: system.width || 4,
        importance: system.importance || 'secondary',
        type: system.type || '',
        total_length_km: system.total_length_km?.toString() || ''
      });

      setCoordinates(system.coordinates?.map(coord => ({
        sequence_order: coord.sequence_order,
        latitude: coord.latitude,
        longitude: coord.longitude,
        name: coord.name || '',
        name_en: coord.name_en || '',
        description: coord.description || '',
        is_trading_post: coord.is_trading_post,
        is_portage: coord.is_portage
      })) || []);
    } else {
      setFormData({
        name: '',
        name_en: '',
        description: '',
        period: 'Viking Age',
        significance: '',
        historical_significance: '',
        color: '#0369a1',
        width: 4,
        importance: 'secondary',
        type: '',
        total_length_km: ''
      });
      setCoordinates([]);
    }
  }, [system]);

  const handleSubmit = () => {
    const riverSystemData = {
      ...formData,
      total_length_km: formData.total_length_km ? parseFloat(formData.total_length_km) : null
    };

    onSave({
      riverSystem: riverSystemData,
      coordinates: coordinates.map((coord, index) => ({
        ...coord,
        sequence_order: index + 1
      }))
    });
  };

  const addCoordinate = () => {
    setCoordinates([...coordinates, {
      sequence_order: coordinates.length + 1,
      latitude: 0,
      longitude: 0,
      name: '',
      name_en: '',
      description: '',
      is_trading_post: false,
      is_portage: false
    }]);
  };

  const removeCoordinate = (index: number) => {
    const newCoords = coordinates.filter((_, i) => i !== index);
    setCoordinates(newCoords.map((coord, i) => ({ ...coord, sequence_order: i + 1 })));
  };

  const updateCoordinate = (index: number, field: keyof RiverCoordinate, value: any) => {
    const newCoords = [...coordinates];
    newCoords[index] = { ...newCoords[index], [field]: value };
    setCoordinates(newCoords);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {system ? 'Redigera vattenväg' : 'Lägg till ny vattenväg'}
          </DialogTitle>
          <DialogDescription>
            Fyll i information om vattenvägen och dess rutt
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Namn (svenska)</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="t.ex. Emån"
              />
            </div>
            <div>
              <Label htmlFor="name_en">Namn (engelska)</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                placeholder="t.ex. Em River"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Beskrivning av vattenvägen..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="t.ex. Viking Age"
              />
            </div>
            <div>
              <Label htmlFor="importance">Betydelse</Label>
              <Select 
                value={formData.importance} 
                onValueChange={(value) => setFormData({ ...formData, importance: value as 'primary' | 'secondary' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primär</SelectItem>
                  <SelectItem value="secondary">Sekundär</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="total_length_km">Total längd (km)</Label>
              <Input
                id="total_length_km"
                type="number"
                value={formData.total_length_km}
                onChange={(e) => setFormData({ ...formData, total_length_km: e.target.value })}
                placeholder="t.ex. 85"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="color">Färg</Label>
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="width">Linjebredd</Label>
              <Input
                id="width"
                type="number"
                min="1"
                max="10"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="significance">Betydelse</Label>
            <Textarea
              id="significance"
              value={formData.significance}
              onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
              placeholder="Vad var vattenvägens betydelse..."
            />
          </div>

          <div>
            <Label htmlFor="historical_significance">Historisk betydelse</Label>
            <Textarea
              id="historical_significance"
              value={formData.historical_significance}
              onChange={(e) => setFormData({ ...formData, historical_significance: e.target.value })}
              placeholder="Historisk bakgrund och betydelse..."
            />
          </div>

          {/* Coordinates Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Rutt och platser</h3>
              <Button type="button" onClick={addCoordinate} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Lägg till plats
              </Button>
            </div>

            {coordinates.map((coord, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Plats {index + 1}</Badge>
                  <Button
                    type="button"
                    onClick={() => removeCoordinate(index)}
                    variant="ghost"
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Latitud</Label>
                    <Input
                      type="number"
                      step="0.000001"
                      value={coord.latitude}
                      onChange={(e) => updateCoordinate(index, 'latitude', parseFloat(e.target.value))}
                      placeholder="t.ex. 56.6667"
                    />
                  </div>
                  <div>
                    <Label>Longitud</Label>
                    <Input
                      type="number"
                      step="0.000001"
                      value={coord.longitude}
                      onChange={(e) => updateCoordinate(index, 'longitude', parseFloat(e.target.value))}
                      placeholder="t.ex. 16.3667"
                    />
                  </div>
                  <div>
                    <Label>Platsnamn</Label>
                    <Input
                      value={coord.name}
                      onChange={(e) => updateCoordinate(index, 'name', e.target.value)}
                      placeholder="t.ex. Kalmar"
                    />
                  </div>
                  <div>
                    <Label>Platsnamn (engelska)</Label>
                    <Input
                      value={coord.name_en}
                      onChange={(e) => updateCoordinate(index, 'name_en', e.target.value)}
                      placeholder="t.ex. Kalmar"
                    />
                  </div>
                </div>

                <div>
                  <Label>Beskrivning</Label>
                  <Input
                    value={coord.description}
                    onChange={(e) => updateCoordinate(index, 'description', e.target.value)}
                    placeholder="Beskrivning av platsen..."
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`trading-${index}`}
                      checked={coord.is_trading_post}
                      onCheckedChange={(checked) => updateCoordinate(index, 'is_trading_post', checked)}
                    />
                    <Label htmlFor={`trading-${index}`} className="flex items-center gap-1">
                      <Ship className="h-3 w-3" />
                      Handelsplats
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`portage-${index}`}
                      checked={coord.is_portage}
                      onCheckedChange={(checked) => updateCoordinate(index, 'is_portage', checked)}
                    />
                    <Label htmlFor={`portage-${index}`} className="flex items-center gap-1">
                      <Anchor className="h-3 w-3" />
                      Portage-punkt
                    </Label>
                  </div>
                </div>
              </div>
            ))}

            {coordinates.length === 0 && (
              <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Inga platser tillagda ännu</p>
                <p className="text-sm">Klicka på "Lägg till plats" för att definiera vattenvägens rutt</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Sparar...' : (system ? 'Uppdatera' : 'Skapa')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};