import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useMediaImages } from '@/hooks/useMediaImages';

export const MediaImageUpload: React.FC = () => {
  const { uploadMediaImage } = useMediaImages();
  const [file, setFile] = useState<File | null>(null);
  const [imageType, setImageType] = useState<'avatar' | 'thumbnail' | 'background' | 'logo'>('avatar');
  const [altText, setAltText] = useState('');
  const [caption, setCaption] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      await uploadMediaImage.mutateAsync({
        file,
        image_type: imageType,
        alt_text: altText || undefined,
        caption: caption || undefined
      });

      // Reset form
      setFile(null);
      setPreview(null);
      setAltText('');
      setCaption('');
      
      // Reset file input
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Ladda upp bilder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image-upload">Välj bild</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>

        {preview && (
          <div className="space-y-2">
            <Label>Förhandsvisning</Label>
            <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-slate-100">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Bildtyp</Label>
          <Select value={imageType} onValueChange={(value: any) => setImageType(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="avatar">Avatar</SelectItem>
              <SelectItem value="thumbnail">Miniatyrbild</SelectItem>
              <SelectItem value="background">Bakgrund</SelectItem>
              <SelectItem value="logo">Logotyp</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="alt-text">Alt-text (tillgänglighet)</Label>
          <Input
            id="alt-text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Beskriv bilden..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="caption">Bildtext (valfritt)</Label>
          <Textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Ytterligare beskrivning..."
            rows={2}
          />
        </div>

        <Button 
          onClick={handleUpload}
          disabled={!file || uploadMediaImage.isPending}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploadMediaImage.isPending ? 'Laddar upp...' : 'Ladda upp bild'}
        </Button>
      </CardContent>
    </Card>
  );
};