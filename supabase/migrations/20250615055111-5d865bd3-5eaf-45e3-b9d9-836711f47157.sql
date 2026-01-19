
-- Create table for notes related to Danish localities
CREATE TABLE public.her_dk_notes (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    external_id bytea NOT NULL,
    object_id bytea NOT NULL,
    her_dk_id text NOT NULL,
    notes text NOT NULL,
    lang character varying(8) NOT NULL DEFAULT 'sv-se',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    
    PRIMARY KEY (id),
    UNIQUE (external_id),
    
    CONSTRAINT fk_her_dk_notes_lang FOREIGN KEY (lang) REFERENCES public.languages(language_code) ON UPDATE CASCADE,
    CONSTRAINT fk_her_dk_notes_parish FOREIGN KEY (her_dk_id) REFERENCES public.danish_parishes(external_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Add a trigger to update 'updated_at' column on row update
CREATE TRIGGER handle_her_dk_notes_updated_at
BEFORE UPDATE ON public.her_dk_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better query performance
CREATE INDEX idx_her_dk_notes_her_dk_id ON public.her_dk_notes(her_dk_id);
CREATE INDEX idx_her_dk_notes_object_id ON public.her_dk_notes(object_id);
