-- Add RLS policies for public read access to main tables
CREATE POLICY "Allow public read access to runic_inscriptions" 
ON public.runic_inscriptions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to viking_fortresses" 
ON public.viking_fortresses 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to historical_events" 
ON public.historical_events 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to viking_cities" 
ON public.viking_cities 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to viking_names" 
ON public.viking_names 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to additional_coordinates" 
ON public.additional_coordinates 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access to coordinates" 
ON public.coordinates 
FOR SELECT 
USING (true);