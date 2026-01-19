import React, { useState } from 'react';
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
import { useCreateKing } from '@/hooks/chronicles';
import { useToast } from '@/hooks/use-toast';
import type { HistoricalKing } from '@/hooks/chronicles';

interface AddKingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onKingAdded: () => void;
}

export const AddKingDialog: React.FC<AddKingDialogProps> = ({
  isOpen,
  onClose,
  onKingAdded,
}) => {
  const createKingMutation = useCreateKing();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    name_variations: '',
    region: '',
    reign_start: '',
    reign_end: '',
    birth_year: '',
    death_year: '',
    status: 'historical' as const,
    gender: 'male' as const,
    description: '',
    archaeological_evidence: false,
    runestone_mentions: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const kingData: Omit<HistoricalKing, 'id' | 'created_at' | 'updated_at'> = {
        name: formData.name,
        name_variations: formData.name_variations ? formData.name_variations.split(',').map(s => s.trim()) : undefined,
        region: formData.region,
        reign_start: formData.reign_start ? parseInt(formData.reign_start) : undefined,
        reign_end: formData.reign_end ? parseInt(formData.reign_end) : undefined,
        birth_year: formData.birth_year ? parseInt(formData.birth_year) : undefined,
        death_year: formData.death_year ? parseInt(formData.death_year) : undefined,
        status: formData.status,
        gender: formData.gender,
        description: formData.description || undefined,
        archaeological_evidence: formData.archaeological_evidence,
        runestone_mentions: formData.runestone_mentions,
      };

      await createKingMutation.mutateAsync(kingData);
      onKingAdded();
      setFormData({
        name: '',
        name_variations: '',
        region: '',
        reign_start: '',
        reign_end: '',
        birth_year: '',
        death_year: '',
        status: 'historical',
        gender: 'male',
        description: '',
        archaeological_evidence: false,
        runestone_mentions: false,
      });
    } catch (error) {
      toast({
        title: "Fel",
        description: "Kunde inte lägga till kung",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Lägg till ny kung</DialogTitle>
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
            <Button type="submit" disabled={createKingMutation.isPending}>
              {createKingMutation.isPending ? 'Lägger till...' : 'Lägg till kung'}
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