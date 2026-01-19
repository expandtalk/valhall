import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MediaImage {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number | null;
  width: number | null;
  height: number | null;
  content_type: string;
  image_type: 'avatar' | 'thumbnail' | 'background' | 'logo';
  alt_text: string | null;
  caption: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface MediaImageUpload {
  file: File;
  image_type: 'avatar' | 'thumbnail' | 'background' | 'logo';
  alt_text?: string;
  caption?: string;
}

export const useMediaImages = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all media images
  const { data: mediaImages, isLoading } = useQuery({
    queryKey: ['media-images'],
    queryFn: async (): Promise<MediaImage[]> => {
      const { data, error } = await supabase
        .from('media_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as MediaImage[];
    }
  });

  // Get images by type
  const getImagesByType = (imageType: string) => {
    return useQuery({
      queryKey: ['media-images', imageType],
      queryFn: async (): Promise<MediaImage[]> => {
        const { data, error } = await supabase
          .from('media_images')
          .select('*')
          .eq('image_type', imageType)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []) as MediaImage[];
      }
    });
  };

  // Upload media image
  const uploadMediaImage = useMutation({
    mutationFn: async (uploadData: MediaImageUpload) => {
      const { file, ...metadata } = uploadData;
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('media-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get image dimensions if possible
      let width = null;
      let height = null;
      
      if (file.type.startsWith('image/')) {
        try {
          const dimensions = await getImageDimensions(file);
          width = dimensions.width;
          height = dimensions.height;
        } catch (error) {
          console.warn('Could not get image dimensions:', error);
        }
      }

      // Save metadata to database
      const { data, error: dbError } = await supabase
        .from('media_images')
        .insert([{
          filename: fileName,
          original_filename: file.name,
          file_path: filePath,
          file_size: file.size,
          width,
          height,
          content_type: file.type,
          ...metadata
        }])
        .select()
        .single();

      if (dbError) throw dbError;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-images'] });
      toast({
        title: "Bild uppladdad",
        description: "Bilden har laddats upp framgångsrikt"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte ladda upp bild: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Update media image metadata
  const updateMediaImage = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<MediaImage> }) => {
      const { data, error } = await supabase
        .from('media_images')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-images'] });
      toast({
        title: "Uppdaterad",
        description: "Bilden har uppdaterats"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte uppdatera bild: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Delete media image
  const deleteMediaImage = useMutation({
    mutationFn: async (id: string) => {
      // Get file info first
      const { data: imageData, error: fetchError } = await supabase
        .from('media_images')
        .select('file_path')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media-images')
        .remove([imageData.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_images')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media-images'] });
      toast({
        title: "Borttagen",
        description: "Bilden har tagits bort"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte ta bort bild: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Get public URL for image
  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('media-images')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  return {
    mediaImages,
    isLoading,
    uploadMediaImage,
    updateMediaImage,
    deleteMediaImage,
    getImagesByType,
    getImageUrl
  };
};

// Helper function to get image dimensions
const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};