-- Add raa_number column to viking_fortresses table
ALTER TABLE public.viking_fortresses 
ADD COLUMN raa_number TEXT;

-- Add index for better performance on RAÄ number searches
CREATE INDEX idx_viking_fortresses_raa_number ON public.viking_fortresses (raa_number);

-- Add comment to explain the column
COMMENT ON COLUMN public.viking_fortresses.raa_number IS 'RAÄ-nummer (Riksantikvarieämbetets fornminnesregister) for Swedish fortresses';