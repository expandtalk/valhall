import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { TradeRouteTimeline } from './TradeRouteTimeline';
import { VIKING_TRADE_ROUTES } from '@/data/tradeRoutes';
import { TRADE_GOODS } from '@/data/tradeGoods';
import { Ship } from 'lucide-react';

interface TradeRoutesPanelProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
  selectedRoutes: string[];
  onRouteToggle: (routeId: string) => void;
}

export const TradeRoutesPanel: React.FC<TradeRoutesPanelProps> = ({
  selectedYear,
  onYearChange,
  selectedRoutes,
  onRouteToggle
}) => {
  const { language } = useLanguage();

  const activeRoutes = VIKING_TRADE_ROUTES.filter(
    route => selectedYear >= route.periodStart && selectedYear <= route.periodEnd
  );

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-background/95 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <Ship className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">
            {language === 'sv' ? 'Handelsrutter' : 'Trade Routes'}
          </h3>
        </div>

        <div className="space-y-3">
          {activeRoutes.map(route => {
            const isSelected = selectedRoutes.includes(route.id);
            const goods = TRADE_GOODS.filter(good => 
              route.goods.some(g => g.toLowerCase().includes(good.id))
            );

            return (
              <div
                key={route.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-background/50 border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onRouteToggle(route.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: route.color }}
                      />
                      <span className="font-semibold">
                        {language === 'sv' ? route.name : route.nameEn}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {route.period}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {goods.slice(0, 4).map(good => {
                        const Icon = good.icon;
                        return (
                          <div
                            key={good.id}
                            className="flex items-center gap-1 px-2 py-1 rounded text-xs bg-background/80"
                            title={language === 'sv' ? good.name : good.nameEn}
                          >
                            <Icon className="h-3 w-3" style={{ color: good.color }} />
                            <span>{language === 'sv' ? good.name : good.nameEn}</span>
                          </div>
                        );
                      })}
                      {goods.length > 4 && (
                        <span className="text-xs text-muted-foreground px-2">
                          +{goods.length - 4} {language === 'sv' ? 'fler' : 'more'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {activeRoutes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {language === 'sv' 
              ? 'Inga handelsrutter aktiva under detta år' 
              : 'No trade routes active during this year'}
          </div>
        )}
      </Card>

      <TradeRouteTimeline
        selectedYear={selectedYear}
        onYearChange={onYearChange}
        minYear={-500}
        maxYear={1200}
      />

      <Card className="p-4 bg-background/95 backdrop-blur">
        <h4 className="font-semibold mb-3">
          {language === 'sv' ? 'Varulegend' : 'Goods Legend'}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {TRADE_GOODS.map(good => {
            const Icon = good.icon;
            return (
              <div key={good.id} className="flex items-center gap-2 text-sm">
                <Icon className="h-4 w-4" style={{ color: good.color }} />
                <span>{language === 'sv' ? good.name : good.nameEn}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
