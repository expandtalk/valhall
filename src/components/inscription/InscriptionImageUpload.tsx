import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Upload, X, Camera, ExternalLink } from "lucide-react";
import { RunicInscription } from '@/types/inscription';

interface InscriptionImageUploadProps {
  inscription: RunicInscription;
  onImageUploaded: () => void;
}

export const InscriptionImageUpload: React.FC<InscriptionImageUploadProps> = ({ 
  inscription, 
  onImageUploaded 
}) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${inscription.signum?.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;
      const filePath = `inscriptions/${inscription.id}/${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('media-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media-images')
        .getPublicUrl(filePath);

      // Save to inscription_media table
      const { error: dbError } = await supabase
        .from('inscription_media')
        .insert({
          inscription_id: inscription.id,
          media_url: publicUrl,
          media_type: 'image',
          file_format: fileExt,
          description: `Bild av ${inscription.name || inscription.signum}`,
        });

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Bild uppladdad",
        description: "Bilden har sparats och kommer visas på inskriften.",
      });

      onImageUploaded();
      
      // Reset form
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Uppladdning misslyckades",
        description: error.message || "Det gick inte att ladda upp bilden",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl.trim()) return;

    setIsUploading(true);
    try {
      // Save URL to inscription_media table
      const { error } = await supabase
        .from('inscription_media')
        .insert({
          inscription_id: inscription.id,
          media_url: uploadUrl,
          media_type: 'image',
          description: `Extern bild av ${inscription.name || inscription.signum}`,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Bild-URL sparad",
        description: "Bilden har länkats och kommer visas på inskriften.",
      });

      onImageUploaded();
      setUploadUrl('');
      
    } catch (error: any) {
      console.error('Error saving image URL:', error);
      toast({
        title: "Sparning misslyckades",
        description: error.message || "Det gick inte att spara bild-URL:en",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Fel filtyp",
          description: "Endast bildfiler är tillåtna.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Filen för stor",
          description: "Bilden får max vara 10MB stor.",
          variant: "destructive",
        });
        return;
      }

      handleFileUpload(file);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-600">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Camera className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Lägg till bilder</h3>
        </div>

        {/* File upload */}
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-slate-300">
            Ladda upp från dator
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="bg-slate-700 border-slate-600 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1"
            />
          </div>
          <p className="text-xs text-slate-400">
            Accepterade format: JPG, PNG, GIF, WebP (max 10MB)
          </p>
        </div>

        {/* URL input */}
        <div className="space-y-2">
          <Label htmlFor="image-url" className="text-slate-300">
            Eller länka från arkiv/webbplats
          </Label>
          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <Input
              id="image-url"
              type="url"
              placeholder="https://exempel.se/bild.jpg"
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              disabled={isUploading}
              className="bg-slate-700 border-slate-600 text-white flex-1"
            />
            <Button
              type="submit"
              disabled={isUploading || !uploadUrl.trim()}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-slate-400">
            Lägg till URL till bilder från digitala arkiv eller andra webbplatser
          </p>
        </div>

        {isUploading && (
          <div className="flex items-center gap-2 text-blue-400 text-sm">
            <Upload className="h-4 w-4 animate-spin" />
            <span>Laddar upp bild...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};