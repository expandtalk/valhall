import { useState, useEffect } from 'react';

export type Language = 'sv' | 'en';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('sv');

  useEffect(() => {
    // Check for stored language preference
    const stored = localStorage.getItem('preferred-language') as Language;
    if (stored && ['sv', 'en'].includes(stored)) {
      setLanguage(stored);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLanguage('en');
      }
    }
  }, []);

  const setLanguagePreference = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  return {
    language,
    setLanguage: setLanguagePreference,
    isSwedish: language === 'sv',
    isEnglish: language === 'en'
  };
};