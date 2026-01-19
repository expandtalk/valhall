
-- Create a linking table between objects and sources
CREATE TABLE public.object_source (
    objectid UUID NOT NULL,
    sourceid BYTEA NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (objectid, sourceid),
    CONSTRAINT fk_object
        FOREIGN KEY(objectid) 
        REFERENCES public.objects(objectid)
        ON DELETE CASCADE,
    CONSTRAINT fk_source
        FOREIGN KEY(sourceid) 
        REFERENCES public.sources(sourceid)
        ON DELETE CASCADE
);

COMMENT ON TABLE public.object_source IS 'A linking table that connects records in the objects table to their corresponding sources in the sources table.';
COMMENT ON COLUMN public.object_source.objectid IS 'Foreign key referencing the object.';
COMMENT ON COLUMN public.object_source.sourceid IS 'Foreign key referencing the source.';

-- Add a trigger to automatically update the updated_at timestamp
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON public.object_source
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.object_source ENABLE ROW LEVEL SECURITY;

-- RLS Policies for the new table
CREATE POLICY "Object sources are publicly viewable"
  ON public.object_source FOR SELECT
  USING (true);

CREATE POLICY "Admins have full access to object sources"
  ON public.object_source FOR ALL
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));
