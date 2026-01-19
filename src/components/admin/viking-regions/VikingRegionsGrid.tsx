
import React from 'react';
import { VikingRegionCard } from './VikingRegionCard';
import { VikingRegion } from '@/utils/vikingRegions/types';

interface VikingRegionsGridProps {
  regions: VikingRegion[];
  categoryColors: Record<string, string>;
  handleEdit: (type: string, item: any) => void;
  handleDelete: (type: string, item: any) => void;
  isLoading: boolean;
}

export const VikingRegionsGrid: React.FC<VikingRegionsGridProps> = ({
  regions,
  categoryColors,
  handleEdit,
  handleDelete,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {regions.map((region, index) => (
        <VikingRegionCard
          key={`${region.lat}-${region.lng}-${index}`}
          region={region}
          categoryColors={categoryColors}
          onEdit={(item) => handleEdit('Viking Region', item)}
          onDelete={(item) => handleDelete('Viking Region', item)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
