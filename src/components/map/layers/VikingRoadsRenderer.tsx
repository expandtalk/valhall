import React, { useEffect } from 'react';
import { VikingRoadsLayer } from './VikingRoadsLayer';

interface VikingRoadsRendererProps {
  map: L.Map | null;
  enabledLegendItems: { [key: string]: boolean };
  selectedTimePeriod: string;
  isMapReady: boolean;
}

export const VikingRoadsRenderer: React.FC<VikingRoadsRendererProps> = ({
  map,
  enabledLegendItems,
  selectedTimePeriod,
  isMapReady
}) => {
  const shouldShowRoads = selectedTimePeriod === 'viking_age' && 
                          enabledLegendItems.viking_roads !== false;

  console.log('🛣️ Viking Roads visibility check:', {
    selectedTimePeriod,
    roadEnabled: enabledLegendItems.viking_roads,
    shouldShowRoads,
    mapReady: isMapReady
  });

  if (!map || !isMapReady || !shouldShowRoads) {
    return null;
  }

  return (
    <VikingRoadsLayer
      map={map}
      enabledItems={{
        road_rullstensas: enabledLegendItems.road_rullstensas !== false,
        road_halvagar: enabledLegendItems.road_halvagar !== false,
        road_vinteragar: enabledLegendItems.road_vinteragar !== false,
        road_landmarks: enabledLegendItems.road_landmarks !== false
      }}
      isVisible={shouldShowRoads}
    />
  );
};