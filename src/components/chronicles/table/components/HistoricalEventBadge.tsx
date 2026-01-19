
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from '@/contexts/LanguageContext';
import type { HistoricalEvent } from '@/hooks/useHistoricalEvents';

interface HistoricalEventBadgeProps {
  event: HistoricalEvent;
  onClick?: (event: HistoricalEvent) => void;
}

const getEventTypeColor = (eventType: string) => {
  switch (eventType) {
    case 'natural_disaster':
      return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
    case 'plague':
      return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200';
    case 'military':
      return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
    case 'political':
      return 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200';
    case 'exploration':
      return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
    case 'cultural':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  }
};

const getEventTypeIcon = (eventType: string) => {
  switch (eventType) {
    case 'natural_disaster':
      return '🌋';
    case 'plague':
      return '☠️';
    case 'military':
      return '⚔️';
    case 'political':
      return '👑';
    case 'exploration':
      return '🗺️';
    case 'cultural':
      return '📜';
    default:
      return '📅';
  }
};

export const HistoricalEventBadge: React.FC<HistoricalEventBadgeProps> = ({ 
  event, 
  onClick 
}) => {
  const { language } = useLanguage();
  
  const eventName = language === 'en' ? event.event_name_en : event.event_name;
  
  const yearText = event.year_end && event.year_end !== event.year_start 
    ? `${event.year_start}–${event.year_end}`
    : `${event.year_start}`;

  const handleClick = () => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`${getEventTypeColor(event.event_type)} text-xs mb-1 cursor-pointer transition-colors`}
            onClick={handleClick}
          >
            <span className="mr-1">{getEventTypeIcon(event.event_type)}</span>
            {yearText}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-60 p-2">
          <div className="text-xs">
            <div className="font-semibold">{eventName}</div>
            <div className="text-muted-foreground mt-1">
              {language === 'en' ? 'Click for details' : 'Klicka för detaljer'}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
