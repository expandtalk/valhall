import React from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Rivers = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Floder"
        titleEn="Rivers"
        description="Utforska vikingatida flodplatser och vattenvägar. Se runinskrifter längs historiska flodsträckor."
        descriptionEn="Explore Viking Age river locations and waterways. View runic inscriptions along historical river routes."
        keywords="floder, vattenvägar, vikingatid, transport, handel, geografi"
      />
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Waves className="h-8 w-8" />
            {language === 'sv' ? 'Floder' : 'Rivers'}
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'sv' 
              ? 'Utforska vikingatida flodplatser och vattenvägar. Se runinskrifter längs historiska flodsträckor.'
              : 'Explore Viking Age river locations and waterways. View runic inscriptions along historical river routes.'}
          </p>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {language === 'sv' ? 'Interaktiv karta' : 'Interactive Map'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {language === 'sv' 
                ? 'För att se floder och vattenvägar på kartan, gå till huvudkartan och aktivera "Floder" i legenden.'
                : 'To see rivers and waterways on the map, go to the main map and activate "Rivers" in the legend.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              {language === 'sv' 
                ? 'Kartan visar vikingatida flodplatser och vattenvägar som var viktiga för transport och handel under vikingatiden.'
                : 'The map shows Viking Age river locations and waterways that were important for transport and trade during the Viking Age.'}
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Rivers;


