
import { LegendItem } from '@/types/common';

export interface InteractiveMapProps {
  inscriptions: any[];
  onMarkerClick: (inscription: any) => void;
  className?: string;
  isVikingMode?: boolean;
  enabledLegendItems?: { [key: string]: boolean };
  selectedPeriod?: string;
  selectedTimePeriod?: string;
  onLegendDataChange?: (data: any) => void;
  onMapNavigate?: (navigateFunction: (lat: number, lng: number, zoom: number) => void) => void;
  legendItems?: LegendItem[];
  onLegendToggle?: (id: string) => void;
}
