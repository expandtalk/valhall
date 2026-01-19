
import React from 'react';
import { Grip, ChevronDown, ChevronUp, X } from 'lucide-react';
import { PanelConfig } from '@/hooks/usePanelManager';

interface PanelHeaderProps {
  panelId: string;
  config: PanelConfig;
  title?: string;
  onMouseDown: (e: React.MouseEvent) => void;
  onToggleMinimized?: () => void;
  onClose?: () => void;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({
  panelId,
  config,
  title,
  onMouseDown,
  onToggleMinimized,
  onClose
}) => {
  // Get panel title based on panelId
  const getPanelTitle = () => {
    if (title) return title;
    switch (panelId) {
      case 'legend': return 'Map Legend';
      case 'filters': return 'Filter SRD';
      case 'results': return 'Sökresultat';
      case 'search': return 'Sökning';
      default: return '';
    }
  };

  return (
    <div className="relative h-12 border-b border-gray-500/50 bg-gray-800/95 rounded-t-lg flex items-center">
      {/* Drag handle - left */}
      <div
        className="flex items-center gap-2 px-3 cursor-grab active:cursor-grabbing flex-1"
        onMouseDown={onMouseDown}
        title="Dra för att flytta panel"
      >
        <Grip className="h-3 w-3 text-slate-300 opacity-70" />
        {config.minimized && (
          <span className="text-white text-sm font-medium">{getPanelTitle()}</span>
        )}
      </div>

      {/* Control buttons - right */}
      {(onToggleMinimized || onClose) && (
        <div className="flex gap-1 px-2">
          {onToggleMinimized && (
            <button
              onClick={onToggleMinimized}
              className="p-1.5 bg-slate-600/95 rounded opacity-90 hover:opacity-100 transition-all duration-200 hover:bg-slate-500/95 group"
              title={config.minimized ? "Expandera panel" : "Minimera panel"}
            >
              {config.minimized ? (
                <ChevronDown className="h-3 w-3 text-slate-100 group-hover:text-white transition-colors" />
              ) : (
                <ChevronUp className="h-3 w-3 text-slate-100 group-hover:text-white transition-colors" />
              )}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 bg-slate-600/95 rounded opacity-90 hover:opacity-100 transition-all duration-200 hover:bg-red-600/95 group"
              title="Stäng panel"
            >
              <X className="h-3 w-3 text-slate-100 group-hover:text-white transition-colors" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
