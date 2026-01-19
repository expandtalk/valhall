
import React from 'react';
import { GeographyModeToggle } from '../filters/GeographyModeToggle';
import { SearchControls } from './SearchControls';
import { TimePeriodSelector } from '../filters/TimePeriodSelector';
import { useDatingPeriods } from '@/hooks/useDatingPeriods';
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface ControlsSectionProps {
  isVikingMode: boolean;
  onModeChange: (mode: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  totalInscriptions: number;
  selectedTimePeriod: string;
  setSelectedTimePeriod: (period: string) => void;
}

export const ControlsSection: React.FC<ControlsSectionProps> = ({
  isVikingMode,
  onModeChange,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
  totalInscriptions,
  selectedTimePeriod,
  setSelectedTimePeriod
}) => {
  const { getParsingStats } = useDatingPeriods();
  const stats = getParsingStats();

  return (
    <div className="space-y-3">
      <GeographyModeToggle
        isVikingMode={isVikingMode}
        onModeChange={onModeChange}
      />
      
      <SearchControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
        totalInscriptions={totalInscriptions}
        isVikingMode={isVikingMode}
      />

      <TimePeriodSelector
        selectedPeriod={selectedTimePeriod}
        onPeriodChange={setSelectedTimePeriod}
      />

      {/* Dating Integration Status */}
      {stats.total > 0 && (
        <div className="bg-slate-700/40 rounded-md p-3 border border-amber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-amber-400" />
            <span className="text-amber-200 text-sm font-medium">Dating-analyser</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-green-600 text-white text-xs">
              {stats.parsed} parsade
            </Badge>
            <Badge className="bg-slate-600 text-white text-xs">
              {stats.unparsed} kvar
            </Badge>
            <span className="text-xs text-amber-300">
              {stats.parseRate.toFixed(1)}% klara
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Intelligenta daterings-analyser möjliggör tidslinjefiltrering
          </p>
        </div>
      )}
    </div>
  );
};
