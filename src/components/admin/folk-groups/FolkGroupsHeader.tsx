
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Users, RefreshCw } from "lucide-react";
import { SampleDataButton } from './SampleDataButton';
import { AdditionalGroupsButton } from './AdditionalGroupsButton';

interface FolkGroupsHeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredCount: number;
  totalCount: number;
  onAdd: () => void;
  isLoading: boolean;
  onRefresh: () => void;
}

export const FolkGroupsHeader: React.FC<FolkGroupsHeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  filteredCount,
  totalCount,
  onAdd,
  isLoading,
  onRefresh
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Folkgrupper</h2>
          <p className="text-slate-300">
            Visar {filteredCount} av {totalCount} folkgrupper
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={onRefresh}
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Uppdatera
          </Button>
          <SampleDataButton />
          <AdditionalGroupsButton onRefresh={onRefresh} />
          <Button onClick={onAdd} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Lägg till folkgrupp
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Sök folkgrupper..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Välj kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla kategorier</SelectItem>
            <SelectItem value="germanic">Germanska</SelectItem>
            <SelectItem value="celtic">Keltiska</SelectItem>
            <SelectItem value="slavic">Slaviska</SelectItem>
            <SelectItem value="finno_ugric">Finno-ugriska</SelectItem>
            <SelectItem value="italic">Italiska</SelectItem>
            <SelectItem value="thracian">Thrakiska</SelectItem>
            <SelectItem value="illyrian">Illyriska</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
