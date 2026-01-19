
import React, { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  imageFile: File | null;
  onImageChange: (file: File | null) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ imageFile, onImageChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div className="space-y-2">
      <Label className="text-white">Bild av inskription (valfritt)</Label>
      
      {!imageFile ? (
        <Card 
          className="border-2 border-dashed border-white/20 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Upload className="h-8 w-8 text-slate-400 mb-3" />
            <p className="text-slate-300 text-sm text-center mb-2">
              Klicka för att ladda upp eller dra och släpp en bild
            </p>
            <p className="text-slate-500 text-xs text-center">
              Stöder JPG, PNG, WebP (max 10MB)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/5 border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white text-sm font-medium">{imageFile.name}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveImage}
                className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Uploaded runic inscription"
                className="w-full max-h-48 object-contain rounded-lg bg-black/20"
              />
            </div>
            
            <p className="text-slate-400 text-xs mt-2">
              Bilden kommer att analyseras tillsammans med texten för mer noggrann datering.
            </p>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
