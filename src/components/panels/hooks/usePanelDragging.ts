
import { useState, useEffect } from 'react';
import { PanelConfig } from '@/hooks/usePanelManager';

interface UsePanelDraggingProps {
  onPositionChange: (position: { x: number; y: number }) => void;
  config: PanelConfig;
}

export const usePanelDragging = ({ onPositionChange, config }: UsePanelDraggingProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, panelRef: React.RefObject<HTMLDivElement>) => {
    if (!panelRef.current) return;
    setIsDragging(true);
    const rect = panelRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    // Determine if this should be right-aligned or left-aligned based on position
    let position;
    
    if (newX > viewport.width / 2) {
      // Right side of screen - use negative positioning
      const rightOffset = viewport.width - newX - config.size.width;
      position = {
        x: -Math.max(20, rightOffset), // Negative for right-alignment
        y: Math.max(60, Math.min(viewport.height - 200, newY))
      };
    } else {
      // Left side of screen - use positive positioning
      position = {
        x: Math.max(20, Math.min(viewport.width - config.size.width - 20, newX)),
        y: Math.max(60, Math.min(viewport.height - 200, newY))
      };
    }
    
    onPositionChange(position);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'grabbing';
    } else {
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, dragStart, config.size]);

  return {
    isDragging,
    handleMouseDown
  };
};
