
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { sortLegendItems } from '../legend/utils';
import {
  generateBasicInscriptionItems,
  generateStatusBasedItems,
  generateUnderwaterItems,
  generateCountryBasedItems,
  generateReligiousItems,
  generateTimelineAndArchaeologicalItems,
  generateRouteItems,
  generateVikingSpecificItems
} from '../legend/legendItemGenerators';
import { RunicInscription, LegendItem } from '../legend/types';

export const useLegendItemProcessor = (
  inscriptions: RunicInscription[],
  isVikingMode: boolean,
  selectedTimePeriod: string,
  enabledLegendItems: { [key: string]: boolean }
) => {
  const { t } = useLanguage();

  // Create legend items based on current mode with improved organization
  const legendItems = React.useMemo((): LegendItem[] => {
    const items: LegendItem[] = [];
    
    console.log(`Legend: Processing ${inscriptions.length} total inscriptions`);

    // Generate different categories of legend items
    items.push(...generateBasicInscriptionItems(inscriptions, isVikingMode, enabledLegendItems, t));
    items.push(...generateStatusBasedItems(inscriptions, enabledLegendItems, t));
    items.push(...generateUnderwaterItems(inscriptions, enabledLegendItems, t));
    items.push(...generateCountryBasedItems(inscriptions, enabledLegendItems, t));
    items.push(...generateReligiousItems(enabledLegendItems, selectedTimePeriod, t));
    items.push(...generateTimelineAndArchaeologicalItems(selectedTimePeriod, enabledLegendItems, t));
    items.push(...generateRouteItems(selectedTimePeriod, enabledLegendItems, isVikingMode, t));
    items.push(...generateVikingSpecificItems(isVikingMode, selectedTimePeriod, enabledLegendItems, t));

    return sortLegendItems(items);
  }, [inscriptions.length, isVikingMode, enabledLegendItems, inscriptions, selectedTimePeriod, t]);

  return { legendItems };
};
