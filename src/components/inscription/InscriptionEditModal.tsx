import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { RunicInscription } from '@/types/inscription';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, X, Camera } from "lucide-react";
import { InscriptionImageUpload } from './InscriptionImageUpload';

interface InscriptionEditModalProps {
  inscription: RunicInscription;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updatedInscription: RunicInscription) => void;
}

export const InscriptionEditModal: React.FC<InscriptionEditModalProps> = ({ 
  inscription, 
  isOpen, 
  onClose,
  onSave 
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: inscription.name || '',
    name_en: inscription.name_en || '',
    signum: inscription.signum || '',
    transliteration: inscription.transliteration || '',
    normalization: inscription.normalization || '',
    translation_en: inscription.translation_en || '',
    translation_sv: inscription.translation_sv || '',
    dating_text: inscription.dating_text || '',
    location: inscription.location || '',
    parish: inscription.parish || '',
    province: inscription.province || '',
    country: inscription.country || '',
    municipality: inscription.municipality || '',
    county: inscription.county || '',
    landscape: inscription.landscape || '',
    material: inscription.material || '',
    object_type: inscription.object_type || '',
    current_location: inscription.current_location || '',
    dimensions: inscription.dimensions || '',
    rune_type: inscription.rune_type || '',
    style_group: inscription.style_group || '',
    scholarly_notes: inscription.scholarly_notes || '',
    paleographic_notes: inscription.paleographic_notes || '',
    historical_context: inscription.historical_context || '',
    condition_notes: inscription.condition_notes || '',
    latitude: inscription.coordinates?.lat || inscription.latitude || '',
    longitude: inscription.coordinates?.lng || inscription.longitude || '',
  });

  useEffect(() => {
    if (inscription && isOpen) {
      setFormData({
        name: inscription.name || '',
        name_en: inscription.name_en || '',
        signum: inscription.signum || '',
        transliteration: inscription.transliteration || '',
        normalization: inscription.normalization || '',
        translation_en: inscription.translation_en || '',
        translation_sv: inscription.translation_sv || '',
        dating_text: inscription.dating_text || '',
        location: inscription.location || '',
        parish: inscription.parish || '',
        province: inscription.province || '',
        country: inscription.country || '',
        municipality: inscription.municipality || '',
        county: inscription.county || '',
        landscape: inscription.landscape || '',
        material: inscription.material || '',
        object_type: inscription.object_type || '',
        current_location: inscription.current_location || '',
        dimensions: inscription.dimensions || '',
        rune_type: inscription.rune_type || '',
        style_group: inscription.style_group || '',
        scholarly_notes: inscription.scholarly_notes || '',
        paleographic_notes: inscription.paleographic_notes || '',
        historical_context: inscription.historical_context || '',
        condition_notes: inscription.condition_notes || '',
        latitude: inscription.coordinates?.lat || inscription.latitude || '',
        longitude: inscription.coordinates?.lng || inscription.longitude || '',
      });
    }
  }, [inscription, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    console.log('🔄 Starting inscription update for:', formData.name || formData.signum);
    console.log('🔍 Current formData:', formData);
    console.log('🔍 Latitude value:', formData.latitude, 'type:', typeof formData.latitude);
    console.log('🔍 Longitude value:', formData.longitude, 'type:', typeof formData.longitude);
    
    try {
      // Prepare update data with coordinates as PostGIS point if latitude/longitude are provided
      const updateData: any = { ...formData };
      
      // Handle coordinates update  
      if (formData.latitude && formData.longitude) {
        // Convert points to commas if needed (Swedish decimal format)
        const latStr = formData.latitude.toString().replace('.', ',');
        const lngStr = formData.longitude.toString().replace('.', ',');
        
        const lat = parseFloat(latStr.replace(',', '.'));
        const lng = parseFloat(lngStr.replace(',', '.'));
        
        console.log('📍 Original input:', formData.latitude, formData.longitude);
        console.log('📍 Converted to numbers:', lat, lng);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          // Use exact format from database: (longitude,latitude)
          updateData.coordinates = `(${lng},${lat})`;
          console.log(`📍 Setting coordinates to: (${lng},${lat})`);
        }
      }
      
      // Remove latitude and longitude from updateData as they're not table columns
      delete updateData.latitude;
      delete updateData.longitude;

      console.log('📝 Updating inscription with data:', updateData);

      const { data, error } = await supabase
        .from('runic_inscriptions')
        .update(updateData)
        .eq('id', inscription.id)
        .select()
        .single();

      if (error) {
        console.error('❌ Database update error:', error);
        throw error;
      }

      console.log('✅ Database response:', data);
      console.log('✅ Updated coordinates in response:', data?.coordinates);
      
      // Verify the update worked by checking the returned data
      if (data && updateData.coordinates) {
        console.log('🔍 Expected coordinates:', updateData.coordinates);
        console.log('🔍 Actual coordinates in response:', data.coordinates);
        
        if (data.coordinates !== updateData.coordinates) {
          console.warn('⚠️ Coordinates mismatch! Expected:', updateData.coordinates, 'Got:', data.coordinates);
        }
      }

      console.log('✅ Successfully updated inscription:', data);

      toast({
        title: "Inscription Updated",
        description: `Successfully updated ${formData.name || formData.signum}`,
      });

      if (onSave && data) {
        console.log('🔄 Calling onSave callback with updated data');
        // Ensure coordinates are properly formatted for the type
        const updatedInscription = {
          ...data,
          coordinates: data.coordinates || inscription.coordinates
        };
        onSave(updatedInscription as RunicInscription);
      }
      
      onClose();
    } catch (error: any) {
      console.error('❌ Error updating inscription:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update inscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            Redigera Runinskrift
            <span className="text-slate-400 font-normal">
              {formData.name || formData.signum}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basic">Grundläggande</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="details">Detaljer</TabsTrigger>
              <TabsTrigger value="images">Bilder</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Grundläggande Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-300">Namn (Svenska)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name_en" className="text-slate-300">Namn (Engelska)</Label>
                    <Input
                      id="name_en"
                      value={formData.name_en}
                      onChange={(e) => handleInputChange('name_en', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signum" className="text-slate-300">Signum</Label>
                    <Input
                      id="signum"
                      value={formData.signum}
                      onChange={(e) => handleInputChange('signum', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Plats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-slate-300">Plats</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parish" className="text-slate-300">Socken</Label>
                    <Input
                      id="parish"
                      value={formData.parish}
                      onChange={(e) => handleInputChange('parish', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="municipality" className="text-slate-300">Kommun</Label>
                    <Input
                      id="municipality"
                      value={formData.municipality}
                      onChange={(e) => handleInputChange('municipality', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="province" className="text-slate-300">Landskap</Label>
                    <Input
                      id="province"
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="county" className="text-slate-300">Län</Label>
                    <Input
                      id="county"
                      value={formData.county}
                      onChange={(e) => handleInputChange('county', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-slate-300">Land</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
                
                {/* Coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="latitude" className="text-slate-300">Latitud</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) => handleInputChange('latitude', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="Ex: 59.3293"
                    />
                  </div>
                  <div>
                    <Label htmlFor="longitude" className="text-slate-300">Longitud</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) => handleInputChange('longitude', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="Ex: 18.0686"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-6">
              {/* Text and Translation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Text och Översättning</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="transliteration" className="text-slate-300">Translitteration</Label>
                    <Textarea
                      id="transliteration"
                      value={formData.transliteration}
                      onChange={(e) => handleInputChange('transliteration', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white font-mono"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="normalization" className="text-slate-300">Normalisering</Label>
                    <Textarea
                      id="normalization"
                      value={formData.normalization}
                      onChange={(e) => handleInputChange('normalization', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white font-mono"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="translation_sv" className="text-slate-300">Översättning (Svenska)</Label>
                      <Textarea
                        id="translation_sv"
                        value={formData.translation_sv}
                        onChange={(e) => handleInputChange('translation_sv', e.target.value)}
                        className="bg-slate-800 border-slate-600 text-white"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="translation_en" className="text-slate-300">Översättning (Engelska)</Label>
                      <Textarea
                        id="translation_en"
                        value={formData.translation_en}
                        onChange={(e) => handleInputChange('translation_en', e.target.value)}
                        className="bg-slate-800 border-slate-600 text-white"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-6">
              {/* Physical Properties */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Fysiska Egenskaper</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="material" className="text-slate-300">Material</Label>
                    <Input
                      id="material"
                      value={formData.material}
                      onChange={(e) => handleInputChange('material', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="object_type" className="text-slate-300">Objekttyp</Label>
                    <Input
                      id="object_type"
                      value={formData.object_type}
                      onChange={(e) => handleInputChange('object_type', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dimensions" className="text-slate-300">Dimensioner</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="current_location" className="text-slate-300">Nuvarande Plats</Label>
                    <Input
                      id="current_location"
                      value={formData.current_location}
                      onChange={(e) => handleInputChange('current_location', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Runological Properties */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Runologiska Egenskaper</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rune_type" className="text-slate-300">Runtyp</Label>
                    <Input
                      id="rune_type"
                      value={formData.rune_type}
                      onChange={(e) => handleInputChange('rune_type', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="style_group" className="text-slate-300">Stilgrupp</Label>
                    <Input
                      id="style_group"
                      value={formData.style_group}
                      onChange={(e) => handleInputChange('style_group', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dating_text" className="text-slate-300">Datering</Label>
                    <Input
                      id="dating_text"
                      value={formData.dating_text}
                      onChange={(e) => handleInputChange('dating_text', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-300">Anteckningar</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="scholarly_notes" className="text-slate-300">Forskningsnoter</Label>
                    <Textarea
                      id="scholarly_notes"
                      value={formData.scholarly_notes}
                      onChange={(e) => handleInputChange('scholarly_notes', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paleographic_notes" className="text-slate-300">Paleografiska Noter</Label>
                    <Textarea
                      id="paleographic_notes"
                      value={formData.paleographic_notes}
                      onChange={(e) => handleInputChange('paleographic_notes', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="historical_context" className="text-slate-300">Historisk Kontext</Label>
                    <Textarea
                      id="historical_context"
                      value={formData.historical_context}
                      onChange={(e) => handleInputChange('historical_context', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="condition_notes" className="text-slate-300">Skick/Tillstånd</Label>
                    <Textarea
                      id="condition_notes"
                      value={formData.condition_notes}
                      onChange={(e) => handleInputChange('condition_notes', e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-6">
              <InscriptionImageUpload 
                inscription={inscription}
                onImageUploaded={() => {
                  // Optionally refresh image data or notify parent
                  console.log('Image uploaded for inscription:', inscription.signum);
                }}
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            <X className="h-4 w-4 mr-1" />
            Avbryt
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-1" />
            )}
            Spara Ändringar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};