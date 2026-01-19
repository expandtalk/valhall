
import { LegendItem } from './types';

export const processLegendItems = (
  rawItems: LegendItem[],
  enabledLegendItems: { [key: string]: boolean }
): LegendItem[] => {
  return rawItems.map(item => ({
    ...item,
    enabled: enabledLegendItems[item.id] === true
  }));
};
