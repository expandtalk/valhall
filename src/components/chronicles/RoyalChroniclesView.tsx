
import React from 'react';
import { useHistoricalKings, useHistoricalSources, useRoyalDynasties, useKingSourceMentions } from '@/hooks/chronicles';
import { useRoyalChroniclesState } from './hooks/useRoyalChroniclesState';
import { useRoyalChroniclesLogic } from './hooks/useRoyalChroniclesLogic';
import { LoadingView } from './components/LoadingView';
import { TableModeView } from './components/TableModeView';
import { MainHeader } from './components/MainHeader';
import { TabsView } from './components/TabsView';
import { AdminPanel } from './admin/AdminPanel';
import { useIsAdmin } from '@/hooks/useAuth';

export const RoyalChroniclesView: React.FC = () => {
  const { isAdmin } = useIsAdmin();
  const {
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
  } = useRoyalChroniclesState();
  
  const { data: kings, isLoading: kingsLoading, error: kingsError } = useHistoricalKings(selectedRegion, selectedRulerType, selectedGender);
  const { data: sources, isLoading: sourcesLoading } = useHistoricalSources();
  const { data: dynasties, isLoading: dynastiesLoading } = useRoyalDynasties();
  const { data: sourceMentions } = useKingSourceMentions(selectedKing || undefined);

  const { regularKings, legendaryKings, getRulerTypeLabel } = useRoyalChroniclesLogic(kings, selectedRulerType, selectedGender);

  const handleKingSelect = (kingId: string) => {
    setSelectedKing(selectedKing === kingId ? null : kingId);
  };

  if (kingsLoading || sourcesLoading || dynastiesLoading) {
    return <LoadingView />;
  }

  if (kingsError) {
    console.error('Error loading kings:', kingsError);
  }

  // If card view is selected, show the main view
  if (viewMode === 'cards') {

    return (
      <div className="space-y-6 p-6">
        <MainHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedRegion={selectedRegion}
          selectedRulerType={selectedRulerType}
          selectedGender={selectedGender}
          onRegionChange={setSelectedRegion}
          onRulerTypeChange={setSelectedRulerType}
          onGenderChange={setSelectedGender}
          kings={regularKings}
          sources={sources}
          dynasties={dynasties}
        />

        {isAdmin && (
          <AdminPanel selectedRegion={selectedRegion} />
        )}

        <TabsView
          regularKings={regularKings}
          legendaryKings={legendaryKings}
          sources={sources}
          dynasties={dynasties}
          sourceMentions={sourceMentions}
          selectedKing={selectedKing}
          selectedRegion={selectedRegion}
          selectedRulerType={selectedRulerType}
          selectedGender={selectedGender}
          getRulerTypeLabel={getRulerTypeLabel}
          onKingSelect={handleKingSelect}
        />
      </div>
    );
  }

  // Default to table view
  return (
    <div className="space-y-6 p-6">
      {isAdmin && (
        <AdminPanel selectedRegion={selectedRegion} />
      )}
      <TableModeView viewMode={viewMode} onViewModeChange={setViewMode} />
    </div>
  );
};
