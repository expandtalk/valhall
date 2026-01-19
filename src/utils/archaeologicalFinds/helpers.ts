
import { ArchaeologicalFind } from './types';

export const getFindIcon = (findType: string): string => {
  switch (findType) {
    case 'rock_carving': return '🗿';
    case 'settlement': return '🏠';
    case 'burial': return '⚱️';
    case 'boat_graves': return '⛵';
    case 'artifacts': return '🏺';
    case 'weapons': return '⚔️';
    case 'workshop': return '🔨';
    case 'trading_city': return '🏪';
    case 'ritual': return '⛩️';
    case 'city': return '🏛️';
    default: return '📍';
  }
};

export const getFindColor = (period: string): { background: string; border: string; text: string } => {
  switch (period) {
    case 'paleolithic':
      return { background: 'rgba(139, 69, 19, 0.9)', border: '#8b4513', text: '#ffffff' };
    case 'mesolithic':
      return { background: 'rgba(160, 82, 45, 0.9)', border: '#a0522d', text: '#ffffff' };
    case 'neolithic':
      return { background: 'rgba(210, 180, 140, 0.9)', border: '#d2b48c', text: '#000000' };
    case 'bronze_age':
      return { background: 'rgba(205, 127, 50, 0.9)', border: '#cd7f32', text: '#ffffff' };
    case 'iron_age':
      return { background: 'rgba(105, 105, 105, 0.9)', border: '#696969', text: '#ffffff' };
    case 'migration_period':
      return { background: 'rgba(128, 0, 128, 0.9)', border: '#800080', text: '#ffffff' };
    case 'vendel_period':
      return { background: 'rgba(255, 140, 0, 0.9)', border: '#ff8c00', text: '#000000' };
    case 'viking_age':
      return { background: 'rgba(220, 20, 60, 0.9)', border: '#dc143c', text: '#ffffff' };
    default:
      return { background: 'rgba(156, 163, 175, 0.9)', border: '#6b7280', text: '#ffffff' };
  }
};

export const getFindsInPeriod = (finds: ArchaeologicalFind[], period: string): ArchaeologicalFind[] => {
  if (period === 'all') return finds;
  return finds.filter(find => find.period === period);
};

export const getPeriodName = (period: string): string => {
  const periodNames: { [key: string]: string } = {
    'paleolithic': 'Paleolitikum',
    'mesolithic': 'Mesolitikum', 
    'neolithic': 'Neolitikum',
    'bronze_age': 'Bronsålder',
    'iron_age': 'Järnålder',
    'migration_period': 'Folkvandringstid',
    'vendel_period': 'Vendeltid',
    'viking_age': 'Vikingatid'
  };
  return periodNames[period] || period;
};
