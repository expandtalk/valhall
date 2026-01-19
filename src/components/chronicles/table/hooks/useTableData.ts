
import { useMemo } from 'react';
import { useHistoricalKings, useHistoricalSources, useRoyalDynasties } from '@/hooks/useRoyalChronicles';
import { useHistoricalEvents } from '@/hooks/useHistoricalEvents';
import type { HistoricalKing } from '@/hooks/useRoyalChronicles';
import type { HistoricalEvent } from '@/hooks/useHistoricalEvents';

interface TimelineEntry {
  period: string;
  periodStart: number;
  periodEnd: number;
  sweden?: HistoricalKing[];
  denmark?: HistoricalKing[];
  norway?: HistoricalKing[];
  kievrus?: HistoricalKing[];
  historicalEvents?: HistoricalEvent[];
}

export const useTableData = () => {
  const { data: kings } = useHistoricalKings();
  const { data: sources } = useHistoricalSources();
  const { data: dynasties } = useRoyalDynasties();
  const { data: events } = useHistoricalEvents();

  const timelineData = useMemo(() => {
    if (!kings) return [];

    // Group kings by their reign periods
    const kingsByRegion: { [region: string]: HistoricalKing[] } = {};
    
    kings.forEach(king => {
      if (king.reign_start && king.reign_end) {
        const region = king.region.toLowerCase();
        if (!kingsByRegion[region]) {
          kingsByRegion[region] = [];
        }
        kingsByRegion[region].push(king);
      }
    });

    // Sort kings within each region by reign start
    Object.keys(kingsByRegion).forEach(region => {
      kingsByRegion[region].sort((a, b) => (a.reign_start || 0) - (b.reign_start || 0));
    });

    // Create timeline entries based on unique periods
    const periodSet = new Set<string>();
    const entries: TimelineEntry[] = [];

    // Collect all unique periods
    kings.forEach(king => {
      if (king.reign_start && king.reign_end) {
        const periodKey = `${king.reign_start}-${king.reign_end}`;
        periodSet.add(periodKey);
      }
    });

    // Convert to sorted array of periods
    const sortedPeriods = Array.from(periodSet)
      .map(period => {
        const [start, end] = period.split('-').map(Number);
        return { period, start, end };
      })
      .sort((a, b) => a.start - b.start);

    // Create entries for each unique period
    sortedPeriods.forEach(({ period, start, end }) => {
      const entry: TimelineEntry = {
        period,
        periodStart: start,
        periodEnd: end
      };

      // Find kings that ruled during this exact period
      kings.forEach(king => {
        if (king.reign_start === start && king.reign_end === end) {
          const region = king.region.toLowerCase();
          
          if (region.includes('sweden') || region === 'sweden') {
            if (!entry.sweden) entry.sweden = [];
            entry.sweden.push(king);
          } else if (region.includes('denmark') || region.includes('danmark') || region === 'denmark') {
            if (!entry.denmark) entry.denmark = [];
            entry.denmark.push(king);
          } else if (region.includes('norway') || region.includes('norge') || region === 'norway') {
            if (!entry.norway) entry.norway = [];
            entry.norway.push(king);
          } else if (region.includes('kievrus') || region === 'kievrus') {
            if (!entry.kievrus) entry.kievrus = [];
            entry.kievrus.push(king);
          }
        }
      });

      // Find historical events that occurred during this period
      if (events) {
        const eventsInPeriod = events.filter(event => {
          const eventStart = event.year_start;
          const eventEnd = event.year_end || event.year_start;
          
          // Check if event overlaps with the period
          return (eventStart <= end && eventEnd >= start);
        });
        
        if (eventsInPeriod.length > 0) {
          entry.historicalEvents = eventsInPeriod;
        }
      }

      entries.push(entry);
    });

    return entries;
  }, [kings, events]);

  return {
    kings,
    sources,
    dynasties,
    events,
    timelineData,
  };
};
