
-- Create table for Norwegian localities (from her_NO)
CREATE TABLE public.norwegian_localities (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    external_id text NOT NULL UNIQUE,
    locality integer UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create table for Swedish localities (from her_SE)
CREATE TABLE public.swedish_localities (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    external_id text NOT NULL UNIQUE,
    parish_external_id text NOT NULL,
    raa_number text,
    fmis_id bigint,
    kmr_id text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT fk_swedish_localities_parish
        FOREIGN KEY(parish_external_id) 
        REFERENCES parishes(external_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    UNIQUE (parish_external_id, raa_number),
    UNIQUE (parish_external_id, raa_number, fmis_id)
);
