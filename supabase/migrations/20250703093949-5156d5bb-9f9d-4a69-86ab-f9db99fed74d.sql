-- Skapa tabell för förbättrade koordinater
CREATE TABLE IF NOT EXISTS additional_coordinates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    signum TEXT NOT NULL UNIQUE,
    inscription_id UUID,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    source TEXT NOT NULL DEFAULT 'geocoded',
    confidence TEXT NOT NULL DEFAULT 'medium', 
    notes TEXT,
    location_input TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Skapa index
CREATE INDEX IF NOT EXISTS idx_additional_coordinates_signum ON additional_coordinates(signum);
CREATE INDEX IF NOT EXISTS idx_additional_coordinates_inscription_id ON additional_coordinates(inscription_id);

-- RLS policies
ALTER TABLE additional_coordinates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Additional coordinates are viewable by everyone" 
ON additional_coordinates FOR SELECT USING (true);

CREATE POLICY "Admins can manage additional coordinates" 
ON additional_coordinates FOR ALL USING (is_admin());