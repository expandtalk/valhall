
CREATE OR REPLACE FUNCTION public.search_inscriptions_flexible(p_search_term text)
RETURNS SETOF public.runic_inscriptions
LANGUAGE plpgsql
AS $function$
DECLARE
    normalized_search_term_signum TEXT;
    search_term_others TEXT;
BEGIN
    -- Förbereder söktermer: en normaliserad för signum, en vanlig för övriga fält.
    normalized_search_term_signum := '%' || regexp_replace(p_search_term, '\s+', '', 'g') || '%';
    search_term_others := '%' || p_search_term || '%';

    RETURN QUERY
    SELECT *
    FROM public.runic_inscriptions
    WHERE
        -- Matchar mot ett normaliserat signum (mellanslag borttagna)
        regexp_replace(coalesce(signum, ''), '\s+', '', 'g') ILIKE normalized_search_term_signum
        -- Eller matchar mot andra relevanta textfält
        OR coalesce(transliteration, '') ILIKE search_term_others
        OR coalesce(translation_en, '') ILIKE search_term_others
        OR coalesce(translation_sv, '') ILIKE search_term_others
        OR coalesce(location, '') ILIKE search_term_others
        OR coalesce(parish, '') ILIKE search_term_others
        OR coalesce(municipality, '') ILIKE search_term_others
        OR coalesce(province, '') ILIKE search_term_others;
END;
$function$;
