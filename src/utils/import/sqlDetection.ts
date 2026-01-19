
export const isRundataSQL = (data: string): boolean => {
  const rundataTableIndicators = [
    'CREATE TABLE `inscriptions`',
    'CREATE TABLE `signa`',
    'CREATE TABLE `objects`',
    'CREATE TABLE `readings`',
    'CREATE TABLE `places`',
    'CREATE TABLE `coordinates`',
    'CREATE TABLE `periods`',
    'CREATE TABLE `translations`',
    'CREATE TABLE `interpretations`', // Added interpretations table detection
    'CREATE TABLE `her_DK`', // Danish administrative table
    // More specific patterns for the signa table structure
    'signumid',
    'signum1',
    'signum2',
    'binary(16)',
    'CHARSET utf8mb4',
    'COLLATE utf8mb4_swedish_ci',
    // Specific INSERT patterns - improved detection for Danish inscriptions
    'INSERT INTO `signa`',
    'INSERT INTO `interpretations`', // Added interpretations INSERT detection
    'VALUES',
    "X'"  // Binary UUID pattern
  ];
  
  // Check for interpretations table specific pattern
  const hasInterpretationsTable = data.includes('CREATE TABLE `interpretations`');
  const hasInterpretationsInsert = data.includes('INSERT INTO `interpretations`');
  
  // Check for signa table specific pattern more reliably
  const hasSignaTable = data.includes('CREATE TABLE `signa`');
  const hasSignaInsert = data.includes('INSERT INTO `signa`');
  const hasBinaryUUID = data.includes("X'") && (data.includes('DR') || data.includes('binary(16)'));
  
  // Enhanced detection for Danish inscriptions and complex XML content
  const hasDanishInscriptions = data.includes("'DR'") && data.includes("X'");
  const hasComplexXMLContent = data.includes('<name>') && data.includes('</name>');
  
  console.log(`🔍 Rundata detection - hasSignaTable: ${hasSignaTable}, hasSignaInsert: ${hasSignaInsert}, hasBinaryUUID: ${hasBinaryUUID}, hasDanishInscriptions: ${hasDanishInscriptions}, hasInterpretationsTable: ${hasInterpretationsTable}, hasComplexXMLContent: ${hasComplexXMLContent}`);
  
  if (hasSignaTable || hasSignaInsert || hasBinaryUUID || hasDanishInscriptions || hasInterpretationsTable || hasInterpretationsInsert || hasComplexXMLContent) {
    console.log('✅ Detected Rundata SQL by comprehensive table patterns including interpretations');
    return true;
  }
  
  const matchCount = rundataTableIndicators.filter(indicator => data.includes(indicator)).length;
  console.log(`🔍 Found ${matchCount} Rundata indicators`);
  
  return matchCount >= 3; // Require at least 3 indicators for confidence
};

export const isSQLStructureCommand = (line: string): boolean => {
  const trimmedLine = line.trim().toUpperCase();
  
  const structureKeywords = [
    'CREATE', 'DROP', 'ALTER', 'GRANT', 'REVOKE', 
    'INDEX', 'CONSTRAINT', 'FOREIGN KEY', 'PRIMARY KEY', 'REFERENCES',
    'ENGINE=', 'CHARSET=', 'COLLATE=', 'AUTO_INCREMENT=',
    'LOCK TABLES', 'UNLOCK TABLES', 'SET FOREIGN_KEY_CHECKS',
    'DISABLE KEYS', 'ENABLE KEYS'
  ];
  
  for (const keyword of structureKeywords) {
    if (trimmedLine.startsWith(keyword) || trimmedLine.includes(keyword)) {
      return true;
    }
  }
  
  if (trimmedLine.startsWith('--') || 
      trimmedLine.startsWith('/*') || 
      trimmedLine.startsWith('*/') ||
      trimmedLine.startsWith('#') ||
      trimmedLine.startsWith('COMMENT')) {
    return true;
  }
  
  if (trimmedLine === ';' || 
      trimmedLine === 'GO' || 
      (trimmedLine.endsWith(');') && trimmedLine.length < 50 && !trimmedLine.includes('VALUES'))) {
    return true;
  }
  
  if (trimmedLine.includes('VARCHAR') || 
      trimmedLine.includes('INTEGER') || 
      trimmedLine.includes('TIMESTAMP') ||
      trimmedLine.includes('BINARY') ||
      trimmedLine.includes('TINYINT') ||
      trimmedLine.includes('TEXT') ||
      trimmedLine.includes('BOOLEAN')) {
    return true;
  }
  
  return false;
};
