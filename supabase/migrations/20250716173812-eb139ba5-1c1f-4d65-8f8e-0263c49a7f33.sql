-- Check and fix storage policies for media-images bucket
-- First check current policies
SELECT * FROM storage.objects WHERE bucket_id = 'media-images' LIMIT 3;

-- Make sure storage policies are properly set up for the media-images bucket
-- Allow public access to images
CREATE POLICY "Public read access for media images"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-images');

-- Allow authenticated users to upload images 
CREATE POLICY "Authenticated users can upload media images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'media-images' AND auth.role() = 'authenticated');

-- Allow users to update their uploaded images
CREATE POLICY "Users can update media images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'media-images' AND auth.role() = 'authenticated');

-- Allow users to delete media images
CREATE POLICY "Users can delete media images"
ON storage.objects FOR DELETE
USING (bucket_id = 'media-images' AND auth.role() = 'authenticated');