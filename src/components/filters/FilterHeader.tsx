
import React from 'react';
import { Filter, X } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FilterHeaderProps {
  activeFiltersCount: number;
  onClearFilters: () => void;
}

export const FilterHeader: React.FC<FilterHeaderProps> = ({
  activeFiltersCount,
  onClearFilters
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <CardTitle className="text-white flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter by SRD Terminology
        </CardTitle>
        <CardDescription className="text-slate-300">
          Use Samnordisk runtextdatabas abbreviations for precise filtering
        </CardDescription>
      </div>
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {activeFiltersCount} active filters
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};
