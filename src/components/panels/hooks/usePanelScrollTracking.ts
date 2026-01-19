
import { useState, useEffect } from 'react';

export const usePanelScrollTracking = (panelId: string) => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (panelId === 'filters' || panelId === 'legend') {
        setScrollOffset(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [panelId]);

  return scrollOffset;
};
