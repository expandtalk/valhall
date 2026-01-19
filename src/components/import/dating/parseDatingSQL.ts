
import { MySQLDatingRecord } from './types';

export const parseDatingSQL = (sqlData: string): MySQLDatingRecord[] => {
  const records: MySQLDatingRecord[] = [];
  
  console.log('🔍 Starting to parse dating SQL data...');
  console.log('Raw SQL data preview:', sqlData.substring(0, 500));
  
  // Extract VALUES section more flexibly
  const valuesMatch = sqlData.match(/VALUES\s+([\s\S]*?)(?:;|\s*$)/i);
  
  if (!valuesMatch) {
    console.error('❌ No VALUES section found in SQL data');
    throw new Error('No VALUES section found in SQL data');
  }
  
  const valuesSection = valuesMatch[1];
  console.log('✅ Found VALUES section, length:', valuesSection.length);
  
  // More robust regex to find all value tuples
  const tupleRegex = /\(\s*X'([A-F0-9]{32})'\s*,\s*X'([A-F0-9]{32})'\s*,\s*'([^']+)'\s*,\s*'([^']+)'\s*\)/gi;
  let match;
  let recordCount = 0;
  
  while ((match = tupleRegex.exec(valuesSection)) !== null) {
    const [, hexDatingId, hexObjectId, dating, lang] = match;
    
    console.log(`📝 Processing record ${recordCount + 1}:`, {
      hexDatingId: hexDatingId.substring(0, 16) + '...',
      hexObjectId: hexObjectId.substring(0, 16) + '...',
      dating,
      lang
    });
    
    // Validate hex ID lengths (should be 32 hex chars = 16 bytes)
    if (hexDatingId.length !== 32 || hexObjectId.length !== 32) {
      console.warn(`⚠️ Invalid hex ID length: dating=${hexDatingId.length}, object=${hexObjectId.length}, expected 32`);
      continue;
    }
    
    // Convert MySQL hex to PostgreSQL UUID format
    const datingUuid = [
      hexDatingId.substring(0, 8),
      hexDatingId.substring(8, 12),
      hexDatingId.substring(12, 16),
      hexDatingId.substring(16, 20),
      hexDatingId.substring(20, 32)
    ].join('-').toLowerCase();
    
    const objectUuid = [
      hexObjectId.substring(0, 8),
      hexObjectId.substring(8, 12),
      hexObjectId.substring(12, 16),
      hexObjectId.substring(16, 20),
      hexObjectId.substring(20, 32)
    ].join('-').toLowerCase();
    
    console.log(`🔄 Converted hex IDs to UUIDs: ${datingUuid.substring(0, 20)}... / ${objectUuid.substring(0, 20)}...`);
    
    // Validate language code
    if (!lang || lang.length < 2) {
      console.warn(`⚠️ Invalid language code: ${lang}`);
      continue;
    }
    
    // Validate dating text
    if (!dating || dating.trim().length === 0) {
      console.warn(`⚠️ Empty dating text`);
      continue;
    }
    
    records.push({
      datingid: datingUuid,
      objectid: objectUuid,
      dating: dating.trim(),
      lang: lang
    });
    
    recordCount++;
    console.log(`✅ Added record ${recordCount}: "${dating}" (${datingUuid.substring(0, 8)}...)`);
  }
  
  console.log(`🎉 Successfully parsed ${records.length} dating records`);
  
  if (records.length === 0) {
    throw new Error('No valid records found in the provided data. Please check the format.');
  }
  
  return records;
};
