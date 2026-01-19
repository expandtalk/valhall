
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ResultsList } from "../explorer/ResultsList";
import { SimplePagination } from "../explorer/SimplePagination";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchResultsOverlayProps {
  currentInscriptions: any[];
  allInscriptions: any[];
  expandedCards: Set<string>;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  isLoading: boolean;
  hasActiveSearch: boolean;
  totalInscriptions: number;
  onToggleExpanded: (id: string) => void;
  onResultClick?: (inscription: any) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  showResults: boolean;
  searchResultsCount: number;
  onToggleSearchResults: () => void;
}

export const SearchResultsOverlay: React.FC<SearchResultsOverlayProps> = ({
  currentInscriptions,
  allInscriptions,
  expandedCards,
  currentPage,
  totalPages,
  itemsPerPage,
  isLoading,
  hasActiveSearch,
  totalInscriptions,
  onToggleExpanded,
  onResultClick,
  onPageChange,
  onClearFilters
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      {/* Instruction text */}
      <div className="px-4 py-2 bg-blue-900/40 border-b border-slate-600/30">
        <p className="text-blue-200 text-sm font-medium">
          Klicka på en inskrift för att visa på kartan
        </p>
      </div>

      {/* Results Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
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
