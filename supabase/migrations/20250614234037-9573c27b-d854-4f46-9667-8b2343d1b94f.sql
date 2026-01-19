
CREATE TYPE public.group_type AS ENUM ('die', 'monument', 'carver');

CREATE TABLE public.groups (
    groupid bytea NOT NULL,
    type public.group_type NOT NULL DEFAULT 'monument',
    notes character varying(255),
    lang character varying(8) NOT NULL DEFAULT 'sv-se',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (groupid)
);

-- Enable RLS
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- Policy: Allow read access for everyone
CREATE POLICY "Allow public read access to groups" ON public.groups
FOR SELECT
USING (true);

-- Policy: Allow all actions for admin users
CREATE POLICY "Allow admin full access to groups" ON public.groups
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
