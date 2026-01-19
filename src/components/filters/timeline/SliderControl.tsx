
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { GERMANIC_TIME_PERIODS } from '@/utils/germanicTimeline/timelineData';

interface SliderControlProps {
  sliderValues: [number, number];
  onSliderChange: (values: number[]) => void;
  selectedPeriod: string;
  formatYear: (year: number) => string;
  sliderValueToYear: (value: number) => number;
  vikingEvents?: Array<{
    year: number;
    nameEn: string;
    nameSv: string;
  }>;
  showEventMarkers?: boolean;
  yearToSliderValue: (year: number) => number;
}

// Timeline ranges from 45000 BCE to 1066 CE
const TIMELINE_START = -45000;
const TIMELINE_END = 1066;

export const SliderControl: React.FC<SliderControlProps> = ({
  sliderValues,
  onSliderChange,
  formatYear,
  sliderValueToYear,
  vikingEvents = [],
  showEventMarkers = false,
  yearToSliderValue
}) => {
  const currentStartYear = sliderValueToYear(sliderValues[0]);
  const currentEndYear = sliderValueToYear(sliderValues[1]);

  return (
    <div className="space-y-2">
      {/* Compact year range display */}
      <div className="flex justify-between text-xs text-amber-200/90">
        <span className="font-medium">{formatYear(currentStartYear)}</span>
        <span className="font-medium">{formatYear(currentEndYear)}</span>
      </div>

      {/* Interactive Slider - more compact */}
      <div className="relative px-1">
        <Slider
          value={sliderValues}
          onValueChange={onSliderChange}
          min={0}
          max={100}
          step={0.5}
          className="w-full [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-amber-600 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3"
        />
        
        {/* Compact event markers for Viking Age */}
        {showEventMarkers && (
          <div className="absolute top-0 w-full h-4">
            {vikingEvents.map((event) => {
              const position = yearToSliderValue(event.year);
              
              return (
                <div
                  key={event.year}
                  className="absolute top-0 transform -translate-x-1/2"
                  style={{ left: `${Math.max(4, Math.min(96, position))}%` }}
                  title={`${event.year}: ${event.nameSv}`}
                >
                  <div className="w-0.5 h-4 bg-red-400 opacity-70 rounded-full"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Compact timeline markers */}
      <div className="flex justify-between text-xs text-amber-400/50 mt-1">
        <span>{formatYear(TIMELINE_START)}</span>
        <span>0</span>
        <span>{formatYear(TIMELINE_END)}</span>
      </div>
    </div>
  );
};
