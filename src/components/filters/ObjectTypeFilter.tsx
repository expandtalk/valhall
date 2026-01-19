
import React from 'react';
import { Label } from "@/components/ui/label";
import { getObjectCategoryOptions } from '@/utils/objectCategories';
import { SelectFilter } from './SelectFilter';

interface ObjectTypeFilterProps {
  selectedObjectType: string;
  onObjectTypeChange: (value: string) => void;
}

export const ObjectTypeFilter: React.FC<ObjectTypeFilterProps> = ({
  selectedObjectType,
  onObjectTypeChange
}) => {
  const options = getObjectCategoryOptions();

  return (
    <SelectFilter
      id="object-type-filter"
      label={
        <Label htmlFor="object-type-filter" className="text-sm font-medium text-white">
          Object Type
        </Label>
      }
      value={selectedObjectType}
      onValueChange={onObjectTypeChange}
      options={options}
      placeholder="Select object type"
      showAllOption={{ value: "all", label: "All object types" }}
      triggerClassName="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-blue-500"
      contentClassName="bg-slate-800 border-slate-600 max-h-64 z-50"
      itemClassName="text-white hover:bg-slate-700 focus:bg-slate-700"
      allItemClassName="text-white hover:bg-slate-700 focus:bg-slate-700"
    />
  );
};
