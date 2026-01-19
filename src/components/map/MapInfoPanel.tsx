
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { cleanLabelText } from "@/hooks/map/legend/labelUtils";

interface MapInfoPanelProps {
  isVikingMode: boolean;
  inscriptionsCount: number;
  fortressesCount: number;
  citiesCount: number;
  totalInscriptions: number;
  fortressesLoading: boolean;
  citiesLoading: boolean;
}

export const MapInfoPanel: React.FC<MapInfoPanelProps> = ({
  isVikingMode,
  inscriptionsCount,
  fortressesCount,
  citiesCount,
  totalInscriptions,
  fortressesLoading,
  citiesLoading
}) => {
  const { t } = useLanguage();

  const formatDescription = (template: string, values: Record<string, number>) => {
    return template.replace(/\{(\w+)\}/g, (match, key) => values[key]?.toString() || match);
  };

  // Clean fortress and city labels
  const cleanFortressLabels = {
    ringFortresses: "Ring Fortresses",
    hillforts: "Hillforts", 
    longphorts: "Longphorts",
    royalCenters: "Royal Centers",
    coastalDefense: "Coastal Defense",
    runicInscriptions: "Runic Inscriptions"
  };

  const cleanCityLabels = {
    religiousCenters: "Religious Centers",
    tradingPlaces: "Trading Places", 
    marketTowns: "Market Towns",
    establishedCities: "Established Cities",
    gotlandicCenters: "Gotlandic Centers"
  };

  return (
    <div className="p-4 bg-blue-500/10 border-t border-blue-500/20">
      <p className="text-blue-200 text-sm">
        <strong>🗺️ {isVikingMode ? 'Vikingatida karta' : 'Modern karta'}</strong> {
          isVikingMode 
            ? `Visar ${fortressesCount} befästningar, ${citiesCount} städer och ${inscriptionsCount} inskrifter från vikingatiden`
            : `Visar ${inscriptionsCount} runinskrifter från hela Skandinavien`
        }
      </p>
      {isVikingMode && (
        <div className="mt-2 text-xs text-amber-200">
          <p><strong>🔴 {cleanFortressLabels.ringFortresses}</strong> • <strong>🟣 {cleanFortressLabels.hillforts}</strong> • <strong>🟢 {cleanFortressLabels.longphorts}</strong> • <strong>🟡 {cleanFortressLabels.royalCenters}</strong> • <strong>🔵 {cleanFortressLabels.coastalDefense}</strong> • <strong>🟠 {cleanFortressLabels.runicInscriptions}</strong></p>
          <p className="mt-1"><strong>Städer:</strong> <strong>🟤 {cleanCityLabels.religiousCenters}</strong> • <strong>🔵 {cleanCityLabels.tradingPlaces}</strong> • <strong>🟢 {cleanCityLabels.marketTowns}</strong> • <strong>🟡 {cleanCityLabels.establishedCities}</strong> • <strong>🔴 {cleanCityLabels.gotlandicCenters}</strong></p>
        </div>
      )}
      {!isVikingMode && totalInscriptions > inscriptionsCount && (
        <p className="text-amber-200 text-xs mt-1">
          {totalInscriptions - inscriptionsCount} inskrifter saknar ännu platsdata.
        </p>
      )}
      {(fortressesLoading || citiesLoading) && isVikingMode && (
        <p className="text-slate-300 text-xs mt-1">
          Laddar historiska platser...
        </p>
      )}
    </div>
  );
};
