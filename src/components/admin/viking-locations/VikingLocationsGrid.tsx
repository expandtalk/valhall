
import React from 'react';
import { VikingLocationCard } from './VikingLocationCard';
import { VikingLocation } from './types';

interface VikingLocationsGridProps {
  locations: VikingLocation[];
  categoryColors: Record<string, string>;
  handleEdit: (type: string, item: any) => void;
  handleDelete: (type: string, item: any) => void;
  isLoading: boolean;
}

export const VikingLocationsGrid: React.FC<VikingLocationsGridProps> = ({
  locations,
  categoryColors,
  handleEdit,
  handleDelete,
  isLoading,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {locations.map((location, index) => (
        <VikingLocationCard
          key={`${location.lat}-${location.lng}-${index}`}
          location={location}
          categoryColors={categoryColors}
          onEdit={(item) => handleEdit('Viking Location', item)}
          onDelete={(item) => handleDelete('Viking Location', item)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};
