import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import type { HistoricalKing } from '@/hooks/chronicles';

interface EditKingDialogProps {
  king: HistoricalKing;
  isOpen: boolean;
  onClose: () => void;
  onKingUpdated: () => void;
}

export const EditKingDialog: React.FC<EditKingDialogProps> = ({
  king,
  isOpen,
  onClose,
  onKingUpdated,
}) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    name_variations: '',
    region: '',
    reign_start: '',
    reign_end: '',
    birth_year: '',
    death_year: '',
    status: 'historical' as HistoricalKing['status'],
    gender: 'male' as HistoricalKing['gender'],
    description: '',
    archaeological_evidence: false,
    runestone_mentions: false,
  });

  useEffect(() => {
    if (king) {
      setFormData({
        name: king.name,
        name_variations: king.name_variations?.join(', ') || '',
        region: king.region,
        reign_start: king.reign_start?.toString() || '',
        reign_end: king.reign_end?.toString() || '',
        birth_year: king.birth_year?.toString() || '',
        death_year: king.death_year?.toString() || '',
        status: king.status,
        gender: king.gender,
        description: king.description || '',
        archaeological_evidence: king.archaeological_evidence,
        runestone_mentions: king.runestone_mentions,
      });
    }
  }, [king]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Implement update mutation
      toast({
        title: "Funktionalitet kommer snart",
        description: "Redigering av kungar kommer att implementeras",
      });
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte uppdatera kung",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Redigera kung: {king.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Namn *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="region">Region *</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Välj region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sweden">Sverige</SelectItem>
                  <SelectItem value="Norway">Norge</SelectItem>
                  <SelectItem value="Denmark">Danmark</SelectItem>
                  <SelectItem value="Iceland">Island</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="name_variations">Namnvariationer (kommaseparerade)</Label>
            <Input
              id="name_variations"
              value={formData.name_variations}
              onChange={(e) => setFormData(prev => ({ ...prev, name_variations: e.target.value }))}
              placeholder="Alternativa namn, kommaseparerade"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reign_start">Regeringsstart</Label>
              <Input
                id="reign_start"
                type="number"
                value={formData.reign_start}
                onChange={(e) => setFormData(prev => ({ ...prev, reign_start: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="reign_end">Regeringsslut</Label>
              <Input
                id="reign_end"
                type="number"
                value={formData.reign_end}
                onChange={(e) => setFormData(prev => ({ ...prev, reign_end: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birth_year">Födelseår</Label>
              <Input
                id="birth_year"
                type="number"
                value={formData.birth_year}
                onChange={(e) => setFormData(prev => ({ ...prev, birth_year: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="death_year">Dödsår</Label>
              <Input
                id="death_year"
                type="number"
                value={formData.death_year}
                onChange={(e) => setFormData(prev => ({ ...prev, death_year: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="historical">Historisk</SelectItem>
                  <SelectItem value="semi_legendary">Semi-legendär</SelectItem>
                  <SelectItem value="legendary">Legendär</SelectItem>
                  <SelectItem value="disputed">Omtvistad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="gender">Kön</Label>
              <Select value={formData.gender} onValueChange={(value: any) => setFormData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Manlig</SelectItem>
                  <SelectItem value="female">Kvinnlig</SelectItem>
                  <SelectItem value="unknown">Okänt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Beskrivning</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="archaeological_evidence"
                checked={formData.archaeological_evidence}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, archaeological_evidence: !!checked }))}
              />
              <Label htmlFor="archaeological_evidence">Arkeologiska bevis</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="runestone_mentions"
                checked={formData.runestone_mentions}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, runestone_mentions: !!checked }))}
              />
              <Label htmlFor="runestone_mentions">Runstensomtalat</Label>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit">
              Uppdatera kung
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Avbryt
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};