
import React from 'react';
import { PanelConfig } from '@/hooks/usePanelManager';

interface PanelContentProps {
  config: PanelConfig;
  size: { width: number; height: number };
  children: React.ReactNode;
}

export const PanelContent: React.FC<PanelContentProps> = ({
  config,
  size,
  children
}) => {
  if (config.minimized) return null;

  return (
    <div className="p-3 overflow-y-auto" style={{ maxHeight: size.height - 60 }}>
      {children}
    </div>
  );
};
