-- Add information about the 1664 Runestone Appendix (Monumenta Lapidum aliquot Runicorum) to relevant inscriptions

UPDATE runic_inscriptions SET
  historical_context = CASE 
    WHEN historical_context IS NULL OR historical_context = '' THEN 
      'Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Upsala Domkyrkia under pilaren". Bilagan var ett tidigt försök att samla, återge och översätta svenska runinskrifter med 49 runstenar, transkriptioner och latinöversättningar.'
    ELSE 
      historical_context || ' Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Upsala Domkyrkia under pilaren".'
  END,
  updated_at = now()
WHERE signum = 'U 922';

UPDATE runic_inscriptions SET
  historical_context = CASE 
    WHEN historical_context IS NULL OR historical_context = '' THEN 
      'Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Hillesiö Strandhäll". Bilagan var ett tidigt försök att samla, återge och översätta svenska runinskrifter med 49 runstenar, transkriptioner och latinöversättningar.'
    ELSE 
      historical_context || ' Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Hillesiö Strandhäll".'
  END,
  updated_at = now()
WHERE signum = 'U 29';

UPDATE runic_inscriptions SET
  historical_context = CASE 
    WHEN historical_context IS NULL OR historical_context = '' THEN 
      'Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Sundby i Funbo". Bilagan var ett tidigt försök att samla, återge och översätta svenska runinskrifter med 49 runstenar, transkriptioner och latinöversättningar.'
    ELSE 
      historical_context || ' Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Sundby i Funbo".'
  END,
  updated_at = now()
WHERE signum = 'U 996';

UPDATE runic_inscriptions SET
  historical_context = CASE 
    WHEN historical_context IS NULL OR historical_context = '' THEN 
      'Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Forsa Kyrkering" (med stavlösa runor). Bilagan var ett tidigt försök att samla, återge och översätta svenska runinskrifter med 49 runstenar, transkriptioner och latinöversättningar.'
    ELSE 
      historical_context || ' Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Forsa Kyrkering" (med stavlösa runor).'
  END,
  updated_at = now()
WHERE signum = 'Hs 7';

UPDATE runic_inscriptions SET
  historical_context = CASE 
    WHEN historical_context IS NULL OR historical_context = '' THEN 
      'Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Röks Kyrkemur" (den berömda Rökstenen). Bilagan var ett tidigt försök att samla, återge och översätta svenska runinskrifter med 49 runstenar, transkriptioner och latinöversättningar.'
    ELSE 
      historical_context || ' Inkluderad i Runstensbilagan "Monumenta Lapidum aliquot Runicorum" från 1664 (Olof Verelius), rubricerad som "Röks Kyrkemur" (den berömda Rökstenen).'
  END,
  updated_at = now()
WHERE signum = 'Ög 136';