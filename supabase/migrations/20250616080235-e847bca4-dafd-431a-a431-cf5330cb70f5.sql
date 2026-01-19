
-- Create the artefacts table based on the MySQL structure
CREATE TABLE public.artefacts (
  artefactid bytea NOT NULL,
  artefact character varying(32) NOT NULL,
  lang character varying(8) NOT NULL DEFAULT 'sv-se',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (artefactid)
);

-- Create unique constraint on artefact name
ALTER TABLE public.artefacts ADD CONSTRAINT unique_artefact UNIQUE (artefact);

-- Create index on language
CREATE INDEX artefacts_lang_idx ON public.artefacts (lang);

-- Add foreign key constraint to languages table (if it exists)
-- Note: This will only work if the languages table exists and has the correct structure
-- ALTER TABLE public.artefacts ADD CONSTRAINT artefacts_lang_fk 
-- FOREIGN KEY (lang) REFERENCES languages(language_code) ON UPDATE CASCADE;
