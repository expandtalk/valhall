-- Uppdatera U 1132 (Gimostenen) med fullständig information
UPDATE runic_inscriptions 
SET 
  transliteration = 'liutr · uk · þroti · uk · oþuiþr · uk · þaiʀ · litu · rita · i(f)itʀ × [faþur × sin : baorn · fasti]þi : moþur · sin : oþmontr · risti · r...naʀ ·',
  normalization = 'Liutr ok Þrotti ok Auðviðr ok þæiʀ letu retta æftiʀ faður sinn Biorn [ok] Fasthæiði, moður sina. Auðmundr risti r[u]naʀ.',
  translation_sv = 'Ljut och Trotte och Ödvid de läto uppresa (stenen) efter sin fader Björn och Fasthed sin moder. Ömund ristade runorna.',
  translation_en = 'Ljut and Trotte and Ödvid they had (the stone) erected in memory of their father Björn and Fasthed their mother. Ömund carved the runes.',
  dating_text = '1000-talet',
  period_start = 1000,
  period_end = 1099,
  dating_confidence = 0.8,
  historical_context = 'Stenen stod ursprungligen norr om Skäfthammar kyrka, vid bron över Gimån. På 1880-talet lades stenen intill kyrkogårdsmuren innan den flyttades till sin nuvarande plats vid Gimo damm.',
  scholarly_notes = 'Runstenen är en minnesinskrift över föräldrarna Björn och Fasthed, rest av deras barn Ljut, Trotte och Ödvid. Ristaren Ömund nämns vid namn.',
  complexity_level = 'medium',
  uncertainty_level = 'low'
WHERE signum = 'U 1132';