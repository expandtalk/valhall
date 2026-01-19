
import React from 'react';

interface ResizeHandlesProps {
  onResizeStart: (e: React.MouseEvent, direction: string) => void;
  isCompact?: boolean;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ 
  onResizeStart, 
  isCompact = false 
}) => {
  if (isCompact) return null;

  return (
    <>
      {/* Corner handles */}
      <div
        className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize opacity-0 hover:opacity-100 transition-opacity"
        onMouseDown={(e) => onResizeStart(e, 'top-left')}
        style={{ background: 'linear-gradient(-45deg, transparent 40%, #6b7280 40%, #6b7280 60%, transparent 60%)' }}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize opacity-0 hover:opacity-100 transition-opacity"
        onMouseDown={(e) => onResizeStart(e, 'top-right')}
        style={{ background: 'linear-gradient(45deg, transparent 40%, #6b7280 40%, #6b7280 60%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize opacity-0 hover:opacity-100 transition-opacity"
        onMouseDown={(e) => onResizeStart(e, 'bottom-left')}
        style={{ background: 'linear-gradient(45deg, transparent 40%, #6b7280 40%, #6b7280 60%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
        onMouseDown={(e) => onResizeStart(e, 'bottom-right')}
        style={{ background: 'linear-gradient(-45deg, transparent 40%, #6b7280 40%, #6b7280 60%, transparent 60%)' }}
      />
      
      {/* Edge handles */}
      <div
        className="absolute top-0 left-3 right-3 h-1 cursor-n-resize opacity-0 hover:opacity-100 transition-opacity bg-gray-500"
        onMouseDown={(e) => onResizeStart(e, 'top')}
      />
      <div
        className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize opacity-0 hover:opacity-100 transition-opacity bg-gray-500"
        onMouseDown={(e) => onResizeStart(e, 'bottom')}
      />
      <div
        className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity bg-gray-500"
        onMouseDown={(e) => onResizeStart(e, 'left')}
      />
      <div
        className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity bg-gray-500"
        onMouseDown={(e) => onResizeStart(e, 'right')}
      />
    </>
  );
};
