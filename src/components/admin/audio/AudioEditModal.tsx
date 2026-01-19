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
import { Edit } from "lucide-react";
import { AudioFile, useAudioFiles } from '@/hooks/useAudioFiles';

interface AudioEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioFile: AudioFile;
}

export const AudioEditModal: React.FC<AudioEditModalProps> = ({
  isOpen,
  onClose,
  audioFile
}) => {
  const { updateAudioFile } = useAudioFiles();
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    content_type_category: 'general' as 'inscription' | 'king' | 'location' | 'general',
    content_id: '',
    narrator: '',
    production_date: '',
    status: 'active' as 'active' | 'inactive' | 'processing'
  });

  useEffect(() => {
    if (audioFile) {
      setFormData({
        title: audioFile.title || '',
        title_en: audioFile.title_en || '',
        description: audioFile.description || '',
        description_en: audioFile.description_en || '',
        content_type_category: audioFile.content_type_category,
        content_id: audioFile.content_id || '',
        narrator: audioFile.narrator || '',
        production_date: audioFile.production_date || '',
        status: audioFile.status
      });
    }
  }, [audioFile]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert('Titel krävs');
      return;
    }

    const updates = {
      ...formData,
      content_id: formData.content_id || null,
      production_date: formData.production_date || null
    };

    await updateAudioFile.mutateAsync({
      id: audioFile.id,
      updates
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Redigera ljudfil
          </DialogTitle>
          <DialogDescription>
            Uppdatera metadata för "{audioFile?.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-title">Titel (svenska) *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="t.ex. Harald Blåtands saga"
              />
            </div>
            <div>
              <Label htmlFor="edit-title_en">Titel (engelska)</Label>
              <Input
                id="edit-title_en"
                value={formData.title_en}
                onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                placeholder="t.ex. Harald Bluetooth's story"
              />
            </div>
          </div>

          {/* Content Association */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-content_type">Innehållstyp</Label>
              <Select 
                value={formData.content_type_category} 
                onValueChange={(value: any) => setFormData(prev => ({ ...prev, content_type_category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Allmänt</SelectItem>
                  <SelectItem value="inscription">Runinskrift</SelectItem>
                  <SelectItem value="king">Kung/Regent</SelectItem>
                  <SelectItem value="location">Plats</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-content_id">Innehålls-ID</Label>
              <Input
                id="edit-content_id"
                value={formData.content_id}
                onChange={(e) => setFormData(prev => ({ ...prev, content_id: e.target.value }))}
                placeholder="UUID för kopplat innehåll"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="edit-status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktiv</SelectItem>
                <SelectItem value="inactive">Inaktiv</SelectItem>
                <SelectItem value="processing">Bearbetas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-description">Beskrivning (svenska)</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                placeholder="Beskrivning av ljudinnehållet..."
              />
            </div>
            <div>
              <Label htmlFor="edit-description_en">Beskrivning (engelska)</Label>
              <Textarea
                id="edit-description_en"
                value={formData.description_en}
                onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                rows={3}
                placeholder="Description of audio content..."
              />
            </div>
          </div>

          {/* Additional Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-narrator">Berättare/Röst</Label>
              <Input
                id="edit-narrator"
                value={formData.narrator}
                onChange={(e) => setFormData(prev => ({ ...prev, narrator: e.target.value }))}
                placeholder="t.ex. Maria Andersson"
              />
            </div>
            <div>
              <Label htmlFor="edit-production_date">Produktionsdatum</Label>
              <Input
                id="edit-production_date"
                type="date"
                value={formData.production_date}
                onChange={(e) => setFormData(prev => ({ ...prev, production_date: e.target.value }))}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={updateAudioFile.isPending}
          >
            {updateAudioFile.isPending ? 'Sparar...' : 'Spara ändringar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};