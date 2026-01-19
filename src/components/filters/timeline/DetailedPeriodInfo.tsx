
import React from 'react';
import { GermanicTimelinePeriod } from '@/utils/germanicTimeline/timelineData';
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from 'lucide-react';

interface DetailedPeriodInfoProps {
  period: GermanicTimelinePeriod;
  language: string;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export const DetailedPeriodInfo: React.FC<DetailedPeriodInfoProps> = ({
  period,
  language,
  isExpanded,
  onToggleExpanded
}) => {
  const formatYear = (year: number): string => {
    if (year < 0) {
      return `${Math.abs(year)} ${language === 'sv' ? 'f.Kr.' : 'BCE'}`;
    }
    return `${year} ${language === 'sv' ? 'e.Kr.' : 'CE'}`;
  };

  const basicInfo = language === 'sv' ? period.basicInfo : period.basicInfoEn;
  const extendedInfo = language === 'sv' ? period.extendedInfo : period.extendedInfoEn;
  const finds = period.interestingFinds;

  if (!basicInfo) return null;

  return (
    <div className="space-y-3 bg-slate-800/30 rounded-lg p-4">
      {/* Period header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="text-amber-300 font-medium text-sm">
            {language === 'sv' ? period.name : period.nameEn}
          </h4>
          <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-200">
            {formatYear(period.startYear)} - {formatYear(period.endYear)}
          </Badge>
        </div>
        <button
          onClick={onToggleExpanded}
          className="text-amber-300 hover:text-amber-200 transition-colors"
        >
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Basic info - always visible */}
      <div className="space-y-2">
        <h5 className="text-xs font-medium text-amber-400">
          {language === 'sv' ? 'Grundinfo:' : 'Basic Info:'}
        </h5>
        <div className="grid grid-cols-1 gap-2 text-xs text-amber-100/90">
          <div><span className="text-amber-300">Klimat:</span> {basicInfo.climate}</div>
          <div><span className="text-amber-300">Miljö:</span> {basicInfo.environment}</div>
          <div><span className="text-amber-300">Människor:</span> {basicInfo.people}</div>
          <div><span className="text-amber-300">Livsstil:</span> {basicInfo.lifestyle}</div>
          {basicInfo.technology && <div><span className="text-amber-300">Teknologi:</span> {basicInfo.technology}</div>}
          {basicInfo.society && <div><span className="text-amber-300">Samhälle:</span> {basicInfo.society}</div>}
          {basicInfo.religion && <div><span className="text-amber-300">Religion:</span> {basicInfo.religion}</div>}
        </div>
      </div>

      {/* Extended info - expandable */}
      {isExpanded && extendedInfo && (
        <div className="space-y-3 pt-2 border-t border-amber-500/20">
          <h5 className="text-xs font-medium text-amber-400">
            {language === 'sv' ? 'Utökad info:' : 'Extended Info:'}
          </h5>
          
          <div className="space-y-3 text-xs text-amber-100/80">
            {extendedInfo.cultures && extendedInfo.cultures.length > 0 && (
              <div>
                <span className="text-amber-300 font-medium">Kulturer:</span>
                <ul className="mt-1 ml-3 space-y-1">
                  {extendedInfo.cultures.map((culture, idx) => (
                    <li key={idx} className="text-amber-100/70">• {culture}</li>
                  ))}
                </ul>
              </div>
            )}

            {extendedInfo.settlements && extendedInfo.settlements.length > 0 && (
              <div>
                <span className="text-amber-300 font-medium">Boplatser:</span>
                <ul className="mt-1 ml-3 space-y-1">
                  {extendedInfo.settlements.map((settlement, idx) => (
                    <li key={idx} className="text-amber-100/70">• {settlement}</li>
                  ))}
                </ul>
              </div>
            )}

            {extendedInfo.tools && extendedInfo.tools.length > 0 && (
              <div>
                <span className="text-amber-300 font-medium">Verktyg:</span>
                <ul className="mt-1 ml-3 space-y-1">
                  {extendedInfo.tools.map((tool, idx) => (
                    <li key={idx} className="text-amber-100/70">• {tool}</li>
                  ))}
                </ul>
              </div>
            )}

            {extendedInfo.megafauna && extendedInfo.megafauna.length > 0 && (
              <div>
                <span className="text-amber-300 font-medium">Megafauna:</span>
                <ul className="mt-1 ml-3 space-y-1">
                  {extendedInfo.megafauna.map((animal, idx) => (
                    <li key={idx} className="text-amber-100/70">• {animal}</li>
                  ))}
                </ul>
              </div>
            )}

            {extendedInfo.trade && extendedInfo.trade.length > 0 && (
              <div>
                <span className="text-amber-300 font-medium">Handel:</span>
                <ul className="mt-1 ml-3 space-y-1">
                  {extendedInfo.trade.map((trade, idx) => (
                    <li key={idx} className="text-amber-100/70">• {trade}</li>
                  ))}
                </ul>
              </div>
            )}

            {extendedInfo.dna && (
              <div>
                <span className="text-amber-300 font-medium">DNA:</span> {extendedInfo.dna}
              </div>
            )}

            {extendedInfo.disasters && extendedInfo.disasters.length > 0 && (
              <div>
                <span className="text-amber-300 font-medium">Naturkatastrofer:</span>
                <ul className="mt-1 ml-3 space-y-1">
                  {extendedInfo.disasters.map((disaster, idx) => (
                    <li key={idx} className="text-amber-100/70">• {disaster}</li>
                  ))}
                </ul>
              </div>
            )}

            {extendedInfo.contemporary && extendedInfo.contemporary.length > 0 && (
              <div>
                <span className="text-amber-300 font-medium">Samtidigt:</span>
                <ul className="mt-1 ml-3 space-y-1">
                  {extendedInfo.contemporary.map((event, idx) => (
                    <li key={idx} className="text-amber-100/70">• {event}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interesting finds - only if expanded and available */}
      {isExpanded && finds && (
        <div className="space-y-3 pt-2 border-t border-amber-500/20">
          <h5 className="text-xs font-medium text-amber-400">
            {language === 'sv' ? finds.title : finds.titleEn}
          </h5>
          
          <div className="space-y-3">
            {finds.categories.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <h6 className="text-xs font-medium text-amber-300">
                  {language === 'sv' ? category.name : category.nameEn}:
                </h6>
                <ul className="ml-3 space-y-1 text-xs text-amber-100/70">
                  {(language === 'sv' ? category.items : category.itemsEn).map((item, itemIdx) => (
                    <li key={itemIdx}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
