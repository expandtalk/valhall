
import { RundataTable } from './types';

export const parseSignaValues = (valuesSection: string, table: RundataTable): void => {
  console.log('🔍 Enhanced signa parser for Danish/AUD inscriptions');
  console.log('Values section length:', valuesSection.length);
  console.log('First 300 chars:', valuesSection.substring(0, 300));
  
  // Handle different INSERT formats
  let processableSection = valuesSection;
  
  // If this is a complete INSERT statement, extract the VALUES part
  if (valuesSection.includes('INSERT INTO') && valuesSection.includes('VALUES')) {
    const valuesMatch = valuesSection.match(/VALUES\s*(.*?)(?:;|\s*$)/is);
    if (valuesMatch) {
      processableSection = valuesMatch[1].trim();
      console.log('Extracted VALUES section from complete INSERT statement');
    }
  }
  
  // Remove trailing semicolon if present
  processableSection = processableSection.replace(/;$/, '').trim();
  
  console.log(`🔍 Processing VALUES section for ${table.name}, length: ${processableSection.length}`);
  
  // Enhanced regex to handle multi-line Danish inscription entries
  // Match complete rows including those that span multiple lines
  const completeRowPattern = /\(\s*X'[0-9A-Fa-f]+'\s*,\s*'[^']*'\s*,\s*'[^']*'\s*\)/gs;
  let matches = processableSection.match(completeRowPattern);
  
  if (matches && matches.length > 0) {
    console.log(`✅ Found ${matches.length} complete signa rows`);
    matches.forEach((match, index) => {
      try {
        parseSignaRow(match, table);
        if (index % 10 === 0) {
          console.log(`📊 Processed ${index + 1}/${matches.length} signa rows`);
        }
      } catch (error) {
        console.error(`❌ Error parsing signa row ${index}:`, error);
      }
    });
    
    if (table.data.length > 0) {
      console.log(`✅ Successfully parsed ${table.data.length} signa rows`);
      return;
    }
  }
  
  // Fallback: try to reconstruct incomplete rows
  console.log('🔄 Attempting to reconstruct incomplete rows...');
  
  // Split by lines and try to reconstruct complete entries
  const lines = processableSection.split(/[\n\r]+/);
  let currentEntry = '';
  let processedCount = 0;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    // Start of a new entry
    if (trimmedLine.startsWith('(X\'')) {
      // Process previous entry if complete
      if (currentEntry && currentEntry.includes('),')) {
        try {
          const entryToProcess = currentEntry.replace(/,$/, '') + ')';
          parseSignaRow(entryToProcess, table);
          processedCount++;
        } catch (error) {
          console.warn('Could not parse reconstructed entry:', currentEntry.substring(0, 50));
        }
      }
      currentEntry = trimmedLine;
    } else if (currentEntry) {
      // Continue building current entry
      currentEntry += ' ' + trimmedLine;
    }
  }
  
  // Process the last entry
  if (currentEntry) {
    try {
      let entryToProcess = currentEntry.replace(/,$/, '');
      if (!entryToProcess.endsWith(')')) {
        entryToProcess += ')';
      }
      parseSignaRow(entryToProcess, table);
      processedCount++;
    } catch (error) {
      console.warn('Could not parse final entry:', currentEntry.substring(0, 50));
    }
  }
  
  console.log(`✅ Reconstructed and processed ${processedCount} entries`);
};

export const parseSignaRow = (rowStr: string, table: RundataTable): void => {
  // Clean the row string
  let content = rowStr.replace(/^\(/, '').replace(/\)$/, '').replace(/,$/, '').trim();
  
  console.log('🔍 Parsing signa row content:', content.substring(0, 100));
  
  // Enhanced parsing for the three-field structure: signumid, signum1, signum2
  // Pattern: X'UUID','DR','AUD1988;205D'
  
  const parts: string[] = [];
  let inQuotes = false;
  let currentPart = '';
  let i = 0;
  
  while (i < content.length) {
    const char = content[i];
    
    if (char === "'" && (i === 0 || content[i-1] !== '\\')) {
      inQuotes = !inQuotes;
      currentPart += char;
    } else if (char === ',' && !inQuotes) {
      parts.push(currentPart.trim());
      currentPart = '';
    } else {
      currentPart += char;
    }
    i++;
  }
  
  // Add the last part
  if (currentPart.trim()) {
    parts.push(currentPart.trim());
  }
  
  if (parts.length >= 3) {
    // Extract binary UUID (first part)
    const signumid = parts[0];
    
    // Extract signum1 (second part) - remove quotes
    const signum1 = parts[1].replace(/^'|'$/g, '');
    
    // Extract signum2 (third part) - remove quotes  
    const signum2 = parts[2].replace(/^'|'$/g, '');
    
    const rowData = {
      signumid: signumid,
      signum1: signum1,
      signum2: signum2
    };
    
    table.data.push(rowData);
    console.log(`✅ Successfully parsed signa row: ${signum1} ${signum2}`);
  } else {
    console.warn('⚠️ Could not parse signa row - insufficient parts:', parts.length, 'from:', rowStr.substring(0, 100));
  }
};
