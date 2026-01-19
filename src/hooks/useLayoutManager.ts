
import { usePanelManager } from './usePanelManager';

export const useLayoutManager = () => {
  const { panels, activePreset } = usePanelManager();

  // Define what each layout should show based on panel visibility - make explorer more map-focused
  const shouldShowControls = activePreset === 'explorer' || activePreset === 'researcher';
  const shouldShowMap = true; // Always show map, but Explorer mode will emphasize it most
  const shouldShowFilters = activePreset === 'explorer' || activePreset === 'researcher'; // Keep filters available in Explorer
  const shouldShowTimeline = activePreset === 'explorer' || activePreset === 'geographer' || activePreset === 'researcher';

  return {
    panels,
    activePreset,
    shouldShowControls,
    shouldShowMap,
    shouldShowFilters,
    shouldShowTimeline
  };
};
