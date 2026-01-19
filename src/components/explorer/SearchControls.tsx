
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from 'lucide-react';
import { GodNameSearch } from '../search/GodNameSearch';

interface SearchControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  totalInscriptions: number;
  isVikingMode: boolean;
  showGodNameSearch?: boolean;
  onGodNameSearch?: (godName: string) => void;
  onLegendToggle?: (id: string) => void;
}

export const SearchControls: React.FC<SearchControlsProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
  totalInscriptions,
  isVikingMode,
  showGodNameSearch = false,
  onGodNameSearch,
  onLegendToggle
}) => {
  return (
    <div className="space-y-4">
      {/* Main search */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isVikingMode ? "Sök i runor och sagor..." : "Sök i runstenar..."}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* God name search - only show in explorer mode */}
      {showGodNameSearch && (
        <GodNameSearch 
          onGodNameSearch={onGodNameSearch}
          onLegendToggle={onLegendToggle}
        />
      )}

      <div className="text-white/80 text-sm">
        Totalt {totalInscriptions.toLocaleString('sv-SE')} runstenar att utforska
      </div>
    </div>
  );
};
