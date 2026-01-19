
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, MapPin, Calendar } from 'lucide-react';
import { useCarverData } from '@/hooks/useCarverData';

interface CarverOverviewPanelProps {
  onCarverSelect: (carverId: string) => void;
  selectedCarverId?: string;
}

export const CarverOverviewPanel: React.FC<CarverOverviewPanelProps> = ({
  onCarverSelect,
  selectedCarverId
}) => {
  const { carvers, isLoading, totalCarvers } = useCarverData();

  if (isLoading) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="text-white">Laddar runristare...</div>
        </CardContent>
      </Card>
    );
  }

  const formatPeriod = (start: number | null, end: number | null) => {
    if (!start && !end) return 'Okänd period';
    if (start && end) return `${start}-${end}`;
    if (start) return `från ${start}`;
    if (end) return `till ${end}`;
    return 'Okänd period';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <User className="h-5 w-5 text-purple-400" />
          Runristare ({totalCarvers})
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <ScrollArea className="h-[400px]">
          <div className="space-y-3">
            {carvers.map((carver) => (
              <div
                key={carver.id}
                className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                  selectedCarverId === carver.id
                    ? 'bg-purple-500/20 border-purple-400'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => onCarverSelect(carver.id)}
              >
                 <div className="flex items-start justify-between">
                   <div className="flex-1">
                     <h3 className="text-white font-semibold text-base">{carver.name}</h3>
                     
                     {/* Enhanced Statistics with Emojis */}
                     <div className="mt-2 space-y-1">
                       <div className="text-sm text-white">
                         📊 {carver.inscriptionCount} stenar totalt
                       </div>
                       
                       {(carver.signedCount > 0 || carver.attributedCount > 0) && (
                         <div className="text-xs text-slate-300">
                           {carver.signedCount > 0 && `✍️ ${carver.signedCount} signerad${carver.signedCount !== 1 ? 'e' : ''}`}
                           {carver.signedCount > 0 && carver.attributedCount > 0 && ' • '}
                           {carver.attributedCount > 0 && `📝 ${carver.attributedCount} tillskriven${carver.attributedCount !== 1 ? 'a' : ''}`}
                         </div>
                       )}
                       
                       {/* Certainty indicator */}
                       {carver.inscriptionCount > 0 && (
                         <div className="text-xs">
                           {carver.certainCount === carver.inscriptionCount ? (
                             <span className="text-green-400">✅ Alla säkra tillskrivningar</span>
                           ) : carver.uncertainCount > 0 ? (
                             <span className="text-yellow-400">⚠️ {carver.uncertainCount} osäker{carver.uncertainCount !== 1 ? 'a' : ''} tillskrivning{carver.uncertainCount !== 1 ? 'ar' : ''}</span>
                           ) : (
                             <span className="text-slate-400">ℹ️ Blandade tillskrivningar</span>
                           )}
                         </div>
                       )}
                     </div>

                     {/* Period and Region */}
                     <div className="flex flex-wrap gap-3 mt-2">
                       {carver.period_active_start && (
                         <div className="flex items-center gap-1 text-xs text-slate-400">
                           <Calendar className="h-3 w-3" />
                           {formatPeriod(carver.period_active_start, carver.period_active_end)}
                         </div>
                       )}
                       
                       {carver.region && (
                         <div className="flex items-center gap-1 text-xs text-slate-400">
                           <MapPin className="h-3 w-3" />
                           {carver.region}
                         </div>
                       )}
                     </div>

                     {/* Research Notes */}
                     {carver.description && (
                       <div className="mt-2 p-2 bg-white/5 rounded text-xs text-slate-300 border-l-2 border-blue-400/50">
                         🔍 <span className="font-medium">Forskning:</span> "{carver.description}"
                       </div>
                     )}
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
