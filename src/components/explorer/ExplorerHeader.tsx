
import React from 'react';
import { SearchControls } from './SearchControls';
import { GeographyModeToggle } from '../filters/GeographyModeToggle';

interface ExplorerHeaderProps {
  dbStats: {
    totalInscriptions: number;
    totalAnalyses: number;
    totalNotes: number;
  };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  isLoading: boolean;
  isVikingMode: boolean;
  setIsVikingMode: (mode: boolean) => void;
}

export const ExplorerHeader: React.FC<ExplorerHeaderProps> = ({
  dbStats,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isLoading,
  isVikingMode,
  setIsVikingMode
}) => {
  return (
    <div className="space-y-4">
      <SearchControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
        totalInscriptions={dbStats.totalInscriptions}
        isVikingMode={isVikingMode}
      />

      <GeographyModeToggle
        isVikingMode={isVikingMode}
        onModeChange={setIsVikingMode}
      />
    </div>
  );
};
