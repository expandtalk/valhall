
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface LegacyFormRendererProps {
  title: string;
  formData: any;
  setFormData: (data: any) => void;
}

export const LegacyFormRenderer: React.FC<LegacyFormRendererProps> = ({
  title,
  formData,
  setFormData
}) => {
  if (title === 'Runristare') {
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Namn</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">Beskrivning</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="period_start" className="text-white">Verksam från (år)</Label>
            <Input
              id="period_start"
              type="number"
              value={formData.period_active_start || ''}
              onChange={(e) => setFormData({ ...formData, period_active_start: e.target.value ? parseInt(e.target.value) : null })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="period_end" className="text-white">Verksam till (år)</Label>
            <Input
              id="period_end"
              type="number"
              value={formData.period_active_end || ''}
              onChange={(e) => setFormData({ ...formData, period_active_end: e.target.value ? parseInt(e.target.value) : null })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="region" className="text-white">Region</Label>
            <Input
              id="region"
              value={formData.region || ''}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country" className="text-white">Land</Label>
            <Input
              id="country"
              value={formData.country || ''}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>
      </>
    );
  }

  if (title === 'Viking Location') {
    return (
      <>
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Namn</Label>
          <Input
            id="name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">Beskrivning</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-white">Kategori</Label>
          <Input
            id="category"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="period_start" className="text-white">Startår</Label>
            <Input
              id="period_start"
              type="number"
              value={formData.period_start || ''}
              onChange={(e) => setFormData({ ...formData, period_start: e.target.value ? parseInt(e.target.value) : null })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="period_end" className="text-white">Slutår</Label>
            <Input
              id="period_end"
              type="number"
              value={formData.period_end || ''}
              onChange={(e) => setFormData({ ...formData, period_end: e.target.value ? parseInt(e.target.value) : null })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="lat" className="text-white">Latitud</Label>
            <Input
              id="lat"
              type="number"
              step="any"
              value={formData.lat || ''}
              onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lng" className="text-white">Longitud</Label>
            <Input
              id="lng"
              type="number"
              step="any"
              value={formData.lng || ''}
              onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-white">Land</Label>
          <Input
            id="country"
            value={formData.country || ''}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>
      </>
    );
  }

  return null;
};
