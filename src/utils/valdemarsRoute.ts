
// Main export file for Valdemar's sailing route
// This file aggregates all route modules for easy importing

export type { RoutePoint, RouteSection } from './routes/types';

// Export all route points and utility functions
export { getAllRoutePoints as valdemarsRoute } from './routes/routeUtils';
export {
  getRoutesBySection,
  getMainRoute,
  getMajorWaypoints,
  getRouteColor,
  getRouteDescription
} from './routes/routeUtils';

// Export individual route sections for specific use cases
export { southernRoutePoints } from './routes/southernRoute';
export { centralRoutePoints } from './routes/centralRoute';
export { northernRoutePoints } from './routes/northernRoute';
