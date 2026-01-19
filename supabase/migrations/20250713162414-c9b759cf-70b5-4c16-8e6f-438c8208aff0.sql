-- Update Gotlandic runic inscriptions with missing detailed information
UPDATE runic_inscriptions SET
  normalization = 'Hróðleikr lét gera stein ok skera yfir Hróðfinn, bróður sinn.',
  scholarly_notes = 'Fornvästnordiska: Hróðleikr lét gera stein ok skera yfir Hróðfinn, bróður sinn. Runsvenska: Hroðlæikʀ let gæra stæin ok skæra yfiʀ Hroðfinn, broður sinn. FMIS-id: 10096801150001, KMR-id: e68f96f0-3fad-4b50-b70d-eba6b9cc473d. Socken: Sundre socken, Härad: Hoburgs ting, Sockenkod: 0968.',
  current_location = 'Kyrkans golv framför koret, intill södra väggen',
  lamningsnumber = 'RAÄ-nr: 115:1',
  updated_at = now()
WHERE signum = 'G 1';

UPDATE runic_inscriptions SET
  normalization = 'Pétar <marþa> lét gera þenna stein yfir sína konu ok sín bǫrn.',
  scholarly_notes = 'Fornvästnordiska: Pétar <marþa> lét gera þenna stein yfir sína konu ok sín bǫrn. Runsvenska: Petar <marþa> let gæra þenna stæin yfiʀ sina konu ok sin barn. FMIS-id: 10096801150003, KMR-id: 6287b6f8-273b-483f-a6c2-fb9045044523. I tornkammaren.',
  current_location = 'I tornkammaren',
  lamningsnumber = 'RAÄ-nr: 115:3',
  updated_at = now()
WHERE signum = 'G 2';

UPDATE runic_inscriptions SET
  normalization = '… …gǫrðum/Västergårde(?) lét gera mik yfir sína húsfreyju Hallþjóðu. Hverr sem biðr fyrir henna[r] …',
  scholarly_notes = 'Fornvästnordiska: … …gǫrðum/Västergårde(?) lét gera mik yfir sína húsfreyju Hallþjóðu. Hverr sem biðr fyrir henna[r] … Runsvenska: … …garðum/Västergårde(?) let gæra mik yfiʀ sina husfrøyiu Hallþiuðu. FMIS-id: 10096801150002, KMR-id: 064def6a-f089-41fb-aa09-55e86a42073d.',
  lamningsnumber = 'RAÄ-nr: 115:2',
  updated_at = now()
WHERE signum = 'G 3';

UPDATE runic_inscriptions SET
  normalization = 'Ólafr Suðr/Suders(?) gerði oss.',
  scholarly_notes = 'Fornvästnordiska: Ólafr Suðr/Suders(?) gerði oss. Runsvenska: Olafʀ Suðr/Suders(?) gærði oss. FMIS-id: 10097400570001, KMR-id: 0180d52a-9597-4ebd-a426-15d21d8a2c9c. Ristare: Olaf Suder. Sockenkod: 0974. Ursprunglig plats: Ja.',
  current_location = 'Bottarve hembygdsmuseum',
  lamningsnumber = 'RAÄ-nr: 57',
  updated_at = now()
WHERE signum = 'G 8';

UPDATE runic_inscriptions SET
  normalization = '… Ráð þú …',
  scholarly_notes = 'Fornvästnordiska: … Ráð þú … Runsvenska: … Rað þu … Enligt Gotlands runinskrifter tyckte sig Brate år 1903 kunna läsa "Tyd du! Jag ristar, jag Ingulv." Runtyp: fuþark 16-typiga, period: vikingatid, fuþark: långkvist. Sockenkod: 0974.',
  current_location = 'SHM (8329:4)',
  rune_type = 'fuþark',
  rune_variant = '16-typiga långkvist',
  updated_at = now()
WHERE signum = 'G 10';

UPDATE runic_inscriptions SET
  normalization = 'Jakobr … gera stein. Biðið bœnir yðrar fyrir sálu [Hró]ðvéar(?) … … … … … … benedicta in mu[lieribus] … risti mik.',
  scholarly_notes = 'Fornvästnordiska: Jakobr … gera stein. Biðið bœnir yðrar fyrir sálu [Hró]ðvéar(?) … benedicta in mu[lieribus] … risti mik. Runsvenska: Iakobr … gæra stæin. Biðin bøniʀ iðrar fyriʀ sialu [Hro]ðviaʀ(?) … FMIS-id: 10093100380003, KMR-id: 64009d39-4348-4c01-966e-93783f7f81c8. Numera saknas stora delar av texten, men kan kompletteras från äldre beskrivningar.',
  current_location = 'Klamrad till långskeppets västra vägg inne i kyrkan',
  lamningsnumber = 'RAÄ-nr: 38:3',
  updated_at = now()
WHERE signum = 'G 13';

UPDATE runic_inscriptions SET
  normalization = '<sial> <synkr> létu … ge[ra] eptir … fǫður … Guð hann barmi sik …',
  scholarly_notes = 'Fornvästnordiska: <sial> <synkr> létu … ge[ra] eptir … fǫður … Guð hann barmi sik … Runsvenska: <sial> <synkr> letu … gæ[ra] æftiʀ … faður … FMIS-id: 10093100380004, KMR-id: 5cb37e10-81ec-45ba-9590-846193ecb0ec.',
  current_location = 'Klamrad till långskeppets västra vägg',
  lamningsnumber = 'RAÄ-nr: 38:4',
  updated_at = now()
WHERE signum = 'G 14';

UPDATE runic_inscriptions SET
  scholarly_notes = 'Fragment utan läsbar runtext. FMIS-id: 10093100380002, KMR-id: a4b0659f-a7e0-4e4c-acc1-320a25bf1052.',
  current_location = 'Klamrad till långskeppets södra vägg inne i kyrkan, väster om ingångsdörren',
  lamningsnumber = 'RAÄ-nr: 38:2',
  updated_at = now()
WHERE signum = 'G 18';

UPDATE runic_inscriptions SET
  scholarly_notes = 'Fragmentarisk putsinskrift med möjligen namnet Magnus. FMIS-id: 10093100380008, KMR-id: 71f3f760-27cf-4dc7-928f-102e07271e19.',
  current_location = 'Insidan av långskeppets södra vägg, vid koret 1,5 m över golvet',
  lamningsnumber = 'RAÄ-nr: 38:8',
  updated_at = now()
WHERE signum = 'G 20';