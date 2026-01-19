
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useURLParameters = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPeriod, setCurrentPeriod] = useState<string>('viking_age');

  // Läs URL-parametrar vid laddning
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const periodParam = params.get('period');
    
    // Kolla om det finns en period-parameter i URL:en
    if (periodParam) {
      const validPeriods = [
        'paleolithic', 'mesolithic', 'neolithic', 'bronze_age', 
        'pre_roman_iron', 'roman_iron', 'migration_period', 
        'vendel_period', 'viking_age'
      ];
      
      if (validPeriods.includes(periodParam)) {
        setCurrentPeriod(periodParam);
      }
    }
  }, [location.search]);

  // Uppdatera URL när period ändras
  const updatePeriodInURL = (periodId: string) => {
    const params = new URLSearchParams(location.search);
    
    if (periodId === 'viking_age') {
      // Ta bort parameter för default-värdet
      params.delete('period');
    } else {
      params.set('period', periodId);
    }
    
    const newURL = params.toString() ? `?${params.toString()}` : location.pathname;
    navigate(newURL, { replace: true });
    
    setCurrentPeriod(periodId);
  };

  return {
    currentPeriod,
    updatePeriodInURL
  };
};
