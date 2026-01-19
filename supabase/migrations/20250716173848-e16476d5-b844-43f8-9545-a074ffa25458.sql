-- Test inserting a placeholder image for Karlevi Stone to verify the system works
INSERT INTO inscription_media (
  inscription_id,
  media_url,
  media_type,
  description,
  photographer
) VALUES (
  'ddbb1147-014c-4efb-a621-01a1b1b8f561',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Karlevi_runestone.jpg/640px-Karlevi_runestone.jpg',
  'image',
  'Karlevistenen - historisk foto från Kalmar Läns Museum',
  'Kalmar Läns Museum'
);