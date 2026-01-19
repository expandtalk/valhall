import { locationCoords } from './coordinateData';
import { generateUniqueOffset } from './coordinateUtils';
import { getVikingEraLocation } from './vikingEraLocations';

interface Coordinates {
  lat: number;
  lng: number;
}

interface RunicInscription {
  id: string;
  signum: string;
  location?: string;
  province?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  raw_data?: any;
  placement?: string;
  height_above_sea?: number;
}

// Check for specific locations in the location field
export const detectLocationFromField = (inscription: RunicInscription): Coordinates | null => {
  if (!inscription.location) return null;
  
  const location = inscription.location.toLowerCase();
  
  // Check for major Swedish cities first
  if (location.includes('stockholm')) {
    const coords = locationCoords['stockholm'];
    if (coords) {
      console.log(`Found Stockholm coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('göteborg') || location.includes('gothenburg')) {
    const coords = locationCoords['göteborg'];
    if (coords) {
      console.log(`Found Göteborg coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('malmö') || location.includes('malmo')) {
    const coords = locationCoords['malmö'];
    if (coords) {
      console.log(`Found Malmö coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('birka')) {
    console.log(`Found Birka coordinates for ${inscription.signum}`);
    const birkaLocation = getVikingEraLocation('birka');
    if (birkaLocation) {
      return generateUniqueOffset(inscription, { lat: birkaLocation.lat, lng: birkaLocation.lng });
    }
  }
  if (location.includes('kalmar')) {
    const coords = locationCoords['kalmar'];
    if (coords) {
      console.log(`Found Kalmar coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  
  // Check for Dalarna locations
  if (location.includes('älvdalen')) {
    const coords = locationCoords['Älvdalen'];
    if (coords) {
      console.log(`Found Älvdalen coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('transtrand')) {
    const coords = locationCoords['Transtrand'];
    if (coords) {
      console.log(`Found Transtrand coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('malung')) {
    const coords = locationCoords['Malung'];
    if (coords) {
      console.log(`Found Malung coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('enviken')) {
    const coords = locationCoords['Enviken'];
    if (coords) {
      console.log(`Found Enviken coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('floda')) {
    const coords = locationCoords['Floda'];
    if (coords) {
      console.log(`Found Floda coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('hedemora')) {
    const coords = locationCoords['Hedemora'];
    if (coords) {
      console.log(`Found Hedemora coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('våmhus')) {
    const coords = locationCoords['Våmhus'];
    if (coords) {
      console.log(`Found Våmhus coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('orsa')) {
    const coords = locationCoords['Orsa'];
    if (coords) {
      console.log(`Found Orsa coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  
  // Check for Blekinge locations
  if (location.includes('mjällby')) {
    const coords = locationCoords['Mjällby'];
    if (coords) {
      console.log(`Found Mjällby coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('listerby')) {
    const coords = locationCoords['Listerby'];
    if (coords) {
      console.log(`Found Listerby coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('sturkö')) {
    const coords = locationCoords['Sturkö'];
    if (coords) {
      console.log(`Found Sturkö coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('karlskrona')) {
    const coords = locationCoords['Karlskrona'];
    if (coords) {
      console.log(`Found Karlskrona coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('ronneby')) {
    const coords = locationCoords['Ronneby'];
    if (coords) {
      console.log(`Found Ronneby coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('sölvesborg')) {
    const coords = locationCoords['Sölvesborg'];
    if (coords) {
      console.log(`Found Sölvesborg coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('karlshamn')) {
    const coords = locationCoords['Karlshamn'];
    if (coords) {
      console.log(`Found Karlshamn coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  
  // Check for Viking era locations
  const vikingLocationKeys = ['hedeby', 'ribe', 'kaupang', 'trondheim', 'york', 'dublin'];
  for (const key of vikingLocationKeys) {
    if (location.includes(key)) {
      const vikingLoc = getVikingEraLocation(key);
      if (vikingLoc) {
        console.log(`Found Viking era coordinates for ${inscription.signum} at ${key}`);
        return generateUniqueOffset(inscription, { lat: vikingLoc.lat, lng: vikingLoc.lng });
      }
    }
  }
  
  // Fallback to traditional location matching
  if (location.includes('rök')) {
    const coords = locationCoords['Rök'];
    if (coords) {
      console.log(`Found Rök coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('jelling')) {
    const coords = locationCoords['Jelling'];
    if (coords) {
      console.log(`Found Jelling coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('kragehul')) {
    const coords = locationCoords['Kragehul'];
    if (coords) {
      console.log(`Found Kragehul coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('gripsholm')) {
    const coords = locationCoords['Gripsholm'];
    if (coords) {
      console.log(`Found Gripsholm coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (location.includes('mörk') || location.includes('ärja')) {
    const coords = locationCoords['Sö 333'];
    if (coords) {
      console.log(`Found Mörk/Ärja coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  
  return null;
};

// Check specific signum patterns
export const detectLocationFromSignum = (inscription: RunicInscription): Coordinates | null => {
  const signum = inscription.signum;
  
  // Check specific signum patterns for Dalarna inscriptions
  if (signum.startsWith('Älvdalen')) {
    const coords = locationCoords['Älvdalen'];
    if (coords) {
      console.log(`Found Älvdalen coordinates for ${signum} by signum`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (signum.startsWith('Transtrand')) {
    const coords = locationCoords['Transtrand'];
    if (coords) {
      console.log(`Found Transtrand coordinates for ${signum} by signum`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (signum.startsWith('Enviken')) {
    const coords = locationCoords['Enviken'];
    if (coords) {
      console.log(`Found Enviken coordinates for ${signum} by signum`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (signum.startsWith('Floda')) {
    const coords = locationCoords['Floda'];
    if (coords) {
      console.log(`Found Floda coordinates for ${signum} by signum`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (signum.startsWith('Hedemora')) {
    const coords = locationCoords['Hedemora'];
    if (coords) {
      console.log(`Found Hedemora coordinates for ${signum} by signum`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (signum.startsWith('Våmhus')) {
    const coords = locationCoords['Våmhus'];
    if (coords) {
      console.log(`Found Våmhus coordinates for ${signum} by signum`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (signum.startsWith('Orsa')) {
    const coords = locationCoords['Orsa'];
    if (coords) {
      console.log(`Found Orsa coordinates for ${signum} by signum`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  
  return null;
};

// Extract province/region from signum
export const extractProvinceFromSignum = (inscription: RunicInscription, isVikingMode: boolean): Coordinates | null => {
  const signum = inscription.signum;
  
  // First try single letter codes for Swedish provinces
  const singleLetterMatch = signum.match(/^([A-ZÅÄÖ])\s/);
  if (singleLetterMatch) {
    const code = singleLetterMatch[1];
    if (locationCoords[code]) {
      // In Viking mode, adjust some coordinates to use historical centers
      let coords = locationCoords[code];
      if (isVikingMode && code === 'U') {
        // Use Birka coordinates instead of general Uppland for Viking mode
        const birkaLocation = getVikingEraLocation('birka');
        if (birkaLocation) {
          coords = { lat: birkaLocation.lat, lng: birkaLocation.lng };
        }
      }
      console.log(`Found coordinates for ${signum} using single letter code ${code}:`, coords);
      return generateUniqueOffset(inscription, coords);
    }
  }

  // Then try two letter codes like DR, KJ
  const twoLetterMatch = signum.match(/^([A-Z]{2})\s/);
  if (twoLetterMatch) {
    const code = twoLetterMatch[1];
    if (locationCoords[code]) {
      console.log(`Found coordinates for ${signum} using two letter code ${code}:`, locationCoords[code]);
      return generateUniqueOffset(inscription, locationCoords[code]);
    }
  }
  
  return null;
};

// Check province field for proper province detection
export const detectLocationFromProvince = (inscription: RunicInscription): Coordinates | null => {
  if (!inscription.province) return null;
  
  const province = inscription.province.toLowerCase();
  if (province.includes('dalarna') || province.includes('dalecarlia')) {
    const coords = locationCoords['Dl'];
    if (coords) {
      console.log(`Found Dalarna province coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  if (province.includes('blekinge')) {
    const coords = locationCoords['Bl'];
    if (coords) {
      console.log(`Found Blekinge province coordinates for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords);
    }
  }
  
  // Other province matching
  for (const [code, coords] of Object.entries(locationCoords)) {
    if (province.includes(code.toLowerCase()) || 
        code.toLowerCase().includes(province)) {
      console.log(`Found coordinates for ${inscription.signum} using province ${inscription.province}:`, coords);
      return generateUniqueOffset(inscription, coords);
    }
  }
  
  return null;
};

// Check country field for fallback - use Viking era centers in Viking mode
export const detectLocationFromCountry = (inscription: RunicInscription, isVikingMode: boolean): Coordinates | null => {
  if (!inscription.country) return null;
  
  const country = inscription.country.toLowerCase();
  if (country.includes('sweden') || country.includes('sverige')) {
    if (isVikingMode) {
      // Use Birka as Swedish center in Viking mode
      const birkaLocation = getVikingEraLocation('birka');
      if (birkaLocation) {
        console.log(`Using Birka fallback for ${inscription.signum} in Viking mode`);
        return generateUniqueOffset(inscription, { lat: birkaLocation.lat, lng: birkaLocation.lng });
      }
    }
    console.log(`Using Sweden fallback for ${inscription.signum}`);
    return generateUniqueOffset(inscription, { lat: 59.3293, lng: 18.0686 }); // Stockholm
  } else if (country.includes('denmark') || country.includes('danmark')) {
    const coords = locationCoords['DR'];
    if (coords) {
      console.log(`Using Denmark fallback for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords); // Uses Jelling
    }
  } else if (country.includes('norway') || country.includes('norge')) {
    const coords = locationCoords['N'];
    if (coords) {
      console.log(`Using Norway fallback for ${inscription.signum}`);
      return generateUniqueOffset(inscription, coords); // Uses Trondheim
    }
  }
  
  return null;
};
