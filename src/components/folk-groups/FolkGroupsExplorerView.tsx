
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, MapPin, Clock, Search, Filter, Map } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { sortArraySwedish } from '@/utils/swedishSorting';
import { useLanguage } from '@/contexts/LanguageContext';

interface FolkGroup {
  id: string;
  name: string;
  name_en: string;
  main_category: string;
  sub_category: string;
  language_family: string;
  language_subfamily: string;
  active_period_start: number;
  active_period_end: number;
  description: string;
  description_en: string;
  coordinates: any;
  historical_significance: string;
  dna_profile: any;
}

export const FolkGroupsExplorerView: React.FC = () => {
  const { t, language } = useLanguage();
  const [folkGroups, setFolkGroups] = useState<FolkGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadFolkGroups();
  }, []);

  const loadFolkGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('folk_groups')
        .select('*')
        .order('active_period_start', { ascending: true });

      if (error) {
        console.error('Error loading folk groups:', error);
        return;
      }

      setFolkGroups(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGroups = folkGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.sub_category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.main_category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = sortArraySwedish(Array.from(new Set(folkGroups.map(g => g.main_category))));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'germanic': return 'bg-blue-100 text-blue-800';
      case 'celtic': return 'bg-green-100 text-green-800';
      case 'slavic': return 'bg-purple-100 text-purple-800';
      case 'finno_ugric': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPeriod = (start: number, end: number) => {
    if (start < 0 && end < 0) {
      return `${Math.abs(end)} - ${Math.abs(start)} f.Kr.`;
    } else if (start < 0 && end > 0) {
      return `${Math.abs(start)} f.Kr. - ${end} e.Kr.`;
    } else {
      return `${start} - ${end} e.Kr.`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
        <div className="text-white text-center">{t('loadingFolkGroups')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center gap-3">
            <Users className="h-10 w-10" />
            {t('historicalFolkGroupsTitle')}
          </h1>
          <p className="text-xl text-slate-300 mb-6">
            {t('historicalFolkGroupsDescription')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                placeholder={t('searchFolkGroups')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-white/50 pl-10"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
              >
                <option value="all">{t('allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat} value={cat} className="text-black">
                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center text-white">
              <Filter className="h-4 w-4 mr-2" />
              {t('showing')} {filteredGroups.length} {t('artefactsOf')} {folkGroups.length} {t('groups')}
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="mb-8">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Map className="h-5 w-5" />
                {t('interactiveMap')}
              </CardTitle>
              <CardContent className="text-white/70 text-sm">
                <p className="mb-4">
                  {t('folkGroupsMapDescription')}
                </p>
                <Button 
                  onClick={() => window.location.href = '/explore?focus=folkGroups'}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Map className="h-4 w-4 mr-2" />
                  {t('openInteractiveMap')}
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </div>

        {/* Cards Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-4">{t('allFolkGroups')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortArraySwedish(filteredGroups, (group) => group.name).map((group) => (
            <Card key={group.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-white text-lg">
                    {language === 'en' ? group.name_en : group.name}
                  </CardTitle>
                  <Badge className={getCategoryColor(group.main_category)}>
                    {group.main_category.replace('_', ' ')}
                  </Badge>
                </div>
                <CardDescription className="text-slate-300">
                  {language === 'en' ? group.name_en : group.name} • {group.sub_category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-slate-300 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {formatPeriod(group.active_period_start, group.active_period_end)}
                </div>
                
                {group.coordinates && (
                  <div className="flex items-center text-slate-300 text-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {t('geographicPosition')}
                  </div>
                )}

                {group.language_family && (
                  <div className="text-slate-300 text-sm">
                    <strong>{t('languageFamily')}:</strong> {group.language_family}
                    {group.language_subfamily && ` (${group.language_subfamily})`}
                  </div>
                )}

                {(language === 'en' ? group.description_en : group.description) && (
                  <p className="text-slate-200 text-sm line-clamp-3">
                    {language === 'en' ? group.description_en : group.description}
                  </p>
                )}

                {group.historical_significance && (
                  <div className="text-slate-300 text-xs">
                    <strong>{t('historicalSignificance')}:</strong> {group.historical_significance}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center text-slate-300 mt-12">
            <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">{t('noFolkGroupsFound')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
