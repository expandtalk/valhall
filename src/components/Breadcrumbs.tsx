import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLanguage } from '@/contexts/LanguageContext';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  
  const routeNames = {
    sv: {
      welcome: 'Hem',
      explore: 'Utforska',
      runinskrifter: 'Runinskrifter',
      ristare: 'Ristare',
      artefakter: 'Artefakter',
      vikinganamn: 'Vikinganamn',
      harader: 'Härader',
      socknar: 'Socknar',
      folkgrupper: 'Folkgrupper',
      floder: 'Floder',
      gudar: 'Gudar',
      'genetiska-handelser': 'Genetiska Händelser',
      kungakronikor: 'Kungakrönikor',
      borgar: 'Vikingaborgar',
      inscriptions: 'Runinskrifter',
      carvers: 'Ristare',
      artefacts: 'Artefakter',
      'viking-names': 'Vikinganamn',
      hundreds: 'Härader',
      parishes: 'Socknar',
      'folk-groups': 'Folkgrupper',
      rivers: 'Floder',
      gods: 'Gudar',
      'genetic-events': 'Genetiska Händelser',
      'royal-chronicles': 'Kungakrönikor',
      fortresses: 'Borgar',
      profile: 'Profil',
      admin: 'Admin',
      auth: 'Autentisering'
    },
    en: {
      welcome: 'Home',
      explore: 'Explore',
      inscriptions: 'Runic Inscriptions',
      carvers: 'Carvers',
      artefacts: 'Artefacts',
      'viking-names': 'Viking Names',
      hundreds: 'Hundreds',
      parishes: 'Parishes',
      'folk-groups': 'Folk Groups',
      rivers: 'Rivers',
      gods: 'Gods',
      'genetic-events': 'Genetic Events',
      'royal-chronicles': 'Royal Chronicles',
      fortresses: 'Fortresses',
      profile: 'Profile',
      admin: 'Admin',
      auth: 'Authentication'
    }
  };

  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Don't show breadcrumbs on home/welcome page
  if (pathnames.length === 0 || location.pathname === '/welcome') {
    return null;
  }

  // Handle Swedish routes - remove 'sv' from pathnames for display
  const displayPathnames = pathnames[0] === 'sv' ? pathnames.slice(1) : pathnames;

  return (
    <div className="container mx-auto px-4 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/welcome">
                {language === 'sv' ? 'Hem' : 'Home'}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {displayPathnames.map((name, index) => {
            // Build route path - include 'sv' prefix if we're on Swedish route
            const prefix = pathnames[0] === 'sv' ? '/sv' : '';
            const routeTo = `${prefix}/${displayPathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === displayPathnames.length - 1;
            const displayName = routeNames[language][name] || name;

            return (
              <React.Fragment key={routeTo}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{displayName}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo}>{displayName}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
