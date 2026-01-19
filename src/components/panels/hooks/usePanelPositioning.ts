
import { PanelConfig } from '@/hooks/usePanelManager';

interface UsePanelPositioningProps {
  panelId: string;
  config: PanelConfig;
  scrollOffset: number;
  isDragging: boolean;
}

export const usePanelPositioning = ({ 
  panelId, 
  config, 
  scrollOffset, 
  isDragging 
}: UsePanelPositioningProps) => {
  const position = config.position || { x: 0, y: 0 };
  const size = config.size || { width: 320, height: 400 };

  // Handle right-aligned positioning (negative x values)
  const isRightAligned = position.x < 0;
  
  // For sticky panels, calculate position to keep them visible within viewport
  const shouldFollowScroll = panelId === 'filters' || panelId === 'legend';
  let adjustedY = position.y + 180; // Increased from 130px to 180px to move panels down another 50px
  
  if (shouldFollowScroll) {
    // Calculate panel bottom position relative to viewport
    const viewportHeight = window.innerHeight;
    const panelHeight = config.minimized ? 50 : size.height;
    const panelBottom = adjustedY + panelHeight - scrollOffset;
    
    // If panel would go below viewport, adjust its position
    if (panelBottom > viewportHeight) {
      adjustedY = viewportHeight - panelHeight + scrollOffset - 20; // 20px margin from bottom
    }
    
    // Ensure panel doesn't go above viewport top (accounting for the increased offset)
    adjustedY = Math.max(240 + scrollOffset, adjustedY); // Increased from 190 to 240
  }
  
  const style = {
    position: 'fixed' as const,
    top: Math.max(240, adjustedY - scrollOffset), // Increased from 190 to 240
    left: isRightAligned ? 'auto' : Math.max(20, position.x),
    right: isRightAligned ? Math.abs(position.x) + 'px' : 'auto',
    width: size.width,
    maxHeight: config.minimized ? 50 : size.height,
    height: config.minimized ? 'auto' : 'fit-content',
    maxWidth: Math.min(400, window.innerWidth - 40),
    zIndex: config.zIndex + (isDragging ? 1000 : 0),
    opacity: isDragging ? 0.95 : 1,
    transform: isDragging ? 'scale(1.01)' : 'scale(1)',
    transition: isDragging ? 'none' : 'all 0.15s ease'
  };

  return { style, size };
};
