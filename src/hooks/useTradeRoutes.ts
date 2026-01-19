import { useState, useMemo } from 'react';
import { VIKING_TRADE_ROUTES, getRoutesByTimePeriod } from '@/data/tradeRoutes';
import { TRADE_CITIES, getCitiesByTimePeriod } from '@/data/tradeCities';

export const useTradeRoutes = (selectedYear: number = 850) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const activeRoutes = useMemo(() => {
    return getRoutesByTimePeriod(selectedYear);
  }, [selectedYear]);

  const activeCities = useMemo(() => {
    return getCitiesByTimePeriod(selectedYear);
  }, [selectedYear]);

  const selectedRoute = useMemo(() => {
    if (!selectedRouteId) return null;
    return VIKING_TRADE_ROUTES.find(r => r.id === selectedRouteId);
  }, [selectedRouteId]);

  return {
    activeRoutes,
    activeCities,
    selectedRoute,
    selectedRouteId,
    setSelectedRouteId,
    allRoutes: VIKING_TRADE_ROUTES,
    allCities: TRADE_CITIES
  };
};
