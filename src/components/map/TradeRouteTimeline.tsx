import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from 'lucide-react';

interface TradeRouteTimelineProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  minYear?: number;
  maxYear?: number;
}

export const TradeRouteTimeline: React.FC<TradeRouteTimelineProps> = ({
  selectedYear,
  onYearChange,
  minYear = 700,
  maxYear = 1200
}) => {
  const { language } = useLanguage();

  const formatYear = (year: number) => {
    if (year < 0) {
      return `${Math.abs(year)} ${language === 'sv' ? 'f.Kr.' : 'BCE'}`;
    }
    return `${year} ${language === 'sv' ? 'e.Kr.' : 'CE'}`;
  };

  const getPeriodName = (year: number) => {
    if (year < 550) return language === 'sv' ? 'Folkvandringstid' : 'Migration Period';
    if (year < 793) return language === 'sv' ? 'Vendeltid' : 'Vendel Period';
    if (year < 1050) return language === 'sv' ? 'Vikingatid' : 'Viking Age';
    if (year < 1350) return language === 'sv' ? 'Högmedeltid' : 'High Medieval';
    return language === 'sv' ? 'Senmedeltid' : 'Late Medieval';
  };

  return (
    <Card className="p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">
          {language === 'sv' ? 'Tidslinje' : 'Timeline'}
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{formatYear(minYear)}</span>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{formatYear(selectedYear)}</div>
            <div className="text-sm text-muted-foreground">{getPeriodName(selectedYear)}</div>
          </div>
          <span className="text-sm text-muted-foreground">{formatYear(maxYear)}</span>
        </div>

        <Slider
          value={[selectedYear]}
          onValueChange={(values) => onYearChange(values[0])}
          min={minYear}
          max={maxYear}
          step={10}
          className="w-full"
        />

        <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
          <button
            onClick={() => onYearChange(750)}
            className="hover:text-primary transition-colors"
          >
            750 {language === 'sv' ? '(tidig vikingatid)' : '(early Viking)'}
          </button>
          <button
            onClick={() => onYearChange(850)}
            className="hover:text-primary transition-colors"
          >
            850 {language === 'sv' ? '(höjdpunkt)' : '(peak)'}
          </button>
          <button
            onClick={() => onYearChange(1000)}
            className="hover:text-primary transition-colors"
          >
            1000 {language === 'sv' ? '(sen vikingatid)' : '(late Viking)'}
          </button>
          <button
            onClick={() => onYearChange(1150)}
            className="hover:text-primary transition-colors"
          >
            1150 {language === 'sv' ? '(medeltid)' : '(medieval)'}
          </button>
        </div>
      </div>
    </Card>
  );
};
