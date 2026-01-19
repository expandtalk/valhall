
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Layers, Mountain, Users, Ship, Swords } from 'lucide-react';

const PERIODS = [
  { id: 'paleolithic', label: 'Paleolitikum', years: 'före 10,000 f.Kr.', icon: Mountain },
  { id: 'mesolithic', label: 'Mesolitikum', years: '10,000-4,000 f.Kr.', icon: Mountain },
  { id: 'neolithic', label: 'Neolitikum', years: '4,000-1,700 f.Kr.', icon: Mountain },
  { id: 'bronze_age', label: 'Bronsålder', years: '1,700-500 f.Kr.', icon: Swords },
  { id: 'pre_roman_iron', label: 'Förromersktid', years: '500 f.Kr.-1 e.Kr.', icon: Users },
  { id: 'roman_iron', label: 'Romersktid', years: '1-400 e.Kr.', icon: Users },
  { id: 'migration_period', label: 'Folkvandringstid', years: '400-550 e.Kr.', icon: Users },
  { id: 'vendel_period', label: 'Vendeltid', years: '550-793 e.Kr.', icon: Ship },
  { id: 'viking_age', label: 'Vikingatid', years: '793-1066 e.Kr.', icon: Ship }
];

const LAYER_CATEGORIES = {
  geographical: {
    label: 'Geografiska lager',
    items: [
      { id: 'ice_sheet', label: 'Inlandsis', description: 'Glaciärer under istiden' },
      { id: 'post_glacial_rebound', label: 'Landhöjning', description: 'Post-glacial terränghöjning' },
      { id: 'ancient_coastline', label: 'Forntida kustlinje', description: 'Kustlinjer genom tiderna' },
      { id: 'ancient_lakes', label: 'Forntida sjöar', description: 'Ancylussjön, Littorinajhavet' },
      { id: 'river_systems_ancient', label: 'Forntida vattensystem', description: 'Gamla floder och åar' }
    ]
  },
  cultural: {
    label: 'Kulturella lager',
    items: [
      { id: 'settlements', label: 'Bosättningar', description: 'Boplatser per period' },
      { id: 'burial_sites', label: 'Gravplatser', description: 'Gravar och gravfält' },
      { id: 'cult_sites', label: 'Kultplatser', description: 'Religiösa och rituella platser' },
      { id: 'trade_routes', label: 'Handelsvägar', description: 'Handelsrutter per period' },
      { id: 'fortifications', label: 'Befästningar', description: 'Försvarsanläggningar' }
    ]
  },
  archaeological: {
    label: 'Arkeologiska lager',
    items: [
      { id: 'artifact_finds', label: 'Fynd', description: 'Arkeologiska fynd' },
      { id: 'hoards', label: 'Skatfynd', description: 'Depåfynd och skatter' },
      { id: 'rock_art', label: 'Hällristningar', description: 'Bergkonst och ristningar' },
      { id: 'rune_stones', label: 'Runstenar', description: 'Runinskrifter' },
      { id: 'inscriptions', label: 'Inskrifter', description: 'Alla typer av inskrifter' }
    ]
  },
  migration: {
    label: 'Folkrörelser',
    items: [
      { id: 'migration_routes', label: 'Migrationsrutter', description: 'Folkvandringar' },
      { id: 'tribal_territories', label: 'Stamområden', description: 'Etniska gruppers territorier' },
      { id: 'cultural_influence', label: 'Kulturpåverkan', description: 'Kulturell spridning' },
      { id: 'trade_networks', label: 'Handelsnätverk', description: 'Handelskontakter' }
    ]
  }
};

export const PeriodLayerManager: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('viking_age');
  const [periodConfig, setPeriodConfig] = useState<any>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleLayerToggle = (categoryId: string, itemId: string) => {
    setPeriodConfig((prev: any) => ({
      ...prev,
      [selectedPeriod]: {
        ...prev[selectedPeriod],
        [categoryId]: {
          ...prev[selectedPeriod]?.[categoryId],
          [itemId]: !prev[selectedPeriod]?.[categoryId]?.[itemId]
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  const getCurrentPeriod = () => PERIODS.find(p => p.id === selectedPeriod);
  const PeriodIcon = getCurrentPeriod()?.icon || Clock;

  const handleSaveChanges = () => {
    console.log('Saving period configuration:', periodConfig);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <Card className="bg-slate-800/60 backdrop-blur-md border-slate-600/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Tidsperiod-specifika Kartlager
          </CardTitle>
          <p className="text-slate-300 text-sm">
            Konfigurera vilka kartlager som ska visas för varje historisk period
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PERIODS.map((period) => {
              const IconComponent = period.icon;
              const isSelected = selectedPeriod === period.id;
              
              return (
                <Button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={`h-auto p-3 flex flex-col items-start gap-1 text-left ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-slate-700/50 hover:bg-slate-600/60 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm font-medium">{period.label}</span>
                  </div>
                  <span className="text-xs opacity-75">{period.years}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Layer Configuration */}
      <Card className="bg-slate-800/60 backdrop-blur-md border-slate-600/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PeriodIcon className="h-5 w-5 text-white" />
              <CardTitle className="text-white text-lg">
                {getCurrentPeriod()?.label} - Kartlager
              </CardTitle>
            </div>
            
            {hasUnsavedChanges && (
              <Button onClick={handleSaveChanges} size="sm" className="bg-green-600 hover:bg-green-700">
                Spara ändringar
              </Button>
            )}
          </div>
          <p className="text-slate-300 text-sm">
            {getCurrentPeriod()?.years}
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="geographical" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700/60">
              {Object.entries(LAYER_CATEGORIES).map(([key, category]) => (
                <TabsTrigger key={key} value={key} className="text-xs">
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(LAYER_CATEGORIES).map(([categoryKey, category]) => (
              <TabsContent key={categoryKey} value={categoryKey} className="space-y-3">
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex-1">
                        <Label className="text-white font-medium block">{item.label}</Label>
                        <p className="text-slate-300 text-xs mt-1">{item.description}</p>
                      </div>
                      
                      <Switch
                        checked={periodConfig[selectedPeriod]?.[categoryKey]?.[item.id] ?? false}
                        onCheckedChange={() => handleLayerToggle(categoryKey, item.id)}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
