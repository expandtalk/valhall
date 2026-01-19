
import { supabase } from "@/integrations/supabase/client";

export interface Language {
  id: string;
  language_code: string;
  name_sv: string;
  name_en: string;
}

// Cache för språk för att undvika upprepade databasanrop
let languageCache: Map<string, Language> | null = null;

// Ladda alla språk från databasen och cacha dem
export const loadLanguages = async (): Promise<Map<string, Language>> => {
  if (languageCache) {
    return languageCache;
  }

  const { data: languages, error } = await supabase
    .from('languages')
    .select('*');

  if (error) {
    console.error('Error loading languages:', error);
    return new Map();
  }

  languageCache = new Map();
  languages?.forEach(lang => {
    languageCache!.set(lang.language_code, lang);
  });

  console.log(`✅ Loaded ${languages?.length || 0} languages into cache`);
  return languageCache;
};

// Hämta språknamn på svenska baserat på språkkod
export const getLanguageNameSv = async (languageCode: string): Promise<string> => {
  if (!languageCode) return 'Okänd';
  
  const languages = await loadLanguages();
  const language = languages.get(languageCode);
  
  return language ? language.name_sv : languageCode;
};

// Hämta språknamn på engelska baserat på språkkod
export const getLanguageNameEn = async (languageCode: string): Promise<string> => {
  if (!languageCode) return 'Unknown';
  
  const languages = await loadLanguages();
  const language = languages.get(languageCode);
  
  return language ? language.name_en : languageCode;
};

// Kontrollera om en språkkod finns i databasen
export const isValidLanguageCode = async (languageCode: string): Promise<boolean> => {
  const languages = await loadLanguages();
  return languages.has(languageCode);
};

// Hämta alla tillgängliga språk
export const getAllLanguages = async (): Promise<Language[]> => {
  const languages = await loadLanguages();
  return Array.from(languages.values());
};

// Hitta språk baserat på partiell sökning (för fuzzy matching)
export const findSimilarLanguages = async (searchTerm: string): Promise<Language[]> => {
  const languages = await loadLanguages();
  const allLanguages = Array.from(languages.values());
  
  const searchLower = searchTerm.toLowerCase();
  
  return allLanguages.filter(lang => 
    lang.language_code.toLowerCase().includes(searchLower) ||
    lang.name_sv.toLowerCase().includes(searchLower) ||
    lang.name_en.toLowerCase().includes(searchLower)
  );
};

// Rensa cache (användbart för testing eller om data uppdateras)
export const clearLanguageCache = (): void => {
  languageCache = null;
};
