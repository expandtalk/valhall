
import React from 'react';
import { Crown, Users, Book } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HistoricalKing, HistoricalSource, RoyalDynasty } from '@/hooks/chronicles';

interface RoyalChroniclesStatsProps {
  kings?: HistoricalKing[];
  sources?: HistoricalSource[];
  dynasties?: RoyalDynasty[];
  selectedRegion: string;
  selectedRulerType: string;
  selectedGender: string;
}

export const RoyalChroniclesStats: React.FC<RoyalChroniclesStatsProps> = ({
  kings,
  sources,
  dynasties,
  selectedRegion,
  selectedRulerType,
  selectedGender,
}) => {
  const { language } = useLanguage();

  const isJarl = (ruler: HistoricalKing) => {
    // Only consider someone a jarl if their name explicitly contains "jarl" 
    // or if they are explicitly described as a jarl in their description
    // But exclude those who are described as both jarl and king/queen
    const nameContainsJarl = ruler.name.toLowerCase().includes('jarl');
    const descriptionContainsJarl = ruler.description?.toLowerCase().includes('jarl') || false;
    const descriptionContainsKing = ruler.description?.toLowerCase().includes('kung') || 
                                    ruler.description?.toLowerCase().includes('drottning') ||
                                    ruler.description?.toLowerCase().includes('queen') ||
                                    ruler.description?.toLowerCase().includes('king') || false;
    
    // If they're described as both jarl and king/queen, prioritize king/queen
    if (descriptionContainsJarl && descriptionContainsKing) {
      return false;
    }
    
    // Only return true if they are explicitly called a jarl and not described as a king/queen
    return nameContainsJarl || (descriptionContainsJarl && !descriptionContainsKing);
  };

  const getKingsAndQueensCount = () => {
    if (!kings) return 0;
    return kings.filter(king => !isJarl(king)).length;
  };

  const getJarlsCount = () => {
    if (!kings) return 0;
    return kings.filter(king => isJarl(king)).length;
  };

  const getStatsLabel = () => {
    if (selectedGender === 'female') {
      return language === 'en' ? 'Female Rulers' : 'Kvinnliga Härskare';
    } else if (selectedGender === 'male') {
      return language === 'en' ? 'Male Rulers' : 'Manliga Härskare';
    } else {
      return language === 'en' ? 'Kings & Queens' : 'Kungar & Drottningar';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-400 mb-2">{getKingsAndQueensCount()}</div>
        <div className="text-sm text-slate-300 flex items-center justify-center gap-1">
          <Crown className="h-4 w-4" />
          {getStatsLabel()}
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-400 mb-2">{getJarlsCount()}</div>
        <div className="text-sm text-slate-300 flex items-center justify-center gap-1">
          <Users className="h-4 w-4" />
          {language === 'en' ? 'Jarls' : 'Jarlar'}
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-purple-400 mb-2">{sources?.length || 0}</div>
        <div className="text-sm text-slate-300 flex items-center justify-center gap-1">
          <Book className="h-4 w-4" />
          {language === 'en' ? 'Sources' : 'Källor'}
        </div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-orange-400 mb-2">{dynasties?.length || 0}</div>
        <div className="text-sm text-slate-300 flex items-center justify-center gap-1">
          <Users className="h-4 w-4" />
          {language === 'en' ? 'Dynasties' : 'Dynastier'}
        </div>
      </div>
    </div>
  );
};
