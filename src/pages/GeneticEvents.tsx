import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2, Search, Dna, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const GeneticEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();

  const { data: individuals = [], isLoading } = useQuery({
    queryKey: ['genetic-individuals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('genetic_individuals')
        .select(`
          *,
          archaeological_sites (
            name,
            location,
            period
          )
        `)
        .order('sample_id');
      
      if (error) throw error;
      return data || [];
    }
  });

  const filteredIndividuals = individuals.filter(individual =>
    individual.sample_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    individual.archaeological_sites?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Genetiska Händelser"
        titleEn="Genetic Events"
        description="Utforska genetiska händelser och evolution från arkeologiska fynd. Se DNA-analys och haplogrupper."
        descriptionEn="Explore genetic events and evolution from archaeological finds. View DNA analysis and haplogroups."
        keywords="genetik, DNA, haplogrupper, arkeologi, evolution, fornnordiska folk"
      />
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Dna className="h-8 w-8" />
            {language === 'sv' ? 'Genetiska Händelser' : 'Genetic Events'}
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'sv' 
              ? 'Utforska genetiska händelser och evolution från arkeologiska fynd.'
              : 'Explore genetic events and evolution from archaeological finds.'}
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={language === 'sv' ? 'Sök genetiska händelser...' : 'Search genetic events...'}
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
                {filteredIndividuals.length} {language === 'sv' ? 'individer' : 'individuals'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIndividuals.map((individual) => (
                <Card key={individual.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">{individual.sample_id}</CardTitle>
                    {individual.archaeological_sites && (
                      <CardDescription className="text-slate-400">
                        {individual.archaeological_sites.name} - {individual.archaeological_sites.location}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {individual.y_haplogroup && (
                      <div className="mb-2">
                        <Badge variant="outline" className="mr-2">
                          Y-DNA: {individual.y_haplogroup}
                        </Badge>
                      </div>
                    )}
                    {individual.mt_haplogroup && (
                      <div className="mb-2">
                        <Badge variant="outline">
                          mtDNA: {individual.mt_haplogroup}
                        </Badge>
                      </div>
                    )}
                    {individual.archaeological_sites?.period && (
                      <p className="text-slate-400 text-sm mt-2">
                        Period: {individual.archaeological_sites.period}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredIndividuals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">
                  {language === 'sv' ? 'Inga genetiska händelser hittades' : 'No genetic events found'}
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

export default GeneticEvents;


