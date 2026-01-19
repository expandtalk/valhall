
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from 'lucide-react';

interface RiverSystemsHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAdd: () => void; // Behålls för kompatibilitet men används inte
  totalSystems: number;
  filteredCount: number;
  isLoading: boolean;
  onRefreshMap?: () => void; // Add map refresh callback
}

export const RiverSystemsHeader: React.FC<RiverSystemsHeaderProps> = ({
  searchTerm,
  onSearchChange,
  totalSystems,
  filteredCount,
  isLoading,
  onRefreshMap
}) => {
  return (
    <div className="space-y-4">
      {/* Sökfält och uppdateringsknapp */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Sök bland vattenvägar och handelsrutter..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            disabled={isLoading}
          />
        </div>
        {onRefreshMap && (
          <Button
            onClick={onRefreshMap}
            variant="outline"
            className="bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/50 text-blue-300"
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Uppdatera karta
          </Button>
        )}
      </div>

      {/* Info om sökresultat */}
      {searchTerm && (
        <div className="text-sm text-slate-300">
          Visar {filteredCount} av {totalSystems} system som matchar "{searchTerm}"
        </div>
      )}
    </div>
  );
};
