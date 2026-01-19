-- Uppdatera Karlevistenen med ytterligare information
UPDATE runic_inscriptions 
SET 
  historical_context = 'Karlevistenen är Ölands äldsta och en av Sveriges märkligaste runstenar. Den står på en åker i Karlevi bys sjömarker nära Kalmarsund. Stenen är ett 130 cm högt flyttblock av grå kvartsporfyr, troligen från trakten väster om Oskarshamn. Den står på sin ursprungliga plats mellan två nu bortodlade gravhögar. Sibbe avlidit troligen på färd förbi och höglagts på landbacken av sitt följe. Vissa menar att stenen restes av daner på hemväg från slaget vid Fyrisvallarna omkring år 985.',
  scholarly_notes = 'Innehåller en av få bevarade skaldestrofer på dróttkvætt-versmått. Söderberg menar att inskriften tillhör slutet av 1000-talet, rest till minne av en dansk hövding som blivit höglagd invid stenen, och inskriften är inhuggen av en norsk skald i den danske hövdingens följe. Dikten använder kenningar som "stridernas Truds arbetare" för hövding och "Vagn-Vidur" för skeppshövding.',
  dimensions = '130 cm högt flyttblock av grå kvartsporfyr',
  material = 'Grå kvartsporfyr'
WHERE signum = 'Öl 1';

-- Lägg till alla övriga öländska runstenar
INSERT INTO runic_inscriptions (signum, location, parish, municipality, province, landscape, country, object_type, uncertainty_level, data_source, condition_notes) VALUES
('Öl 2', 'Algutsrums kyrka', 'Algutsrums socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 3', 'Resmo kyrka', 'Resmo socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runstensfragment', 'high', 'Manual entry', 'Försvunnet runstensfragment, parsten till Öl 4'),
('Öl 4', 'Resmo kyrka', 'Resmo socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'medium', 'Manual entry', 'Parsten till Öl 3, finns på Kalmar läns museum'),
('Öl 5', 'Bårby', 'Mörbylånga socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 6', 'Mörbylånga kyrkogård', 'Mörbylånga socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'low', 'Manual entry', NULL),
('Öl 7', 'Mörbylånga kyrka', 'Mörbylånga socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen'),
('Öl 8', 'Mörbylånga kyrkogård', 'Mörbylånga socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Gravhäll', 'high', 'Manual entry', 'Försvunnen gravhäll'),
('Öl 9', 'Kastlösa kyrka', 'Kastlösa socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen'),
('Öl 10', 'Alvlösa', 'Smedby socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 11', 'Alvlösa', 'Smedby socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runstensfragment', 'low', 'Manual entry', NULL),
('Öl 12', 'Smedby kyrkogård', 'Smedby socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 13', 'Södra Möckleby', 'Södra Möckleby socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 14', 'Södra Möckleby kyrkogård', 'Södra Möckleby socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runstensfragment', 'high', 'Manual entry', 'Försvunnet runstensfragment'),
('Öl 15', 'Södra Möckleby kyrkogård', 'Södra Möckleby socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 16', 'Gräsgårds kyrkogård', 'Gräsgårds socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 17', 'Seby', 'Segerstads socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 18', 'Seby', 'Segerstads socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'low', 'Manual entry', NULL),
('Öl 19', 'Hulterstads kyrka', 'Hulterstads socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten'),
('Öl 20', 'Hulterstads kyrkogård', 'Hulterstads socken', 'Mörbylånga kommun', 'Kalmar län', 'Öland', 'Sweden', 'Runsten', 'high', 'Manual entry', 'Försvunnen runsten');