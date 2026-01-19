
-- Start of SQL Script for fragments table
-- Create fragments table
CREATE TABLE public.fragments (
    objectid UUID NOT NULL,
    belongsto UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (objectid, belongsto),
    CONSTRAINT belongs_object FOREIGN KEY (belongsto) REFERENCES public.objects (objectid) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fragment_object FOREIGN KEY (objectid) REFERENCES public.objects (objectid) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Add comments and indexes to the new fragments table
COMMENT ON TABLE public.fragments IS 'Links fragments to the object they are part of.';
CREATE INDEX idx_fragments_objectid ON public.fragments (objectid);
CREATE INDEX idx_fragments_belongsto ON public.fragments (belongsto);

-- Add trigger for updated_at on fragments table
CREATE TRIGGER handle_fragments_updated_at
BEFORE UPDATE ON public.fragments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security on fragments table
ALTER TABLE public.fragments ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to the fragments
CREATE POLICY "Allow public read access to fragments"
ON public.fragments
FOR SELECT USING (true);

-- Policy: Allow admins to perform all operations on fragments
CREATE POLICY "Allow admin full access to fragments"
ON public.fragments
FOR ALL USING (public.is_admin())
WITH CHECK (public.is_admin());
-- End of SQL Script
