/**
 * Swedish alphabetical sorting utility
 * Ensures Å, Ä, Ö are placed at the end of the alphabet
 */

const SWEDISH_ALPHABET_ORDER = 'abcdefghijklmnopqrstuvwxyzåäö';

export const createSwedishCollator = () => {
  // Try to use Swedish locale if available, fallback to custom sorting
  try {
    return new Intl.Collator('sv-SE', { 
      sensitivity: 'base',
      numeric: true,
      caseFirst: 'lower'
    });
  } catch {
    return null;
  }
};

export const swedishSort = (a: string, b: string): number => {
  const collator = createSwedishCollator();
  
  if (collator) {
    return collator.compare(a, b);
  }
  
  // Fallback: custom Swedish sorting
  const normalizeForSwedishSort = (str: string): string => {
    return str.toLowerCase()
      .replace(/å/g, 'z{') // Å comes after Z
      .replace(/ä/g, 'z|') // Ä comes after Å  
      .replace(/ö/g, 'z}'); // Ö comes after Ä
  };
  
  const normalizedA = normalizeForSwedishSort(a);
  const normalizedB = normalizeForSwedishSort(b);
  
  return normalizedA.localeCompare(normalizedB);
};

export const sortArraySwedish = <T>(
  array: T[], 
  keyExtractor?: (item: T) => string
): T[] => {
  return [...array].sort((a, b) => {
    const stringA = keyExtractor ? keyExtractor(a) : String(a);
    const stringB = keyExtractor ? keyExtractor(b) : String(b);
    return swedishSort(stringA, stringB);
  });
};

// For React components - sort options for select dropdowns etc.
export const sortSelectOptions = (options: { value: string; label: string }[]) => {
  return sortArraySwedish(options, (option) => option.label);
};

// ✅ Specialized signum sorting for runic inscriptions using primary_signum
export const parseSignum = (signum: string): { prefix: string; number: number; suffix: string } => {
  if (!signum) return { prefix: '', number: 0, suffix: '' };
  
  // Normalisera whitespace och göra uppercase
  const normalized = signum.trim().toUpperCase().replace(/\s+/g, ' ');
  
  // Matcha format som "G 123", "SÖ 45", "ÖG 136" etc
  const match = normalized.match(/^([A-ZÄÖÅ]+)\s*(\d+)(.*)$/);
  
  if (match) {
    return {
      prefix: match[1],
      number: parseInt(match[2], 10),
      suffix: match[3] || ''
    };
  }
  
  // Fallback för icke-standard format
  return { prefix: normalized, number: 0, suffix: '' };
};

export const signumSort = (a: string, b: string): number => {
  const parsedA = parseSignum(a);
  const parsedB = parseSignum(b);
  
  // Sortera först på prefix (landskod)
  const prefixCompare = swedishSort(parsedA.prefix, parsedB.prefix);
  if (prefixCompare !== 0) return prefixCompare;
  
  // Sedan på nummer (numeriskt)
  const numberCompare = parsedA.number - parsedB.number;
  if (numberCompare !== 0) return numberCompare;
  
  // Slutligen på suffix
  return swedishSort(parsedA.suffix, parsedB.suffix);
};

// ✅ Sort inscriptions by primary_signum with proper numerical ordering
export const sortInscriptionsBySignum = <T extends { signum?: string; primary_signum?: string; alternative_signum?: string[] }>(
  inscriptions: T[]
): T[] => {
  return [...inscriptions].sort((a, b) => {
    // ✅ PRIORITERA primary_signum för korrekt numerisk sortering (G1, G2, G3 inte G1, G10, G11)
    const signumA = a.primary_signum || a.signum || '';
    const signumB = b.primary_signum || b.signum || '';
    return signumSort(signumA, signumB);
  });
};