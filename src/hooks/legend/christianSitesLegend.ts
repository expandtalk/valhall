import { LegendItem } from './types';
import { ChristianSite } from '@/hooks/useChristianSites';

export const generateChristianSitesLegendItems = (sites: ChristianSite[], t: (key: string) => string): LegendItem[] => {
  const items: LegendItem[] = [];

  // Group by period
  const earlyChristianSites = sites.filter(site => site.period === 'early_christian');
  const medievalSites = sites.filter(site => site.period === 'medieval');
  const lateMedievalSites = sites.filter(site => site.period === 'late_medieval');

  // Group by religious order
  const cistercianSites = sites.filter(site => site.religious_order === 'cistercian');
  const franciscanSites = sites.filter(site => site.religious_order === 'franciscan');
  const dominicanSites = sites.filter(site => site.religious_order === 'dominican');
  const birgittineSites = sites.filter(site => site.religious_order === 'birgittine');

  // Group by type
  const monasteries = sites.filter(site => site.site_type === 'monastery');
  const churches = sites.filter(site => site.site_type === 'church');
  const holyPlaces = sites.filter(site => site.site_type === 'holy_place');

  // Create main category for Christian sites
  const christianChildren: LegendItem[] = [];

  // Early Christian sites
  if (earlyChristianSites.length > 0) {
    christianChildren.push({
      id: 'early_christian_sites',
      label: t('earlyChristianity'),
      color: '#8B5CF6', // Purple
      count: earlyChristianSites.length,
      enabled: true
    });
  }

  // Medieval monasteries
  if (medievalSites.length > 0) {
    christianChildren.push({
      id: 'medieval_monasteries',
      label: t('medievalMonasteries'),
      color: '#3B82F6', // Blue
      count: medievalSites.length,
      enabled: true
    });
  }

  // Late medieval sites
  if (lateMedievalSites.length > 0) {
    christianChildren.push({
      id: 'late_medieval_sites',
      label: t('lateMiddleAgeMonasteries'),
      color: '#EF4444', // Red
      count: lateMedievalSites.length,
      enabled: true
    });
  }

  // Religious orders (subcategory)
  const orderChildren: LegendItem[] = [];

  if (cistercianSites.length > 0) {
    orderChildren.push({
      id: 'cistercian_monasteries',
      label: t('cistercianMonasteries'),
      color: '#10B981', // Emerald
      count: cistercianSites.length,
      enabled: false
    });
  }

  if (franciscanSites.length > 0) {
    orderChildren.push({
      id: 'franciscan_convents',
      label: t('franciscanOrder'),
      color: '#6B7280', // Gray
      count: franciscanSites.length,
      enabled: false
    });
  }

  if (dominicanSites.length > 0) {
    orderChildren.push({
      id: 'dominican_convents',
      label: t('dominicanOrder'),
      color: '#1F2937', // Dark gray
      count: dominicanSites.length,
      enabled: false
    });
  }

  if (birgittineSites.length > 0) {
    orderChildren.push({
      id: 'birgittine_monasteries',
      label: t('birgittineOrder'),
      color: '#F59E0B', // Amber
      count: birgittineSites.length,
      enabled: false
    });
  }

  if (orderChildren.length > 0) {
    christianChildren.push({
      id: 'religious_orders',
      label: t('monasticOrders'),
      color: '#8B5A2B',
      count: orderChildren.reduce((sum, child) => sum + child.count, 0),
      enabled: false,
      type: 'category',
      children: orderChildren
    });
  }

  // Holy places
  if (holyPlaces.length > 0) {
    christianChildren.push({
      id: 'holy_places',
      label: t('holySites'),
      color: '#DC2626', // Red
      count: holyPlaces.length,
      enabled: false
    });
  }

  // Create main item
  const totalChristianSites = sites.length;
  if (totalChristianSites > 0) {
    items.push({
      id: 'christian_sites',
      label: '⛪ ' + t('monasteriesAndChristianSites'),
      color: '#8B5A2B',
      count: totalChristianSites,
      enabled: false, // Start disabled to avoid clutter
      type: 'category',
      children: christianChildren
    });
  }


  return items;
};