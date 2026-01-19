
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Crown, Book, AlertTriangle, Info } from 'lucide-react';
import type { HistoricalKing, KingSourceMention } from '@/hooks/useRoyalChronicles';
import { KingCard } from './KingCard';
import { KingSourceMentions } from './KingSourceMentions';

interface SagaKingsViewProps {
  sagaKings: HistoricalKing[];
  onKingSelect: (kingId: string) => void;
  selectedKing: string | null;
  sourceMentions?: KingSourceMention[];
}

export const SagaKingsView: React.FC<SagaKingsViewProps> = ({
  sagaKings,
  onKingSelect,
  selectedKing,
  sourceMentions
}) => {
  // Group saga kings by category
  const ynglingaKings = sagaKings.filter(king => 
    king.dynasty?.name?.toLowerCase().includes('yngling') ||
    king.description?.toLowerCase().includes('yngling')
  );

  const possiblyHistoricalKings = sagaKings.filter(king => 
    king.name.toLowerCase().includes('ragnar') ||
    king.name.toLowerCase().includes('ottar') ||
    king.name.toLowerCase().includes('adils') ||
    king.name.toLowerCase().includes('hugleik') ||
    king.name.toLowerCase().includes('hygelac') ||
    king.name.toLowerCase().includes('ivar vidfamne')
  );

  const otherSagaKings = sagaKings.filter(king => 
    !ynglingaKings.includes(king) && !possiblyHistoricalKings.includes(king)
  );

  const SagaKingSection = ({ 
    title, 
    description, 
    kings, 
    icon: Icon, 
    badgeColor 
  }: {
    title: string;
    description: string;
    kings: HistoricalKing[];
    icon: React.ComponentType<any>;
    badgeColor: string;
  }) => (
    <Card className="bg-slate-800/40 border-slate-600/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
          <Badge className={`${badgeColor} text-white ml-2`}>
            {kings.length}
          </Badge>
        </CardTitle>
        <p className="text-slate-300 text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        {kings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kings.map((king) => (
              <KingCard 
                key={king.id} 
                king={king}
                onClick={() => onKingSelect(king.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-slate-400">Inga kungar i denna kategori</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Information panel about saga kings */}
      <Card className="bg-blue-900/20 border-blue-600/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Info className="h-5 w-5" />
            Om sagokungar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-slate-300 space-y-2 text-sm">
            <p>
              <strong>Sagokungar</strong> är härskare som huvudsakligen finns i sagolitteratur och 
              som saknar tillförlitliga historiska bevis för sin existens.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-purple-900/30 p-3 rounded">
                <h4 className="font-semibold text-purple-300">Rena sagor</h4>
                <p className="text-xs">Ynglingaätten och andra utan historisk grund</p>
              </div>
              <div className="bg-orange-900/30 p-3 rounded">
                <h4 className="font-semibold text-orange-300">Möjligen historiska</h4>
                <p className="text-xs">Med runstenar, arkeologi eller externa källor</p>
              </div>
              <div className="bg-red-900/30 p-3 rounded">
                <h4 className="font-semibold text-red-300">Övriga sagokungar</h4>
                <p className="text-xs">Legendära gestalter från olika traditioner</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Possibly historical saga kings */}
      <SagaKingSection
        title="Möjligen historiska sagokungar"
        description="Kungar med runstenar, arkeologiska fynd eller externa källor som stöd"
        kings={possiblyHistoricalKings}
        icon={AlertTriangle}
        badgeColor="bg-orange-600"
      />

      {/* Ynglinga dynasty */}
      <SagaKingSection
        title="Ynglingaätten"
        description="Legendarisk dynasti utan historisk grund, men central i nordisk sagotradition"
        kings={ynglingaKings}
        icon={Crown}
        badgeColor="bg-purple-600"
      />

      {/* Other saga kings */}
      <SagaKingSection
        title="Övriga sagokungar"
        description="Andra legendära härskare från nordisk sagotradition"
        kings={otherSagaKings}
        icon={Sparkles}
        badgeColor="bg-red-600"
      />

      {/* Show source mentions if a king is selected */}
      {selectedKing && sourceMentions && sourceMentions.length > 0 && (
        <KingSourceMentions sourceMentions={sourceMentions} />
      )}

      {/* Empty state */}
      {sagaKings.length === 0 && (
        <div className="text-center py-12">
          <Sparkles className="h-16 w-16 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 text-xl mb-2">Inga sagokungar hittades</p>
          <p className="text-slate-500">
            Sagokungar är kungar med status "legendary" i databasen
          </p>
        </div>
      )}
    </div>
  );
};
