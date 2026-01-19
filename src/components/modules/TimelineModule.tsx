
import React from 'react';
import { TimelineSlider } from '../filters/TimelineSlider';

interface TimelineModuleProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  mapNavigate: ((lat: number, lng: number, zoom: number) => void) | null;
  isMinimized?: boolean;
  onToggleMinimized?: () => void;
}

// Helper function to format period names nicely
const formatPeriodName = (period: string): string => {
  switch (period) {
    case 'viking_age':
      return 'Vikingatid';
    case 'iron_age':
      return 'Järnålder';
    case 'bronze_age':
      return 'Bronsålder';
    case 'migration_period':
      return 'Folkvandringstid';
    case 'vendelupper_period':
      return 'Vendeltid';
    default:
      return period.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
};

export const TimelineModule: React.FC<TimelineModuleProps> = ({
  selectedPeriod,
  onPeriodChange,
  mapNavigate,
  isMinimized = false,
  onToggleMinimized
}) => {
  if (isMinimized) {
    return (
      <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 backdrop-blur-md border-amber-500/30 rounded-lg p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white/80 text-sm">Tidslinje</span>
            <span className="text-amber-400 text-xs">{formatPeriodName(selectedPeriod)}</span>
          </div>
          <button
            onClick={onToggleMinimized}
            className="text-white/70 hover:text-white text-xs px-2 py-1 rounded hover:bg-amber-900/20 transition-colors"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 backdrop-blur-md border-amber-500/30 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium text-sm">Historisk tidslinje</h3>
        <button
          onClick={onToggleMinimized}
          className="text-white/70 hover:text-white text-xs px-2 py-1 rounded hover:bg-amber-900/20 transition-colors"
        >
          −
        </button>
      </div>
      
      <TimelineSlider
        selectedPeriod={selectedPeriod}
        onPeriodChange={onPeriodChange}
        onMapNavigate={mapNavigate}
        className=""
      />
    </div>
  );
};
