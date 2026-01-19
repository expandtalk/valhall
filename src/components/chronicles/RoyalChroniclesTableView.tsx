
import React, { useState } from 'react';
import { useTableData } from './table/hooks/useTableData';
import { TimelineTable } from './table/components/TimelineTable';
import { DynastiesSection } from './table/components/DynastiesSection';
import { SourcesSection } from './table/components/SourcesSection';
import type { HistoricalKing, RoyalDynasty, HistoricalSource } from '@/hooks/useRoyalChronicles';

export const RoyalChroniclesTableView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<{
    type: 'king' | 'dynasty' | 'source';
    data: HistoricalKing | RoyalDynasty | HistoricalSource;
  } | null>(null);

  const { sources, dynasties, timelineData } = useTableData();

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <div className="space-y-6">
      <TimelineTable timelineData={timelineData} onSelectItem={handleSelectItem} />
      <DynastiesSection dynasties={dynasties} onSelectItem={handleSelectItem} />
      <SourcesSection sources={sources} onSelectItem={handleSelectItem} />
    </div>
  );
};
