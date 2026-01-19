
import { useState, useCallback, useRef, useEffect } from 'react';

interface UsePanelResizingProps {
  initialSize: { width: number; height: number };
  onSizeChange: (size: { width: number; height: number }) => void;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const usePanelResizing = ({
  initialSize,
  onSizeChange,
  minWidth = 250,
  minHeight = 200,
  maxWidth = 800,
  maxHeight = 800
}: UsePanelResizingProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<string>('');
  const resizeStartRef = useRef({ x: 0, y: 0, width: 0, height: 0 });

  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeDirection(direction);
    
    resizeStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      width: initialSize.width,
      height: initialSize.height
    };
  }, [initialSize]);

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStartRef.current.x;
    const deltaY = e.clientY - resizeStartRef.current.y;
    
    let newWidth = resizeStartRef.current.width;
    let newHeight = resizeStartRef.current.height;
    
    if (resizeDirection.includes('right')) {
      newWidth = Math.min(maxWidth, Math.max(minWidth, resizeStartRef.current.width + deltaX));
    }
    if (resizeDirection.includes('left')) {
      newWidth = Math.min(maxWidth, Math.max(minWidth, resizeStartRef.current.width - deltaX));
    }
    if (resizeDirection.includes('bottom')) {
      newHeight = Math.min(maxHeight, Math.max(minHeight, resizeStartRef.current.height + deltaY));
    }
    if (resizeDirection.includes('top')) {
      newHeight = Math.min(maxHeight, Math.max(minHeight, resizeStartRef.current.height - deltaY));
    }
    
    onSizeChange({ width: newWidth, height: newHeight });
  }, [isResizing, resizeDirection, onSizeChange, minWidth, minHeight, maxWidth, maxHeight]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    setResizeDirection('');
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = `${resizeDirection}-resize`;
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, handleResizeMove, handleResizeEnd, resizeDirection]);

  return {
    isResizing,
    handleResizeStart
  };
};
