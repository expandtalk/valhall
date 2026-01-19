import React from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';
import { GodNamesView } from '../components/gods/GodNamesView';
import { useLanguage } from '@/contexts/LanguageContext';

const Gods = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Gudar"
        titleEn="Gods"
        description="Utforska fornnordiska gudar och kultplatser. Se runinskrifter och arkeologiska fynd kopplade till olika gudar."
        descriptionEn="Explore Old Norse gods and cult sites. View runic inscriptions and archaeological finds linked to different gods."
        keywords="gudar, fornnordisk mytologi, asar, vaner, kultplatser, religion"
      />
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">⚡</span>
            <span>{language === 'sv' ? 'Gudar' : 'Gods'}</span>
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'sv' 
              ? 'Utforska fornnordiska gudar och deras koppling till runinskrifter och kultplatser.'
              : 'Explore Old Norse gods and their connection to runic inscriptions and cult sites.'}
          </p>
        </div>
        <GodNamesView />
      </main>
      <Footer />
    </div>
  );
};

export default Gods;

