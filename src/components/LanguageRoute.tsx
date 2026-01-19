import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getRouteByPath } from '@/config/routes';

interface LanguageRouteProps {
  children: React.ReactNode;
}

/**
 * Component that syncs language from URL path
 * If URL starts with /sv/, set language to Swedish
 * Otherwise, set to English (default)
 */
export const LanguageRoute: React.FC<LanguageRouteProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const path = location.pathname;
    
    // Check if path starts with /sv/
    if (path.startsWith('/sv/')) {
      if (language !== 'sv') {
        setLanguage('sv');
      }
    } else {
      // Check if it's a known route that should have language prefix
      const route = getRouteByPath(path);
      if (route && language === 'sv') {
        // If we're on a route that should have language, but we're in Swedish mode
        // and the URL doesn't have /sv/, we might want to redirect
        // But for now, just set language based on URL
        if (path.startsWith('/sv/')) {
          setLanguage('sv');
        } else {
          setLanguage('en');
        }
      } else if (!path.startsWith('/sv/') && !path.startsWith('/auth') && !path.startsWith('/admin') && !path.startsWith('/profile')) {
        // Default to English for non-Swedish paths (except auth/admin/profile)
        if (language !== 'en') {
          setLanguage('en');
        }
      }
    }
  }, [location.pathname, language, setLanguage]);

  return <>{children}</>;
};


