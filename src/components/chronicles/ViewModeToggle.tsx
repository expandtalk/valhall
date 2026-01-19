
import React from 'react';
import { Grid, Table } from 'lucide-react';

type ViewMode = 'cards' | 'table';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewModeChange('cards')}
        className={`flex items-center gap-2 px-3 py-2 rounded ${
          viewMode === 'cards' ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300'
        }`}
      >
        <Grid className="h-4 w-4" />
        Kort-vy
      </button>
      <button
        onClick={() => onViewModeChange('table')}
        className={`flex items-center gap-2 px-3 py-2 rounded ${
          viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-slate-600 text-slate-300'
        }`}
      >
        <Table className="h-4 w-4" />
        Tabell-vy
      </button>
    </div>
  );
};
