
export const parseComplexRows = (valuesSection: string): string[] => {
  const rows: string[] = [];
  let currentRow = '';
  let inQuotes = false;
  let quoteChar = '';
  let parenthesesDepth = 0;
  let i = 0;

  // Clean the values section first
  const cleanedSection = valuesSection.trim();
  
  while (i < cleanedSection.length) {
    const char = cleanedSection[i];
    const nextChar = i + 1 < cleanedSection.length ? cleanedSection[i + 1] : '';
    const prevChar = i > 0 ? cleanedSection[i - 1] : '';

    // Handle quotes with better escape sequence handling
    if ((char === '"' || char === "'") && !inQuotes && prevChar !== '\\') {
      inQuotes = true;
      quoteChar = char;
      currentRow += char;
    } else if (char === quoteChar && inQuotes) {
      // Check for escaped quotes - look for odd number of preceding backslashes
      let backslashCount = 0;
      let checkPos = i - 1;
      while (checkPos >= 0 && cleanedSection[checkPos] === '\\') {
        backslashCount++;
        checkPos--;
      }
      
      if (backslashCount % 2 === 0) {
        // Even number of backslashes (including 0) means quote is not escaped
        inQuotes = false;
        quoteChar = '';
        currentRow += char;
      } else {
        // Odd number of backslashes means quote is escaped
        currentRow += char;
      }
    } else if (inQuotes) {
      currentRow += char;
    } else {
      // Not in quotes
      if (char === '(') {
        parenthesesDepth++;
        currentRow += char;
      } else if (char === ')') {
        parenthesesDepth--;
        currentRow += char;
        
        // If we've closed all parentheses, we might have a complete row
        if (parenthesesDepth === 0 && currentRow.trim()) {
          // Look ahead to see if we have a comma or end of string
          let nextIndex = i + 1;
          while (nextIndex < cleanedSection.length && /\s/.test(cleanedSection[nextIndex])) {
            nextIndex++;
          }
          
          if (nextIndex >= cleanedSection.length || cleanedSection[nextIndex] === ',') {
            // This is the end of a row
            rows.push(currentRow.trim());
            currentRow = '';
            
            // Skip the comma if present
            if (nextIndex < cleanedSection.length && cleanedSection[nextIndex] === ',') {
              i = nextIndex;
            }
          }
        }
      } else if (char === ',' && parenthesesDepth === 0) {
        // This comma is between rows, not within a row
        if (currentRow.trim()) {
          rows.push(currentRow.trim());
          currentRow = '';
        }
      } else {
        currentRow += char;
      }
    }
    
    i++;
  }

  // Add the last row if there is one
  if (currentRow.trim()) {
    rows.push(currentRow.trim());
  }

  console.log(`parseComplexRows: Found ${rows.length} rows in VALUES section`);
  
  // Log first few rows for debugging
  rows.slice(0, 2).forEach((row, index) => {
    console.log(`Row ${index}: ${row.substring(0, 150)}${row.length > 150 ? '...' : ''}`);
  });

  return rows;
};

export const parseRowValues = (rowStr: string): any[] => {
  // Remove outer parentheses
  let content = rowStr.trim();
  if (content.startsWith('(') && content.endsWith(')')) {
    content = content.slice(1, -1);
  }

  const values: any[] = [];
  let currentValue = '';
  let inQuotes = false;
  let quoteChar = '';
  let bracketDepth = 0;
  let i = 0;

  console.log(`parseRowValues: Processing row content: ${content.substring(0, 100)}...`);

  while (i < content.length) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';

    // Handle quotes with better escape sequence handling
    if ((char === '"' || char === "'") && !inQuotes && prevChar !== '\\') {
      // Only treat as a quoted string if it's the start of a value.
      // This prevents incorrect stripping of quotes from values like X'...'
      if (currentValue.trim() === '') {
        inQuotes = true;
        quoteChar = char;
        // Don't include the opening quote in the value for cleaner output
      } else {
        currentValue += char;
      }
    } else if (char === quoteChar && inQuotes) {
      // Check for escaped quotes
      let backslashCount = 0;
      let checkPos = i - 1;
      while (checkPos >= 0 && content[checkPos] === '\\') {
        backslashCount++;
        checkPos--;
      }
      
      if (backslashCount % 2 === 0) {
        // Quote is not escaped, end of quoted value
        inQuotes = false;
        quoteChar = '';
        // Don't include the closing quote in the value for cleaner output
      } else {
        // Quote is escaped, include it in the value
        currentValue += char;
      }
    } else if (inQuotes) {
      // Inside quotes, handle special XML characters and structures
      if (char === '<') {
        bracketDepth++;
        currentValue += char;
      } else if (char === '>') {
        bracketDepth--;
        currentValue += char;
      } else {
        currentValue += char;
      }
    } else if (char === ',' && !inQuotes && bracketDepth === 0) {
      // End of value - not inside quotes or XML tags
      values.push(parseValue(currentValue.trim()));
      currentValue = '';
    } else {
      currentValue += char;
    }

    i++;
  }

  // Add the last value
  if (currentValue.trim() || values.length === 0) {
    values.push(parseValue(currentValue.trim()));
  }

  console.log(`parseRowValues: Extracted ${values.length} values`);
  values.forEach((val, idx) => {
    if (typeof val === 'string' && val.length > 50) {
      console.log(`Value ${idx}: ${val.substring(0, 50)}... (${val.length} chars)`);
    } else {
      console.log(`Value ${idx}: ${val}`);
    }
  });

  return values;
};

const parseValue = (value: string): any => {
  const trimmed = value.trim();
  
  // Handle NULL
  if (trimmed.toUpperCase() === 'NULL') {
    return null;
  }
  
  // Handle binary values (like X'...')
  if (trimmed.match(/^X'[0-9A-Fa-f]*'$/i)) {
    return trimmed;
  }
  
  // Handle enum values in single quotes (like 'P', 'FVN', etc.)
  if (trimmed.startsWith("'") && trimmed.endsWith("'") && trimmed.length <= 10 && !trimmed.includes('<')) {
    return trimmed.slice(1, -1); // Remove quotes for enum values
  }
  
  // For complex text content (XML, long text), preserve as-is without outer quotes
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    // Remove outer quotes and preserve XML content
    let unquoted = trimmed.slice(1, -1);
    
    // Only unescape if it doesn't contain XML tags
    if (!unquoted.includes('<') || !unquoted.includes('>')) {
      unquoted = unquoted
        .replace(/\\"/g, '"')
        .replace(/\\'/g, "'")
        .replace(/\\\\/g, '\\');
    }
    
    return unquoted;
  }
  
  // Handle numbers
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return trimmed.includes('.') ? parseFloat(trimmed) : parseInt(trimmed, 10);
  }
  
  // Return as string for anything else
  return trimmed;
};
