import React, { useState } from 'react';
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ship, Anchor } from "lucide-react";

interface AddCoordinateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coordinate: any) => void;
  riverSystemName: string;
  nextSequenceOrder: number;
  isLoading: boolean;
}

export const AddCoordinateModal: React.FC<AddCoordinateModalProps> = ({
  isOpen,
  onClose,
  onSave,
  riverSystemName,
  nextSequenceOrder,
  isLoading
}) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 0,
    longitude: 0,
    name: '',
    name_en: '',
    description: '',
    is_trading_post: false,
    is_portage: false
  });

  const handleSubmit = () => {
    onSave({
      ...coordinate,
      sequence_order: nextSequenceOrder
    });
    
    // Reset form
    setCoordinate({
      latitude: 0,
      longitude: 0,
      name: '',
      name_en: '',
      description: '',
      is_trading_post: false,
      is_portage: false
    });
  };

  const updateCoordinate = (field: string, value: any) => {
    setCoordinate(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Lägg till koordinat
          </DialogTitle>
          <DialogDescription>
            Lägg till en ny plats i vattenvägen <strong>{riverSystemName}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">Plats {nextSequenceOrder}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="latitude">Latitud *</Label>
              <Input
                id="latitude"
                type="number"
                step="0.000001"
                value={coordinate.latitude}
                onChange={(e) => updateCoordinate('latitude', parseFloat(e.target.value) || 0)}
                placeholder="t.ex. 56.6667"
                required
              />
            </div>
            <div>
              <Label htmlFor="longitude">Longitud *</Label>
              <Input
                id="longitude"
                type="number"
                step="0.000001"
                value={coordinate.longitude}
                onChange={(e) => updateCoordinate('longitude', parseFloat(e.target.value) || 0)}
                placeholder="t.ex. 16.3667"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Platsnamn</Label>
              <Input
                id="name"
                value={coordinate.name}
                onChange={(e) => updateCoordinate('name', e.target.value)}
                placeholder="t.ex. Kalmar"
              />
            </div>
            <div>
              <Label htmlFor="name_en">Platsnamn (engelska)</Label>
              <Input
                id="name_en"
                value={coordinate.name_en}
                onChange={(e) => updateCoordinate('name_en', e.target.value)}
                placeholder="t.ex. Kalmar"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Beskrivning</Label>
            <Input
              id="description"
              value={coordinate.description}
              onChange={(e) => updateCoordinate('description', e.target.value)}
              placeholder="Beskrivning av platsen..."
            />
          </div>

          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trading"
                checked={coordinate.is_trading_post}
                onCheckedChange={(checked) => updateCoordinate('is_trading_post', checked)}
              />
              <Label htmlFor="trading" className="flex items-center gap-2">
                <Ship className="h-4 w-4" />
                Handelsplats
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="portage"
                checked={coordinate.is_portage}
                onCheckedChange={(checked) => updateCoordinate('is_portage', checked)}
              />
              <Label htmlFor="portage" className="flex items-center gap-2">
                <Anchor className="h-4 w-4" />
                Portage-punkt
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || coordinate.latitude === 0 || coordinate.longitude === 0}
          >
            {isLoading ? 'Lägger till...' : 'Lägg till koordinat'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};