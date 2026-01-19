import { 
  Package, 
  Fish, 
  Sparkles, 
  Droplet, 
  Sword, 
  Users,
  Palette,
  Gem
} from 'lucide-react';

export interface TradeGood {
  id: string;
  name: string;
  nameEn: string;
  icon: any; // Lucide icon component
  color: string;
  description: string;
  descriptionEn: string;
}

export const TRADE_GOODS: TradeGood[] = [
  {
    id: 'slavar',
    name: 'Slavar',
    nameEn: 'Slaves',
    icon: Users,
    color: '#64748b',
    description: 'Människohandel var tyvärr en central del av vikingatida ekonomi',
    descriptionEn: 'Human trafficking was unfortunately a central part of Viking Age economy'
  },
  {
    id: 'palsar',
    name: 'Pälsar',
    nameEn: 'Furs',
    icon: Package,
    color: '#78716c',
    description: 'Värdefulla djurskinn från norr, mycket eftertraktade i södern',
    descriptionEn: 'Valuable animal furs from the north, highly sought after in the south'
  },
  {
    id: 'barnsten',
    name: 'Bärnsten',
    nameEn: 'Amber',
    icon: Gem,
    color: '#f59e0b',
    description: 'Fossilt trädkåda från Östersjön, användes till smycken',
    descriptionEn: 'Fossilized tree resin from the Baltic, used for jewelry'
  },
  {
    id: 'honung',
    name: 'Honung & Vax',
    nameEn: 'Honey & Wax',
    icon: Droplet,
    color: '#fbbf24',
    description: 'Biodlingsprodukter, vax för ljus och försegling',
    descriptionEn: 'Beekeeping products, wax for candles and sealing'
  },
  {
    id: 'fisk',
    name: 'Fisk (Sill)',
    nameEn: 'Fish (Herring)',
    icon: Fish,
    color: '#06b6d4',
    description: 'Torkad och saltad fisk, viktig proteinkälla',
    descriptionEn: 'Dried and salted fish, important protein source'
  },
  {
    id: 'svard',
    name: 'Svärd & Vapen',
    nameEn: 'Swords & Weapons',
    icon: Sword,
    color: '#71717a',
    description: 'Högkvalitativa vapen och rustningar',
    descriptionEn: 'High-quality weapons and armor'
  },
  {
    id: 'jarn',
    name: 'Järn',
    nameEn: 'Iron',
    icon: Package,
    color: '#52525b',
    description: 'Svenskt järn av hög kvalitet',
    descriptionEn: 'Swedish iron of high quality'
  },
  {
    id: 'hantverk',
    name: 'Hantverk',
    nameEn: 'Crafts',
    icon: Palette,
    color: '#8b5cf6',
    description: 'Konsthantverk, smycken och textilier',
    descriptionEn: 'Handicrafts, jewelry and textiles'
  },
  {
    id: 'valross',
    name: 'Valrosselfenben',
    nameEn: 'Walrus Ivory',
    icon: Sparkles,
    color: '#f8fafc',
    description: 'Elfenben från valross, mycket värdefullt',
    descriptionEn: 'Ivory from walrus, very valuable'
  },
  {
    id: 'salt',
    name: 'Salt',
    nameEn: 'Salt',
    icon: Sparkles,
    color: '#e2e8f0',
    description: 'Viktig konserveringsprodukt',
    descriptionEn: 'Important preservation product'
  }
];

export const getGoodsByIds = (ids: string[]) => {
  return TRADE_GOODS.filter(good => ids.includes(good.id));
};
