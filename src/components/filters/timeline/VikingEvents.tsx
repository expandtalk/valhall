
import React from 'react';
import { Button } from "@/components/ui/button";

interface VikingEvent {
  year: number;
  nameEn: string;
  nameSv: string;
  descriptionEn: string;
  descriptionSv: string;
  coordinates: { lat: number; lng: number; zoom: number };
}

interface VikingEventsProps {
  events: VikingEvent[];
  selectedEvent: VikingEvent | null;
  onEventClick: (event: VikingEvent) => void;
  language: string;
  isVisible: boolean;
}

export const VikingEvents: React.FC<VikingEventsProps> = ({
  events,
  selectedEvent,
  onEventClick,
  language,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-medium text-amber-300">
        {language === 'sv' ? 'Viktiga händelser:' : 'Key Events:'}
      </h4>
      <div className="flex flex-wrap gap-1">
        {events.map((event) => (
          <Button
            key={event.year}
            variant="ghost"
            size="sm"
            onClick={() => onEventClick(event)}
            className={`px-2 py-1 text-xs h-auto ${
              selectedEvent?.year === event.year
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-slate-700/40 text-red-200 hover:bg-slate-600/60'
            }`}
          >
            {language === 'sv' ? event.nameSv : event.nameEn} ({event.year})
          </Button>
        ))}
      </div>
      
      {/* Selected event description */}
      {selectedEvent && (
        <div className="text-xs text-amber-100/80 bg-slate-700/20 rounded p-2">
          <div className="font-medium text-amber-200 mb-1">
            {language === 'sv' ? selectedEvent.nameSv : selectedEvent.nameEn} ({selectedEvent.year})
          </div>
          <div>
            {language === 'sv' ? selectedEvent.descriptionSv : selectedEvent.descriptionEn}
          </div>
        </div>
      )}
    </div>
  );
};
