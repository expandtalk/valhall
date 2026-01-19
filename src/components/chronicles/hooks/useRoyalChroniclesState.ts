
import { useState } from 'react';

type ViewMode = 'cards' | 'table';

export const useRoyalChroniclesState = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedRulerType, setSelectedRulerType] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedKing, setSelectedKing] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  return {
    selectedRegion,
    setSelectedRegion,
    selectedRulerType,
    setSelectedRulerType,
    selectedGender,
    setSelectedGender,
    selectedKing,
    setSelectedKing,
    viewMode,
    setViewMode,
  };
};
