-- Create storage bucket for media images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-images', 
  'media-images', 
  true, 
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies for media images
CREATE POLICY "Media images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media-images');

CREATE POLICY "Admins can upload media images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media-images' AND is_admin());

CREATE POLICY "Admins can update media images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media-images' AND is_admin());

CREATE POLICY "Admins can delete media images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media-images' AND is_admin());

-- Create table for media images metadata
CREATE TABLE public.media_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  
  -- Image specific metadata
  width INTEGER,
  height INTEGER,
  content_type TEXT NOT NULL,
  
  -- Usage context
  image_type TEXT NOT NULL CHECK (image_type IN ('avatar', 'thumbnail', 'background', 'logo')),
  alt_text TEXT,
  caption TEXT,
  
  -- Administrative
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.media_images ENABLE ROW LEVEL SECURITY;

-- Create policies for media_images
CREATE POLICY "Media images are publicly viewable" 
ON public.media_images 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Admins can manage media images" 
ON public.media_images 
FOR ALL 
USING (is_admin());

-- Create indexes
CREATE INDEX idx_media_images_image_type ON public.media_images(image_type);
CREATE INDEX idx_media_images_status ON public.media_images(status);

-- Create trigger for updated_at
CREATE TRIGGER update_media_images_updated_at
BEFORE UPDATE ON public.media_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add avatar image reference to audio_files
ALTER TABLE public.audio_files 
ADD COLUMN avatar_image_id UUID REFERENCES public.media_images(id),
ADD COLUMN thumbnail_image_id UUID REFERENCES public.media_images(id);