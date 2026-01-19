import React, { useState, useEffect, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Database, 
  Filter,
  Loader2,
  BookOpen,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface RunicInscription {
  id: string;
  signum: string;
  transliteration?: string;
  normalization?: string;
  translation_en?: string;
  translation_sv?: string;
  dating_text?: string;
  period_start?: number;
  period_end?: number;
  location?: string;
  province?: string;
  country?: string;
  object_type?: string;
  material?: string;
  rune_type?: string;
  style_group?: string;
  uncertainty_level?: string;
  k_samsok_uri?: string;
  created_at: string;
  updated_at: string;
}

interface RunicExplorerProps {
  inscriptions?: RunicInscription[];
  isLoading?: boolean;
  className?: string;
}

export const RunicExplorer: React.FC<RunicExplorerProps> = ({
  inscriptions = [],
  isLoading = false,
  className = ""
}) => {
  const [inscriptionsData, setInscriptionsData] = useState<RunicInscription[]>(inscriptions);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingState, setIsLoadingState] = useState(isLoading);
  const [connectionError, setConnectionError] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [dbStats, setDbStats] = useState({
    totalInscriptions: 0,
    totalAnalyses: 0,
    totalNotes: 0
  });
  const [legendData, setLegendData] = React.useState<any[]>([]);
  const { toast } = useToast();

  // Test Supabase connection
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase
        .from('runic_inscriptions')
        .select('count(*)')
        .limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error);
        setConnectionError(true);
        return false;
      }
      
      console.log('Supabase connection successful');
      setConnectionError(false);
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      setConnectionError(true);
      return false;
    }
  };

  // Load initial data
  const loadInitialData = async () => {
    setIsLoadingState(true);
    
    const isConnected = await testConnection();
    if (!isConnected) {
      setIsLoadingState(false);
      return;
    }

    try {
      // Get inscriptions
      const { data: inscriptionsData, error: inscriptionsError } = await supabase
        .from('runic_inscriptions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (inscriptionsError) {
        console.error('Error fetching inscriptions:', inscriptionsError);
        toast({
          title: "Fel vid laddning",
          description: "Kunde inte ladda runinskriptioner",
          variant: "destructive"
        });
      } else {
        setInscriptionsData(inscriptionsData || []);
      }

      // Get stats
      const [inscriptionsCount, analysesCount, notesCount] = await Promise.all([
        supabase.from('runic_inscriptions').select('*', { count: 'exact', head: true }),
        supabase.from('ai_analyses').select('*', { count: 'exact', head: true }),
        supabase.from('research_notes').select('*', { count: 'exact', head: true })
      ]);

      setDbStats({
        totalInscriptions: inscriptionsCount.count || 0,
        totalAnalyses: analysesCount.count || 0,
        totalNotes: notesCount.count || 0
      });

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Fel vid laddning",
        description: "Kunde inte ladda data från databasen",
        variant: "destructive"
      });
    } finally {
      setIsLoadingState(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Search function
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadInitialData();
      return;
    }

    setIsLoadingState(true);
    try {
      const { data, error } = await supabase
        .rpc('search_inscriptions_flexible' as any, { p_search_term: searchQuery.trim() })
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Search error:', error);
        toast({
          title: "Sökfel",
          description: "Kunde inte genomföra sökningen",
          variant: "destructive"
        });
      } else {
        setInscriptionsData((data as RunicInscription[]) || []);
        toast({
          title: "Sökning klar",
          description: `Hittade ${(data as RunicInscription[])?.length || 0} matchande inskriptioner`,
        });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoadingState(false);
    }
  };

  // Filter by period
  const handlePeriodFilter = async (period: string) => {
    setSelectedPeriod(period);
    setIsLoadingState(true);

    try {
      let query = supabase.from('runic_inscriptions').select('*');
      
      switch (period) {
        case 'proto-norse':
          query = query.gte('period_start', 200).lte('period_end', 550);
          break;
        case 'viking-age':
          query = query.gte('period_start', 800).lte('period_end', 1100);
          break;
        case 'medieval':
          query = query.gte('period_start', 1100).lte('period_end', 1400);
          break;
        default:
          // All periods
          break;
      }
      
      const { data, error } = await query
        .order('period_start', { ascending: true })
        .limit(20);

      if (error) {
        console.error('Filter error:', error);
      } else {
        setInscriptionsData(data || []);
      }
    } catch (error) {
      console.error('Filter error:', error);
    } finally {
      setIsLoadingState(false);
    }
  };

  const formatPeriod = (inscription: RunicInscription) => {
    if (inscription.period_start && inscription.period_end) {
      return `${inscription.period_start}-${inscription.period_end} e.Kr.`;
    }
    return inscription.dating_text || 'Okänd period';
  };

  const getPeriodColor = (inscription: RunicInscription) => {
    const start = inscription.period_start || 0;
    if (start < 550) return 'bg-purple-500';
    if (start < 800) return 'bg-blue-500';
    if (start < 1100) return 'bg-green-500';
    return 'bg-orange-500';
  };

  const handleLegendDataChange = (newLegendData: any[]) => {
    setLegendData(newLegendData);
  };

  if (connectionError) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Databasanslutning misslyckades</h3>
            <p className="text-slate-300 mb-4">
              Kunde inte ansluta till Supabase-databasen. Kontrollera att:
            </p>
            <ul className="text-slate-400 text-left max-w-md mx-auto mb-6 space-y-1">
              <li>• Databastabellerna är skapade</li>
              <li>• RLS-policyer är konfigurerade</li>
              <li>• API-nyckeln är korrekt</li>
            </ul>
            <Button onClick={loadInitialData} className="bg-blue-600 hover:bg-blue-700">
              Försök igen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Database Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Runinskriptioner</p>
                <p className="text-2xl font-bold text-white">{dbStats.totalInscriptions}</p>
              </div>
              <Database className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">AI-analyser</p>
                <p className="text-2xl font-bold text-white">{dbStats.totalAnalyses}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Forskningsanteckningar</p>
                <p className="text-2xl font-bold text-white">{dbStats.totalNotes}</p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="h-5 w-5" />
            Utforska runinskriptioner
          </CardTitle>
          <CardDescription className="text-slate-300">
            Sök och filtrera i vår databas med {dbStats.totalInscriptions} runinskriptioner
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              placeholder="Sök efter text, plats, eller översättning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
            />
            <Button 
              onClick={handleSearch}
              disabled={isLoadingState}
              className="bg-blue-600 hover:bg-blue-700 min-w-[100px]"
            >
              {isLoadingState ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Sök
                </>
              )}
            </Button>
          </div>

          {/* Period Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedPeriod === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePeriodFilter('all')}
              className="border-white/20"
            >
              <Filter className="h-3 w-3 mr-1" />
              Alla perioder
            </Button>
            <Button
              variant={selectedPeriod === 'proto-norse' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePeriodFilter('proto-norse')}
              className="border-white/20"
            >
              Proto-nordiska
            </Button>
            <Button
              variant={selectedPeriod === 'viking-age' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePeriodFilter('viking-age')}
              className="border-white/20"
            >
              Vikingatid
            </Button>
            <Button
              variant={selectedPeriod === 'medieval' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePeriodFilter('medieval')}
              className="border-white/20"
            >
              Medeltid
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isLoadingState ? (
          // Loading skeletons
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-3 bg-white/20 rounded mb-4 w-3/4"></div>
                  <div className="h-3 bg-white/20 rounded mb-2 w-1/2"></div>
                  <div className="h-3 bg-white/20 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : inscriptionsData.length > 0 ? (
          inscriptionsData.map((inscription) => (
            <Card key={inscription.id} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {inscription.signum}
                      </h3>
                      <Badge 
                        className={`${getPeriodColor(inscription)} text-white border-0 mt-1`}
                      >
                        {formatPeriod(inscription)}
                      </Badge>
                    </div>
                  </div>

                  {/* Transliteration */}
                  {inscription.transliteration && (
                    <div className="p-3 bg-black/20 rounded font-mono text-sm text-slate-200">
                      {inscription.transliteration}
                    </div>
                  )}

                  {/* Translation */}
                  {inscription.translation_en && (
                    <p className="text-slate-300 text-sm italic">
                      "{inscription.translation_en}"
                    </p>
                  )}

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {inscription.location && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <MapPin className="h-3 w-3" />
                        {inscription.location}
                      </div>
                    )}
                    {inscription.object_type && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <BookOpen className="h-3 w-3" />
                        {inscription.object_type}
                      </div>
                    )}
                  </div>

                  {/* Rune type and material */}
                  <div className="flex gap-2">
                    {inscription.rune_type && (
                      <Badge variant="secondary" className="text-xs">
                        {inscription.rune_type}
                      </Badge>
                    )}
                    {inscription.material && (
                      <Badge variant="outline" className="text-xs border-white/30 text-slate-300">
                        {inscription.material}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // No results
          <div className="col-span-full text-center py-12">
            <Search className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Inga resultat</h3>
            <p className="text-slate-400">
              {searchQuery 
                ? `Inga inskriptioner matchade "${searchQuery}"`
                : 'Inga inskriptioner hittades för valda filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
