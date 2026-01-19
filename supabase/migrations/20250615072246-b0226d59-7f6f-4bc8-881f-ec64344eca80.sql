
CREATE TABLE public.signum_inscription_links (
    signum_external_id text NOT NULL,
    inscription_external_id text NOT NULL,
    canonical boolean NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    PRIMARY KEY (signum_external_id, inscription_external_id)
);

COMMENT ON TABLE public.signum_inscription_links IS 'Links between signa and inscriptions, imported from Rundata.';

ALTER TABLE public.signum_inscription_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on signum_inscription_links" ON public.signum_inscription_links FOR SELECT USING (true);

CREATE POLICY "Allow admin write access on signum_inscription_links" ON public.signum_inscription_links FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TRIGGER handle_signum_inscription_links_updated_at
BEFORE UPDATE ON public.signum_inscription_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
