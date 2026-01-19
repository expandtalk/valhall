
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GERMANIC_TIME_PERIODS } from '@/utils/germanicTimeline/periods';

interface PeriodButtonsProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  onPeriodSelect?: (period: any) => void;
  language: string;
}

export const PeriodButtons: React.FC<PeriodButtonsProps> = ({
  selectedPeriod,
  onPeriodChange,
  onPeriodSelect,
  language
}) => {
  const formatYear = (year: number): string => {
    if (year === 0) {
      return language === 'sv' ? 'Kristus födelse år 0' : 'Birth of Christ year 0';
    }
    if (year < 0) {
      return `${Math.abs(year)} ${language === 'sv' ? 'f.Kr.' : 'BCE'}`;
    }
    return `${year} ${language === 'sv' ? 'e.Kr.' : 'CE'}`;
  };

  const handlePeriodClick = (period: any) => {
    onPeriodChange(period.id);
    if (onPeriodSelect) {
      onPeriodSelect(period);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-amber-300">
        {language === 'sv' ? 'Välj period:' : 'Select period:'}
      </h4>
      <div className="flex flex-wrap gap-2">
        {GERMANIC_TIME_PERIODS.map((period) => (
          <div key={period.id} className="flex flex-col items-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handlePeriodClick(period)}
              className={`px-3 py-2 text-xs h-auto rounded transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-amber-600 text-white hover:bg-amber-700'
                  : 'bg-slate-700/40 text-amber-200 hover:bg-slate-600/60'
              }`}
            >
              {language === 'sv' ? period.name.split(' ')[0] : (period.nameEn?.split(' ')[0] || period.name.split(' ')[0])}
            </Button>
            <Badge variant="outline" className="text-xs mt-1 border-amber-500/30 text-amber-200">
              {formatYear(period.startYear)} - {formatYear(period.endYear)}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};
