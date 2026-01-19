import React from 'react';
import { PanelLayoutSelector } from '../../panels/PanelLayoutSelector';
import { ExplorerModules } from '../ExplorerModules';
import { LayoutHeaderProps } from '@/types/explorer';

export const LayoutHeader: React.FC<LayoutHeaderProps> = React.memo(({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
  totalInscriptions,
  isExplorerMode,
  onGodNameSearchWithLegend,
  onLegendToggle,
  isSearchMinimized,
  setIsSearchMinimized,
  shouldShowTimeline,
  mapNavigate,
  isTimelineMinimized,
  setIsTimelineMinimized
}) => {
  return (
    <>
      <PanelLayoutSelector />
      
      <ExplorerModules
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
        totalInscriptions={totalInscriptions}
        isExplorerMode={isExplorerMode}
        onGodNameSearchWithLegend={onGodNameSearchWithLegend}
        onLegendToggle={onLegendToggle}
        isSearchMinimized={isSearchMinimized}
        setIsSearchMinimized={setIsSearchMinimized}
        shouldShowTimeline={shouldShowTimeline}
        mapNavigate={mapNavigate}
        isTimelineMinimized={isTimelineMinimized}
        setIsTimelineMinimized={setIsTimelineMinimized}
      />
    </>
  );
});

LayoutHeader.displayName = 'LayoutHeader';
