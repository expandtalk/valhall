
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Castle, Plus } from "lucide-react";
import { SelectFilter } from '../../filters/SelectFilter';

interface VikingRegionsHeaderProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: { id: string, name: string }[];
  selectedPeriod: string;
  onPeriodChange: (value: string) => void;
  periods: { id: string, name: string }[];
  filteredCount: number;
  totalCount: number;
  onAdd: () => void;
  isLoading: boolean;
}

export const VikingRegionsHeader: React.FC<VikingRegionsHeaderProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedPeriod,
  onPeriodChange,
  periods,
  filteredCount,
  totalCount,
  onAdd,
  isLoading,
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2 font-norse">
          <Castle className="h-6 w-6" />
          Viking Regions Administration
        </CardTitle>
        <CardDescription className="text-slate-300">
          Hantera vikingatida regioner och territorier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectFilter
            id="vr-category"
            label={<label htmlFor="vr-category" className="text-white text-sm font-medium">Kategori</label>}
            value={selectedCategory}
            onValueChange={onCategoryChange}
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            placeholder="Välj kategori"
            triggerClassName="bg-slate-800 border-white/20 text-white"
            contentClassName="bg-slate-800 border-white/20 z-50"
            itemClassName="text-white hover:bg-slate-700 focus:bg-slate-700"
          />
          <SelectFilter
            id="vr-period"
            label={<label htmlFor="vr-period" className="text-white text-sm font-medium">Tidsperiod</label>}
            value={selectedPeriod}
            onValueChange={onPeriodChange}
            options={periods.map(p => ({ value: p.id, label: p.name }))}
            placeholder="Välj period"
            triggerClassName="bg-slate-800 border-white/20 text-white"
            contentClassName="bg-slate-800 border-white/20 z-50"
            itemClassName="text-white hover:bg-slate-700 focus:bg-slate-700"
          />
          <div className="space-y-2">
            <label htmlFor="vr-search" className="text-white text-sm font-medium">Sök</label>
            <Input
              id="vr-search"
              placeholder="Sök efter regioner..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="bg-slate-800 border-white/20 text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-slate-300">
            Visar {filteredCount} av {totalCount} regioner
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={onAdd}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Lägg till region
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
