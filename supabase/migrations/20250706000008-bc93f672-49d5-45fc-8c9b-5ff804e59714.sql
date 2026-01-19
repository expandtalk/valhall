-- Update existing audio files to be general category so they show as podcasts
UPDATE audio_files 
SET content_type_category = 'general' 
WHERE content_type_category IN ('location', 'inscription');