
// Helper function to compare binary UUIDs
export const compareUUIDs = (uuid1: any, uuid2: any): boolean => {
  if (!uuid1 || !uuid2) return false;
  
  // Convert both to strings for comparison
  const str1 = uuid1.toString();
  const str2 = uuid2.toString();
  
  return str1 === str2;
};

// Helper function to extract values from row data
export const extractValue = (row: Record<string, any>, possibleKeys: string[]): string => {
  for (const key of possibleKeys) {
    if (row[key] !== undefined && row[key] !== null && typeof row[key] === 'string' && 
        !row[key].startsWith('X\'')) {
      return String(row[key]);
    }
  }
  return '';
};
