
export interface ParsedFornfyndEntry {
  l_number: string;
  raa_number?: string;
  cultural_classification: string;
  published_by?: string;
  published_date?: string;
  county: string;
  municipality: string;
  landscape: string;
  parish: string;
  object_type: string;
  location_description?: string;
  description: string;
  coordinates_sweref99?: {
    north: number;
    east: number;
  };
  measurement_method?: string;
  measurement_accuracy?: string;
  damage_level?: string;
  investigation_status?: string;
  antiquarian_comment?: string;
  transliteration?: string;
  height_above_sea?: string;
  terrain_description?: string;
  vegetation?: string;
  last_field_visit?: string;
}

export const convertSWEREF99ToWGS84 = (north: number, east: number): { lat: number, lng: number } => {
  // Simplified conversion from SWEREF 99 TM to WGS84
  // This is an approximation - for production use a proper projection library
  const lat = (north - 6100000) / 111320 + 55.0;
  const lng = (east - 500000) / 111320 * Math.cos(lat * Math.PI / 180) + 15.0;
  return { lat, lng };
};

export const parseFornfyndData = (data: string): ParsedFornfyndEntry[] => {
  const entries: ParsedFornfyndEntry[] = [];
  
  // Split into individual entries (each starting with L-number)
  const entryBlocks = data.split(/(?=L\d{4}:\d+)/).filter(block => block.trim());
  
  for (const block of entryBlocks) {
    const lines = block.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length === 0) continue;
    
    // Extract L-number from first line
    const lNumberMatch = lines[0].match(/(L\d{4}:\d+)/);
    if (!lNumberMatch) continue;
    
    const entry: ParsedFornfyndEntry = {
      l_number: lNumberMatch[1],
      cultural_classification: '',
      county: '',
      municipality: '',
      landscape: '',
      parish: '',
      object_type: '',
      description: ''
    };

    let i = 0;

    while (i < lines.length) {
      const line = lines[i];
      
      // Check for section headers
      if (line === 'Runristning' || line.includes('Runristning')) {
        entry.object_type = 'Runristning';
      } else if (line === 'Övrig kulturhistorisk lämning' || line === 'Fornlämning') {
        entry.cultural_classification = line;
      } else if (line.startsWith('Publicerad av')) {
        const match = line.match(/Publicerad av (.+): (.+)/);
        if (match) {
          entry.published_by = match[1];
          entry.published_date = match[2];
        }
      } else if (line === 'Län') {
        i++;
        if (i < lines.length) entry.county = lines[i];
      } else if (line === 'Kommun') {
        i++;
        if (i < lines.length) entry.municipality = lines[i];
      } else if (line === 'Landskap') {
        i++;
        if (i < lines.length) entry.landscape = lines[i];
      } else if (line === 'Socken') {
        i++;
        if (i < lines.length) entry.parish = lines[i];
      } else if (line === 'Belägenhet:') {
        i++;
        if (i < lines.length) entry.location_description = lines[i];
      } else if (line === 'Beskrivning av lämning') {
        i++;
        if (i < lines.length) {
          entry.description = lines[i];
          // Extract transliteration from description if present
          const runeMatch = lines[i].match(/([A-ZÅÄÖÞÐᚠ-ᛟ\s]+)\s*\(i runor\)/i);
          if (runeMatch) {
            entry.transliteration = runeMatch[1].trim();
          }
        }
      } else if (line === 'Antikvarisk kommentar') {
        i++;
        if (i < lines.length) entry.antiquarian_comment = lines[i];
      } else if (line === 'Grad av skada') {
        i++;
        if (i < lines.length) entry.damage_level = lines[i];
      } else if (line === 'Undersökningsstatus') {
        i++;
        if (i < lines.length) entry.investigation_status = lines[i];
      } else if (line.startsWith('Centrumkoordinater (SWEREF 99 TM N,E)')) {
        i++;
        if (i < lines.length) {
          const coordMatch = lines[i].match(/N\s*(\d+),\s*E\s*(\d+)/);
          if (coordMatch) {
            entry.coordinates_sweref99 = {
              north: parseInt(coordMatch[1]),
              east: parseInt(coordMatch[2])
            };
          }
        }
      } else if (line === 'Mätmetod') {
        i++;
        if (i < lines.length) entry.measurement_method = lines[i];
      } else if (line === 'Höjd över havet') {
        i++;
        if (i < lines.length) entry.height_above_sea = lines[i];
      } else if (line === 'Datum för senaste fältbesök') {
        i++;
        if (i < lines.length) entry.last_field_visit = lines[i];
      } else if (line === 'Terräng kring lämning') {
        i++;
        if (i < lines.length) entry.terrain_description = lines[i];
      } else if (line === 'Vegetation på lämning') {
        i++;
        if (i < lines.length) entry.vegetation = lines[i];
      }
      
      i++;
    }

    // Only add if we have essential data
    if (entry.l_number && entry.object_type === 'Runristning') {
      entries.push(entry);
    }
  }
  
  return entries;
};
