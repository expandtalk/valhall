-- Update coordinates for specific Uppland inscriptions with correct locations

-- U 110 – Bisslinge, Eds socken, Upplands Väsby: 59°29′38″ N, 17°52′54″ Ö
UPDATE runic_inscriptions 
SET coordinates = point(17.881666667, 59.493888889)
WHERE signum = 'U 110';

-- U 242 – Lingsberg, Vallentuna: 59°32′41.9″ N, 18°07′45.6″ Ö
UPDATE runic_inscriptions 
SET coordinates = point(18.129333333, 59.544972222)
WHERE signum = 'U 242';

-- U393 (Uppland): Lat: 59.61702, Lon: 17.715947
UPDATE runic_inscriptions 
SET coordinates = point(17.715947, 59.61702)
WHERE signum = 'U 393';