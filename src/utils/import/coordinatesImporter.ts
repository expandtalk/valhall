
import { supabase } from "@/integrations/supabase/client";

export interface MySQLCoordinateRecord {
  coordinateid: string;
  objectid: string;
  current: number;
  latitude: number;
  longitude: number;
}

// Function to convert MySQL binary UUID to standard UUID format
const convertBinaryUUID = (binaryUUID: string): string => {
  // Remove X' prefix and ' suffix if present
  const hexString = binaryUUID.replace(/^X'/, '').replace(/'$/, '');
  
  // Convert hex string to UUID format (8-4-4-4-12)
  if (hexString.length === 32) {
    return [
      hexString.substring(0, 8),
      hexString.substring(8, 12),
      hexString.substring(12, 16),
      hexString.substring(16, 20),
      hexString.substring(20, 32)
    ].join('-').toLowerCase();
  }
  
  // If already in UUID format, return as-is
  return hexString.toLowerCase();
};

export const importCoordinates = async (coordinates: MySQLCoordinateRecord[]): Promise<{
  success: number;
  errors: number;
  updated: number;
  errorMessages: string[];
}> => {
  console.log(`Starting import of ${coordinates.length} coordinates...`);
  
  let success = 0;
  let errors = 0;
  let updated = 0;
  const errorMessages: string[] = [];
  
  for (const coord of coordinates) {
    try {
      console.log(`Processing coordinate ${coord.coordinateid}...`);
      
      // Convert binary UUIDs to standard format
      const coordinateId = convertBinaryUUID(coord.coordinateid);
      const objectId = convertBinaryUUID(coord.objectid);
      
      // Check if coordinate already exists
      const { data: existingCoord, error: findError } = await supabase
        .from('coordinates')
        .select('id')
        .eq('object_id', objectId)
        .eq('current_flag', coord.current)
        .limit(1);
      
      if (findError) {
        console.error(`Error checking existing coordinate for object ${objectId}:`, findError);
        errors++;
        errorMessages.push(`Coordinate ${coordinateId}: Error checking existing data - ${findError.message}`);
        continue;
      }
      
      const coordinateData = {
        coordinate_id: coordinateId,
        object_id: objectId,
        current_flag: coord.current,
        latitude: coord.latitude,
        longitude: coord.longitude
      };
      
      if (existingCoord && existingCoord.length > 0) {
        // Update existing coordinate
        const { error: updateError } = await supabase
          .from('coordinates')
          .update(coordinateData)
          .eq('object_id', objectId)
          .eq('current_flag', coord.current);
        
        if (updateError) {
          console.error(`Error updating coordinate for object ${objectId}:`, updateError);
          errors++;
          errorMessages.push(`Coordinate ${coordinateId}: ${updateError.message}`);
        } else {
          console.log(`Successfully updated coordinate for object ${objectId}`);
          updated++;
        }
      } else {
        // Insert new coordinate
        const { error: insertError } = await supabase
          .from('coordinates')
          .insert(coordinateData);
        
        if (insertError) {
          console.error(`Error inserting coordinate for object ${objectId}:`, insertError);
          errors++;
          errorMessages.push(`Coordinate ${coordinateId}: ${insertError.message}`);
        } else {
          console.log(`Successfully imported coordinate for object ${objectId}`);
          success++;
        }
      }
      
    } catch (error) {
      console.error(`Exception processing coordinate ${coord.coordinateid}:`, error);
      errors++;
      errorMessages.push(`Coordinate ${coord.coordinateid}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  console.log(`Coordinate import completed: ${success} new, ${updated} updated, ${errors} errors`);
  
  return {
    success,
    errors,
    updated,
    errorMessages
  };
};

export const parseCoordinatesSQL = (sqlData: string): MySQLCoordinateRecord[] => {
  const coordinates: MySQLCoordinateRecord[] = [];
  
  console.log('Parsing coordinates SQL data, length:', sqlData.length);
  
  // More flexible approach - look for VALUES section and parse line by line
  const valuesMatch = sqlData.match(/VALUES\s*([\s\S]*)/i);
  
  if (!valuesMatch) {
    console.warn('No VALUES statement found in SQL data');
    return coordinates;
  }
  
  const valuesSection = valuesMatch[1];
  console.log('Found VALUES section, length:', valuesSection.length);
  
  // Split into lines and process each potential coordinate entry
  const lines = valuesSection.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines, comments, or lines that don't contain coordinate data
    if (!trimmedLine || trimmedLine.startsWith('--') || !trimmedLine.includes('X\'')) {
      continue;
    }
    
    // Updated regex to be more flexible with whitespace and handle your exact format
    const tupleMatch = trimmedLine.match(/\(\s*X'([A-F0-9]+)'\s*,\s*X'([A-F0-9]+)'\s*,\s*(\d+)\s*,\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/i);
    
    if (tupleMatch) {
      const [, coordinateid, objectid, current, latitude, longitude] = tupleMatch;
      
      console.log(`Parsed coordinate: ${coordinateid.substring(0, 8)}...`);
      
      coordinates.push({
        coordinateid: coordinateid,
        objectid: objectid,
        current: parseInt(current),
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      });
    } else {
      // Try to identify why the line didn't match for debugging
      if (trimmedLine.includes('(') && trimmedLine.includes('X\'')) {
        console.log('Line did not match regex:', trimmedLine.substring(0, 100), '...');
      }
    }
  }
  
  console.log(`Successfully parsed ${coordinates.length} coordinates from SQL data`);
  return coordinates;
};
