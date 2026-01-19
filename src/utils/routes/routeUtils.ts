
import { RoutePoint, RouteSection } from './types';
import { southernRoutePoints } from './southernRoute';
import { centralRoutePoints } from './centralRoute';
import { northernRoutePoints } from './northernRoute';

// Combine all route points
export const getAllRoutePoints = (): RoutePoint[] => {
  return [
    ...southernRoutePoints,
    ...centralRoutePoints,
    ...northernRoutePoints
  ];
};

// Helper function to group points by section
export const getRoutesBySection = (): RouteSection => {
  const allPoints = getAllRoutePoints();
  const sections: RouteSection = {};
  
  allPoints.forEach(point => {
    const section = point.section || 'Okänd';
    if (!sections[section]) {
      sections[section] = [];
    }
    sections[section].push(point);
  });
  
  return sections;
};

// Helper function to get main route
export const getMainRoute = (): RoutePoint[] => {
  return getAllRoutePoints();
};

// Helper function to get only major waypoints
export const getMajorWaypoints = (): RoutePoint[] => {
  return getAllRoutePoints().filter(point => point.isMajorWaypoint || point.isLotstation);
};

// Get route styling based on mode - mörkblå för vikingaläge
export const getRouteColor = (isVikingMode: boolean): string => {
  return isVikingMode ? '#1e3a8a' : '#3b82f6'; // mörkblå för viking, ljusblå för modern
};

// Get route description based on mode
export const getRouteDescription = (isVikingMode: boolean): string => {
  return isVikingMode 
    ? 'Kung Valdemars segelled (1230-talet) - Detaljerad historisk navigationsrutt från Utlängan till Tallinn'
    : 'King Valdemar\'s Sailing Route (1230s) - Detailed historic navigation route from Utlängan to Tallinn';
};
