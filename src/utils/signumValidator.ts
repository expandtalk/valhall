
export interface SignumValidation {
  isValid: boolean;
  normalizedSignum: string | null;
  reason?: string;
}

export const validateSignum = (signum: string): SignumValidation => {
  if (!signum || typeof signum !== 'string') {
    return {
      isValid: false,
      normalizedSignum: null,
      reason: 'Signum is empty or not a string'
    };
  }

  const trimmed = signum.trim();
  
  if (trimmed.length < 2) {
    return {
      isValid: false,
      normalizedSignum: null,
      reason: 'Signum too short'
    };
  }

  // Enhanced validation for all Nordic countries and regions
  const validPatterns = [
    // Danish runestones (DR prefix)
    /^DR\s+\d+.*$/i,
    /^DR\d+.*$/i,
    
    // Norwegian runestones (N prefix)
    /^N\s+\d+.*$/i,
    /^N\d+.*$/i,
    
    // Estonian runestones (E prefix)  
    /^E\s+\d+.*$/i,
    /^E\d+.*$/i,
    
    // Irish runestones (IR prefix)
    /^IR\s+\d+.*$/i,
    /^IR\d+.*$/i,
    
    // Scottish runestones (Sc prefix)
    /^Sc\s+\d+.*$/i,
    /^Sc\d+.*$/i,
    
    // Swedish provinces - comprehensive list
    /^U\s+\d+.*$/i,     // Uppland
    /^U\d+.*$/i,
    /^Sö\s+\d+.*$/i,    // Södermanland  
    /^Sö\d+.*$/i,
    /^Ög\s+\d+.*$/i,    // Östergötland
    /^Ög\d+.*$/i,
    /^Sm\s+\d+.*$/i,    // Småland
    /^Sm\d+.*$/i,
    /^G\s+\d+.*$/i,     // Gotland
    /^G\d+.*$/i,
    /^Vg\s+\d+.*$/i,    // Västergötland
    /^Vg\d+.*$/i,
    /^Hs\s+\d+.*$/i,    // Hälsingland
    /^Hs\d+.*$/i,
    /^Vs\s+\d+.*$/i,    // Västmanland
    /^Vs\d+.*$/i,
    /^Dg\s+\d+.*$/i,    // Dalarna (Dalecarlia)
    /^Dg\d+.*$/i,
    /^Np\s+\d+.*$/i,    // Närke
    /^Np\d+.*$/i,
    /^Vr\s+\d+.*$/i,    // Värmland
    /^Vr\d+.*$/i,
    /^Bo\s+\d+.*$/i,    // Bohuslän
    /^Bo\d+.*$/i,
    
    // Additional Swedish regions
    /^Bl\s+\d+.*$/i,    // Blekinge
    /^Bl\d+.*$/i,
    /^Sk\s+\d+.*$/i,    // Skåne
    /^Sk\d+.*$/i,
    /^Hl\s+\d+.*$/i,    // Halland
    /^Hl\d+.*$/i,
    
    // Generic patterns for edge cases
    /^[A-ZÅÄÖa-zåäö]{1,3}\s*\d+.*$/,  // 1-3 letter prefix + number
  ];

  const isValidPattern = validPatterns.some(pattern => pattern.test(trimmed));
  
  if (!isValidPattern) {
    return {
      isValid: false,
      normalizedSignum: null,
      reason: `Signum does not match any known Nordic runestone pattern: ${trimmed}`
    };
  }

  // Normalize the signum format
  let normalized = trimmed;
  
  // Ensure consistent spacing between prefix and number
  normalized = normalized.replace(/^([A-ZÅÄÖa-zåäö]{1,3})\s*(\d+.*)$/, '$1 $2');
  
  // Capitalize the prefix properly
  const parts = normalized.split(' ');
  if (parts.length >= 2) {
    const prefix = parts[0].toUpperCase();
    const suffix = parts.slice(1).join(' ');
    normalized = `${prefix} ${suffix}`;
  }

  console.log(`✅ Signum validation passed: ${trimmed} -> ${normalized}`);
  
  return {
    isValid: true,
    normalizedSignum: normalized,
    reason: 'Valid Nordic runestone signum'
  };
};

// Helper function to extract country from signum
export const getCountryFromSignum = (signum: string): string => {
  const prefix = signum.split(' ')[0]?.toUpperCase();
  
  const countryMap: Record<string, string> = {
    'DR': 'Danmark',
    'N': 'Norge', 
    'E': 'Estonia',
    'IR': 'Ireland',
    'SC': 'Scotland',
    // Swedish provinces default to Sweden
    'U': 'Sverige',
    'SÖ': 'Sverige',
    'ÖG': 'Sverige',
    'SM': 'Sverige',
    'G': 'Sverige',
    'VG': 'Sverige',
    'HS': 'Sverige',
    'VS': 'Sverige',
    'DG': 'Sverige',
    'NP': 'Sverige',
    'VR': 'Sverige',
    'BO': 'Sverige',
    'BL': 'Sverige',
    'SK': 'Sverige',
    'HL': 'Sverige'
  };
  
  return countryMap[prefix] || 'Sverige'; // Default to Sweden
};

// Helper function to get region/province from signum
export const getRegionFromSignum = (signum: string): string => {
  const prefix = signum.split(' ')[0]?.toUpperCase();
  
  const regionMap: Record<string, string> = {
    'DR': 'Danmark',
    'N': 'Norge',
    'E': 'Estonia', 
    'IR': 'Ireland',
    'SC': 'Scotland',
    'U': 'Uppland',
    'SÖ': 'Södermanland',
    'ÖG': 'Östergötland',
    'SM': 'Småland',
    'G': 'Gotland',
    'VG': 'Västergötland',
    'HS': 'Hälsingland',
    'VS': 'Västmanland',
    'DG': 'Dalarna',
    'NP': 'Närke',
    'VR': 'Värmland',
    'BO': 'Bohuslän',
    'BL': 'Blekinge',
    'SK': 'Skåne',
    'HL': 'Halland'
  };
  
  return regionMap[prefix] || 'Okänd region';
};
