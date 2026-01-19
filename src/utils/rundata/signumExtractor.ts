
import { RundataTable } from './types';

export const extractSignumFromSignaTable = (signaTable: RundataTable): Map<string, string> => {
  const signumMap = new Map<string, string>();
  
  if (!signaTable || !signaTable.data) {
    console.log('No signa table data found');
    return signumMap;
  }
  
  console.log(`Processing ${signaTable.data.length} rows from signa table`);
  
  for (const row of signaTable.data) {
    try {
      const signum1 = row.signum1;
      const signum2 = row.signum2;
      const signumid = row.signumid;
      
      if (signum1 && signum2) {
        const fullSignum = `${signum1} ${signum2}`;
        
        // Store with multiple key formats for better matching
        if (signumid) {
          signumMap.set(signumid.toString(), fullSignum);
          // Also try converting the binary UUID to a more readable format if needed
          if (typeof signumid === 'string' && signumid.startsWith("X'")) {
            const cleanId = signumid.replace(/^X'|'$/g, '');
            signumMap.set(cleanId, fullSignum);
          }
        }
        
        // Also store by the signum parts themselves for direct lookup
        signumMap.set(`${signum1}_${signum2}`, fullSignum);
        signumMap.set(fullSignum, fullSignum); // Direct match
        
        console.log(`Mapped signum: ${fullSignum} with ID: ${signumid}`);
      }
    } catch (error) {
      console.error('Error processing signa row:', error);
    }
  }
  
  console.log(`Extracted ${signumMap.size} signum mappings from signa table`);
  return signumMap;
};

export const lookupSignumByUUID = (uuid: string, signumMap: Map<string, string>): string | null => {
  // Try direct lookup first
  if (signumMap.has(uuid)) {
    return signumMap.get(uuid) || null;
  }
  
  // Clean the UUID string - remove any binary prefixes and quotes
  const cleanUuid = uuid.replace(/^\\x|^X'|'$/g, '').replace(/-/g, '');
  
  // Try to find by partial match or conversion
  for (const [key, value] of signumMap.entries()) {
    const cleanKey = key.replace(/^\\x|^X'|'$/g, '').replace(/-/g, '');
    if (cleanKey.includes(cleanUuid) || cleanUuid.includes(cleanKey) || 
        key.includes(uuid) || uuid.includes(key)) {
      return value;
    }
  }
  
  return null;
};
