-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'audio-files', 
  'audio-files', 
  true, 
  52428800, -- 50MB limit
  ARRAY['audio/wav', 'audio/mpeg', 'audio/mp3']
);

-- Create storage policies for audio files
CREATE POLICY "Audio files are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'audio-files');

CREATE POLICY "Admins can upload audio files" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'audio-files' AND is_admin());

CREATE POLICY "Admins can update audio files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'audio-files' AND is_admin());

CREATE POLICY "Admins can delete audio files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'audio-files' AND is_admin());

-- Create table for audio metadata
CREATE TABLE public.audio_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  duration_seconds INTEGER,
  content_type TEXT NOT NULL,
  
  -- Content association
  content_type_category TEXT NOT NULL CHECK (content_type_category IN ('inscription', 'king', 'location', 'general')),
  content_id UUID, -- Can reference runic_inscriptions.id, historical_kings.id, etc.
  
  -- Metadata
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT,
  description_en TEXT,
  language_code TEXT DEFAULT 'sv-se',
  narrator TEXT,
  production_date DATE,
  
  -- Audio specific metadata
  sample_rate INTEGER,
  bit_rate INTEGER,
  channels INTEGER DEFAULT 1,
  
  -- Administrative
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'processing')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.audio_files ENABLE ROW LEVEL SECURITY;

-- Create policies for audio_files
CREATE POLICY "Audio files are publicly viewable" 
ON public.audio_files 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Admins can manage audio files" 
ON public.audio_files 
FOR ALL 
USING (is_admin());

-- Create indexes
CREATE INDEX idx_audio_files_content_type ON public.audio_files(content_type_category);
CREATE INDEX idx_audio_files_content_id ON public.audio_files(content_id);
CREATE INDEX idx_audio_files_status ON public.audio_files(status);

-- Create trigger for updated_at
CREATE TRIGGER update_audio_files_updated_at
BEFORE UPDATE ON public.audio_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();