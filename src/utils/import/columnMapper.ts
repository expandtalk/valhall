/**
 * Universal column mapper for converting MySQL/Rundata column names to Supabase column names
 * This handles the mismatches between source data and target database schema
 */

// Helper function to convert MySQL hex binary format to UUID
export const convertHexToUUID = (hex: string): string => {
  if (!hex) return hex;
  
  // Remove X' prefix and ' suffix if present
  let cleanHex = hex.trim();
  if (cleanHex.startsWith("X'")) {
    cleanHex = cleanHex.replace(/X'|'/g, '');
  } else if (cleanHex.startsWith('X')) {
    cleanHex = cleanHex.substring(1);
  }
  
  // If it's already in UUID format, return as is
  if (cleanHex.includes('-')) {
    return cleanHex.toLowerCase();
  }
  
  // Convert 32-char hex to UUID format
  if (cleanHex.length === 32) {
    return `${cleanHex.slice(0, 8)}-${cleanHex.slice(8, 12)}-${cleanHex.slice(12, 16)}-${cleanHex.slice(16, 20)}-${cleanHex.slice(20)}`.toLowerCase();
  }
  
  return cleanHex;
};

// Helper function to convert hex to bytea format
export const convertHexToBytea = (hex: string): string => {
  if (!hex) return hex;
  
  let cleanHex = hex.trim();
  if (cleanHex.startsWith("X'")) {
    cleanHex = cleanHex.replace(/X'|'/g, '');
  } else if (cleanHex.startsWith('X')) {
    cleanHex = cleanHex.substring(1);
  }
  
  if (cleanHex.length === 0) return '';
  return `\\x${cleanHex.toLowerCase()}`;
};

// Column mapping definitions for each table
export const TABLE_COLUMN_MAPPINGS: { [tableName: string]: { [sourceColumn: string]: string } } = {
  carvers: {
    carver: 'name',
    carverid: 'id'
  },
  
  coordinates: {
    coordinateid: 'coordinate_id',
    objectid: 'object_id'
  },
  
  crosses: {
    cross: 'cross_number'
  },
  
  crossforms: {
    form: 'form',
    aspect: 'aspect'
  },
  
  dating: {
    objectid: 'objectid',
    dating: 'dating'
  },
  
  dating_source: {
    datingid: 'dating_id',
    sourceid: 'source_id'
  },
  
  findnumbers: {
    objectid: 'objectid',
    findnumber: 'findnumber'
  },
  
  groups: {
    groupid: 'groupid',
    type: 'type',
    notes: 'notes',
    lang: 'lang'
  },
  
  hundreds: {
    hundredid: 'external_id',
    hundred: 'name',
    provinceid: 'province_external_id',
    divisionid: 'division_external_id'
  },
  
  her_dk_notes: {
    her_DK_notesid: 'external_id',
    objectid: 'object_id',
    her_DKid: 'her_dk_id',
    notes: 'notes',
    lang: 'lang'
  },
  
  sources: {
    sourceid: 'sourceid',
    title: 'title',
    author: 'author',
    year: 'publication_year',
    abbreviation: 'notes',
    notes: 'notes',
    source_type: 'source_type',
    isbn: 'isbn',
    url: 'url',
    publisher: 'publisher'
  },
  
  translations: {
    translationid: 'translationid',
    inscriptionid: 'inscriptionid',
    translation: 'translation',
    text: 'text',
    teitext: 'teitext',
    language: 'language'
  },

  // Additional tables found in network requests
  languages: {
    languageid: 'id',  // Map to id instead of languageid
    language: 'language_code',
    sv: 'name_sv', 
    en: 'name_en'
  },

  locations: {
    // Remove lang mapping since locations table doesn't have lang column
    objectid: 'object_id',
    location: 'location'
  },

  object_source: {
    objectid: 'objectid',
    sourceid: 'sourceid'
  },

  reading_source: {
    readingid: 'reading_id',  // Map to reading_id which exists in dating_source table format
    sourceid: 'source_id'
  },

  // Skip tables that don't exist in Supabase
  materials: null,
  materialsubtypes: null,
  periods: null,
  places: null,
  parishes: null,
  place_parish: null,
  provinces: null,
  objects: null,
  originallocations: null,
  object_bracteatetype: null,
  object_group: null,
  object_her_DK: null,
  object_her_GB_SCT: null,
  object_her_NO: null,
  object_her_SE: null,
  object_material: null,
  object_style: null,
  object_uri: null
};

// UUID fields that need hex conversion
export const UUID_FIELDS = [
  'carverid', 'inscriptionid', 'objectid', 'datingid', 'groupid', 'sourceid',
  'translationid', 'materialid', 'subtypeid', 'crossid', 'crossformid',
  'her_SEid', 'her_SEparishid', 'her_DKid', 'her_NOid', 'id', 'object_id',
  'reading_id', 'source_id', 'dating_id', 'readingid', 'languageid',
  'placeid', 'parishid'
];

// Bytea fields that need hex conversion  
export const BYTEA_FIELDS = [
  'signumid', 'materialtypeid', 'municipalityid', 'countyid', 'countryid',
  'imagelinkid', 'hundredid', 'provinceid', 'divisionid', 'bracteatetypeid',
  'artefactid', 'her_DK_notesid', 'external_id', 'province_external_id',
  'division_external_id', 'her_dk_id', 'toraid'
];

/**
 * Maps source column names to target column names for a specific table
 */
export const mapColumnNames = (tableName: string, sourceData: any): any => {
  const mapping = TABLE_COLUMN_MAPPINGS[tableName.toLowerCase()];
  if (!mapping) {
    console.log(`No column mapping defined for table: ${tableName}, using source data as-is`);
    return sourceData;
  }
  
  // If mapping is null, the table should be skipped
  if (mapping === null) {
    console.log(`Table ${tableName} is marked to be skipped`);
    return null;
  }
  
  const mapped: any = {};
  
  // Map each field according to the mapping table
  for (const [sourceKey, targetKey] of Object.entries(mapping)) {
    if (sourceData[sourceKey] !== undefined) {
      mapped[targetKey] = sourceData[sourceKey];
    }
  }
  
  // Copy unmapped fields as-is
  for (const [key, value] of Object.entries(sourceData)) {
    if (!Object.keys(mapping).includes(key)) {
      mapped[key] = value;
    }
  }
  
  return mapped;
};

/**
 * Converts hex fields to appropriate format (UUID or bytea) for a record
 */
export const convertHexFields = (tableName: string, record: any): any => {
  const converted = { ...record };
  
  // Convert UUID fields
  for (const field of UUID_FIELDS) {
    if (converted[field]) {
      converted[field] = convertHexToUUID(converted[field]);
    }
  }
  
  // Convert bytea fields
  for (const field of BYTEA_FIELDS) {
    if (converted[field]) {
      converted[field] = convertHexToBytea(converted[field]);
    }
  }
  
  return converted;
};

/**
 * Complete transformation pipeline for a table's data
 */
export const transformTableData = (tableName: string, records: any[]): any[] | null => {
  console.log(`🔄 Transforming ${records.length} records for table: ${tableName}`);
  
  // Check if table should be skipped first
  const mapping = TABLE_COLUMN_MAPPINGS[tableName.toLowerCase()];
  if (mapping === null) {
    console.log(`⏭️ Skipping table ${tableName} - marked as null in mappings`);
    return null;
  }
  
  return records.map(record => {
    // Step 1: Map column names
    const mapped = mapColumnNames(tableName, record);
    
    // If mapping returned null, skip this record
    if (mapped === null) {
      return null;
    }
    
    // Step 2: Convert hex fields
    const converted = convertHexFields(tableName, mapped);
    
    return converted;
  }).filter(record => record !== null);
};