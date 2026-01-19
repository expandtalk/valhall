
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import type { HistoricalEvent } from '@/hooks/useHistoricalEvents';

interface HistoricalEventModalProps {
  event: HistoricalEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

const getEventTypeColor = (eventType: string) => {
  switch (eventType) {
    case 'natural_disaster':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'plague':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'military':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'political':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'exploration':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cultural':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
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

const getEventTypeLabel = (eventType: string, language: string) => {
  const labels = {
    natural_disaster: language === 'en' ? 'Natural Disaster' : 'Naturkatastrof',
    plague: language === 'en' ? 'Plague' : 'Pest',
    military: language === 'en' ? 'Military' : 'Militär',
    political: language === 'en' ? 'Political' : 'Politisk',
    exploration: language === 'en' ? 'Exploration' : 'Utforskning',
    cultural: language === 'en' ? 'Cultural' : 'Kulturell'
  };
  return labels[eventType as keyof typeof labels] || eventType;
};

export const HistoricalEventModal: React.FC<HistoricalEventModalProps> = ({ 
  event, 
  isOpen, 
  onClose 
}) => {
  const { language } = useLanguage();

  if (!event) return null;

  const eventName = language === 'en' ? event.event_name_en : event.event_name;
  const description = language === 'en' ? event.description_en : event.description;
  
  const yearText = event.year_end && event.year_end !== event.year_start 
    ? `${event.year_start}–${event.year_end}`
    : `${event.year_start}`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <span className="text-2xl">{getEventTypeIcon(event.event_type)}</span>
            {eventName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge 
              variant="outline" 
              className={`${getEventTypeColor(event.event_type)} text-sm`}
            >
              {getEventTypeLabel(event.event_type, language)}
            </Badge>
            <span className="text-lg font-mono text-muted-foreground">
              {yearText} {language === 'en' ? 'CE' : 'e.Kr.'}
            </span>
          </div>

          {description && (
            <div className="prose prose-sm max-w-none">
              <p className="text-base leading-relaxed">{description}</p>
            </div>
          )}

          {event.region_affected && event.region_affected.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Affected Regions:' : 'Drabbade regioner:'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {event.region_affected.map((region, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {region}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {event.sources && event.sources.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">
                {language === 'en' ? 'Sources:' : 'Källor:'}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {event.sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-2 border-t text-xs text-muted-foreground">
            {language === 'en' ? 'Significance Level:' : 'Betydelsenivå:'} {event.significance_level}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
