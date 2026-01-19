
import React from 'react';
import { ResultsList } from "../explorer/ResultsList";
import { SimplePagination } from "../explorer/SimplePagination";

interface SearchResultsContentProps {
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
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

export const SearchResultsContent: React.FC<SearchResultsContentProps> = ({
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
  onPageChange,
  onClearFilters
}) => {
  return (
    <div className="flex flex-col max-h-[60vh]">
      {/* Results Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <ResultsList
          inscriptions={currentInscriptions}
          isLoading={isLoading}
          hasActiveSearch={hasActiveSearch}
          expandedCards={expandedCards}
          onToggleExpanded={onToggleExpanded}
          onClearFilters={onClearFilters}
          totalInscriptions={totalInscriptions}
        />
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-gray-600/50 flex-shrink-0">
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
