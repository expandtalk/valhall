
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSectionTitles } from '../utils/labelUtils';
import { useDynastyMembers } from '@/hooks/chronicles';
import { DynastyMembersModal } from '../../DynastyMembersModal';
import type { RoyalDynasty } from '@/hooks/useRoyalChronicles';

interface DynastiesSectionProps {
  dynasties?: RoyalDynasty[];
  onSelectItem: (item: any) => void;
}

export const DynastiesSection: React.FC<DynastiesSectionProps> = ({ dynasties, onSelectItem }) => {
  const { language } = useLanguage();
  const sectionTitles = getSectionTitles(language);
  const [selectedDynasty, setSelectedDynasty] = useState<RoyalDynasty | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: dynastyMembers = [] } = useDynastyMembers(selectedDynasty?.id);

  const handleDynastyClick = (dynasty: RoyalDynasty) => {
    setSelectedDynasty(dynasty);
    setIsModalOpen(true);
    onSelectItem({ type: 'dynasty', data: dynasty });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDynasty(null);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="h-5 w-5" />
          {sectionTitles.clickableDynasties}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dynasties?.map((dynasty) => (
            <Button 
              key={dynasty.id}
              variant="outline" 
              className="h-auto p-3 text-left justify-start bg-slate-800/60 border-slate-600 hover:bg-slate-700/60"
              onClick={() => handleDynastyClick(dynasty)}
            >
              <div>
                <div className="font-medium text-white">{dynasty.name}</div>
                <div className="text-xs text-slate-400">{dynasty.region}</div>
                <div className="text-xs text-slate-400">{dynasty.period_start}–{dynasty.period_end}</div>
              </div>
            </Button>
          ))}
        </div>
        
        <DynastyMembersModal
          dynasty={selectedDynasty}
          members={dynastyMembers}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </CardContent>
    </Card>
  );
};
