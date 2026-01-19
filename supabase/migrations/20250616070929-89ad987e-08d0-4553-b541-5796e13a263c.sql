
-- Create enum types for source reliability and bias types
CREATE TYPE source_reliability AS ENUM ('primary', 'secondary', 'tertiary', 'legendary');
CREATE TYPE bias_type AS ENUM ('christian_anti_pagan', 'nationalist_danish', 'nationalist_swedish', 'temporal_distance', 'political_legitimacy', 'none');
CREATE TYPE king_status AS ENUM ('historical', 'semi_legendary', 'legendary', 'disputed');

-- Table for dynasties/royal houses
CREATE TABLE royal_dynasties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  period_start INTEGER,
  period_end INTEGER,
  region TEXT NOT NULL, -- Sweden, Denmark, Norway, Kievrus etc
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for historical sources
CREATE TABLE historical_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_en TEXT NOT NULL,
  author TEXT NOT NULL,
  written_year INTEGER,
  covers_period_start INTEGER,
  covers_period_end INTEGER,
  reliability source_reliability NOT NULL,
  language TEXT NOT NULL,
  description TEXT,
  bias_types bias_type[] DEFAULT ARRAY[]::bias_type[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for kings/rulers
CREATE TABLE historical_kings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_variations TEXT[], -- Different spellings/names in sources
  dynasty_id UUID REFERENCES royal_dynasties(id),
  reign_start INTEGER,
  reign_end INTEGER,
  status king_status NOT NULL DEFAULT 'disputed',
  region TEXT NOT NULL,
  description TEXT,
  archaeological_evidence BOOLEAN DEFAULT false,
  runestone_mentions BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Junction table for king mentions in sources with reliability assessment
CREATE TABLE king_source_mentions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  king_id UUID NOT NULL REFERENCES historical_kings(id),
  source_id UUID NOT NULL REFERENCES historical_sources(id),
  mentioned_name TEXT NOT NULL, -- How the king is named in this specific source
  context TEXT, -- Context of the mention
  reliability_note TEXT, -- Source-specific reliability notes
  page_reference TEXT, -- Book/chapter reference
  quote_original TEXT, -- Original quote if available
  quote_translation TEXT, -- Translation if needed
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(king_id, source_id)
);

-- Table linking kings to runic inscriptions
CREATE TABLE king_inscription_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  king_id UUID NOT NULL REFERENCES historical_kings(id),
  inscription_id UUID NOT NULL REFERENCES runic_inscriptions(id),
  connection_type TEXT NOT NULL, -- 'direct_mention', 'probable_reference', 'contemporary', 'commemorative'
  evidence_strength TEXT NOT NULL DEFAULT 'weak', -- 'strong', 'moderate', 'weak', 'speculative'
  analysis_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(king_id, inscription_id)
);

-- Insert some sample data for the main sources we discussed
INSERT INTO historical_sources (title, title_en, author, written_year, covers_period_start, covers_period_end, reliability, language, description, bias_types) VALUES
('Vita Ansgarii', 'Life of Ansgar', 'Rimbert', 875, 820, 870, 'primary', 'Latin', 'Contemporary account by Rimbert about Saint Ansgar''s missions to Sweden', ARRAY['christian_anti_pagan']::bias_type[]),
('Gesta Hammaburgensis ecclesiae pontificum', 'History of the Archbishops of Hamburg-Bremen', 'Adam av Bremen', 1075, 788, 1072, 'secondary', 'Latin', 'Historical work about the Hamburg-Bremen archbishopric and Scandinavian missions', ARRAY['christian_anti_pagan', 'temporal_distance']::bias_type[]),
('Gesta Danorum', 'Deeds of the Danes', 'Saxo Grammaticus', 1200, -500, 1187, 'tertiary', 'Latin', 'Danish patriotic history mixing mythology and history', ARRAY['nationalist_danish', 'temporal_distance', 'political_legitimacy']::bias_type[]),
('Nestorskrönikan', 'Primary Chronicle', 'Nestor', 1113, 850, 1110, 'secondary', 'Old Church Slavonic', 'Chronicle of Kievan Rus describing early Rurik dynasty', ARRAY['political_legitimacy', 'temporal_distance']::bias_type[]);

-- Insert sample dynasty
INSERT INTO royal_dynasties (name, name_en, description, period_start, period_end, region) VALUES
('Ynglingar', 'Yngling Dynasty', 'Legendary/semi-legendary Swedish dynasty claimed to descend from Yngvi-Freyr', 500, 1000, 'Sweden'),
('Rurikdynastin', 'Rurik Dynasty', 'Dynasty founded by Rurik ruling Kievan Rus', 862, 1598, 'Kievrus');

-- Enable RLS
ALTER TABLE royal_dynasties ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_kings ENABLE ROW LEVEL SECURITY;
ALTER TABLE king_source_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE king_inscription_links ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (these are historical records)
CREATE POLICY "Anyone can view royal dynasties" ON royal_dynasties FOR SELECT USING (true);
CREATE POLICY "Anyone can view historical sources" ON historical_sources FOR SELECT USING (true);
CREATE POLICY "Anyone can view historical kings" ON historical_kings FOR SELECT USING (true);
CREATE POLICY "Anyone can view king source mentions" ON king_source_mentions FOR SELECT USING (true);
CREATE POLICY "Anyone can view king inscription links" ON king_inscription_links FOR SELECT USING (true);

-- Admin policies for modifications
CREATE POLICY "Admins can modify royal dynasties" ON royal_dynasties FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify historical sources" ON historical_sources FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify historical kings" ON historical_kings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify king source mentions" ON king_source_mentions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins can modify king inscription links" ON king_inscription_links FOR ALL USING (public.is_admin());
