
import { RoutePoint } from './types';
import { stockholmToRoslagenPoints } from './sections/stockholmToRoslagen';
import { alandSectionPoints } from './sections/alandSection';
import { finnishCoastPoints } from './sections/finnishCoast';
import { toTallinnPoints } from './sections/toTallinn';

// Northern route sections: Stockholm to Finland and Estonia - following waterways
export const northernRoutePoints: RoutePoint[] = [
  ...stockholmToRoslagenPoints,
  ...alandSectionPoints,
  ...finnishCoastPoints,
  ...toTallinnPoints
];
