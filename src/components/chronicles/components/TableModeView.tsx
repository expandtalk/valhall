
import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from 'lucide-react';
import { RoyalChroniclesTableView } from '../RoyalChroniclesTableView';
import { ViewModeToggle } from '../ViewModeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

interface TableModeViewProps {
  viewMode: 'cards' | 'table';
  onViewModeChange: (mode: 'cards' | 'table') => void;
}

export const TableModeView: React.FC<TableModeViewProps> = ({ viewMode, onViewModeChange }) => {
  const { language } = useLanguage();

  const getTableTitle = () => {
    return language === 'en' ? 'Nordic Kings - Table View' : 'Kungalängder - Tabellvy';
  };

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Crown className="h-5 w-5" />
            {getTableTitle()}
          </CardTitle>
          <ViewModeToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        </CardHeader>
      </Card>

      <RoyalChroniclesTableView />
    </div>
  );
};
