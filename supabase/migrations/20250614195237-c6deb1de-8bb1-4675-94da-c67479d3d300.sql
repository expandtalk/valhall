
CREATE TABLE public.imagelinks (
    imagelinkid bytea NOT NULL,
    objectid bytea NOT NULL,
    imagelink text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL,
    CONSTRAINT imagelinks_pkey PRIMARY KEY (imagelinkid)
);

COMMENT ON TABLE public.imagelinks IS 'Stores image URLs associated with objects. Based on Rundata''s imagelinks table.';
COMMENT ON COLUMN public.imagelinks.imagelinkid IS 'Primary key, UUID of the image link, from Rundata binary(16).';
COMMENT ON COLUMN public.imagelinks.objectid IS 'Foreign key to the objects table. Stored as bytea, converted from Rundata binary(16).';
COMMENT ON COLUMN public.imagelinks.imagelink IS 'URL to the image.';

-- Note: A foreign key constraint to `objects.objectid` is not added due to type mismatch (bytea vs uuid).
-- The relationship is maintained logically by the application.

-- Add RLS policies
ALTER TABLE public.imagelinks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on imagelinks"
ON public.imagelinks
FOR SELECT
USING (true);

CREATE POLICY "Allow admin full access on imagelinks"
ON public.imagelinks
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
