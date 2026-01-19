import React from 'react';
import { useHistoricalEvents } from '@/hooks/useHistoricalEvents';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface HistoricalEventsIntegrationProps {
  selectedRegion?: string;
  selectedPeriod?: string;
  yearRange?: [number, number];
}

export const HistoricalEventsIntegration: React.FC<HistoricalEventsIntegrationProps> = ({
  selectedRegion,
  selectedPeriod,
  yearRange
}) => {
  const { language } = useLanguage();
  const { data: events = [], isLoading } = useHistoricalEvents();

  // Filter events based on criteria
  const filteredEvents = React.useMemo(() => {
    let filtered = events;

    // Filter by year range if provided
    if (yearRange) {
      const [startYear, endYear] = yearRange;
      filtered = filtered.filter(event => 
        event.year_start >= startYear && event.year_start <= endYear
      );
    }

    // Filter by region if provided
    if (selectedRegion && selectedRegion !== 'all') {
      filtered = filtered.filter(event => 
        event.region_affected?.some(region => 
          region.toLowerCase().includes(selectedRegion.toLowerCase())
        )
      );
    }

    return filtered.sort((a, b) => a.year_start - b.year_start);
  }, [events, yearRange, selectedRegion]);

  const getEventTypeColor = (eventType: string): string => {
    const colors: { [key: string]: string } = {
      'raid': 'destructive',
      'settlement': 'secondary',
      'political': 'default',
      'military': 'destructive',
      'religious': 'secondary',
      'trade': 'secondary'
    };
    return colors[eventType] || 'outline';
  };

  const getEventTypeLabel = (eventType: string): string => {
    const labels: { [key: string]: string } = {
      'raid': language === 'sv' ? 'Plundring' : 'Raid',
      'settlement': language === 'sv' ? 'Bosättning' : 'Settlement',
      'political': language === 'sv' ? 'Politik' : 'Political',
      'military': language === 'sv' ? 'Militärt' : 'Military',
      'religious': language === 'sv' ? 'Religiöst' : 'Religious',
      'trade': language === 'sv' ? 'Handel' : 'Trade'
    };
    return labels[eventType] || eventType;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            {language === 'sv' ? 'Historiska händelser' : 'Historical Events'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {language === 'sv' ? 'Laddar...' : 'Loading...'}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">
            {language === 'sv' ? 'Historiska händelser' : 'Historical Events'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {language === 'sv' 
              ? 'Inga händelser hittade för vald period'
              : 'No events found for selected period'
            }
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          <span>
            {language === 'sv' ? 'Historiska händelser' : 'Historical Events'}
          </span>
          <Badge variant="outline" className="text-xs">
            {filteredEvents.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredEvents.slice(0, 10).map((event) => (
          <div 
            key={event.id}
            className="border-l-2 border-muted pl-3 py-2 space-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">
                {language === 'sv' ? event.event_name : event.event_name_en}
              </div>
              <div className="text-xs text-muted-foreground">
                {event.year_end && event.year_end !== event.year_start
                  ? `${event.year_start}-${event.year_end}`
                  : event.year_start
                }
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                variant={getEventTypeColor(event.event_type) as any}
                className="text-xs"
              >
                {getEventTypeLabel(event.event_type)}
              </Badge>
              
              {event.significance_level === 'very_high' && (
                <Badge variant="destructive" className="text-xs">
                  {language === 'sv' ? 'Mycket viktigt' : 'Very important'}
                </Badge>
              )}
            </div>

            {event.region_affected && event.region_affected.length > 0 && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">
                  {language === 'sv' ? 'Regioner:' : 'Regions:'}
                </span>{' '}
                {event.region_affected.slice(0, 3).join(', ')}
                {event.region_affected.length > 3 && '...'}
              </div>
            )}

            {(event.description || event.description_en) && (
              <div className="text-xs text-muted-foreground line-clamp-2">
                {language === 'sv' ? event.description : event.description_en}
              </div>
            )}
          </div>
        ))}
        
        {filteredEvents.length > 10 && (
          <div className="text-xs text-muted-foreground text-center pt-2">
            {language === 'sv' 
              ? `... och ${filteredEvents.length - 10} fler händelser`
              : `... and ${filteredEvents.length - 10} more events`
            }
          </div>
        )}
      </CardContent>
    </Card>
  );
};