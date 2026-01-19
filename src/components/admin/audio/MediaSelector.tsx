import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Image as ImageIcon, X, Plus, Search } from "lucide-react";
import { useMediaImages, MediaImage, MediaImageUpload } from '@/hooks/useMediaImages';

interface MediaSelectorProps {
  selectedImageId: string | null;
  onImageSelect: (imageId: string | null) => void;
  imageType: 'avatar' | 'thumbnail' | 'background' | 'logo';
}

export const MediaSelector: React.FC<MediaSelectorProps> = ({
  selectedImageId,
  onImageSelect,
  imageType
}) => {
  const { mediaImages, isLoading, uploadMediaImage, getImageUrl } = useMediaImages();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState({
    alt_text: '',
    caption: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filter images by type and search
  const filteredImages = mediaImages?.filter(image => {
    const matchesType = image.image_type === imageType;
    const matchesSearch = searchTerm === '' || 
      image.alt_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.original_filename.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  }) || [];

  const selectedImage = mediaImages?.find(img => img.id === selectedImageId);

  const handleFileUpload = async () => {
    if (!uploadFile) return;

    const uploadPayload: MediaImageUpload = {
      file: uploadFile,
      image_type: imageType,
      alt_text: uploadData.alt_text || undefined,
      caption: uploadData.caption || undefined
    };

    await uploadMediaImage.mutateAsync(uploadPayload);
    
    // Reset form
    setUploadFile(null);
    setUploadData({ alt_text: '', caption: '' });
    setIsDialogOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
    } else {
      alert('Vänligen välj en giltig bildfil');
    }
  };

  const getImageTypeLabel = (type: string) => {
    switch (type) {
      case 'avatar': return 'Avatar/Profil';
      case 'thumbnail': return 'Thumbnail';
      case 'background': return 'Bakgrund';
      case 'logo': return 'Logotyp';
      default: return type;
    }
  };

  return (
    <div className="space-y-4">
      {selectedImage && (
        <div className="relative">
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
            <img 
              src={getImageUrl(selectedImage.file_path)} 
              alt={selectedImage.alt_text || 'Vald bild'}
              className="w-full h-full object-cover"
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => onImageSelect(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="mt-2 text-sm text-muted-foreground">
            <p className="font-medium">{selectedImage.original_filename}</p>
            {selectedImage.alt_text && <p>{selectedImage.alt_text}</p>}
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            {selectedImage ? 'Byt bild' : 'Välj bild'}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Välj {getImageTypeLabel(imageType)} bild
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="existing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing">Befintliga bilder</TabsTrigger>
              <TabsTrigger value="upload">Ladda upp ny</TabsTrigger>
            </TabsList>

            <TabsContent value="existing" className="space-y-4">
              {/* Sökfält */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sök bilder..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Bildgalleri */}
              {isLoading ? (
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : filteredImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {filteredImages.map((image) => (
                    <Card 
                      key={image.id} 
                      className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary ${
                        selectedImageId === image.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => {
                        onImageSelect(image.id);
                        setIsDialogOpen(false);
                      }}
                    >
                      <CardContent className="p-2">
                        <div className="aspect-square bg-muted rounded overflow-hidden mb-2">
                          <img 
                            src={getImageUrl(image.file_path)} 
                            alt={image.alt_text || 'Bild'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium truncate">
                          {image.original_filename}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {image.alt_text || 'Ingen beskrivning'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Inga {getImageTypeLabel(imageType).toLowerCase()} bilder hittades</p>
                  <p className="text-sm">Använd "Ladda upp ny" för att lägga till bilder</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Klicka för att välja bildfil
                  </p>
                </label>
                
                {uploadFile && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="font-medium">{uploadFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadFile.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                )}
              </div>

              {uploadFile && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="alt_text">Alt-text (för tillgänglighet)</Label>
                    <Input
                      id="alt_text"
                      value={uploadData.alt_text}
                      onChange={(e) => setUploadData(prev => ({ ...prev, alt_text: e.target.value }))}
                      placeholder="Beskriv vad som visas i bilden"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="caption">Bildtext</Label>
                    <Input
                      id="caption"
                      value={uploadData.caption}
                      onChange={(e) => setUploadData(prev => ({ ...prev, caption: e.target.value }))}
                      placeholder="Valfri bildtext"
                    />
                  </div>

                  <Button 
                    onClick={handleFileUpload}
                    disabled={uploadMediaImage.isPending}
                    className="w-full"
                  >
                    {uploadMediaImage.isPending ? 'Laddar upp...' : 'Ladda upp bild'}
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};