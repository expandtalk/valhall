-- Fix RLS policies for inscription_media table to allow inserts and updates
CREATE POLICY "Users can insert inscription media"
ON public.inscription_media
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update inscription media"
ON public.inscription_media
FOR UPDATE 
USING (true);

CREATE POLICY "Users can delete inscription media"
ON public.inscription_media
FOR DELETE 
USING (true);

-- Fix media_images policies to allow inserts and updates
CREATE POLICY "Users can insert media images"
ON public.media_images
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update media images"
ON public.media_images
FOR UPDATE 
USING (true);

CREATE POLICY "Users can delete media images"
ON public.media_images
FOR DELETE 
USING (true);

-- Also make sure media_images shows all images, not just active ones
DROP POLICY IF EXISTS "Media images are publicly viewable" ON public.media_images;
CREATE POLICY "Media images are publicly viewable"
ON public.media_images
FOR SELECT 
USING (true);