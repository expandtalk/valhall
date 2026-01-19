import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AudioFile {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number | null;
  duration_seconds: number | null;
  content_type: string;
  content_type_category: 'inscription' | 'king' | 'location' | 'general';
  content_id: string | null;
  title: string;
  title_en: string | null;
  description: string | null;
  description_en: string | null;
  language_code: string;
  narrator: string | null;
  production_date: string | null;
  sample_rate: number | null;
  bit_rate: number | null;
  channels: number;
  status: 'active' | 'inactive' | 'processing';
  avatar_image_id: string | null;
  thumbnail_image_id: string | null;
  avatar_image?: {
    id: string;
    file_path: string;
    alt_text: string | null;
  } | null;
  thumbnail_image?: {
    id: string;
    file_path: string;
    alt_text: string | null;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface AudioFileUpload {
  file: File;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  content_type_category: 'inscription' | 'king' | 'location' | 'general';
  content_id?: string;
  narrator?: string;
  production_date?: string;
}

export const useAudioFiles = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all audio files
  const { data: audioFiles, isLoading } = useQuery({
    queryKey: ['audio-files'],
    queryFn: async (): Promise<AudioFile[]> => {
      const { data, error } = await supabase
        .from('audio_files')
        .select(`
          *,
          avatar_image:media_images!avatar_image_id(id, file_path, alt_text),
          thumbnail_image:media_images!thumbnail_image_id(id, file_path, alt_text)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as AudioFile[];
    }
  });

  // Get audio files by content
  const getAudioFilesByContent = (contentType: string, contentId: string) => {
    return useQuery({
      queryKey: ['audio-files', contentType, contentId],
      queryFn: async (): Promise<AudioFile[]> => {
        const { data, error } = await supabase
          .from('audio_files')
          .select('*')
          .eq('content_type_category', contentType)
          .eq('content_id', contentId)
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []) as AudioFile[];
      }
    });
  };

  // Upload audio file
  const uploadAudioFile = useMutation({
    mutationFn: async (uploadData: AudioFileUpload) => {
      const { file, ...metadata } = uploadData;
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
      const filePath = `audio/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('audio-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get file URL
      const { data: { publicUrl } } = supabase.storage
        .from('audio-files')
        .getPublicUrl(filePath);

      // Save metadata to database
      const { data, error: dbError } = await supabase
        .from('audio_files')
        .insert([{
          filename: fileName,
          original_filename: file.name,
          file_path: filePath,
          file_size: file.size,
          content_type: file.type,
          ...metadata
        }])
        .select()
        .single();

      if (dbError) throw dbError;
      return { ...data, publicUrl };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-files'] });
      toast({
        title: "Fil uppladdad",
        description: "Ljudfilen har laddats upp framgångsrikt"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte ladda upp fil: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Update audio file metadata
  const updateAudioFile = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<AudioFile> }) => {
      const { data, error } = await supabase
        .from('audio_files')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-files'] });
      toast({
        title: "Uppdaterad",
        description: "Ljudfilen har uppdaterats"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte uppdatera fil: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Delete audio file
  const deleteAudioFile = useMutation({
    mutationFn: async (id: string) => {
      // Get file info first
      const { data: fileData, error: fetchError } = await supabase
        .from('audio_files')
        .select('file_path')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('audio-files')
        .remove([fileData.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('audio_files')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audio-files'] });
      toast({
        title: "Borttagen",
        description: "Ljudfilen har tagits bort"
      });
    },
    onError: (error) => {
      toast({
        title: "Fel",
        description: `Kunde inte ta bort fil: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Get public URL for audio file
  const getAudioUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('audio-files')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  return {
    audioFiles,
    isLoading,
    uploadAudioFile,
    updateAudioFile,
    deleteAudioFile,
    getAudioFilesByContent,
    getAudioUrl
  };
};