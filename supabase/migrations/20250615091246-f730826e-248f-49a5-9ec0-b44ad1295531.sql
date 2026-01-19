
-- Create the new 'translations' table based on the provided SQL dump
CREATE TABLE public.translations (
    translationid bytea NOT NULL PRIMARY KEY,
    inscriptionid bytea NOT NULL,
    translation text NOT NULL DEFAULT 'P',
    text text NOT NULL,
    teitext text,
    language varchar(8) NOT NULL DEFAULT 'en-gb',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    
    CONSTRAINT "translations_translation_type_check" CHECK (translation IN ('P','Q','R','S','T','U','V','W','X','Y','Z','Å','Ä','Ö')),
    
    CONSTRAINT "translations_language_code_fkey" FOREIGN KEY (language) REFERENCES public.languages(language_code) ON UPDATE CASCADE,
    
    UNIQUE (inscriptionid, translation, language)
);

-- Add comments to the new table and columns for clarity
COMMENT ON TABLE public.translations IS 'Stores different translations for runic inscriptions in various languages, linked by a bytea inscriptionid.';
COMMENT ON COLUMN public.translations.translationid IS 'Primary key for the translation (from Rundata `translations`.`translationid`).';
COMMENT ON COLUMN public.translations.inscriptionid IS 'Identifier for the runic inscription (from Rundata `translations`.`inscriptionid`), matching the bytea format in other Rundata tables.';
COMMENT ON COLUMN public.translations.translation IS 'Type of translation (e.g., P for primary). From `translations`.`translation`';
COMMENT ON COLUMN public.translations.text IS 'The translated text.';
COMMENT ON COLUMN public.translations.teitext IS 'The translated text with TEI markup.';
COMMENT ON COLUMN public.translations.language IS 'Foreign key to the languages table, indicating the translation language.';

-- Enable Row Level Security on the new table
ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows authenticated users to perform all actions.
-- Access to the import functionality is already restricted to admins at the application level.
CREATE POLICY "Allow all access for authenticated users on translations"
ON public.translations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create a trigger to automatically update the 'updated_at' column
CREATE TRIGGER on_translations_update
  BEFORE UPDATE ON public.translations
  FOR EACH ROW
  EXECUTE PROCEDURE public.update_updated_at_column();
