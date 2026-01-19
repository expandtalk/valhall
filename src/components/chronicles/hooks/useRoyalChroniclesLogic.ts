
import { useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { HistoricalKing } from '@/hooks/chronicles';

export const useRoyalChroniclesLogic = (kings?: HistoricalKing[], selectedRulerType?: string, selectedGender?: string) => {
  const { language } = useLanguage();

  const { regularKings, legendaryKings } = useMemo(() => {
    if (!kings) return { regularKings: [], legendaryKings: [] };

    const regular = kings.filter(king => 
      king.status === 'historical' || king.status === 'semi_legendary'
    );
    
    const legendary = kings.filter(king => 
      king.status === 'legendary' || king.status === 'disputed'
    );

    return { regularKings: regular, legendaryKings: legendary };
  }, [kings]);

  const getRulerTypeLabel = () => {
    console.log('🏷️ Getting ruler type label for:', { selectedGender, selectedRulerType, count: regularKings?.length });
    
    // Show count based on actual filtered data
    const count = regularKings?.length || 0;
    
    if (selectedGender === 'female') {
      return language === 'en' ? `Female Rulers (${count})` : `Kvinnliga Härskare (${count})`;
    } else if (selectedGender === 'male') {
      return language === 'en' ? `Male Rulers (${count})` : `Manliga Härskare (${count})`;
    } else {
      // All genders - show total count
      return language === 'en' ? `All Rulers (${count})` : `Alla Härskare (${count})`;
    }
  };

  return {
    regularKings,
    legendaryKings,
    getRulerTypeLabel,
  };
};
