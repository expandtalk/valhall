
import React from 'react';
import { CarverOverviewPanel } from '../carvers/CarverOverviewPanel';
import { CarverDetailPanel } from '../carvers/CarverDetailPanel';
import { VikingNamesView } from '../names/VikingNamesView';
import { FolkGroupsExplorerView } from '../folk-groups/FolkGroupsExplorerView';
import { GeneticEvolutionExplorerView } from '../genetic/GeneticEvolutionExplorerView';
import { FocusType } from '@/hooks/useFocusManager';

interface ExplorerPanelsProps {
  currentFocus: FocusType;
  selectedCarverId: string | null;
  handleCarverSelect: (carverId: string) => void;
  handleCarverBack: () => void;
  handleCarverInscriptionClick: (inscription: any) => void;
  onNameSelect?: (name: string) => void;
}

export const ExplorerPanels: React.FC<ExplorerPanelsProps> = ({
  currentFocus,
  selectedCarverId,
  handleCarverSelect,
  handleCarverBack,
  handleCarverInscriptionClick,
  onNameSelect
}) => {
  // Show Viking Names view when focus is on names
  if (currentFocus === 'names') {
    return <VikingNamesView onNameSelect={onNameSelect} />;
  }

  // Show Folk Groups view when focus is on folk groups
  if (currentFocus === 'folkGroups') {
    return <FolkGroupsExplorerView />;
  }

  // Show Genetic Evolution view when focus is on genetic events
  if (currentFocus === 'geneticEvents') {
    return <GeneticEvolutionExplorerView />;
  }

  // Show Carver Focus Panel when focus is on carvers
  if (currentFocus === 'carvers') {
    return (
      <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg p-4">
        {selectedCarverId ? (
          <CarverDetailPanel
            carverId={selectedCarverId}
            onBack={handleCarverBack}
            onInscriptionClick={handleCarverInscriptionClick}
          />
        ) : (
          <CarverOverviewPanel
            onCarverSelect={handleCarverSelect}
            selectedCarverId={selectedCarverId}
          />
        )}
      </div>
    );
  }

  return null;
};
