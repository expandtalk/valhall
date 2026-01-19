-- Create river systems table
CREATE TABLE public.river_systems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description TEXT,
  period TEXT NOT NULL DEFAULT 'Viking Age',
  significance TEXT,
  historical_significance TEXT,
  color TEXT NOT NULL DEFAULT '#0369a1',
  width INTEGER NOT NULL DEFAULT 4,
  importance TEXT CHECK (importance IN ('primary', 'secondary')) DEFAULT 'secondary',
  type TEXT,
  total_length_km NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create river coordinates table
CREATE TABLE public.river_coordinates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  river_system_id UUID NOT NULL REFERENCES public.river_systems(id) ON DELETE CASCADE,
  sequence_order INTEGER NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  name TEXT,
  name_en TEXT,
  description TEXT,
  is_trading_post BOOLEAN NOT NULL DEFAULT false,
  is_portage BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(river_system_id, sequence_order)
);

-- Enable RLS
ALTER TABLE public.river_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.river_coordinates ENABLE ROW LEVEL SECURITY;

-- Create policies for river_systems
CREATE POLICY "River systems are viewable by everyone" 
ON public.river_systems 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage river systems" 
ON public.river_systems 
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Create policies for river_coordinates
CREATE POLICY "River coordinates are viewable by everyone" 
ON public.river_coordinates 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage river coordinates" 
ON public.river_coordinates 
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_river_systems_updated_at
BEFORE UPDATE ON public.river_systems
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_river_coordinates_river_system_id ON public.river_coordinates(river_system_id);
CREATE INDEX idx_river_coordinates_sequence_order ON public.river_coordinates(river_system_id, sequence_order);