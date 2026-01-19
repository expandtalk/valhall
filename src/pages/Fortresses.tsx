
import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { PageMeta } from '../components/PageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Castle, Shield, Users, Ruler, Building, Anchor, Crown } from "lucide-react";
import { useVikingFortresses } from '../hooks/useVikingFortresses';
import { useVikingCities, getCategoryColor, getCategoryLabel } from '../hooks/useVikingCities';
import { useSwedishHillforts } from '../hooks/useSwedishHillforts';
import { FortressesCitiesMap } from '../components/fortresses/FortressesCitiesMap';
import { bulkImportSwedishHillforts } from '../utils/swedishHillfortsBulkImport';
import { bulkImportExtendedSwedishHillforts } from '../utils/swedishHillfortsBulkImportExtended';
import { useLanguage } from '@/contexts/LanguageContext';

const Fortresses = () => {
  const { t } = useLanguage();
  const { fortresses, isLoading: fortressesLoading, error: fortressesError } = useVikingFortresses(true);
  const { data: cities, isLoading: citiesLoading, error: citiesError } = useVikingCities(true);
  const { hillforts, isLoading: hillfortsLoading, error: hillfortsError } = useSwedishHillforts(true);
  const [selectedFortressType, setSelectedFortressType] = useState<string>('all');
  const [selectedCityCategory, setSelectedCityCategory] = useState<string>('all');
  const [selectedLandscape, setSelectedLandscape] = useState<string>('all');
  const [isImporting, setIsImporting] = useState(false);
  const [showHillforts, setShowHillforts] = useState(true);
  
  // Map state
  const [showFortresses, setShowFortresses] = useState(true);
  const [showCities, setShowCities] = useState(true);
  const [highlightedLocation, setHighlightedLocation] = useState<{ id: string; type: 'fortress' | 'city' | 'hillfort' } | null>(null);

  const fortressTypes = [
    { value: 'all', label: 'Alla typer' },
    { value: 'ring_fortress', label: 'Ringborgar' },
    { value: 'hillfort', label: 'Fornborgar' },
    { value: 'longphort', label: 'Longphorts' },
    { value: 'royal_center', label: 'Kungliga centra' },
    { value: 'coastal_defense', label: 'Kustförsvar' },
    { value: 'trading_post_fortress', label: 'Befästa handelsplatser' },
    { value: 'linear_defense', label: 'Linjära försvar' }
  ];

  const cityCategories = [
    { value: 'all', label: 'Alla kategorier' },
    { value: 'established_city', label: 'Etablerade städer' },
    { value: 'trading_post', label: 'Handelsplatser' },
    { value: 'religious_center', label: 'Religiösa centrum' },
    { value: 'gotlandic_center', label: 'Gotländska centrum' },
    { value: 'koping', label: 'Köpingar' }
  ];

  const filteredFortresses = selectedFortressType === 'all' 
    ? fortresses 
    : fortresses.filter(f => f.fortress_type === selectedFortressType);

  const filteredCities = selectedCityCategory === 'all' 
    ? (cities || [])
    : (cities || []).filter(c => c.category === selectedCityCategory);

  const getFortressTypeLabel = (type: string) => {
    const typeInfo = fortressTypes.find(t => t.value === type);
    return typeInfo?.label || type;
  };

  const getFortressTypeIcon = (type: string) => {
    switch (type) {
      case 'ring_fortress': return <Shield className="h-4 w-4" />;
      case 'royal_center': return <Crown className="h-4 w-4" />;
      case 'trading_post_fortress': return <Anchor className="h-4 w-4" />;
      case 'hillfort': return <Castle className="h-4 w-4" />;
      case 'longphort': return <Building className="h-4 w-4" />;
      default: return <Castle className="h-4 w-4" />;
    }
  };

  const getCityIcon = (category: string) => {
    switch (category) {
      case 'established_city': return <Building className="h-4 w-4" />;
      case 'trading_post': return <Anchor className="h-4 w-4" />;
      case 'religious_center': return <Crown className="h-4 w-4" />;
      case 'gotlandic_center': return <Shield className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  // Map interaction handlers
  const handleLocationClick = (location: any, type: 'fortress' | 'city' | 'hillfort') => {
    setHighlightedLocation({ id: location.id, type });
    
    // Scroll to corresponding card
    const element = document.getElementById(`${type}-${location.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCardHover = (locationId: string, type: 'fortress' | 'city') => {
    setHighlightedLocation({ id: locationId, type });
  };

  const handleCardLeave = () => {
    setHighlightedLocation(null);
  };

  const isLoading = fortressesLoading || citiesLoading;
  const hasError = fortressesError || citiesError;

  if (isLoading) {
    return (
      <div className="min-h-screen viking-bg">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-foreground">{t('loadingFortressesCities')}</div>
        </main>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen viking-bg">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400">
            Fel vid laddning: {String(fortressesError || citiesError)}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen viking-bg">
      <PageMeta
        title="Vikingaborgar"
        titleEn="Viking Fortresses"
        description="Utforska vikingatida borgar, städer och fornborgar i Skandinavien. Interaktiva kartor med detaljerad information om varje plats."
        descriptionEn="Explore Viking Age fortresses, cities and hillforts in Scandinavia. Interactive maps with detailed information about each location."
        keywords="vikingaborgar, fornborgar, vikingastäder, vikingatid, arkeologi, skandinavisk historia"
      />
      <Header />
      <Breadcrumbs />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Castle className="h-8 w-8 text-accent" />
            {t('fortressesCitiesTitle')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('fortressesCitiesDescription')}
          </p>
        </div>

        {/* Hybrid Layout: Map on top */}
        <div className="mb-8">
          <FortressesCitiesMap
            fortresses={fortresses}
            cities={cities || []}
            hillforts={hillforts}
            onLocationClick={handleLocationClick}
            highlightedLocation={highlightedLocation}
            showFortresses={showFortresses}
            showCities={showCities}
            showHillforts={showHillforts}
            onToggleFortresses={() => setShowFortresses(!showFortresses)}
            onToggleCities={() => setShowCities(!showCities)}
            onToggleHillforts={() => setShowHillforts(!showHillforts)}
          />
        </div>

        <Tabs defaultValue="hillforts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="hillforts" className="flex items-center gap-2">
              <Castle className="h-4 w-4" />
              Svenska Fornborgar ({hillforts.length})
            </TabsTrigger>
            <TabsTrigger value="fortresses" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Vikingatida Befästningar ({fortresses.length})
            </TabsTrigger>
            <TabsTrigger value="cities" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Städer ({cities?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hillforts" className="space-y-6">
            <Card className="viking-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Castle className="h-5 w-5 text-accent" />
                  Svenska Fornborgar
                </CardTitle>
                <CardDescription>
                  Fornborgar från hela Sverige med RAÄ-nummer och historisk dokumentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{hillforts.length}</div>
                    <div className="text-sm text-muted-foreground">Totalt antal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {new Set(hillforts.map(h => h.landscape)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Landskap</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {hillforts.filter(h => h.status === 'confirmed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Bekräftade</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {new Set(hillforts.map(h => h.municipality)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Kommuner</div>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    onClick={async () => {
                      setIsImporting(true);
                      try {
                        const result = await bulkImportSwedishHillforts();
                        console.log('Import result:', result);
                      } catch (error) {
                        console.error('Import error:', error);
                      } finally {
                        setIsImporting(false);
                      }
                    }}
                    disabled={isImporting}
                    variant="outline"
                    size="sm"
                  >
                    {isImporting ? 'Importerar...' : 'Importera Öland & Småland'}
                  </Button>
                  <Button 
                    onClick={async () => {
                      setIsImporting(true);
                      try {
                        const result = await bulkImportExtendedSwedishHillforts();
                        console.log('Extended import result:', result);
                      } catch (error) {
                        console.error('Extended import error:', error);
                      } finally {
                        setIsImporting(false);
                      }
                    }}
                    disabled={isImporting}
                    variant="default"
                    size="sm"
                  >
                    {isImporting ? 'Importerar...' : 'Importera Närke & Uppland'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              {['all', ...Array.from(new Set(hillforts.map(h => h.landscape))).sort()].map((landscape) => (
                <Button
                  key={landscape}
                  variant={selectedLandscape === landscape ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLandscape(landscape)}
                  className="text-sm"
                >
                  {landscape === 'all' ? 'Alla landskap' : landscape}
                  {landscape !== 'all' && (
                    <Badge variant="secondary" className="ml-2">
                      {hillforts.filter(h => h.landscape === landscape).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedLandscape === 'all' ? hillforts : hillforts.filter(h => h.landscape === selectedLandscape)).map((hillfort) => (
                <Card key={hillfort.id} className="viking-card hover:bg-card/80 transition-colors animate-fade-in">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-lg flex items-center gap-2">
                      <Castle className="h-4 w-4" />
                      {hillfort.name || 'Namnlös fornborg'}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {hillfort.landscape}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {hillfort.raa_number}
                      </Badge>
                      {hillfort.status === 'confirmed' && (
                        <Badge variant="default" className="text-xs bg-green-600">
                          Bekräftad
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {hillfort.description && (
                      <p className="text-sm text-muted-foreground">
                        {hillfort.description}
                      </p>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {hillfort.parish && `${hillfort.parish}, `}
                          {hillfort.municipality}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-mono text-xs">
                          {hillfort.coordinates.lat.toFixed(5)}°N {hillfort.coordinates.lng.toFixed(5)}°E
                        </span>
                      </div>
                    </div>

                    {(hillfort.cultural_significance || hillfort.period) && (
                      <div className="pt-2 border-t border-border">
                        {hillfort.period && (
                          <p className="text-xs text-muted-foreground mb-1">
                            <strong>Period:</strong> {hillfort.period}
                          </p>
                        )}
                        {hillfort.cultural_significance && (
                          <p className="text-xs text-muted-foreground">
                            <strong>Kulturell betydelse:</strong> {hillfort.cultural_significance}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {(selectedLandscape === 'all' ? hillforts : hillforts.filter(h => h.landscape === selectedLandscape)).length === 0 && (
              <Card className="viking-card">
                <CardContent className="text-center py-8">
                  <Castle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Inga fornborgar hittades</h3>
                  <p className="text-muted-foreground">
                    Inga fornborgar från det valda landskapet hittades.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="fortresses" className="space-y-6">
            <Card className="viking-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Castle className="h-5 w-5 text-accent" />
                  Befästningar översikt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{fortresses.length}</div>
                    <div className="text-sm text-muted-foreground">Totalt antal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {fortresses.filter(f => f.excavated).length}
                    </div>
                    <div className="text-sm text-muted-foreground">Utgrävda</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {fortresses.filter(f => f.unesco_site).length}
                    </div>
                    <div className="text-sm text-muted-foreground">UNESCO-platser</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {new Set(fortresses.map(f => f.country)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Länder</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              {fortressTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={selectedFortressType === type.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFortressType(type.value)}
                  className="text-sm"
                >
                  {type.label}
                  {type.value !== 'all' && (
                    <Badge variant="secondary" className="ml-2">
                      {fortresses.filter(f => f.fortress_type === type.value).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFortresses.map((fortress) => (
                <Card 
                  key={fortress.id} 
                  id={`fortress-${fortress.id}`}
                  className={`viking-card hover:bg-card/80 transition-colors animate-fade-in cursor-pointer ${
                    highlightedLocation?.id === fortress.id && highlightedLocation?.type === 'fortress' 
                      ? 'ring-2 ring-accent' 
                      : ''
                  }`}
                  onMouseEnter={() => handleCardHover(fortress.id, 'fortress')}
                  onMouseLeave={handleCardLeave}
                  onClick={() => handleLocationClick(fortress, 'fortress')}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-lg flex items-center gap-2">
                      {getFortressTypeIcon(fortress.fortress_type)}
                      {fortress.name}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {getFortressTypeLabel(fortress.fortress_type)}
                      </Badge>
                      {fortress.unesco_site && (
                        <Badge variant="default" className="text-xs bg-accent">
                          UNESCO
                        </Badge>
                      )}
                      {fortress.excavated && (
                        <Badge variant="outline" className="text-xs">
                          Utgrävd
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {fortress.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{fortress.country}{fortress.region && `, ${fortress.region}`}</span>
                      </div>
                      
                      {fortress.construction_period && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{fortress.construction_period}</span>
                        </div>
                      )}
                      
                      {fortress.diameter_meters && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ruler className="h-4 w-4" />
                          <span>Diameter: {fortress.diameter_meters}m</span>
                        </div>
                      )}
                      
                      {fortress.area_hectares && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ruler className="h-4 w-4" />
                          <span>Yta: {fortress.area_hectares} hektar</span>
                        </div>
                      )}
                    </div>

                    {fortress.historical_significance && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          <strong>Historisk betydelse:</strong> {fortress.historical_significance}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFortresses.length === 0 && (
              <Card className="viking-card">
                <CardContent className="text-center py-8">
                  <Castle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Inga befästningar hittades</h3>
                  <p className="text-muted-foreground">
                    Inga befästningar av den valda typen hittades.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cities" className="space-y-6">
            <Card className="viking-card">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Building className="h-5 w-5 text-accent" />
                  Städer översikt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{cities?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Totalt antal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {cities?.filter(c => c.unesco_site).length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">UNESCO-platser</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {cities?.filter(c => c.category === 'trading_post').length || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Handelsplatser</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">
                      {new Set(cities?.map(c => c.country) || []).size}
                    </div>
                    <div className="text-sm text-muted-foreground">Länder</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              {cityCategories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCityCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCityCategory(category.value)}
                  className="text-sm"
                >
                  {category.label}
                  {category.value !== 'all' && (
                    <Badge variant="secondary" className="ml-2">
                      {(cities || []).filter(c => c.category === category.value).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCities.map((city) => (
                <Card 
                  key={city.id} 
                  id={`city-${city.id}`}
                  className={`viking-card hover:bg-card/80 transition-colors animate-fade-in cursor-pointer ${
                    highlightedLocation?.id === city.id && highlightedLocation?.type === 'city' 
                      ? 'ring-2 ring-accent' 
                      : ''
                  }`}
                  onMouseEnter={() => handleCardHover(city.id, 'city')}
                  onMouseLeave={handleCardLeave}
                  onClick={() => handleLocationClick(city, 'city')}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-foreground text-lg flex items-center gap-2">
                      {getCityIcon(city.category)}
                      {city.name}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                        style={{ backgroundColor: getCategoryColor(city.category) + '20', color: getCategoryColor(city.category) }}
                      >
                        {getCategoryLabel(city.category)}
                      </Badge>
                      {city.unesco_site && (
                        <Badge variant="default" className="text-xs bg-accent">
                          UNESCO
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {city.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{city.country}{city.region && `, ${city.region}`}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{city.period_start} - {city.period_end}</span>
                      </div>
                      
                      {city.population_estimate && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>Befolkning: ~{city.population_estimate}</span>
                        </div>
                      )}
                    </div>

                    {city.historical_significance && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          <strong>Historisk betydelse:</strong> {city.historical_significance}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCities.length === 0 && (
              <Card className="viking-card">
                <CardContent className="text-center py-8">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Inga städer hittades</h3>
                  <p className="text-muted-foreground">
                    Inga städer av den valda kategorin hittades.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Fortresses;
