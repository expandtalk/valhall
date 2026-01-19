import React from 'react';
import { Crown } from 'lucide-react';
import { RoyalChroniclesFilters } from '../RoyalChroniclesFilters';
import { RoyalChroniclesStats } from '../RoyalChroniclesStats';
import { ViewModeToggle } from '../ViewModeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HistoricalKing, HistoricalSource, RoyalDynasty } from '@/hooks/chronicles';

interface MainHeaderProps {
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
  selectedRegion: string;
  selectedRulerType: string;
  selectedGender: string;
  onRegionChange: (value: string) => void;
  onRulerTypeChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  kings?: HistoricalKing[];
  sources?: HistoricalSource[];
  dynasties?: RoyalDynasty[];
}

export const MainHeader: React.FC<MainHeaderProps> = ({
  viewMode,
  onViewModeChange,
  selectedRegion,
  selectedRulerType,
  selectedGender,
  onRegionChange,
  onRulerTypeChange,
  onGenderChange,
  kings,
  sources,
  dynasties,
}) => {
  const { language } = useLanguage();

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8 text-yellow-400" />
          <div>
            <h1 className="text-3xl font-bold text-white">
              {language === 'en' ? 'Royal Chronicles' : 'Kungliga Krönikor'}
            </h1>
            <p className="text-slate-400">
              {language === 'en' 
                ? 'Medieval and Viking Age rulers of Scandinavia and Eastern Europe'
                : 'Medeltida och vikingatida härskare i Skandinavien och Östeuropa'
              }
            </p>
          </div>
        </div>
        <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
      </div>
      
      <RoyalChroniclesFilters
        selectedRegion={selectedRegion}
        selectedRulerType={selectedRulerType}
        selectedGender={selectedGender}
        onRegionChange={onRegionChange}
        onRulerTypeChange={onRulerTypeChange}
        onGenderChange={onGenderChange}
      />
      
      <RoyalChroniclesStats 
        kings={kings}
        sources={sources}
        dynasties={dynasties}
        selectedRegion={selectedRegion}
        selectedRulerType={selectedRulerType}
        selectedGender={selectedGender}
      />
    </>
  );
};
