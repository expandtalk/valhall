import React from 'react';
import { Eye, Zap, Mountain, Heart, Shield, Crown, Sword, Sunrise, Wind, Trees } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GodData {
  name: string;
  nameOldNorse: string;
  category: 'aesir' | 'vanir' | 'giant' | 'other';
  domain: string[];
  description: string;
  symbols: string[];
  mentions: number;
  icon: React.ReactNode;
  color: string;
  importance: number; // 1-10, where 10 is most important
}

const VIKING_GODS_SORTED: GodData[] = [
  {
    name: 'Oden',
    nameOldNorse: 'Óðinn',
    category: 'aesir',
    domain: ['Visdom', 'Krig', 'Död', 'Poesi'],
    description: 'Allfather, högste gud bland asarna. Envägd gud som offrade sitt öga för visdom.',
    symbols: ['Gungnir', 'Sleipner', 'Huginn & Muninn'],
    mentions: 145,
    icon: <Eye className="h-5 w-5" />,
    color: 'from-blue-600 to-purple-700',
    importance: 10
  },
  {
    name: 'Tor',
    nameOldNorse: 'Þórr',
    category: 'aesir',
    domain: ['Åska', 'Styrka', 'Beskydd'],
    description: 'Åskguden, folkets beskyddare mot jättar och ondska. Son till Oden.',
    symbols: ['Mjölnir', 'Järnhandskar', 'Megingjörð'],
    mentions: 287,
    icon: <Zap className="h-5 w-5" />,
    color: 'from-yellow-500 to-red-600',
    importance: 9
  },
  {
    name: 'Frej',
    nameOldNorse: 'Freyr',
    category: 'vanir',
    domain: ['Fruktbarhet', 'Välstånd', 'Fred'],
    description: 'Fruktbarhets- och välståndsgud från vanernas släkt. Herre över Alfheim.',
    symbols: ['Gullinbursti', 'Skidbladner', 'Kornax'],
    mentions: 89,
    icon: <Mountain className="h-5 w-5" />,
    color: 'from-green-500 to-emerald-600',
    importance: 8
  },
  {
    name: 'Freja',
    nameOldNorse: 'Freyja',
    category: 'vanir',
    domain: ['Kärlek', 'Skönhet', 'Fruktbarhet'],
    description: 'Kärlekens och skönhetens gudinna. Syster till Frej och mäktigaste gudinna.',
    symbols: ['Brísingamen', 'Hildisvín', 'Seidr'],
    mentions: 76,
    icon: <Heart className="h-5 w-5" />,
    color: 'from-pink-500 to-rose-600',
    importance: 8
  },
  {
    name: 'Frigg',
    nameOldNorse: 'Frigg',
    category: 'aesir',
    domain: ['Modersskap', 'Äktenskap', 'Hem'],
    description: 'Odins hustru och moderskapets gudinna. Kan se framtiden men berättar aldrig vad hon vet.',
    symbols: ['Spinnrock', 'Falkham', 'Nyckel'],
    mentions: 34,
    icon: <Crown className="h-5 w-5" />,
    color: 'from-purple-500 to-indigo-600',
    importance: 7
  },
  {
    name: 'Balder',
    nameOldNorse: 'Baldr',
    category: 'aesir',
    domain: ['Ljus', 'Godhet', 'Renhet'],
    description: 'Ljusets och godhetens gud, vackraste av alla gudar. Odins och Friggs älskade son.',
    symbols: ['Hringhorni', 'Draupnir', 'Ljus'],
    mentions: 42,
    icon: <Sunrise className="h-5 w-5" />,
    color: 'from-yellow-400 to-orange-500',
    importance: 7
  },
  {
    name: 'Ull',
    nameOldNorse: 'Ullr',
    category: 'aesir',
    domain: ['Jakt', 'Bågskytte', 'Vinter'],
    description: 'Jaktens och bågskyttes gud. Styvson till Tor och expert på skidor.',
    symbols: ['Båge', 'Skidor', 'Sköld'],
    mentions: 28,
    icon: <Sword className="h-5 w-5" />,
    color: 'from-blue-400 to-cyan-600',
    importance: 6
  },
  {
    name: 'Njord',
    nameOldNorse: 'Njörðr',
    category: 'vanir',
    domain: ['Hav', 'Vind', 'Rikedom'],
    description: 'Havets och vindens gud. Far till Frej och Freja, från vanernas släkt.',
    symbols: ['Hav', 'Skepp', 'Fiskenät'],
    mentions: 31,
    icon: <Wind className="h-5 w-5" />,
    color: 'from-blue-500 to-teal-600',
    importance: 6
  },
  {
    name: 'Tyr',
    nameOldNorse: 'Týr',
    category: 'aesir',
    domain: ['Krig', 'Rättvisa', 'Mod'],
    description: 'Krigsgud och rättvisa. Offrade sin hand för att binda Fenrisulven.',
    symbols: ['Svärd', 'Rättvåg', 'Kedja'],
    mentions: 24,
    icon: <Shield className="h-5 w-5" />,
    color: 'from-red-500 to-orange-600',
    importance: 6
  },
  {
    name: 'Idun',
    nameOldNorse: 'Iðunn',
    category: 'aesir',
    domain: ['Ungdom', 'Förnyelse'],
    description: 'Ungdomens gudinna som bevarar gudarnas ungdom med sina magiska äpplen.',
    symbols: ['Äpplen', 'Vår', 'Ungdom'],
    mentions: 16,
    icon: <Trees className="h-5 w-5" />,
    color: 'from-green-400 to-lime-500',
    importance: 5
  }
];

interface GodCardsGridProps {
  onGodSelect?: (godName: string) => void;
}

export const GodCardsGrid: React.FC<GodCardsGridProps> = ({ onGodSelect }) => {
  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'aesir': return 'bg-blue-600 text-white';
      case 'vanir': return 'bg-green-600 text-white';
      case 'giant': return 'bg-red-600 text-white';
      case 'other': return 'bg-purple-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'aesir': return 'Aser';
      case 'vanir': return 'Vaner';
      case 'giant': return 'Jätte';
      case 'other': return 'Övrigt';
      default: return category;
    }
  };

  return (
    <div className="w-full bg-background/95 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-2">Nordiska Gudar</h2>
          <p className="text-muted-foreground">Klicka på en gud för att se platser kopplade till deras dyrkan</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {VIKING_GODS_SORTED.map((god) => (
            <Card 
              key={god.name} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
              onClick={() => onGodSelect?.(god.name)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${god.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200`}>
                    {god.icon}
                  </div>
                  <Badge className={getCategoryBadgeColor(god.category)} variant="secondary">
                    {getCategoryName(god.category)}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-lg">{god.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{god.nameOldNorse}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Områden:</p>
                  <div className="flex flex-wrap gap-1">
                    {god.domain.slice(0, 3).map((domain) => (
                      <Badge key={domain} variant="outline" className="text-xs">
                        {domain}
                      </Badge>
                    ))}
                    {god.domain.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{god.domain.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {god.description}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    {god.mentions} omnämnanden
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full mr-1 ${
                          i < god.importance / 2 ? 'bg-yellow-400' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};