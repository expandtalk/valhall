
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Info } from 'lucide-react';

interface RiverSystemCardProps {
  system: any;
  onEdit: (system: any) => void; // Behålls för kompatibilitet
  onDelete: (system: any) => void; // Behålls för kompatibilitet  
  isLoading: boolean;
}

export const RiverSystemCard: React.FC<RiverSystemCardProps> = ({
  system,
  isLoading
}) => {
  const coordinateCount = system.coordinates?.length || 0;
  const tradingPosts = system.coordinates?.filter((coord: any) => coord.isTradingPost)?.length || 0;
  
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white text-lg">{system.name}</CardTitle>
            <p className="text-slate-400 text-sm mt-1">{system.nameEn}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-blue-400 text-blue-300">
              {system.importance || 'Sekundär'}
            </Badge>
            <Info className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-slate-300 text-sm">{system.description}</p>
        
        {system.historicalSignificance && (
          <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-3">
            <p className="text-amber-200 text-xs">{system.historicalSignificance}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="h-4 w-4" />
            <span>{coordinateCount} koordinater</span>
          </div>
          
          {tradingPosts > 0 && (
            <div className="text-slate-400">
              <span>{tradingPosts} handelsplatser</span>
            </div>
          )}
        </div>

        {system.period && (
          <div className="text-xs text-slate-400">
            <strong>Period:</strong> {system.period}
          </div>
        )}

        {/* Read-only indikator */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <Badge variant="secondary" className="bg-slate-700 text-slate-300">
            Skrivskyddad
          </Badge>
          <span className="text-xs text-slate-400">Historisk referens</span>
        </div>
      </CardContent>
    </Card>
  );
};
