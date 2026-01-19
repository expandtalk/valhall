import React from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';
import { VikingNamesView } from '../components/names/VikingNamesView';
import { useLanguage } from '@/contexts/LanguageContext';

const VikingNames = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Vikinganamn"
        titleEn="Viking Names"
        description="Utforska vikingatida namn och deras frekvens i runinskrifter. Analysera namnens geografiska spridning och betydelse."
        descriptionEn="Explore Viking Age names and their frequency in runic inscriptions. Analyze the geographical distribution and meaning of names."
        keywords="vikinganamn, fornnordiska namn, runologi, vikingatid, personnamn"
      />
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">👤</span>
            <span>{language === 'sv' ? 'Vikinganamn' : 'Viking Names'}</span>
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'sv' 
              ? 'Utforska vikingatida personnamn och deras användning i runinskrifter.'
              : 'Explore Viking Age personal names and their usage in runic inscriptions.'}
          </p>
        </div>
        <VikingNamesView />
      </main>
      <Footer />
    </div>
  );
};

export default VikingNames;

