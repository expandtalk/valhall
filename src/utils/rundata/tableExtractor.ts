
import { RundataTable } from './types';

export const extractTableDefinition = (lines: string[], startIndex: number): { table: RundataTable; endIndex: number } | null => {
  const line = lines[startIndex];
  
  const tableMatch = line.match(/CREATE TABLE `?([^`\s]+)`?\s*\(/i);
  if (!tableMatch) return null;
  
  const table: RundataTable = {
    name: tableMatch[1],
    columns: [],
    data: []
  };
  
  // Extract column names from CREATE TABLE
  let j = startIndex + 1;
  while (j < lines.length && !lines[j].includes(') ENGINE=') && !lines[j].includes(');')) {
    const colLine = lines[j].trim();
    if (colLine && !colLine.startsWith('PRIMARY') && !colLine.startsWith('UNIQUE') && 
        !colLine.startsWith('KEY') && !colLine.startsWith('CONSTRAINT') && 
        !colLine.startsWith('FOREIGN') && !colLine.includes('ENGINE=')) {
      
      const colMatch = colLine.match(/`?([^`\s]+)`?\s+/);
      if (colMatch && !colLine.includes('KEY') && !colLine.includes('CONSTRAINT')) {
        table.columns.push(colMatch[1]);
      }
    }
    j++;
  }
  
  console.log(`Found table: ${table.name} with columns:`, table.columns);
  return { table, endIndex: j };
};
