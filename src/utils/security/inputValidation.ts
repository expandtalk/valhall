/**
 * Input validation and sanitization utilities for security
 */

// Dangerous SQL keywords that should be blocked in user input
const DANGEROUS_SQL_KEYWORDS = [
  'DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'EXEC', 'EXECUTE', 
  'UNION', 'INSERT', 'UPDATE', 'CREATE', 'GRANT', 'REVOKE',
  'DECLARE', 'CAST', 'CONVERT', 'SCRIPT', 'EVAL', 'EXPRESSION'
];

// Dangerous characters that could be used for SQL injection
const DANGEROUS_CHARACTERS = [';', '--', '/*', '*/', 'xp_', 'sp_'];

/**
 * Sanitizes text input by removing potentially dangerous content
 */
export const sanitizeTextInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove control characters and normalize whitespace
  let sanitized = input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Remove control chars
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  // HTML encode dangerous characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  
  return sanitized;
};

/**
 * Validates that text doesn't contain SQL injection attempts
 */
export const validateSQLSafety = (input: string): { isValid: boolean; reason?: string } => {
  if (!input || typeof input !== 'string') {
    return { isValid: true };
  }
  
  const upperInput = input.toUpperCase();
  
  // Check for dangerous SQL keywords
  for (const keyword of DANGEROUS_SQL_KEYWORDS) {
    if (upperInput.includes(keyword)) {
      return { 
        isValid: false, 
        reason: `Contains potentially dangerous SQL keyword: ${keyword}` 
      };
    }
  }
  
  // Check for dangerous character sequences
  for (const chars of DANGEROUS_CHARACTERS) {
    if (input.includes(chars)) {
      return { 
        isValid: false, 
        reason: `Contains potentially dangerous character sequence: ${chars}` 
      };
    }
  }
  
  // Check for excessive length (potential buffer overflow)
  if (input.length > 10000) {
    return { 
      isValid: false, 
      reason: 'Input exceeds maximum allowed length' 
    };
  }
  
  return { isValid: true };
};

/**
 * Validates email format with security considerations
 */
export const validateEmail = (email: string): { isValid: boolean; reason?: string } => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, reason: 'Email is required' };
  }
  
  // Basic email regex that prevents most injection attempts
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, reason: 'Invalid email format' };
  }
  
  if (email.length > 254) {
    return { isValid: false, reason: 'Email too long' };
  }
  
  return { isValid: true };
};

/**
 * Validates password strength and security
 */
export const validatePassword = (password: string): { isValid: boolean; reason?: string } => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, reason: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, reason: 'Password must be at least 8 characters long' };
  }
  
  if (password.length > 128) {
    return { isValid: false, reason: 'Password too long' };
  }
  
  // Check for at least one lowercase, uppercase, number, and special character
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
    return { 
      isValid: false, 
      reason: 'Password must contain at least one lowercase letter, uppercase letter, number, and special character' 
    };
  }
  
  return { isValid: true };
};

/**
 * Validates and sanitizes SQL import data
 */
export const validateSQLImportData = (sqlData: string): { isValid: boolean; sanitized?: string; reason?: string } => {
  if (!sqlData || typeof sqlData !== 'string') {
    return { isValid: false, reason: 'SQL data is required' };
  }
  
  // Check size limits (max 50MB)
  if (sqlData.length > 50 * 1024 * 1024) {
    return { isValid: false, reason: 'SQL data too large (max 50MB)' };
  }
  
  // Validate that it looks like legitimate SQL import data
  const hasInsertStatements = /INSERT\s+INTO/i.test(sqlData);
  const hasCreateStatements = /CREATE\s+TABLE/i.test(sqlData);
  
  if (!hasInsertStatements && !hasCreateStatements) {
    return { isValid: false, reason: 'Data does not appear to contain valid SQL import statements' };
  }
  
  // Check for dangerous operations that shouldn't be in import data
  const dangerousPatterns = [
    /DROP\s+DATABASE/i,
    /DROP\s+SCHEMA/i,
    /TRUNCATE\s+TABLE/i,
    /DELETE\s+FROM/i,
    /UPDATE\s+\w+\s+SET/i,
    /GRANT\s+/i,
    /REVOKE\s+/i,
    /ALTER\s+USER/i,
    /CREATE\s+USER/i,
    /DROP\s+USER/i
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(sqlData)) {
      return { 
        isValid: false, 
        reason: `Contains potentially dangerous SQL operation: ${pattern.source}` 
      };
    }
  }
  
  // Basic sanitization - remove comments and normalize whitespace
  let sanitized = sqlData
    .replace(/--[^\r\n]*$/gm, '') // Remove line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  return { isValid: true, sanitized };
};

/**
 * Rate limiting utility for import operations
 */
export class ImportRateLimiter {
  private static attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private static readonly MAX_ATTEMPTS = 5;
  private static readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes
  
  static checkRateLimit(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const key = `import_${identifier}`;
    const current = this.attempts.get(key);
    
    if (!current || now > current.resetTime) {
      // Reset or first attempt
      this.attempts.set(key, { count: 1, resetTime: now + this.WINDOW_MS });
      return { allowed: true };
    }
    
    if (current.count >= this.MAX_ATTEMPTS) {
      return { allowed: false, resetTime: current.resetTime };
    }
    
    // Increment attempt count
    current.count++;
    this.attempts.set(key, current);
    
    return { allowed: true };
  }
  
  static clearRateLimit(identifier: string): void {
    const key = `import_${identifier}`;
    this.attempts.delete(key);
  }
}

/**
 * General purpose input sanitization for form fields
 */
export const sanitizeFormInput = (input: unknown): string => {
  if (input === null || input === undefined) return '';
  
  const str = String(input);
  return sanitizeTextInput(str);
};

/**
 * Validates numeric input with range checking
 */
export const validateNumericInput = (
  value: unknown, 
  min?: number, 
  max?: number
): { isValid: boolean; value?: number; reason?: string } => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, reason: 'Value is required' };
  }
  
  const num = Number(value);
  
  if (isNaN(num)) {
    return { isValid: false, reason: 'Value must be a number' };
  }
  
  if (min !== undefined && num < min) {
    return { isValid: false, reason: `Value must be at least ${min}` };
  }
  
  if (max !== undefined && num > max) {
    return { isValid: false, reason: `Value must be at most ${max}` };
  }
  
  return { isValid: true, value: num };
};