
export interface LegendItem {
  id: string;
  label: string;
  color: string;
  count: number;
  enabled: boolean;
  type?: 'primary' | 'category' | 'subcategory';
  children?: LegendItem[];
  parentId?: string;
}

export interface MapLegendProps {
  isVikingMode: boolean;
  legendItems: LegendItem[];
  onToggleItem: (id: string) => void;
  className?: string;
  onShowAll?: () => void;
  onHideAll?: () => void;
}
