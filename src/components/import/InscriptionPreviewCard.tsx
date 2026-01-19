
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface InscriptionPreviewCardProps {
  inscription: {
    signum: string;
    transliteration: string;
    period_start: number;
    period_end: number;
    location: string;
    province: string;
    complexity_level?: string;
    object_type: string;
  };
  maxTextLength?: number;
  showComplexityBadge?: boolean;
  showSpecialNote?: boolean;
  specialNote?: string;
}

export const InscriptionPreviewCard: React.FC<InscriptionPreviewCardProps> = ({
  inscription,
  maxTextLength = 60,
  showComplexityBadge = true,
  showSpecialNote = false,
  specialNote
}) => {
  const truncatedText = inscription.transliteration.length > maxTextLength 
    ? `${inscription.transliteration.substring(0, maxTextLength)}...`
    : inscription.transliteration;

  return (
    <div className="p-3 bg-black/20 rounded border border-white/10">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <h4 className="text-white font-semibold">{inscription.signum}</h4>
          {showComplexityBadge && inscription.complexity_level === 'complex' && (
            <Badge className="bg-red-500 text-white border-0 text-xs">
              Komplex
            </Badge>
          )}
        </div>
        <Badge className="bg-blue-500 text-white border-0 text-xs">
          {inscription.period_start}-{inscription.period_end}
        </Badge>
      </div>
      <p className="text-slate-300 text-sm mb-2 font-mono">
        {truncatedText}
      </p>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <MapPin className="h-3 w-3" />
        {inscription.location}, {inscription.province}
      </div>
      <p className="text-xs text-slate-400 mt-1">
        {inscription.object_type}
      </p>
      {showSpecialNote && specialNote && (
        <p className="text-xs text-amber-400 mt-1">
          {specialNote}
        </p>
      )}
    </div>
  );
};
