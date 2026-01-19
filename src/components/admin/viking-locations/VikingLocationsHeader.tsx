
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Map, Plus } from "lucide-react";
import { SelectFilter } from '../../filters/SelectFilter';

interface VikingLocationsHeaderProps {
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: { id: string, name: string }[];
  filteredCount: number;
  totalCount: number;
  onAdd: () => void;
  isLoading: boolean;
}

export const VikingLocationsHeader: React.FC<VikingLocationsHeaderProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onCategoryChange,
  categories,
  filteredCount,
  totalCount,
  onAdd,
  isLoading,
}) => {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Map className="h-6 w-6" />
          Viking Locations Administration
        </CardTitle>
        <CardDescription className="text-slate-300">
          Hantera vikingatida platser och bosättningar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectFilter
            id="v-loc-category"
            label={<label htmlFor="v-loc-category" className="text-white text-sm font-medium">Kategori</label>}
            value={selectedCategory}
            onValueChange={onCategoryChange}
            options={categories.map(c => ({ value: c.id, label: c.name }))}
            placeholder="Välj kategori"
            triggerClassName="bg-slate-800 border-white/20 text-white"
            contentClassName="bg-slate-800 border-white/20 z-50"
            itemClassName="text-white hover:bg-slate-700 focus:bg-slate-700"
          />
          <div className="space-y-2">
            <label htmlFor="v-loc-search" className="text-white text-sm font-medium">Sök</label>
            <Input
              id="v-loc-search"
              placeholder="Sök efter platser..."
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="bg-slate-800 border-white/20 text-white"
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-slate-300">
            Visar {filteredCount} av {totalCount} platser
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={onAdd}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Lägg till plats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
