
-- Create a table to link places to parishes
CREATE TABLE public.place_parish_links (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    place_id UUID NOT NULL,
    parish_external_id TEXT NOT NULL,
    is_current BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT fk_place
        FOREIGN KEY(place_id) 
        REFERENCES public.places(placeid)
        ON DELETE CASCADE
);

-- Apply a trigger to automatically update the 'updated_at' column
CREATE TRIGGER handle_updated_at
BEFORE UPDATE ON public.place_parish_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add a unique constraint to prevent duplicate links
CREATE UNIQUE INDEX idx_unique_place_parish_link ON public.place_parish_links(place_id, parish_external_id);

-- Add an index on parish_external_id for faster joins with the parishes table
CREATE INDEX idx_parish_external_id ON public.place_parish_links(parish_external_id);

-- Enable Row Level Security
ALTER TABLE public.place_parish_links ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to the links
CREATE POLICY "Allow public read access to place parish links"
ON public.place_parish_links
FOR SELECT USING (true);

-- Policy: Allow admins to perform all operations
CREATE POLICY "Allow admin full access to place parish links"
ON public.place_parish_links
FOR ALL USING (public.is_admin())
WITH CHECK (public.is_admin());
