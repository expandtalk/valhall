import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';
import { useHundreds } from '../hooks/useHundreds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hundreds = () => {
  const { hundreds, isLoading } = useHundreds();
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();

  const filteredHundreds = hundreds.filter(hundred =>
    hundred.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Härader"
        titleEn="Hundreds"
        description="Utforska historiska härader i Skandinavien. Se runinskrifter och platser kopplade till varje härad."
        descriptionEn="Explore historical hundreds in Scandinavia. View runic inscriptions and locations linked to each hundred."
        keywords="härader, historisk geografi, skandinavien, administrativa enheter"
      />
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <MapPin className="h-8 w-8" />
            {language === 'sv' ? 'Härader' : 'Hundreds'}
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'sv' 
              ? 'Utforska historiska härader i Skandinavien och deras koppling till runinskrifter.'
              : 'Explore historical hundreds in Scandinavia and their connection to runic inscriptions.'}
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={language === 'sv' ? 'Sök härader...' : 'Search hundreds...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {filteredHundreds.length} {language === 'sv' ? 'härader' : 'hundreds'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHundreds.map((hundred) => (
                <Card key={hundred.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">{hundred.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 text-sm">ID: {hundred.id}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredHundreds.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">
                  {language === 'sv' ? 'Inga härader hittades' : 'No hundreds found'}
                </p>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Hundreds;


