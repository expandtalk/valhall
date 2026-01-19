
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const LoadingView: React.FC = () => {
  const { language } = useLanguage();

  const getLoadingText = () => {
    if (language === 'en') {
      return {
        title: "Loading Nordic kings...",
        dynasties: "• Fetching dynasties...",
        sources: "• Fetching historical sources...",
        kings: "• Fetching kings and jarls..."
      };
    }
    
    return {
      title: "Laddar kungalängder...",
      dynasties: "• Hämtar dynastier...",
      sources: "• Hämtar historiska källor...",
      kings: "• Hämtar kungar och jarlar..."
    };
  };

  const loadingText = getLoadingText();

  return (
    <div className="p-6 text-white">
      <div className="text-center">
        <p className="text-xl mb-4">{loadingText.title}</p>
        <div className="space-y-2 text-slate-300">
          <p>{loadingText.dynasties}</p>
          <p>{loadingText.sources}</p>
          <p>{loadingText.kings}</p>
        </div>
      </div>
    </div>
  );
};
