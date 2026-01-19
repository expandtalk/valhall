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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Image, Video, Music } from "lucide-react";
import { useAudioFiles, AudioFileUpload } from '@/hooks/useAudioFiles';
import { useMediaImages } from '@/hooks/useMediaImages';
import { MediaSelector } from './MediaSelector';

interface AudioUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioUploadModal: React.FC<AudioUploadModalProps> = ({
  isOpen,
  onClose
}) => {
  const { uploadAudioFile } = useAudioFiles();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAvatarImage, setSelectedAvatarImage] = useState<string | null>(null);
  const [selectedThumbnailImage, setSelectedThumbnailImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    content_type_category: 'general' as 'inscription' | 'king' | 'location' | 'general',
    content_id: '',
    narrator: '',
    production_date: ''
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setSelectedFile(file);
    } else {
      alert('Vänligen välj en giltig ljudfil');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !formData.title.trim()) {
      alert('Fil och titel krävs');
      return;
    }

    const uploadData: AudioFileUpload = {
      file: selectedFile,
      ...formData,
      content_id: formData.content_id || undefined,
      production_date: formData.production_date || undefined
    };

    await uploadAudioFile.mutateAsync(uploadData);
    
    // Reset form
    setSelectedFile(null);
    setSelectedAvatarImage(null);
    setSelectedThumbnailImage(null);
    setFormData({
      title: '',
      title_en: '',
      description: '',
      description_en: '',
      content_type_category: 'general',
      content_id: '',
      narrator: '',
      production_date: ''
    });
    
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Music className="h-5 w-5" />
            Ladda upp ljudfil
          </DialogTitle>
          <DialogDescription>
            Ladda upp en ljudfil och koppla bilder och metadata
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vänster kolumn - Fil upload och grundläggande info */}
          <div className="space-y-4">
            {/* Fil upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ljudfil</CardTitle>
                <CardDescription>Välj en WAV, MP3 eller annan ljudfil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Klicka för att välja ljudfil
                    </p>
                  </label>
                  
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <p className="font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Grundläggande info */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="title">Titel (svenska) *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="t.ex. Harald Blåtands saga"
                  />
                </div>
                <div>
                  <Label htmlFor="title_en">Titel (engelska)</Label>
                  <Input
                    id="title_en"
                    value={formData.title_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                    placeholder="t.ex. Harald Bluetooth's story"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content_type">Innehållstyp</Label>
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
                <Label htmlFor="content_id">Innehålls-ID</Label>
                <Input
                  id="content_id"
                  value={formData.content_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, content_id: e.target.value }))}
                  placeholder="UUID för kopplat innehåll"
                />
              </div>
            </div>
          </div>

          {/* Höger kolumn - Media och metadata */}
          <div className="space-y-4">
            {/* Avatar bild */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Avatar/Profil bild
                </CardTitle>
                <CardDescription>Välj en bild som representerar ljudfilen</CardDescription>
              </CardHeader>
              <CardContent>
                <MediaSelector
                  selectedImageId={selectedAvatarImage}
                  onImageSelect={setSelectedAvatarImage}
                  imageType="avatar"
                />
              </CardContent>
            </Card>

            {/* Thumbnail bild */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Thumbnail bild
                </CardTitle>
                <CardDescription>Välj en mindre bild för förhandsvisning</CardDescription>
              </CardHeader>
              <CardContent>
                <MediaSelector
                  selectedImageId={selectedThumbnailImage}
                  onImageSelect={setSelectedThumbnailImage}
                  imageType="thumbnail"
                />
              </CardContent>
            </Card>

            {/* Beskrivningar */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Beskrivning (svenska)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  placeholder="Beskrivning av ljudinnehållet..."
                />
              </div>
              <div>
                <Label htmlFor="description_en">Beskrivning (engelska)</Label>
                <Textarea
                  id="description_en"
                  value={formData.description_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                  rows={3}
                  placeholder="Description of audio content..."
                />
              </div>
            </div>

            {/* Ytterligare metadata */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="narrator">Berättare/Röst</Label>
                <Input
                  id="narrator"
                  value={formData.narrator}
                  onChange={(e) => setFormData(prev => ({ ...prev, narrator: e.target.value }))}
                  placeholder="t.ex. Maria Andersson"
                />
              </div>
              <div>
                <Label htmlFor="production_date">Produktionsdatum</Label>
                <Input
                  id="production_date"
                  type="date"
                  value={formData.production_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, production_date: e.target.value }))}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Avbryt
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={uploadAudioFile.isPending || !selectedFile || !formData.title}
          >
            {uploadAudioFile.isPending ? 'Laddar upp...' : 'Ladda upp ljudfil'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};