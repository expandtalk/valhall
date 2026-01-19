-- Update existing G 21 with correct coordinates and content, then add missing info for other inscriptions

-- Update G 21 with the content and coordinates from the user's data
UPDATE public.runic_inscriptions 
SET 
  name = 'Öja kyrka',
  name_en = 'Öja Church',
  transliteration = '⁓ iakaubs : synir : a burh : litu : g(i)(a)(r)a : stain : yvir : faþur : sen : ok : [b]roþur : sen : hera : [ni]kulas : sum : (o)ra : (k)irkiu : ati : men : guþ : uildi : biþ[i]n : fyri : þ(a)ira : sialum : ok : hehualdi : … : syni : þair : huilas : hier : undir · o^le : (l)uþa^r : gia^rþi : mik',
  translation_en = 'Jakobr of Burg/Burge''s sons had the stone made over their father and their brother, Sire Nikulás, who owned our church (= was its paster) while God willed it. Pray for their souls and for Hegvaldr … son. They are resting hereunder. Óli/Olli <luþar> made me.',
  translation_sv = 'Jakobs söner på Burg lät göra stenen över sin fader och sin broder, herr Nikulas, som ägde vår kyrka (dvs. var kyrkoherde vid vår kyrka), så länge Gud ville. Bedjen för deras själar och för Hägvald, … son. De vilar här under. Ole <luþar> gjorde mig.',
  location = 'Öja kyrka, Öja socken',
  parish = 'Öja',
  municipality = 'Gotland',
  county = 'Gotland',
  landscape = 'Gotland',
  country = 'Sweden',
  coordinates = point(18.3002, 57.0351),
  object_type = 'gravhäll',
  material = 'gråvit kalksten',
  dating_text = '1266–1333, slutet av 1200-talet – början av 1300-talet',
  period_start = 1266,
  period_end = 1333,
  cultural_classification = 'medieval',
  data_source = 'Samnordisk runtextdatabas'
WHERE signum = 'G 21';