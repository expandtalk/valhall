
-- Add table for historical events that provide context to the royal chronicles
CREATE TABLE IF NOT EXISTS historical_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year_start INTEGER NOT NULL,
  year_end INTEGER,
  event_name TEXT NOT NULL,
  event_name_en TEXT NOT NULL,
  description TEXT,
  description_en TEXT,
  event_type TEXT NOT NULL DEFAULT 'political', -- political, natural_disaster, plague, military, exploration, cultural
  significance_level TEXT NOT NULL DEFAULT 'high', -- high, medium, low
  region_affected TEXT[], -- regions affected by the event
  sources TEXT[], -- historical sources or references
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient querying by date range
CREATE INDEX IF NOT EXISTS idx_historical_events_date_range ON historical_events (year_start, year_end);
CREATE INDEX IF NOT EXISTS idx_historical_events_type ON historical_events (event_type);

-- Insert the historical events you mentioned
INSERT INTO historical_events (year_start, year_end, event_name, event_name_en, description, description_en, event_type, significance_level, region_affected, sources) VALUES

-- Fimbulvinter
(536, 540, 'Fimbulvinter (Volkanisk vinter)', 'Fimbulwinter (Volcanic Winter)', 
'Den största klimatkatastrofen som kopplas till vikingatiden. Vulkanisk vinter som kan ha inspirerat den nordiska myten om Fimbulvinter - den tre år långa vintern som skulle föregå Ragnarök. Norge och Sverige förlorade upp till hälften av sin befolkning.', 
'The greatest climate catastrophe linked to the Viking Age. Volcanic winter that may have inspired the Norse myth of Fimbulwinter - the three-year winter that would precede Ragnarök. Norway and Sweden lost up to half their population.',
'natural_disaster', 'high', ARRAY['Sweden', 'Norway', 'Denmark'], ARRAY['Volcanological studies', 'Archaeological evidence']),

-- Justinianska pesten
(541, 750, 'Justinianska pesten', 'Justinian Plague', 
'Den första stora pestpandemin som drabbade Europa. Började 541 e.Kr. och pågick till ca 750 e.Kr., precis innan vikingarna började sina plundringar i Västeuropa.',
'The first major plague pandemic that struck Europe. Started in 541 CE and lasted until around 750 CE, just before the Vikings began their raids in Western Europe.',
'plague', 'high', ARRAY['Europe', 'Mediterranean', 'Scandinavia'], ARRAY['Byzantine chronicles', 'Archaeological evidence']),

-- Vikingatida händelser
(793, 793, 'Anfallet på Lindisfarne', 'Attack on Lindisfarne', 
'Vikingarnas anfall på klostret Lindisfarne, ofta betraktat som vikingatidedens början.',
'Viking attack on Lindisfarne monastery, often considered the beginning of the Viking Age.',
'military', 'high', ARRAY['England', 'Scandinavia'], ARRAY['Anglo-Saxon Chronicle']),

(795, 795, 'Första anfallen på Irland', 'First Attacks on Ireland', 
'Vikingarna når Irland för första gången och börjar sina plundringar.',
'Vikings reach Ireland for the first time and begin their raids.',
'military', 'high', ARRAY['Ireland', 'Scandinavia'], ARRAY['Irish Annals']),

(839, 839, 'Vikingar når Konstantinopel', 'Vikings Reach Constantinople', 
'Första dokumenterade kontakten mellan vikingar och Bysantinska riket.',
'First documented contact between Vikings and the Byzantine Empire.',
'political', 'high', ARRAY['Byzantine Empire', 'Scandinavia'], ARRAY['Byzantine chronicles']),

(845, 845, 'Anfallet på Paris (Ragnar Lodbrok)', 'Attack on Paris (Ragnar Lodbrok)', 
'Ragnar Lodbroks berömda anfall på Paris där han erhöll en stor lösensumma.',
'Ragnar Lodbrok''s famous attack on Paris where he received a large ransom.',
'military', 'high', ARRAY['France', 'Scandinavia'], ARRAY['Frankish annals']),

(866, 866, 'Anfallet på York', 'Attack on York', 
'Den stora hedniska armén erövrar Jorvik (York) och etablerar vikingastyre i norra England.',
'The Great Heathen Army conquers Jorvik (York) and establishes Viking rule in northern England.',
'military', 'high', ARRAY['England', 'Scandinavia'], ARRAY['Anglo-Saxon Chronicle']),

(874, 874, 'Bosättningen av Island börjar', 'Settlement of Iceland Begins', 
'Systematisk kolonisering av Island börjar under ledning av norska bosättare.',
'Systematic colonization of Iceland begins led by Norwegian settlers.',
'exploration', 'high', ARRAY['Iceland', 'Norway'], ARRAY['Landnámabók', 'Íslendingabók']),

(885, 886, 'Belägringen av Paris', 'Siege of Paris', 
'Den stora belägringen av Paris som varade i nästan ett år.',
'The great siege of Paris that lasted almost a year.',
'military', 'high', ARRAY['France', 'Scandinavia'], ARRAY['Frankish chronicles']),

(911, 911, 'Etableringen av Normandie', 'Establishment of Normandy', 
'Rollo får land av kung Karl den enfaldige och etablerar hertigdömet Normandie.',
'Rollo receives land from King Charles the Simple and establishes the Duchy of Normandy.',
'political', 'high', ARRAY['France', 'Scandinavia'], ARRAY['Frankish chronicles']),

(982, 982, 'Upptäckten av Grönland', 'Discovery of Greenland', 
'Erik den röde upptäcker och koloniserar Grönland.',
'Erik the Red discovers and colonizes Greenland.',
'exploration', 'high', ARRAY['Greenland', 'Iceland'], ARRAY['Grönlendinga saga']),

(1000, 1000, 'Upptäckten av Amerika', 'Discovery of America', 
'Leif Eriksson når Vinland (Nordamerika) och blir den första europé som når den nya världen.',
'Leif Eriksson reaches Vinland (North America) and becomes the first European to reach the New World.',
'exploration', 'high', ARRAY['North America', 'Greenland'], ARRAY['Vinland sagas']),

(1013, 1016, 'Knut den store erövrar England', 'Cnut the Great Conquers England', 
'Knut den store erövrar England och etablerar det anglo-skandinaviska riket.',
'Cnut the Great conquers England and establishes the Anglo-Scandinavian empire.',
'political', 'high', ARRAY['England', 'Denmark'], ARRAY['Anglo-Saxon Chronicle']),

(1066, 1066, 'Harald Hårdråde dör vid Stamford Bridge', 'Harald Hardrada Dies at Stamford Bridge', 
'Harald Hårdrådes död vid Stamford Bridge markerar ofta slutet på vikingatiden.',
'Harald Hardrada''s death at Stamford Bridge often marks the end of the Viking Age.',
'military', 'high', ARRAY['England', 'Norway'], ARRAY['Anglo-Saxon Chronicle', 'Heimskringla']),

-- Digerdöden
(1347, 1351, 'Digerdöden/Svarta döden', 'The Black Death', 
'Den förödande pestpandemin som dödade en tredjedel av Europas befolkning. Nådde Bergen i Norge 1349.',
'The devastating plague pandemic that killed one-third of Europe''s population. Reached Bergen, Norway in 1349.',
'plague', 'high', ARRAY['Europe', 'Scandinavia'], ARRAY['Contemporary chronicles']);

-- Add trigger to update the updated_at column
CREATE TRIGGER update_historical_events_updated_at
    BEFORE UPDATE ON historical_events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
