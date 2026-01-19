
-- Create uris table to store URIs related to sources
CREATE TABLE public.uris (
  uriid BYTEA NOT NULL PRIMARY KEY,
  uri TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reference_uri table to link sources to URIs
CREATE TABLE public.reference_uri (
  reference_id BYTEA NOT NULL,
  uri_id BYTEA NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (reference_id, uri_id)
);

-- Create an index on uri_id for faster lookups
CREATE INDEX idx_reference_uri_uri_id ON public.reference_uri(uri_id);

-- Enable Row Level Security
ALTER TABLE public.uris ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_uri ENABLE ROW LEVEL SECURITY;

-- Policies for uris table
CREATE POLICY "URIs are viewable by everyone"
  ON public.uris FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage URIs"
  ON public.uris FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Policies for reference_uri table
CREATE POLICY "Reference-URI links are viewable by everyone"
  ON public.reference_uri FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage reference-URI links"
  ON public.reference_uri FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
