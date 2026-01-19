
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface ResultsHeaderProps {
  totalResults: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  totalResults,
  currentPage,
  totalPages,
  itemsPerPage
}) => {
  const { t } = useLanguage();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="flex items-center justify-between">
      <div className="text-white text-lg font-semibold">
        {totalResults} {totalResults === 1 ? 'inskrift' : 'inskrifter'}
      </div>
      {totalResults > 0 && (
        <div className="text-slate-400 text-sm">
          Sida {currentPage} av {totalPages} (visar {Math.min(startIndex + 1, totalResults)}-{Math.min(endIndex, totalResults)} av {totalResults})
        </div>
      )}
    </div>
  );
};
