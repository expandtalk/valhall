
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronRight, ChevronLeft, FileText, MapPin } from 'lucide-react';
import { ResultsList } from "../explorer/ResultsList";
import { SimplePagination } from "../explorer/SimplePagination";

interface SearchResultsPanelProps {
  isMinimized: boolean;
  onToggleMinimized: () => void;
  currentInscriptions: any[];
  allInscriptions: any[];
  expandedCards: Set<string>;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isLoading: boolean;
  hasActiveSearch: boolean;
  totalInscriptions: number;
  searchQuery: string;
  onToggleExpanded: (id: string) => void;
  onResultClick?: (inscription: any) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  onInscriptionUpdate?: (updatedInscription: any) => void;
}

export const SearchResultsPanel: React.FC<SearchResultsPanelProps> = ({
  isMinimized,
  onToggleMinimized,
  currentInscriptions,
  allInscriptions,
  expandedCards,
  currentPage,
  totalPages,
  itemsPerPage,
  isLoading,
  hasActiveSearch,
  totalInscriptions,
  searchQuery,
  onToggleExpanded,
  onResultClick,
  onPageChange,
  onClearFilters,
  onInscriptionUpdate
}) => {
  if (isMinimized) {
    return (
      <Button
        onClick={onToggleMinimized}
        className="bg-slate-800/95 backdrop-blur-md border-slate-600/50 text-white hover:bg-slate-700/95 flex items-center gap-2 shadow-lg"
        size="sm"
      >
        <Search className="h-4 w-4" />
        {searchQuery && (
          <span className="text-xs text-amber-400">"{searchQuery}"</span>
        )}
        <Badge variant="secondary" className="text-xs bg-blue-600 text-white border-blue-500">
          {allInscriptions.length}
        </Badge>
        <ChevronLeft className="h-3 w-3" />
      </Button>
    );
  }

  return (
    <div className="bg-slate-800/98 backdrop-blur-md border-slate-600/50 rounded-lg shadow-2xl">
      {/* Header with minimize button */}
      <div className="flex items-center justify-between p-4 border-b border-slate-600/50">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-blue-400" />
          <span className="text-white font-medium">
            {searchQuery ? `Sökresultat för "${searchQuery}"` : 'Alla inskrifter'}
          </span>
          <Badge variant="secondary" className="text-sm bg-blue-600 text-white border-blue-500 px-2 py-1">
            {allInscriptions.length} st
          </Badge>
        </div>
        <Button
          onClick={onToggleMinimized}
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white hover:bg-slate-700/50"
          title="Minimera sökresultat"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Instruction text */}
      <div className="px-4 py-2 bg-blue-900/40 border-b border-slate-600/30">
        <p className="text-blue-200 text-sm font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Klicka på en inskrift för att visa på kartan
        </p>
      </div>

      {/* Results Content */}
      <div className="flex flex-col h-full max-h-[60vh]">
        <div className="flex-1 overflow-y-auto p-4">
          <ResultsList
            inscriptions={currentInscriptions}
            isLoading={isLoading}
            hasActiveSearch={hasActiveSearch}
            expandedCards={expandedCards}
            onToggleExpanded={onToggleExpanded}
            onResultClick={onResultClick}
            onClearFilters={onClearFilters}
            totalInscriptions={totalInscriptions}
            onInscriptionUpdate={onInscriptionUpdate}
          />
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-3 border-t border-slate-600/50 flex-shrink-0">
            <SimplePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
