
export interface RoutePoint {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description?: string;
  section?: string;
  isLotstation?: boolean;
  isMajorWaypoint?: boolean;
}

export type RouteSection = {
  [key: string]: RoutePoint[];
};
