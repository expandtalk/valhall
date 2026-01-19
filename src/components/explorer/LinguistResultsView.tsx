
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface LinguistResultsViewProps {
  currentInscriptions: any[];
  currentPage: number;
  totalPages: number;
  onResultClick: (inscription: any) => void;
  onPageChange: (page: number) => void;
}

export const LinguistResultsView: React.FC<LinguistResultsViewProps> = ({
  currentInscriptions,
  currentPage,
  totalPages,
  onResultClick,
  onPageChange
}) => {
  const { language } = useLanguage();

  return (
    <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        {language === 'en' ? 'Search Results' : 'Sökresultat'}
      </h2>
      <div className="space-y-4">
        {currentInscriptions.map((inscription) => (
          <div 
            key={inscription.id}
            className="bg-slate-800/50 rounded-lg p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
            onClick={() => onResultClick(inscription)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{inscription.signum}</h3>
              <span className="text-sm text-slate-300">{inscription.location}</span>
            </div>
            {inscription.transliteration && (
              <p className="text-slate-200 mb-2">{inscription.transliteration}</p>
            )}
            {inscription.translation_sv && (
              <p className="text-slate-300 text-sm">{inscription.translation_sv}</p>
            )}
          </div>
        ))}
      </div>
      
      {/* Pagination for results */}
      <div className="mt-6 flex justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
          >
            Föregående
          </button>
          <span className="text-white px-3 py-2">
            {currentPage} av {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-slate-700 text-white rounded disabled:opacity-50"
          >
            Nästa
          </button>
        </div>
      </div>
    </div>
  );
};
