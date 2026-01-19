
-- Create a table to link datings to their sources
CREATE TABLE public.dating_source (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  dating_id UUID NOT NULL REFERENCES public.dating(datingid) ON DELETE CASCADE,
  source_id BYTEA NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add a unique constraint to prevent duplicate entries
ALTER TABLE public.dating_source
ADD CONSTRAINT dating_source_unique_relation
UNIQUE (dating_id, source_id);

-- Enable Row Level Security for the new table
ALTER TABLE public.dating_source ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view the dating-source links
CREATE POLICY "Dating sources are viewable by everyone"
  ON public.dating_source FOR SELECT
  USING (true);

-- Allow admins to insert, update, and delete dating-source links
CREATE POLICY "Admins can manage dating sources"
  ON public.dating_source FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
