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
import { Loader2, Search, Users, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FolkGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();

  const { data: folkGroups = [], isLoading } = useQuery({
    queryKey: ['folk-groups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('folk_groups')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data || [];
    }
  });

  const filteredGroups = folkGroups.filter(group =>
    (group.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    (group.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    (group.description?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    (group.description_en?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
  );

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Folkgrupper"
        titleEn="Folk Groups"
        description="Utforska fornnordiska folkgrupper och deras kulturella och genetiska spår i runinskrifter."
        descriptionEn="Explore Old Norse folk groups and their cultural and genetic traces in runic inscriptions."
        keywords="folkgrupper, fornnordiska folk, germanska stammar, kulturhistoria"
      />
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Users className="h-8 w-8" />
            {language === 'sv' ? 'Folkgrupper' : 'Folk Groups'}
          </h1>
          <p className="text-slate-300 text-lg">
            {language === 'sv' 
              ? 'Utforska fornnordiska folkgrupper och deras kulturella och genetiska spår.'
              : 'Explore Old Norse folk groups and their cultural and genetic traces.'}
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={language === 'sv' ? 'Sök folkgrupper...' : 'Search folk groups...'}
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
                {filteredGroups.length} {language === 'sv' ? 'folkgrupper' : 'folk groups'}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {language === 'sv' ? group.name : (group.name_en || group.name)}
                    </CardTitle>
                    {(language === 'sv' ? group.description : group.description_en) && (
                      <CardDescription className="text-slate-400">
                        {language === 'sv' ? group.description : group.description_en}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {group.coordinates && (
                      <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        {language === 'sv' ? 'Geografisk position dokumenterad' : 'Geographic position documented'}
                      </div>
                    )}
                    {group.language_family && (
                      <Badge variant="outline" className="mt-2">
                        {group.language_family}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredGroups.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">
                  {language === 'sv' ? 'Inga folkgrupper hittades' : 'No folk groups found'}
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

export default FolkGroups;

