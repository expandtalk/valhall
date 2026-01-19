
import React, { useRef } from 'react';
import { PanelConfig } from '@/hooks/usePanelManager';
import { usePanelDragging } from './hooks/usePanelDragging';
import { usePanelScrollTracking } from './hooks/usePanelScrollTracking';
import { usePanelPositioning } from './hooks/usePanelPositioning';
import { usePanelResizing } from './hooks/usePanelResizing';
import { PanelHeader } from './components/PanelHeader';
import { PanelContent } from './components/PanelContent';
import { ResizeHandles } from './components/ResizeHandles';

interface DraggablePanelProps {
  panelId: string;
  config: PanelConfig;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  onToggleMinimized?: () => void;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const DraggablePanel: React.FC<DraggablePanelProps> = ({
  panelId,
  config,
  onPositionChange,
  onSizeChange,
  onToggleMinimized,
  onClose,
  children,
  className = "",
  title
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  
  const { isDragging, handleMouseDown } = usePanelDragging({
    onPositionChange,
    config
  });
  
  const { isResizing, handleResizeStart } = usePanelResizing({
    initialSize: config.size,
    onSizeChange,
    minWidth: 250,
    minHeight: 150,
    maxWidth: 800,
    maxHeight: 600
  });
  
  const scrollOffset = usePanelScrollTracking(panelId);
  
  const { style, size } = usePanelPositioning({
    panelId,
    config,
    scrollOffset,
    isDragging: isDragging || isResizing
  });

  if (!config.visible) return null;

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (!isResizing) {
      handleMouseDown(e, panelRef);
    }
  };

  return (
    <div
      ref={panelRef}
      className={`bg-gray-900/98 backdrop-blur-lg border border-gray-500/70 rounded-lg shadow-2xl relative ${className}`}
      style={style}
    >
      <PanelHeader
        panelId={panelId}
        config={config}
        title={title}
        onMouseDown={handleHeaderMouseDown}
        onToggleMinimized={onToggleMinimized}
        onClose={onClose}
      />
      
      <PanelContent config={config} size={size}>
        {children}
      </PanelContent>

      {/* Resize handles */}
      <ResizeHandles 
        onResizeStart={handleResizeStart}
        isCompact={config.minimized}
      />
    </div>
  );
};
