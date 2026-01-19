
import { useState, useCallback } from 'react';

export interface PanelConfig {
  id: string;
  visible: boolean;
  minimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface PanelPreset {
  name: string;
  description: string;
  panels: Record<string, Partial<PanelConfig>>;
}

const DEFAULT_PANELS: Record<string, PanelConfig> = {
  map: {
    id: 'map',
    visible: true,
    minimized: false,
    position: { x: 0, y: 0 },
    size: { width: 100, height: 600 },
    zIndex: 1
  },
  legend: {
    id: 'legend',
    visible: true,
    minimized: false,
    position: { x: window.innerWidth - 320, y: 20 }, // Position to the right
    size: { width: 300, height: 500 },
    zIndex: 1000
  },
  results: {
    id: 'results',
    visible: false,
    minimized: false,
    position: { x: 20, y: 110 },
    size: { width: 380, height: 480 },
    zIndex: 1001
  },
  search: {
    id: 'search',
    visible: false,
    minimized: false,
    position: { x: 420, y: 110 },
    size: { width: 320, height: 450 },
    zIndex: 1002
  },
  filters: {
    id: 'filters',
    visible: true,
    minimized: true,
    position: { x: 20, y: 20 }, // Position to the left
    size: { width: 320, height: 500 },
    zIndex: 1003
  }
};

const LAYOUT_PRESETS: Record<string, PanelPreset> = {
  explorer: {
    name: 'Explorer Mode',
    description: 'Balanserat läge för allmän utforskning',
    panels: {
      map: { visible: true, minimized: false },
      legend: { visible: true, minimized: false },
      results: { visible: false },
      search: { visible: false },
      filters: { visible: true, minimized: true }
    }
  },
  linguist: {
    name: 'Språkvetare',
    description: 'Fokus på inskrifter - filter expanderat till höger',
    panels: {
      map: { visible: true, minimized: false },
      legend: { visible: false },
      results: { visible: true, minimized: false, position: { x: 20, y: 500 } },
      search: { visible: false },
      filters: { 
        visible: true, 
        minimized: false,
        position: { x: -20, y: 500 },
        size: { width: 300, height: 600 }
      }
    }
  },
  geographer: {
    name: 'Kulturgeograf',
    description: 'Stor karta och rumslig analys',
    panels: {
      map: { visible: true, minimized: false },
      legend: { visible: true, minimized: false },
      results: { visible: false },
      search: { visible: false },
      filters: { visible: false }
    }
  },
  researcher: {
    name: 'Forskare',
    description: 'Alla verktyg - paneler minimerade för ren vy',
    panels: {
      map: { visible: true, minimized: false },
      legend: { visible: true, minimized: true },
      results: { visible: true, minimized: false, position: { x: 20, y: 1000 } },
      search: { visible: true, minimized: false, position: { x: 420, y: 1000 } },
      filters: { visible: true, minimized: true }
    }
  }
};

export const usePanelManager = () => {
  const [panels, setPanels] = useState<Record<string, PanelConfig>>(() => {
    // Check if we have saved layout in localStorage
    const saved = localStorage.getItem('panelLayout');
    if (saved) {
      try {
        const parsedPanels = JSON.parse(saved);
        // Ensure legend is positioned to the right if no custom position
        if (parsedPanels.legend && !parsedPanels.legend.position) {
          parsedPanels.legend.position = { x: window.innerWidth - 320, y: 20 };
        }
        return { ...DEFAULT_PANELS, ...parsedPanels };
      } catch (error) {
        console.error('Error parsing saved panel layout:', error);
      }
    }
    return DEFAULT_PANELS;
  });

  const [activePreset, setActivePreset] = useState<string>(() => {
    return localStorage.getItem('activePreset') || 'explorer';
  });

  const updatePanel = useCallback((panelId: string, updates: Partial<PanelConfig>) => {
    setPanels(prev => {
      const newPanels = {
        ...prev,
        [panelId]: { ...prev[panelId], ...updates }
      };
      localStorage.setItem('panelLayout', JSON.stringify(newPanels));
      return newPanels;
    });
  }, []);

  const togglePanelVisibility = useCallback((panelId: string) => {
    updatePanel(panelId, { 
      visible: !panels[panelId]?.visible,
      minimized: false
    });
  }, [panels, updatePanel]);

  const togglePanelMinimized = useCallback((panelId: string) => {
    updatePanel(panelId, { 
      minimized: !panels[panelId]?.minimized 
    });
  }, [panels, updatePanel]);

  const setPanelPosition = useCallback((panelId: string, position: { x: number; y: number }) => {
    updatePanel(panelId, { position });
  }, [updatePanel]);

  const setPanelSize = useCallback((panelId: string, size: { width: number; height: number }) => {
    updatePanel(panelId, { size });
  }, [updatePanel]);

  const applyPreset = useCallback((presetName: string) => {
    const preset = LAYOUT_PRESETS[presetName];
    if (!preset) return;

    console.log('Applying preset:', presetName, preset);

    setPanels(prev => {
      const newPanels = { ...DEFAULT_PANELS };
      
      Object.entries(preset.panels).forEach(([panelId, config]) => {
        if (newPanels[panelId]) {
          newPanels[panelId] = { ...newPanels[panelId], ...config };
        }
      });
      
      // Ensure legend is positioned to the right
      if (newPanels.legend) {
        newPanels.legend.position = { x: window.innerWidth - 320, y: 20 };
      }
      
      localStorage.setItem('panelLayout', JSON.stringify(newPanels));
      return newPanels;
    });
    setActivePreset(presetName);
    localStorage.setItem('activePreset', presetName);
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaultsWithRightPosition = {
      ...DEFAULT_PANELS,
      legend: {
        ...DEFAULT_PANELS.legend,
        position: { x: window.innerWidth - 320, y: 20 }
      }
    };
    setPanels(defaultsWithRightPosition);
    localStorage.removeItem('panelLayout');
    setActivePreset('explorer');
    localStorage.setItem('activePreset', 'explorer');
  }, []);

  return {
    panels,
    activePreset,
    presets: LAYOUT_PRESETS,
    updatePanel,
    togglePanelVisibility,
    togglePanelMinimized,
    setPanelPosition,
    setPanelSize,
    applyPreset,
    resetToDefaults
  };
};
