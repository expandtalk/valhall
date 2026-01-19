import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Map, 
  Castle, 
  Scroll, 
  Hammer, 
  Crown,
  User
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { routes, getRouteByPath } from '@/config/routes';

export const Navigation: React.FC = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const location = useLocation();

  const isActive = (pathEn: string, pathSv: string) => 
    location.pathname === pathEn || location.pathname === pathSv;

  const publicNavItems = [
    { pathEn: '/welcome', pathSv: '/welcome', labelSv: 'Hem', labelEn: 'Home', icon: null },
  ];

  // Get navigation items from routes config
  const mainRoutes = routes.filter(route => 
    ['Inscriptions', 'Carvers', 'Artefacts', 'Fortresses', 'RoyalChronicles'].includes(route.component)
  );

  const authenticatedNavItems = [
    { pathEn: '/explore', pathSv: '/explore', labelSv: 'Utforska', labelEn: 'Explore', icon: Map },
    ...mainRoutes.map(route => ({
      pathEn: route.pathEn,
      pathSv: route.pathSv,
      labelSv: route.titleSv,
      labelEn: route.titleEn,
      icon: route.component === 'Carvers' ? Hammer :
            route.component === 'Artefacts' ? Scroll :
            route.component === 'Fortresses' ? Castle :
            route.component === 'RoyalChronicles' ? Crown : null
    })),
    { pathEn: '/profile', pathSv: '/profile', labelSv: 'Profil', labelEn: 'Profile', icon: User },
  ];

  const navItems = user ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const label = language === 'sv' ? item.labelSv : item.labelEn;
        const path = language === 'sv' ? item.pathSv : item.pathEn;
        
        return (
          <Link
            key={item.pathEn}
            to={path}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive(item.pathEn, item.pathSv)
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
            }`}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
