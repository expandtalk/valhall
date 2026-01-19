
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { GERMANIC_TIME_PERIODS, GermanicTimelinePeriod } from '@/utils/germanicTimeline/timelineData';
import { DetailedPeriodInfo } from './DetailedPeriodInfo';

interface TimelineInfoProps {
  currentPeriod: GermanicTimelinePeriod | undefined;
  relevantGroupsCount: number;
  language: string;
}

export const TimelineInfo: React.FC<TimelineInfoProps> = ({
  currentPeriod,
  relevantGroupsCount,
  language
}) => {
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);
  
  const timelineLabel = language === 'sv' ? 'Germansk Tidslinje' : 'Germanic Timeline';

  // FIXED: Better period name display with fallbacks and proper handling of undefined periods
  const getPeriodDisplayName = (period: GermanicTimelinePeriod | undefined) => {
    if (!period) {
      return language === 'sv' ? 'Okänd period' : 'Unknown period';
    }
    
    if (language === 'sv') {
      return period.name || period.nameEn || (language === 'sv' ? 'Okänd period' : 'Unknown period');
    }
    return period.nameEn || period.name || (language === 'sv' ? 'Okänd period' : 'Unknown period');
  };

  const displayName = getPeriodDisplayName(currentPeriod);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-amber-300" />
        <span className="text-sm font-medium text-amber-300">{timelineLabel}</span>
        {currentPeriod && displayName && (
          <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-200">
            {displayName}
          </Badge>
        )}
      </div>

      {/* Germanic groups info */}
      {relevantGroupsCount > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-amber-300">
            {language === 'sv' ? 'Folkgrupper i denna period:' : 'Germanic Groups in this period:'}
          </h4>
          <div className="text-xs text-amber-200/80 bg-slate-700/30 rounded p-2">
            {language === 'sv' ? 'Visar' : 'Shows'} {relevantGroupsCount} {language === 'sv' ? 'folkgrupper på kartan' : 'groups on the map'}
          </div>
        </div>
      )}

      {/* Current period detailed description */}
      {currentPeriod ? (
        <DetailedPeriodInfo 
          period={currentPeriod}
          language={language}
          isExpanded={isDetailExpanded}
          onToggleExpanded={() => setIsDetailExpanded(!isDetailExpanded)}
        />
      ) : (
        /* Fallback for no period selected */
        <div className="text-xs text-amber-100/80 bg-slate-700/20 rounded p-2">
          {language === 'sv' ? 
            'Välj en period för att se detaljerad historisk information' : 
            'Select a period to see detailed historical information'}
        </div>
      )}
    </div>
  );
};
