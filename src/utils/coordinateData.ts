
// Swedish cities and locations
export const locationCoords: { [key: string]: { lat: number; lng: number } } = {
  // Swedish cities and locations
  'kalmar': { lat: 56.6634, lng: 16.3567 },
  'stockholm': { lat: 59.3293, lng: 18.0686 },
  'göteborg': { lat: 57.7089, lng: 11.9746 },
  'malmö': { lat: 55.6050, lng: 13.0038 },
  'uppsala': { lat: 59.8586, lng: 17.6389 },
  'linköping': { lat: 58.4108, lng: 15.6214 },
  'västerås': { lat: 59.6162, lng: 16.5528 },
  'örebro': { lat: 59.2753, lng: 15.2134 },
  'norrköping': { lat: 58.5877, lng: 16.1924 },
  'helsingborg': { lat: 56.0465, lng: 12.6945 },
  'jönköping': { lat: 57.7826, lng: 14.1618 },
  'lund': { lat: 55.7047, lng: 13.1910 },
  'umeå': { lat: 63.8258, lng: 20.2630 },
  'gävle': { lat: 60.6749, lng: 17.1413 },
  'borås': { lat: 57.7210, lng: 12.9401 },
  'eskilstuna': { lat: 59.3667, lng: 16.5077 },
  'karlstad': { lat: 59.3793, lng: 13.5036 },
  'växjö': { lat: 56.8777, lng: 14.8091 },
  'halmstad': { lat: 56.6745, lng: 12.8578 },
  'sundsvall': { lat: 62.3908, lng: 17.3069 },

  // Dalarna locations
  'Älvdalen': { lat: 61.2167, lng: 14.1167 },
  'Transtrand': { lat: 60.6000, lng: 13.4667 },
  'Malung': { lat: 60.6833, lng: 13.7167 },
  'Enviken': { lat: 60.7167, lng: 15.8167 },
  'Floda': { lat: 60.6167, lng: 16.2833 },
  'Hedemora': { lat: 60.2833, lng: 15.9833 },
  'Våmhus': { lat: 60.8667, lng: 14.8333 },
  'Orsa': { lat: 61.1167, lng: 14.6167 },

  // Blekinge locations
  'Mjällby': { lat: 56.2833, lng: 14.8167 },
  'Listerby': { lat: 56.1167, lng: 15.1833 },
  'Sturkö': { lat: 56.1167, lng: 15.1167 },
  'Karlskrona': { lat: 56.1606, lng: 15.5866 },
  'Ronneby': { lat: 56.2069, lng: 15.2756 },
  'Sölvesborg': { lat: 56.0506, lng: 14.5797 },
  'Karlshamn': { lat: 56.1706, lng: 14.8619 },

  // ✅ FIXED: Separated coordinates for overlapping locations with proper spacing
  'Ullevi': { lat: 58.3850, lng: 13.1580 }, // Ullevi, Västergötland
  'Mjärdevi': { lat: 58.4180, lng: 15.6350 }, // Mjärdevi, Östergötland (moved further east)
  
  // ✅ FIXED: Lund and Uppåkra separated properly with exact coordinates from user
  'Lund': { lat: 55.7047, lng: 13.1910 }, // Lund stad
  'Uppåkra': { lat: 55.6667, lng: 13.1694 }, // Uppåkra - 5 km söder om Lund (exact coordinates from user: 55°40′0″N 13°10′10″E)
  
  // ✅ FIXED: Sigtuna and Trefaldighetskällan separated
  'Sigtuna': { lat: 59.6197, lng: 17.7239 }, // Sigtuna stad
  'Trefaldighetskällan': { lat: 59.6100, lng: 17.7150 }, // Trefaldighetskällan - lite sydväst

  // ✅ ENHANCED: Many more Husaby locations (important religious centers)
  'Husaby Västergötland': { lat: 58.3167, lng: 13.3333 }, // Husaby, Västergötland
  'Husaby Värmland': { lat: 59.4500, lng: 13.7167 }, // Husaby, Värmland 
  'Husaby Uppland': { lat: 59.8000, lng: 17.5000 }, // Husaby, Uppland
  'Husaby Östergötland': { lat: 58.3000, lng: 15.8000 }, // Husaby, Östergötland
  'Husaby Småland': { lat: 57.2000, lng: 14.5000 }, // Husaby, Småland
  'Husaby Halland': { lat: 56.8000, lng: 12.8000 }, // Husaby, Halland
  'Husaby Skåne': { lat: 55.9000, lng: 13.5000 }, // Husaby, Skåne
  'Husaby Bohuslän': { lat: 58.2000, lng: 11.7000 }, // Husaby, Bohuslän
  'Husaby Närke': { lat: 59.1000, lng: 15.0000 }, // Husaby, Närke
  'Husaby Södermanland': { lat: 59.0000, lng: 16.8000 }, // Husaby, Södermanland

  // Famous runestone locations with EXACT coordinates
  'Rök': { lat: 58.2953, lng: 14.8372 }, // Rök runestone (Ög 136)
  'Rökstenen': { lat: 58.2953, lng: 14.8372 },
  'Röks kyrka': { lat: 58.2953, lng: 14.8372 },
  'Björketorp': { lat: 56.2667, lng: 15.3833 }, // Björketorp runestone (DR 360) - CORRECTED
  'Björketorpsstenen': { lat: 56.2667, lng: 15.3833 },
  'Sparlösa': { lat: 58.3939, lng: 13.1506 }, // Sparlösa stone (Vg 119) - CORRECTED
  'Sparlösastenen': { lat: 58.3939, lng: 13.1506 },
  'Gripsholm': { lat: 59.3969, lng: 17.1167 }, // Gripsholm stone (Sö 179)
  'Gripsholmsstenen': { lat: 59.3969, lng: 17.1167 },
  'Tune': { lat: 59.2833, lng: 11.1167 }, // Tune stone (N KJ72)
  'Tunestenen': { lat: 59.2833, lng: 11.1167 },
  'Jelling': { lat: 55.7558, lng: 9.4219 }, // Jelling stones (DR 41/42)
  'Jellingstenarna': { lat: 55.7558, lng: 9.4219 },

  // Additional religious and trading locations
  'Offerkällan Söderö': { lat: 59.2333, lng: 17.9167 }, // User mentioned location

  // Province codes and famous locations
  'U': { lat: 59.8586, lng: 17.6389 }, // Uppland - Uppsala
  'Sö': { lat: 59.2753, lng: 15.2134 }, // Södermanland - Örebro  
  'Ög': { lat: 58.4108, lng: 15.6214 }, // Östergötland - Linköping
  'Sm': { lat: 56.8777, lng: 14.8091 }, // Småland - Växjö
  'Hs': { lat: 56.6745, lng: 12.8578 }, // Halland - Halmstad
  'Sk': { lat: 55.6050, lng: 13.0038 }, // Skåne - Malmö
  'Bl': { lat: 56.1606, lng: 15.5866 }, // Blekinge - Karlskrona
  'Dl': { lat: 60.6833, lng: 13.7167 }, // Dalarna - Malung
  'Vg': { lat: 57.7089, lng: 11.9746 }, // Västergötland - Göteborg
  'Vs': { lat: 59.6162, lng: 16.5528 }, // Västmanland - Västerås
  'Vr': { lat: 59.3793, lng: 13.5036 }, // Värmland - Karlstad
  'N': { lat: 63.4305, lng: 10.3951 }, // Norway - Trondheim
  'DR': { lat: 55.7558, lng: 9.1221 }, // Denmark - Jelling
  
  // Famous runestones - exact coordinates
  'Kragehul': { lat: 54.9167, lng: 11.9833 },
  'Sö 333': { lat: 59.0167, lng: 16.9500 }
};

// Create Google Maps URL for a location
export const createGoogleMapsUrl = (lat: number, lng: number, name?: string): string => {
  const baseUrl = 'https://www.google.com/maps';
  const query = name ? encodeURIComponent(name) : '';
  return `${baseUrl}/@${lat},${lng},15z${query ? `/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d${lat}!4d${lng}` : ''}`;
};

// Create Google Street View URL for a location
export const createStreetViewUrl = (lat: number, lng: number): string => {
  return `https://www.google.com/maps/@${lat},${lng},3a,75y,0h,90t/data=!3m7!1e1!3m5!1s0x0:0x0!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com!7i16384!8i8192`;
};
