
import React from 'react';

interface StatsSectionProps {
  inscriptionsCount: number;
  totalInscriptions: number;
  totalCoordinates?: number;
  isVikingMode: boolean;
  selectedTimePeriod: string;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  inscriptionsCount,
  totalInscriptions,
  totalCoordinates,
  isVikingMode,
  selectedTimePeriod
}) => {
  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <h3 className="text-white font-medium text-sm mb-2">Resultat</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-300 text-sm">Hittade platser:</span>
          <span className="text-white font-semibold">{inscriptionsCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300 text-sm">Totalt i databas:</span>
          <span className="text-slate-400 text-sm">{totalInscriptions}</span>
        </div>
        {totalCoordinates && totalCoordinates >= 30 && (
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Koordinater:</span>
            <span className="text-green-400 text-sm">{totalCoordinates}</span>
          </div>
        )}
        {isVikingMode && (
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Tidsperiod:</span>
            <span className="text-amber-300 text-sm capitalize">{selectedTimePeriod.replace('_', ' ')}</span>
          </div>
        )}
      </div>
    </div>
  );
};
