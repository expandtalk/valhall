
CREATE TABLE public.danish_parishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id TEXT NOT NULL UNIQUE,
    parish_code TEXT NOT NULL,
    fofm_parish TEXT,
    locality INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_danish_parishes_parish_code ON public.danish_parishes(parish_code);

COMMENT ON TABLE public.danish_parishes IS 'Stores Danish administrative parish data from Rundata.';

CREATE TRIGGER handle_danish_parishes_updated_at
BEFORE UPDATE ON public.danish_parishes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.danish_parishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to Danish parishes"
ON public.danish_parishes
FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to Danish parishes"
ON public.danish_parishes
FOR ALL USING (public.is_admin())
WITH CHECK (public.is_admin());
