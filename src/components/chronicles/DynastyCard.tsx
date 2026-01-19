
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin } from 'lucide-react';
import type { RoyalDynasty } from '@/hooks/useRoyalChronicles';

interface DynastyCardProps {
  dynasty: RoyalDynasty;
}

export const DynastyCard: React.FC<DynastyCardProps> = ({ dynasty }) => {
  return (
    <Card className="bg-slate-800/60 backdrop-blur-md border-slate-600/30">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-white font-semibold text-lg">{dynasty.name}</h3>
          <Users className="h-5 w-5 text-purple-400" />
        </div>
        
        <div className="text-slate-400 text-sm space-y-1 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {dynasty.region}
          </div>
          {dynasty.period_start && dynasty.period_end && (
            <div>Period: {dynasty.period_start}–{dynasty.period_end}</div>
          )}
        </div>
        
        {dynasty.description && (
          <p className="text-slate-300 text-sm">
            {dynasty.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
