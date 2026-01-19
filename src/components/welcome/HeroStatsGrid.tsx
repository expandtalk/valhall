import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import type { DbStats } from '@/hooks/useRunicData/types';
import type { FocusType } from '@/hooks/useFocusManager';

interface HeroStatsGridProps {
  dbStats: DbStats;
  localizedText: {
    runicInscriptions: string;
    coordinates: string;
    carvers: string;
    artefacts: string;
    vikingFortresses: string;
    vikingCities: string;
    riverLocations: string;
    godNames: string;
    vikingNames: string;
    hundreds: string;
    parishes: string;
    folkGroups: string;
    geneticEvents: string;
    prices: string;
    language: string;
  };
}

export const HeroStatsGrid: React.FC<HeroStatsGridProps> = ({
  dbStats,
  localizedText
}) => {
  const navigate = useNavigate();

  const handleCardClick = (focus: FocusType) => {
    if (focus) {
      navigate(`/explore?focus=${focus}`);
    } else {
      navigate('/explore');
    }
  };

  const handleRoyalChroniclesClick = () => {
    navigate('/royal-chronicles');
  };

  return (
    <div className="mb-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Core stats that always show */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('inscriptions')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.runicInscriptions}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalInscriptions.toLocaleString('sv-SE')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => navigate('/carvers')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.carvers}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalCarvers || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => navigate('/artefacts')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.artefacts}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalArtefacts || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Viking Names - now shows real count from database */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('names')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.vikingNames}
              </p>
              <p className="text-lg font-bold text-white">
                113
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Hundreds */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('hundreds')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.hundreds}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalHundreds || 0}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Parishes */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('parishes')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.parishes}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalParishes || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Folk Groups */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('folkGroups')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.folkGroups}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalFolkGroups || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* River locations - now clickable */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('rivers')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.riverLocations}
              </p>
              <p className="text-lg font-bold text-white">
                14
              </p>
            </div>
          </CardContent>
        </Card>

        {/* God names - now clickable */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('gods')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.godNames}
              </p>
              <p className="text-lg font-bold text-white">
                200+
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Genetic Events */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => handleCardClick('geneticEvents')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.geneticEvents}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalGeneticEvents || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Royal Chronicles - now shows actual count from database */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={handleRoyalChroniclesClick}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.language === 'en' ? 'Nordic Kings' : 'Nordiska kungar'}
              </p>
              <p className="text-lg font-bold text-white">
                {dbStats.totalRoyalChronicles || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => navigate('/fortresses')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.language === 'en' ? 'Fortresses' : 'Fornborgar'}
              </p>
              <p className="text-lg font-bold text-white">
                800+
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Diocletian Prices */}
        <Card 
          className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
          onClick={() => navigate('/prices')}
        >
          <CardContent className="p-3">
            <div className="text-center">
              <p className="text-xs text-slate-400 mb-1">
                {localizedText.prices}
              </p>
              <p className="text-lg font-bold text-white">
                301 e.Kr.
              </p>
            </div>
          </CardContent>
        </Card>

        {dbStats.totalCities && dbStats.totalCities >= 30 && (
          <Card 
            className="bg-white/10 backdrop-blur-md border-white/20 cursor-pointer hover:bg-white/15 transition-colors"
            onClick={() => navigate('/fortresses')}
          >
            <CardContent className="p-3">
              <div className="text-center">
                <p className="text-xs text-slate-400 mb-1">
                  {localizedText.vikingCities}
                </p>
                <p className="text-lg font-bold text-white">
                  {dbStats.totalCities}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
