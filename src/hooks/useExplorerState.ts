import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFocusManager } from '@/hooks/useFocusManager';

export const useExplorerState = () => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [mapNavigate, setMapNavigate] = useState<((lat: number, lng: number, zoom: number) => void) | null>(null);
  const [godNameSearch, setGodNameSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const { toast } = useToast();
  const { t } = useLanguage();
  const { currentFocus } = useFocusManager();

  useEffect(() => {
    console.log('🗺️ [useExplorerState] mapNavigate state updated. Is function available?', !!mapNavigate);
  }, [mapNavigate]);

  const toggleExpanded = (id: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleMarkerClick = (inscription: any) => {
    toast({
      title: `${t('selected')} ${inscription.signum}`,
      description: inscription.location || t('unknownLocation'),
    });
    setExpandedCards(new Set([inscription.id]));
  };

  const handleResultClick = (inscription: any) => {
    console.log('🖱️ [useExplorerState] handleResultClick triggered for:', inscription.signum);
    console.log('   - Coordinates available:', !!inscription.coordinates, inscription.coordinates);
    console.log('   - mapNavigate function available:', !!mapNavigate);
    
    if (inscription.coordinates && mapNavigate) {
      console.log('   -> Navigating to coordinates:', inscription.coordinates);
      mapNavigate(inscription.coordinates.lat, inscription.coordinates.lng, 12);
    } else if (inscription.latitude && inscription.longitude && mapNavigate) {
      console.log('   -> Navigating to lat/lng:', inscription.latitude, inscription.longitude);
      mapNavigate(inscription.latitude, inscription.longitude, 12);
    } else {
      console.log('   -> NOT navigating. Missing coordinates or mapNavigate function.');
    }
    
    setExpandedCards(new Set([inscription.id]));
    
    toast({
      title: `Visar ${inscription.signum}`,
      description: inscription.location || 'Okänd plats',
    });
  };

  const handleGodNameSearch = (godName: string) => {
    console.log('God name search triggered:', godName);
    setGodNameSearch(godName);
    setCurrentPage(1);
    
    toast({
      title: `Söker efter ${godName}`,
      description: "Letar efter platser med gudanamn...",
    });
  };

  return {
    expandedCards,
    mapNavigate,
    godNameSearch,
    currentPage,
    itemsPerPage,
    currentFocus,
    setMapNavigate,
    setGodNameSearch,
    setCurrentPage,
    toggleExpanded,
    handleMarkerClick,
    handleResultClick,
    handleGodNameSearch,
    toast
  };
};
