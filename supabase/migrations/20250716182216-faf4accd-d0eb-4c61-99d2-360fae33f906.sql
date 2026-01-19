-- Ta bort den gamla admin-only upload policy som skapar konflikt
DROP POLICY "Admins can upload media images" ON storage.objects;

-- Ta bort dubblerade SELECT policies också
DROP POLICY "Public read access for media images" ON storage.objects;