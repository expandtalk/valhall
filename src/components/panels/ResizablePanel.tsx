
import React, { useState, useRef, useEffect } from 'react';
import { Grip, GripVertical } from 'lucide-react';
import { PanelConfig } from '@/hooks/usePanelManager';

interface ResizablePanelProps {
  panelId: string;
  config: PanelConfig;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
  className?: string;
  resizable?: boolean;
}

// Define snap zones for smart positioning
const SNAP_ZONES = [
  { id: 'top-right', x: -16, y: 16, anchor: 'top-right' },
  { id: 'bottom-right', x: -16, y: -16, anchor: 'bottom-right' },
  { id: 'top-left', x: 16, y: 16, anchor: 'top-left' },
  { id: 'bottom-left', x: 16, y: -16, anchor: 'bottom-left' },
  { id: 'right-center', x: -16, y: 0, anchor: 'right-center' }
];

const SNAP_THRESHOLD = 50; // pixels

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  panelId,
  config,
  onPositionChange,
  onSizeChange,
  children,
  className = "",
  resizable = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ width: 0, height: 0, mouseY: 0 });
  const [showSnapZones, setShowSnapZones] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!panelRef.current) return;
    setIsDragging(true);
    setShowSnapZones(true);
    const rect = panelRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    const size = config.size || { width: 320, height: 400 };
    setResizeStart({
      width: size.width,
      height: size.height,
      mouseY: e.clientY
    });
  };

  const getSnapPosition = (mouseX: number, mouseY: number) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const panelWidth = config.size?.width || 320;
    const panelHeight = config.size?.height || 400;

    // Calculate distances to each snap zone
    const snapDistances = SNAP_ZONES.map(zone => {
      let targetX, targetY;
      
      switch (zone.anchor) {
        case 'top-right':
          targetX = windowWidth - panelWidth + zone.x;
          targetY = zone.y;
          break;
        case 'bottom-right':
          targetX = windowWidth - panelWidth + zone.x;
          targetY = windowHeight - panelHeight + zone.y;
          break;
        case 'top-left':
          targetX = zone.x;
          targetY = zone.y;
          break;
        case 'bottom-left':
          targetX = zone.x;
          targetY = windowHeight - panelHeight + zone.y;
          break;
        case 'right-center':
          targetX = windowWidth - panelWidth + zone.x;
          targetY = (windowHeight - panelHeight) / 2;
          break;
        default:
          targetX = zone.x;
          targetY = zone.y;
      }

      const distance = Math.sqrt(
        Math.pow(mouseX - dragStart.x - targetX, 2) + 
        Math.pow(mouseY - dragStart.y - targetY, 2)
      );

      return { ...zone, targetX, targetY, distance };
    });

    // Find closest snap zone within threshold
    const closestSnap = snapDistances
      .filter(snap => snap.distance < SNAP_THRESHOLD)
      .sort((a, b) => a.distance - b.distance)[0];

    return closestSnap ? { x: closestSnap.targetX, y: closestSnap.targetY } : null;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const snapPosition = getSnapPosition(e.clientX, e.clientY);
      
      if (snapPosition) {
        onPositionChange(snapPosition);
      } else {
        const newPosition = {
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        };
        onPositionChange(newPosition);
      }
    } else if (isResizing) {
      const deltaY = e.clientY - resizeStart.mouseY;
      const newHeight = Math.max(200, resizeStart.height + deltaY);
      onSizeChange({
        width: resizeStart.width,
        height: newHeight
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setShowSnapZones(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart]);

  if (!config.visible) return null;

  // Safe access to position with fallback values
  const position = config.position || { x: 0, y: 0 };
  const size = config.size || { width: 320, height: 400 };

  const style = {
    position: 'absolute' as const,
    top: position.y || 'auto',
    left: position.x || 'auto',
    right: position.x ? 'auto' : (panelId === 'legend' ? '16px' : 'auto'),
    width: size.width,
    height: config.minimized ? 'auto' : size.height,
    zIndex: config.zIndex,
    cursor: isDragging ? 'grabbing' : 'default'
  };

  return (
    <>
      {/* Snap zones overlay - only visible when dragging */}
      {showSnapZones && isDragging && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {SNAP_ZONES.map(zone => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const panelWidth = config.size?.width || 320;
            const panelHeight = config.size?.height || 400;
            
            let snapX, snapY;
            switch (zone.anchor) {
              case 'top-right':
                snapX = windowWidth - panelWidth + zone.x;
                snapY = zone.y;
                break;
              case 'bottom-right':
                snapX = windowWidth - panelWidth + zone.x;
                snapY = windowHeight - panelHeight + zone.y;
                break;
              case 'top-left':
                snapX = zone.x;
                snapY = zone.y;
                break;
              case 'bottom-left':
                snapX = zone.x;
                snapY = windowHeight - panelHeight + zone.y;
                break;
              case 'right-center':
                snapX = windowWidth - panelWidth + zone.x;
                snapY = (windowHeight - panelHeight) / 2;
                break;
              default:
                snapX = zone.x;
                snapY = zone.y;
            }

            return (
              <div
                key={zone.id}
                className="absolute border-2 border-blue-400 bg-blue-400/20 rounded-lg transition-all duration-200"
                style={{
                  left: snapX,
                  top: snapY,
                  width: panelWidth,
                  height: config.minimized ? 'auto' : panelHeight,
                  minHeight: config.minimized ? '40px' : panelHeight
                }}
              />
            );
          })}
        </div>
      )}

      <div
        ref={panelRef}
        className={`transition-all duration-300 ${className} ${isDragging ? 'z-50' : ''}`}
        style={style}
      >
        {/* Enhanced draggable header with traditional grip icon */}
        {!config.minimized && (
          <div
            className="absolute top-2 left-2 p-2 bg-slate-700/90 rounded cursor-grab active:cursor-grabbing z-10 opacity-60 hover:opacity-100 transition-all duration-200 hover:bg-slate-600/90 group"
            onMouseDown={handleMouseDown}
            title="Drag to move panel - get close to edges to snap"
          >
            <Grip className="h-4 w-4 text-slate-200 group-hover:text-white transition-colors" />
          </div>
        )}

        {/* Resize handle for resizable panels */}
        {resizable && !config.minimized && (
          <div
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 p-1 bg-slate-700/90 rounded cursor-ns-resize z-10 opacity-60 hover:opacity-100 transition-all duration-200 hover:bg-slate-600/90 group"
            onMouseDown={handleResizeMouseDown}
            title="Resize panel height"
          >
            <GripVertical className="h-3 w-3 text-slate-200 group-hover:text-white transition-colors rotate-90" />
          </div>
        )}
        
        {children}
      </div>
    </>
  );
};
