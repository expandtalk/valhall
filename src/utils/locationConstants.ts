
// Enhanced location constants with better regional coverage
export const REGIONAL_CENTERS = {
  // Sweden - Primary regions
  'U': { lat: 59.8586, lng: 17.6389, zoom: 10 }, // Uppland (Uppsala)
  'Sö': { lat: 59.2195, lng: 17.8803, zoom: 10 }, // Södermanland
  'Ög': { lat: 58.4108, lng: 15.6214, zoom: 10 }, // Östergötland
  'Vg': { lat: 58.3943, lng: 13.5098, zoom: 10 }, // Västergötland
  'Sm': { lat: 56.8777, lng: 14.8091, zoom: 9 }, // Småland (Växjö)
  'Öl': { lat: 56.6739, lng: 16.3606, zoom: 10 }, // Öland (Borgholm) - FIXED
  'G': { lat: 57.6348, lng: 18.2166, zoom: 10 }, // Gotland (Visby)
  'Bo': { lat: 60.6749, lng: 17.1413, zoom: 10 }, // Bohuslän
  'Hs': { lat: 62.3875, lng: 17.3069, zoom: 10 }, // Hälsingland
  'Gs': { lat: 60.6749, lng: 17.1413, zoom: 10 }, // Gästrikland
  'Vs': { lat: 59.7583, lng: 16.5419, zoom: 10 }, // Västmanland
  'Dl': { lat: 60.6249, lng: 15.6262, zoom: 10 }, // Dalarna
  'Vr': { lat: 59.1323, lng: 13.1617, zoom: 10 }, // Värmland
  'Nä': { lat: 59.2694, lng: 15.2066, zoom: 10 }, // Närke
  'Hl': { lat: 56.8308, lng: 12.8267, zoom: 10 }, // Halland
  'Sk': { lat: 55.6050, lng: 13.0038, zoom: 10 }, // Skåne (Malmö)
  'Bl': { lat: 56.1613, lng: 14.8860, zoom: 10 }, // Blekinge
  
  // Alternative formats for Öland and other regions
  'Ö': { lat: 56.6739, lng: 16.3606, zoom: 10 }, // Öland alternative
  'OL': { lat: 56.6739, lng: 16.3606, zoom: 10 }, // Öland alternative
  
  // Norway - Enhanced coverage
  'N': { lat: 60.1695, lng: 11.0108, zoom: 8 }, // Norway general
  'BN': { lat: 60.39299, lng: 5.32415, zoom: 12 }, // Bergen (specific)
  'NO': { lat: 60.1695, lng: 11.0108, zoom: 8 }, // Norway alternative
  'KJ': { lat: 60.1695, lng: 11.0108, zoom: 8 }, // Krause-Jankuhn Norwegian inscriptions
  
  // Denmark
  'DR': { lat: 55.6761, lng: 12.5683, zoom: 8 }, // Denmark (Copenhagen)
  'DK': { lat: 55.6761, lng: 12.5683, zoom: 8 }, // Denmark alternative
  'BH': { lat: 55.1644, lng: 14.8856, zoom: 10 }, // Bornholm (Denmark)
  
  // Finland - Add support for Finnish runestones
  'FI': { lat: 60.1699, lng: 24.9384, zoom: 8 }, // Finland (Helsinki)
  'FL': { lat: 60.1699, lng: 24.9384, zoom: 8 }, // Finland alternative
  
  // Iceland
  'IS': { lat: 64.1466, lng: -21.9426, zoom: 7 }, // Iceland
  'ICE': { lat: 64.1466, lng: -21.9426, zoom: 7 }, // Iceland alternative
  
  // Faroe Islands
  'FO': { lat: 62.0079, lng: -6.7919, zoom: 9 }, // Faroe Islands
  
  // England/Britain
  'BR': { lat: 54.9783, lng: -1.6178, zoom: 8 }, // Britain/England
  'GB': { lat: 54.9783, lng: -1.6178, zoom: 8 }, // Great Britain
  'ENG': { lat: 54.9783, lng: -1.6178, zoom: 8 }, // England
  
  // Russia/Eastern Europe
  'RU': { lat: 59.9311, lng: 30.3609, zoom: 8 }, // Russia (Saint Petersburg area)
  'RUS': { lat: 59.9311, lng: 30.3609, zoom: 8 }, // Russia alternative
  
  // Germany
  'DE': { lat: 54.0865, lng: 12.1387, zoom: 8 }, // Northern Germany (Mecklenburg)
  'GER': { lat: 54.0865, lng: 12.1387, zoom: 8 }, // Germany alternative
};

export const CITY_LOCATIONS = {
  // Sweden - Major cities
  'stockholm': { lat: 59.3293, lng: 18.0686, zoom: 12 },
  'göteborg': { lat: 57.7089, lng: 11.9746, zoom: 12 },
  'malmö': { lat: 55.6050, lng: 13.0038, zoom: 12 },
  'uppsala': { lat: 59.8586, lng: 17.6389, zoom: 12 },
  'linköping': { lat: 58.4108, lng: 15.6214, zoom: 12 },
  'växjö': { lat: 56.8777, lng: 14.8091, zoom: 12 },
  'kalmar': { lat: 56.6634, lng: 16.3567, zoom: 12 },
  'borgholm': { lat: 56.8775, lng: 16.6523, zoom: 12 }, // Öland
  'köping': { lat: 56.9167, lng: 16.6167, zoom: 12 }, // Köping på Öland  
  'eketorp': { lat: 56.3167, lng: 16.4500, zoom: 12 }, // Eketorp på Öland
  'resmo': { lat: 56.5167, lng: 16.4500, zoom: 12 }, // Resmo på Öland
  'vickleby': { lat: 56.607, lng: 16.440, zoom: 12 }, // Vickleby, Öland - för Karlevi stenen
  'smedby': { lat: 56.65, lng: 16.52, zoom: 12 }, // Smedby, Öland - för Öl 10-12
  'mörbylånga': { lat: 56.502, lng: 16.426, zoom: 12 }, // Mörbylånga, Öland
  'algutsrum': { lat: 56.679, lng: 16.528, zoom: 12 }, // Algutsrum, Öland
  'hulterstad': { lat: 56.633, lng: 16.492, zoom: 12 }, // Hulterstad, Öland
  'gräsgård': { lat: 56.717, lng: 16.583, zoom: 12 }, // Gräsgård, Öland
  'visby': { lat: 57.6348, lng: 18.2951, zoom: 12 }, // Gotland
  
  // Gotland - specific locations
  'levide': { lat: 57.5333, lng: 18.4167, zoom: 13 }, // Levide på Gotland
  'tjängvide': { lat: 57.9167, lng: 18.7333, zoom: 13 }, // Tjängvide på Gotland
  'stenkyrka': { lat: 57.8833, lng: 18.6833, zoom: 13 }, // Stenkyrka på Gotland
  'fröjel': { lat: 57.2333, lng: 18.1333, zoom: 13 }, // Fröjel på Gotland
  'hablingbo': { lat: 57.2167, lng: 18.3167, zoom: 13 }, // Hablingbo på Gotland
  'ardre': { lat: 57.5333, lng: 18.4833, zoom: 13 }, // Ardre på Gotland
  
  // Blekinge - specific locations  
  'björketorp': { lat: 56.1966, lng: 15.4023, zoom: 13 }, // Björketorp i Blekinge
  'listerby': { lat: 56.1966, lng: 15.4023, zoom: 13 }, // Listerby i Blekinge
  'listerby kyrka': { lat: 56.1966, lng: 15.4023, zoom: 13 }, // Listerby kyrka i Blekinge
  'lösen': { lat: 56.197, lng: 15.6884, zoom: 13 }, // Lösen i Blekinge
  'lösens kyrka': { lat: 56.197, lng: 15.6884, zoom: 13 }, // Lösens kyrka i Blekinge
  'åryd': { lat: 56.2981, lng: 14.9981, zoom: 13 }, // Åryd i Blekinge
  'halahult': { lat: 56.2981, lng: 14.9981, zoom: 13 }, // Halahult i Blekinge
  'istaby': { lat: 56.0224, lng: 14.6509, zoom: 13 }, // Istaby i Blekinge
  
  // Närke - specific parishes and locations
  'götlunda': { lat: 59.2694, lng: 15.2066, zoom: 13 }, // Götlunda socken, Närke
  'rinkaby': { lat: 59.2844, lng: 15.1956, zoom: 13 }, // Rinkaby socken, Närke
  'örebro': { lat: 59.2741, lng: 15.2066, zoom: 12 }, // Örebro, Närke
  
  // Östergötland - specific parishes and locations  
  'röks': { lat: 58.2976, lng: 14.8468, zoom: 13 }, // Röks socken (Rökstenen!)
  'rök': { lat: 58.2976, lng: 14.8468, zoom: 13 }, // Rök (alternative spelling)
  'gistads': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Gistads socken
  'gistad': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Gistad (alternative)
  'kuddby': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Kuddby socken
  'västra ryd': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Västra Ryds socken
  'västra ryds': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Västra Ryds socken
  'älvestads': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Älvestads socken
  'älvestad': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Älvestad (alternative)
  'väderstads': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Väderstads socken
  'väderstad': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Väderstad (alternative)
  'östra husby': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Östra Husby socken
  'vårdsbergs': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Vårdsbergs socken
  'vårdsberg': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Vårdsberg (alternative)
  'konungsunds': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Konungsunds socken
  'konungsund': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Konungsund (alternative)
  'östra ny': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Östra Ny socken
  'å': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Å socken
  'orlunda': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Orlunda socken
  'viby': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Viby socken
  'ekeby': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Ekeby socken
  'herrberga': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Herrberga socken
  'härberga': { lat: 58.4108, lng: 15.6214, zoom: 13 }, // Härberga (alternative)
  'ronneby': { lat: 56.2097, lng: 15.2752, zoom: 12 }, // Ronneby i Blekinge
  'sölvesborg': { lat: 56.0524, lng: 14.5751, zoom: 12 }, // Sölvesborg i Blekinge
  
  // Norway - Major cities and parishes (socknar)
  'oslo': { lat: 59.9139, lng: 10.7522, zoom: 12 },
  'bergen': { lat: 60.39299, lng: 5.32415, zoom: 12 },
  'trondheim': { lat: 63.4305, lng: 10.3951, zoom: 12 },
  'stavanger': { lat: 58.9700, lng: 5.7331, zoom: 12 },
  'fredrikstad': { lat: 59.2181, lng: 10.9298, zoom: 12 },
  
  // Norwegian parishes (socknar) for runic inscription mapping
  'gol': { lat: 60.6789, lng: 8.0042, zoom: 12 }, // Gol, Buskerud
  'mosterøy': { lat: 59.0289, lng: 5.7047, zoom: 12 }, // Mosterøy, Rogaland
  
  // British Isles locations for runic inscriptions
  'northumbria': { lat: 55.2085, lng: -2.0783, zoom: 12 }, // Northumbria region
  'hunterston': { lat: 55.7088, lng: -4.8579, zoom: 12 }, // Hunterston, Ayrshire
  'kilbar': { lat: 56.9544, lng: -7.5397, zoom: 12 }, // Kilbar, Barra
  'braddan': { lat: 54.1544, lng: -4.5681, zoom: 12 }, // Braddan, Isle of Man
  'maeshowe': { lat: 59.0007, lng: -3.1883, zoom: 12 }, // Maeshowe, Orkney
  'stromness': { lat: 58.9580, lng: -3.2958, zoom: 12 }, // Stromness, Orkney
  'birsay': { lat: 59.1356, lng: -3.3264, zoom: 12 }, // Birsay, Orkney
  'cunningsburgh': { lat: 60.0167, lng: -1.1833, zoom: 12 }, // Cunningsburgh, Shetland
  'winchester': { lat: 51.0632, lng: -1.3176, zoom: 12 }, // Winchester, Hampshire
  'scotterthorpe': { lat: 53.5053, lng: -0.6771, zoom: 12 }, // Scotterthorpe, Lincolnshire
  'horning': { lat: 52.7017, lng: 1.4350, zoom: 12 }, // Horning, Norfolk
  'borgund sogn': { lat: 61.0361, lng: 7.1058, zoom: 12 }, // Borgund, Sogn og Fjordane
  'borgund': { lat: 61.0361, lng: 7.1058, zoom: 12 }, // Borgund variant
  'bore': { lat: 58.8533, lng: 5.6678, zoom: 12 }, // Bore, Rogaland
  'hesby': { lat: 61.2167, lng: 5.5333, zoom: 12 }, // Hesby, Sogn og Fjordane
  'hof': { lat: 59.7667, lng: 10.2167, zoom: 12 }, // Hof, Vestfold
  'lom': { lat: 61.8350, lng: 8.5694, zoom: 12 }, // Lom, Oppland
  'lom sogn': { lat: 61.8350, lng: 8.5694, zoom: 12 }, // Lom sogn variant
  'rennesøy': { lat: 59.1289, lng: 5.6978, zoom: 12 }, // Rennesøy, Rogaland
  'skjeberg': { lat: 59.3000, lng: 11.0833, zoom: 12 }, // Skjeberg, Østfold
  'sola': { lat: 58.8931, lng: 5.6283, zoom: 12 }, // Sola, Rogaland
  'stedje': { lat: 61.2333, lng: 6.8000, zoom: 12 }, // Stedje, Sogn og Fjordane
  'talgje': { lat: 59.6167, lng: 10.4667, zoom: 12 }, // Talgje, Vestfold
  'torsnes': { lat: 59.3167, lng: 10.9833, zoom: 12 }, // Torsnes, Østfold
  'valle': { lat: 59.2000, lng: 7.5333, zoom: 12 }, // Valle, Aust-Agder
  'åmotsdal sogn': { lat: 59.0833, lng: 7.3167, zoom: 12 }, // Åmotsdal, Vest-Agder
  'askim': { lat: 59.5833, lng: 11.1667, zoom: 12 }, // Askim, Østfold
  'avaldsnes sogn': { lat: 59.3500, lng: 5.2833, zoom: 12 }, // Avaldsnes, Rogaland
  'bø sogn': { lat: 59.4167, lng: 9.0667, zoom: 12 }, // Bø, Telemark
  'bykle sogn': { lat: 59.3333, lng: 7.3833, zoom: 12 }, // Bykle, Aust-Agder
  'evje': { lat: 58.5833, lng: 7.7833, zoom: 12 }, // Evje, Aust-Agder
  'flatdal': { lat: 59.4500, lng: 8.1500, zoom: 12 }, // Flatdal, Telemark
  'gran': { lat: 60.3833, lng: 10.3000, zoom: 12 }, // Gran, Oppland
  'gjerpen sogn': { lat: 59.2667, lng: 9.6000, zoom: 12 }, // Gjerpen, Telemark
  'grytten sogn': { lat: 62.5667, lng: 7.8167, zoom: 12 }, // Grytten, Møre og Romsdal
  'sandar sogn': { lat: 59.1333, lng: 10.2167, zoom: 12 }, // Sandar, Vestfold
  'sokndal sogn': { lat: 58.3667, lng: 6.1167, zoom: 12 }, // Sokndal, Rogaland
  'tanums socken': { lat: 58.7267, lng: 11.3267, zoom: 12 }, // Tanum, Västra Götaland (svensk)
  'lesja': { lat: 62.1667, lng: 8.8000, zoom: 12 }, // Lesja, Oppland
  'uvdal': { lat: 60.2500, lng: 8.5333, zoom: 12 }, // Uvdal, Buskerud
  'lunder': { lat: 58.9833, lng: 5.7000, zoom: 12 }, // Lunder, Rogaland
  'tangen': { lat: 60.1833, lng: 10.0167, zoom: 12 }, // Tangen, Buskerud
  
  // Denmark - Major cities
  'københavn': { lat: 55.6761, lng: 12.5683, zoom: 12 },
  'copenhagen': { lat: 55.6761, lng: 12.5683, zoom: 12 },
  'århus': { lat: 56.1629, lng: 10.2039, zoom: 12 },
  'aarhus': { lat: 56.1629, lng: 10.2039, zoom: 12 },
  'odense': { lat: 55.4038, lng: 10.4024, zoom: 12 },
  'roskilde': { lat: 55.6415, lng: 12.0803, zoom: 12 },
  'jelling': { lat: 55.7553, lng: 9.4170, zoom: 12 },
  'hedeby': { lat: 54.4894, lng: 9.5644, zoom: 12 },
  'ribe': { lat: 55.3280, lng: 8.7816, zoom: 12 },
  
  // Iceland
  'reykjavik': { lat: 64.1466, lng: -21.9426, zoom: 12 },
  
  // England
  'london': { lat: 51.5074, lng: -0.1278, zoom: 12 },
  'york': { lat: 53.9591, lng: -1.0815, zoom: 12 },
};

export const COUNTRY_CENTERS = {
  'sweden': { lat: 60.1282, lng: 18.6435, zoom: 6 },
  'sverige': { lat: 60.1282, lng: 18.6435, zoom: 6 },
  'norway': { lat: 60.472, lng: 8.4689, zoom: 6 },
  'norge': { lat: 60.472, lng: 8.4689, zoom: 6 },
  'denmark': { lat: 56.2639, lng: 9.5018, zoom: 7 },
  'danmark': { lat: 56.2639, lng: 9.5018, zoom: 7 },
  'iceland': { lat: 64.9631, lng: -19.0208, zoom: 6 },
  'ísland': { lat: 64.9631, lng: -19.0208, zoom: 6 },
  'island': { lat: 64.9631, lng: -19.0208, zoom: 6 },
  'england': { lat: 52.3555, lng: -1.1743, zoom: 6 },
  'britain': { lat: 52.3555, lng: -1.1743, zoom: 6 },
};

// Enhanced mapping for region names to codes
export const REGION_NAME_TO_CODE: Record<string, string> = {
  'uppland': 'U',
  'södermanland': 'Sö',
  'östergötland': 'Ög',
  'västergötland': 'Vg',
  'småland': 'Sm',
  'öland': 'Ö',
  'gotland': 'G',
  'bohuslän': 'Bo',
  'hälsingland': 'Hs',
  'gästrikland': 'Gs',
  'västmanland': 'Vs',
  'dalarna': 'Dl',
  'närke': 'Nä',
  'värmland': 'Vr',
  'halland': 'Hl',
  'skåne': 'Sk',
  'blekinge': 'Bl',
  'bergen': 'BN',
  'norway': 'N',
  'norge': 'N',
  'denmark': 'DR',
  'danmark': 'DR',
};

export const FAMOUS_STONES_ENHANCED = {
  // Jelling stones
  'DR 41': { lat: 55.7553, lng: 9.4170, zoom: 15 },
  'DR 42': { lat: 55.7553, lng: 9.4170, zoom: 15 },
  'DR41': { lat: 55.7553, lng: 9.4170, zoom: 15 },
  'DR42': { lat: 55.7553, lng: 9.4170, zoom: 15 },
  
  // Rök stone
  'Ög 136': { lat: 58.2976, lng: 14.8468, zoom: 15 },
  'Ög136': { lat: 58.2976, lng: 14.8468, zoom: 15 },
  
  // Kensington stone (controversial)
  'KJ 101': { lat: 45.7833, lng: -95.6833, zoom: 15 },
  
  // Gotland stones
  'G 181': { lat: 57.6348, lng: 18.2951, zoom: 15 },
  'G181': { lat: 57.6348, lng: 18.2951, zoom: 15 },
  
  // Öland stones - specifika koordinater från användarens data
  'Öl 1': { lat: 56.60751, lng: 16.43983, zoom: 15 }, // Karlevistenen, Vickleby socken
  'Öl1': { lat: 56.60751, lng: 16.43983, zoom: 15 }, // Karlevistenen
  'Öl 2': { lat: 56.67883, lng: 16.52781, zoom: 15 }, // Algutsrums kyrka (försvunnen)
  'Öl2': { lat: 56.67883, lng: 16.52781, zoom: 15 }, 
  'Öl 3': { lat: 56.54135, lng: 16.44376, zoom: 15 }, // Resmo kyrka (försvunnen)
  'Öl3': { lat: 56.54135, lng: 16.44376, zoom: 15 },
  'Öl 4': { lat: 56.54135, lng: 16.44376, zoom: 15 }, // Resmo kyrka, nu i Kalmar läns museum
  'Öl4': { lat: 56.54135, lng: 16.44376, zoom: 15 },
  'Öl 5': { lat: 56.50201, lng: 16.42637, zoom: 15 }, // Bårby (försvunnen)
  'Öl5': { lat: 56.50201, lng: 16.42637, zoom: 15 },
  'Öl 39': { lat: 56.5, lng: 16.45, zoom: 15 }, // Bägby bro - approximativ koordinat
  'Öl39': { lat: 56.5, lng: 16.45, zoom: 15 },
  'Karlevi': { lat: 56.60751, lng: 16.43983, zoom: 15 },
  'karlevi': { lat: 56.60751, lng: 16.43983, zoom: 15 },
  'Karlevistenen': { lat: 56.60751, lng: 16.43983, zoom: 15 },
  
  // Småland stones
  'Sm 1': { lat: 56.8777, lng: 14.8091, zoom: 15 },
  'Sm1': { lat: 56.8777, lng: 14.8091, zoom: 15 },
  
  // Bergen stones (Norway) - NOTE: BN 1 är Karlevi-stenen, inte Bergen
  'BN1': { lat: 60.39299, lng: 5.32415, zoom: 15 }, // Bergen stone
  'BN 2': { lat: 60.39299, lng: 5.32415, zoom: 15 },
  'BN2': { lat: 60.39299, lng: 5.32415, zoom: 15 },
};
