-- Add Cholmogory as a Viking trading center with correct status
INSERT INTO viking_cities (
  name,
  coordinates,
  category,
  period_start,
  period_end,
  country,
  region,
  description,
  historical_significance,
  unesco_site,
  status
) VALUES (
  'Cholmogory',
  POINT(41.65, 64.2167),  -- 64°13′N 41°39′Ö
  'trading_post',
  800,
  1200,
  'Ryssland',
  'Archangelsk oblast',
  'Strategisk handelsplats vid Norra Dvina, cirka 75 km sydost om Archangelsk. Ligger på en höjd ("cholm" betyder kulle på ryska) vid sammanflödet av flera mindre floder med Norra Dvina.',
  'Viktig handelsplats mellan bjarmerna, skandinaverna och senare Novgorod. Gav kontroll över varutransporter längs Norra Dvina mellan Vita havet och inlandet. Lätt att försvara tack vare höjdläget och naturlig samlingsplats för handel mellan kust och inland.',
  false,
  'evolved'  -- Using 'evolved' since this developed into a later important city
);