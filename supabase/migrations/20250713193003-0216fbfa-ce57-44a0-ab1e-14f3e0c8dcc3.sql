-- Add foreign runestones from Russia, Turkey, and Ukraine

-- Ukraine: Berezanj runestone
INSERT INTO runic_inscriptions (
    signum,
    name,
    name_en,
    location,
    country,
    transliteration,
    translation_sv,
    translation_en,
    historical_context,
    coordinates,
    object_type,
    material,
    dating_text,
    current_location,
    scholarly_notes
) VALUES (
    'UA Fv 1914;47',
    'Berezanj',
    'Berezanj',
    'Berezanj, Svarta havet',
    'Ukraine',
    'krani : kerþi : (h)alf : þisi : iftir : kal : fi:laka : si(n)',
    'Grane gjorde denna gravhög efter Karl, sin bolagsman',
    'Grane made this mound after Karl, his partner',
    'Runstenen hittades 1905 vid utgrävning av en stor gravhög på ön Berezanj i Svarta havet, utanför Dneprs utlopp. Högen hade använts till många begravningar under en längre tid, och runstenen verkar inte ha legat på sin ursprungliga plats. T. J. Arne i Fornvännen 1914 tror att Grane och Karl var gotlänningar. Berezanj var en viktig handelsstation under vikingatiden.',
    point(32.3528, 46.6097),
    'runestone',
    'kalksten',
    'vikingatid',
    'Arkeologiska museet i Odessa',
    'Funnen 1905. Måste ha hamnat under jord ganska snart eftersom den inte har vittrat trots att den är gjord av lös kalksten.'
);

-- Russia: Staraja Ladoga 2
INSERT INTO runic_inscriptions (
    signum,
    name,
    name_en,
    location,
    country,
    transliteration,
    translation_sv,
    translation_en,
    historical_context,
    coordinates,
    object_type,
    material,
    dating_text,
    scholarly_notes
) VALUES (
    'Staraja Ladoga 2',
    'Staraja Ladoga 2',
    'Staraja Ladoga 2',
    'Staraja Ladoga',
    'Russia',
    'þamuþrunaRis omuw[þ]alw[þ]mkfa unþRuþiow[þ]at haþaRnakifak',
    'Detta är sorgrunor, som en man kan ha i en sorgetid, tills demoner till krig ... [Jag (eller han)] fick vreda runor, som i vreda tider [en man] ... Unn [d.v.s. Oden eller ett svärd] ... onda väsen.',
    'These are sorrow runes, which a man can have in a time of sorrow, until demons to war ... [I (or he)] got angry runes, which in angry times [a man] ... Unn [i.e. Odin or a sword] ... evil beings.',
    'Det lilla runblecket av koppar (2 x 5 cm) hittades 1975 vid utgrävning i Staraja Ladoga. Öglan saknades, och vid den mycket klumpiga restaureringen skadades några runor.',
    point(32.2969, 59.9947),
    'runic_plate',
    'koppar',
    'vikingatid',
    'Hittades 1975. Öglan saknades, och vid den mycket klumpiga restaureringen skadades några runor.'
);

-- Turkey: Tu FV 1989;12 (Hagia Sophia, Istanbul)
INSERT INTO runic_inscriptions (
    signum,
    name,
    name_en,
    location,
    country,
    transliteration,
    translation_sv,
    translation_en,
    historical_context,
    coordinates,
    object_type,
    material,
    dating_text,
    scholarly_notes
) VALUES (
    'Tu FV 1989;12',
    'Hagia Sophia, Istanbul',
    'Hagia Sophia, Istanbul',
    'Hagia Sophia, Istanbul',
    'Turkey',
    'ari : k',
    'Are k ...',
    'Are k ...',
    'Ristningen finns i Hagia Sophia i Istanbul, på marmorbalustraden i den nisch på norra sidan där man finner början av den raka delen av balustraden. Den är liten, bara 2,5 cm lång. Ristningen upptäcktes av Folke Högberg, Uppsala, 1975, och återupptäcktes 1988 av Mats G Larsson.',
    point(28.9800, 41.0085),
    'graffiti',
    'marmor',
    'vikingatid',
    'Upptäcktes av Folke Högberg 1975, återupptäcktes 1988 av Mats G Larsson. Endast 2,5 cm lång.'
);

-- Turkey: Tu FV 1970;247 (Hagia Sophia, Istanbul)
INSERT INTO runic_inscriptions (
    signum,
    name,
    name_en,
    location,
    country,
    historical_context,
    coordinates,
    object_type,
    material,
    dating_text,
    scholarly_notes
) VALUES (
    'Tu FV 1970;247',
    'Hagia Sophia, Istanbul',
    'Hagia Sophia, Istanbul',
    'Hagia Sophia, Istanbul',
    'Turkey',
    'Ristningen finns i Hagia Sophia i Istanbul, på marmorbalustraden i femte sektionen av den centrala delen på norra sidan. Ristningen påminner om en bindruna och är knappt fyra centimeter lång. Möjligen kan det vara ett försök att rista ett ryskt kors. I samma sektion finns ytterligare en runliknande ristning.',
    point(28.9800, 41.0085),
    'graffiti',
    'marmor',
    'vikingatid',
    'Påminner om en bindruna, knappt fyra centimeter lång. Möjligen ett försök att rista ett ryskt kors.'
);

-- Turkey: Hagia Sophia, Istanbul (ikl)
INSERT INTO runic_inscriptions (
    signum,
    name,
    name_en,
    location,
    country,
    coordinates,
    object_type,
    material,
    dating_text,
    uncertainty_level,
    scholarly_notes
) VALUES (
    'Hagia Sophia, Istanbul (ikl)',
    'Hagia Sophia, Istanbul (ikl)',
    'Hagia Sophia, Istanbul (uncertain)',
    'Hagia Sophia, Istanbul',
    'Turkey',
    point(28.9800, 41.0085),
    'graffiti',
    'marmor',
    'vikingatid',
    'uncertain',
    'Osäker ristning i Hagia Sophia'
);

-- Turkey: Hagia Sophia, Istanbul (osäker)
INSERT INTO runic_inscriptions (
    signum,
    name,
    name_en,
    location,
    country,
    coordinates,
    object_type,
    material,
    dating_text,
    uncertainty_level,
    scholarly_notes
) VALUES (
    'Hagia Sophia, Istanbul (osäker)',
    'Hagia Sophia, Istanbul (osäker)',
    'Hagia Sophia, Istanbul (uncertain)',
    'Hagia Sophia, Istanbul',
    'Turkey',
    point(28.9800, 41.0085),
    'graffiti',
    'marmor',
    'vikingatid',
    'uncertain',
    'Osäker ristning i Hagia Sophia'
);

-- Turkey: Hagia Sophia, Istanbul (osäker bindruna)
INSERT INTO runic_inscriptions (
    signum,
    name,
    name_en,
    location,
    country,
    coordinates,
    object_type,
    material,
    dating_text,
    uncertainty_level,
    scholarly_notes
) VALUES (
    'Hagia Sophia, Istanbul (osäker bindruna)',
    'Hagia Sophia, Istanbul (osäker bindruna)',
    'Hagia Sophia, Istanbul (uncertain bind-rune)',
    'Hagia Sophia, Istanbul',
    'Turkey',
    point(28.9800, 41.0085),
    'graffiti',
    'marmor',
    'vikingatid',
    'uncertain',
    'Osäker bindruna i Hagia Sophia'
);