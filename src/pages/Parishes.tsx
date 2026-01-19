import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';
import { useParishes } from '../hooks/useParishes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Church } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Parishes = () => {
  const { parishes, isLoading } = useParishes();
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();

  const filteredParishes = parishes.filter(parish =>
    parish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (parish.code && parish.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Socknar"
        titleEn="Parishes"
        description="Utforska svenska socknar och deras runinskrifter. Se geografisk spridning och historisk kontext."
        descriptionEn="Explore Swedish parishes and their runic inscriptions. View geographical distribution and historical context."
        keywords="socknar, svenska socknar, kyrkohistoria, runologi, geografi"
      />
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Church className="h-8 w-8" />
            {language === 'sv' ? 'Socknar' : 'Parishes'}
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'sv' 
              ? 'Utforska svenska socknar och deras koppling till runinskrifter.'
              : 'Explore Swedish parishes and their connection to runic inscriptions.'}
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={language === 'sv' ? 'Sök socknar...' : 'Search parishes...'}
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
                {filteredParishes.length} {language === 'sv' ? 'socknar' : 'parishes'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredParishes.map((parish) => (
                <Card key={parish.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">{parish.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {parish.code && (
                      <p className="text-slate-400 text-sm">Kod: {parish.code}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredParishes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">
                  {language === 'sv' ? 'Inga socknar hittades' : 'No parishes found'}
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

export default Parishes;


