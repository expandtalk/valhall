
-- Create a table to link readings to their sources
CREATE TABLE public.reading_source (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reading_id UUID NOT NULL REFERENCES public.readings(id) ON DELETE CASCADE,
  sourceid BYTEA NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add a unique constraint to prevent duplicate entries
ALTER TABLE public.reading_source
ADD CONSTRAINT reading_source_unique_relation
UNIQUE (reading_id, sourceid);

-- Enable Row Level Security for the new table
ALTER TABLE public.reading_source ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view the reading-source links
CREATE POLICY "Reading sources are viewable by everyone"
  ON public.reading_source FOR SELECT
  USING (true);

-- Allow admins to insert, update, and delete reading-source links
CREATE POLICY "Admins can manage reading sources"
  ON public.reading_source FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
