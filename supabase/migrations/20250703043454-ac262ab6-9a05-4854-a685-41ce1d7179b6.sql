-- Create a comprehensive table for Swedish hillforts (fornborgar)
CREATE TABLE IF NOT EXISTS public.swedish_hillforts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  coordinates POINT,
  raa_number TEXT UNIQUE, -- RAÄ-nummer
  landscape TEXT NOT NULL, -- Landskap (Öland, Södermanland, etc.)
  parish TEXT, -- Socken 
  municipality TEXT, -- Kommun
  county TEXT, -- Län
  country TEXT DEFAULT 'Sweden',
  fortress_type TEXT DEFAULT 'hillfort',
  description TEXT,
  status TEXT DEFAULT 'confirmed', -- confirmed, unconfirmed, uncertain
  period TEXT, -- Historical period if known
  cultural_significance TEXT,
  source_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.swedish_hillforts ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Swedish hillforts are publicly viewable" 
ON public.swedish_hillforts 
FOR SELECT 
USING (true);

-- Admin only for modifications
CREATE POLICY "Admins can modify Swedish hillforts" 
ON public.swedish_hillforts 
FOR ALL 
USING (is_admin());

-- Add indexes for performance
CREATE INDEX idx_swedish_hillforts_coordinates ON public.swedish_hillforts USING GIST (coordinates);
CREATE INDEX idx_swedish_hillforts_landscape ON public.swedish_hillforts (landscape);
CREATE INDEX idx_swedish_hillforts_raa_number ON public.swedish_hillforts (raa_number);

-- Add trigger for updated_at
CREATE TRIGGER update_swedish_hillforts_updated_at
  BEFORE UPDATE ON public.swedish_hillforts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data from Öland to start
INSERT INTO public.swedish_hillforts (name, coordinates, raa_number, landscape, parish, municipality, description, status) VALUES
('Gråborg', POINT(16.60399, 56.66642), 'Algutsrum 16:1', 'Öland', 'Algutsrum', 'Borgholm', 'Den till ytan största fornborgen på Öland.', 'confirmed'),
('Eketorps borg', POINT(16.48617, 56.29555), 'Gräsgård 45:1', 'Öland', 'Gräsgård', 'Mörbylånga', 'En folkvandingstida tillflyktsborg som delvis återuppbyggts som museum.', 'confirmed'),
('Triberga borg', POINT(16.56212, 56.47153), 'Hulterstad 20:1', 'Öland', 'Hulterstad', 'Mörbylånga', 'Fornborg på Öland.', 'confirmed'),
('Ismantorps borg', POINT(16.64268, 56.74544), 'Långlöt 30:1', 'Öland', 'Långlöt', 'Borgholm', 'Fornborg på Öland.', 'confirmed'),
('Sandby borg', POINT(16.63926, 56.55253), 'Sandby 45:1', 'Öland', 'Sandby', 'Borgholm', 'Fornborg på Öland.', 'confirmed'),
('Bårby borg', POINT(16.42551, 56.50231), 'Mörbylånga 17:1', 'Öland', 'Mörbylånga', 'Mörbylånga', 'Fornborg på Öland.', 'confirmed'),
('Lenstad borg', POINT(16.55704, 56.6236), 'Torslunda 9:1', 'Öland', 'Torslunda', 'Borgholm', 'Fornborg på Öland.', 'confirmed'),
('Träbyborg', POINT(16.50622, 56.35528), 'Segerstad 22:1', 'Öland', 'Segerstad', 'Mörbylånga', 'Fornborg på Öland.', 'confirmed'),
('Mossberga borg', POINT(16.60013, 56.78218), 'Högsrum 84:1', 'Öland', 'Högsrum', 'Borgholm', 'Fornborg på Öland.', 'confirmed'),
('Vedby borg', POINT(16.99015, 57.21088), 'Högby 23:1', 'Öland', 'Högby', 'Borgholm', 'Fornborg på Öland.', 'confirmed');