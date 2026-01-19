import React, { useEffect } from 'react';
import L from 'leaflet';

interface VikingRoad {
  id: string;
  name: string;
  road_type: 'rullstensas' | 'halvag' | 'vintervag' | 'bro' | 'vadstalle' | 'knutpunkt';
  start_coordinates: { x: number; y: number };
  end_coordinates: { x: number; y: number };
  description?: string;
  importance_level: 'low' | 'medium' | 'high' | 'critical';
}

interface RoadWaypoint {
  coordinates: { x: number; y: number };
  waypoint_order: number;
  name?: string;
}

interface RoadLandmark {
  name: string;
  landmark_type: 'bridge' | 'ford' | 'trading_post' | 'resting_place' | 'junction' | 'runestone' | 'boundary';
  coordinates: { x: number; y: number };
  description?: string;
  historical_significance?: string;
}

interface VikingRoadsLayerProps {
  map: L.Map;
  enabledItems: { [key: string]: boolean };
  isVisible: boolean;
}

// Road type styling
const getRoadStyle = (roadType: string, importance: string) => {
  const baseStyles = {
    weight: importance === 'critical' ? 4 : importance === 'high' ? 3 : 2,
    opacity: 0.8,
    dashArray: roadType === 'vintervag' ? '10,10' : roadType === 'halvag' ? '5,5' : undefined
  };

  const colors = {
    rullstensas: '#CD853F', // Peru/sandstone
    halvag: '#A0522D',      // Sienna brown
    vintervag: '#4682B4',   // Steel blue
    bro: '#2F4F4F',         // Dark slate gray
    vadstalle: '#2F4F4F',   // Dark slate gray
    knutpunkt: '#8B4513'    // Saddle brown
  };

  return {
    ...baseStyles,
    color: colors[roadType as keyof typeof colors] || '#8B4513'
  };
};

// Landmark icon creation
const createLandmarkIcon = (landmarkType: string) => {
  const iconMap = {
    bridge: '🌉',
    ford: '〰️',
    trading_post: '🏛️',
    resting_place: '🏕️',
    junction: '✗',
    runestone: '🗿',
    boundary: '⚡'
  };

  const icon = iconMap[landmarkType as keyof typeof iconMap] || '📍';
  
  return L.divIcon({
    html: `<div style="
      background: rgba(139, 69, 19, 0.9);
      color: white;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    ">${icon}</div>`,
    className: 'viking-road-landmark',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

// Mock data - will be replaced with actual Supabase data
const mockRoads: VikingRoad[] = [
  {
    id: '1',
    name: 'Uppsalaåsen (Norrstigen)',
    road_type: 'rullstensas',
    start_coordinates: { x: 17.9186, y: 59.6519 },
    end_coordinates: { x: 17.4167, y: 60.6333 },
    description: 'Huvudvägen genom Uppland längs rullstensåsen',
    importance_level: 'critical'
  },
  {
    id: '2',
    name: 'Badelundaåsen',
    road_type: 'rullstensas',
    start_coordinates: { x: 14.8000, y: 60.8000 },
    end_coordinates: { x: 17.0087, y: 58.7530 },
    description: 'Stor väg från Siljan genom Västerås till Nyköping',
    importance_level: 'critical'
  },
  {
    id: '3',
    name: 'Timmele hålvägar',
    road_type: 'halvag',
    start_coordinates: { x: 13.3200, y: 57.7950 },
    end_coordinates: { x: 13.3800, y: 57.7850 },
    description: 'Välbevarade hålvägar vid Timmele',
    importance_level: 'high'
  }
];

const mockWaypoints: { [roadId: string]: RoadWaypoint[] } = {
  '1': [
    { coordinates: { x: 17.9186, y: 59.6519 }, waypoint_order: 1, name: 'Arlanda' },
    { coordinates: { x: 17.6389, y: 59.8586 }, waypoint_order: 2, name: 'Uppsala' },
    { coordinates: { x: 17.4167, y: 60.6333 }, waypoint_order: 3, name: 'Skutskär' }
  ]
};

const mockLandmarks: RoadLandmark[] = [
  {
    name: 'Jarlabankes bro',
    landmark_type: 'bridge',
    coordinates: { x: 18.0703, y: 59.4439 },
    description: 'Berömd bro byggd av Jarlabanke',
    historical_significance: 'Central för förståelsen av vikingatida infrastruktur'
  },
  {
    name: 'Ramsundet',
    landmark_type: 'ford',
    coordinates: { x: 16.6000, y: 59.2833 },
    description: 'Vadställe vid Ramsundet med Sigurdsristningen',
    historical_significance: 'Platsen för den berömda Sigurdsristningen'
  },
  {
    name: 'Anundshög',
    landmark_type: 'junction',
    coordinates: { x: 16.3517, y: 59.6003 },
    description: 'Viktigt vägkors och ceremonielt centrum',
    historical_significance: 'Sveriges största fornminnesområde från vikingatiden'
  }
];

export const VikingRoadsLayer: React.FC<VikingRoadsLayerProps> = ({
  map,
  enabledItems,
  isVisible
}) => {
  useEffect(() => {
    if (!map || !isVisible) return;

    const layerGroup = L.layerGroup();
    
    // Add roads
    if (enabledItems.road_rullstensas || enabledItems.road_halvagar || enabledItems.road_vinteragar) {
      mockRoads.forEach(road => {
        const shouldShow = (
          (road.road_type === 'rullstensas' && enabledItems.road_rullstensas) ||
          (road.road_type === 'halvag' && enabledItems.road_halvagar) ||
          (road.road_type === 'vintervag' && enabledItems.road_vinteragar)
        );

        if (!shouldShow) return;

        const waypoints = mockWaypoints[road.id] || [];
        const roadPoints: L.LatLngExpression[] = [];

        // Add start point
        roadPoints.push([road.start_coordinates.y, road.start_coordinates.x]);

        // Add waypoints in order
        waypoints
          .sort((a, b) => a.waypoint_order - b.waypoint_order)
          .forEach(waypoint => {
            roadPoints.push([waypoint.coordinates.y, waypoint.coordinates.x]);
          });

        // Add end point (if not same as last waypoint)
        const lastPoint = roadPoints[roadPoints.length - 1] as [number, number];
        if (lastPoint[0] !== road.end_coordinates.y || lastPoint[1] !== road.end_coordinates.x) {
          roadPoints.push([road.end_coordinates.y, road.end_coordinates.x]);
        }

        const roadLine = L.polyline(roadPoints, getRoadStyle(road.road_type, road.importance_level));
        
        roadLine.bindPopup(`
          <div class="road-popup">
            <h3 class="font-semibold text-sm mb-2">${road.name}</h3>
            <p class="text-xs text-gray-600 mb-1"><strong>Typ:</strong> ${getRoadTypeLabel(road.road_type)}</p>
            <p class="text-xs text-gray-600 mb-1"><strong>Betydelse:</strong> ${getImportanceLabel(road.importance_level)}</p>
            ${road.description ? `<p class="text-xs text-gray-700">${road.description}</p>` : ''}
          </div>
        `);

        layerGroup.addLayer(roadLine);
      });
    }

    // Add landmarks
    if (enabledItems.road_landmarks) {
      mockLandmarks.forEach(landmark => {
        const marker = L.marker(
          [landmark.coordinates.y, landmark.coordinates.x],
          { icon: createLandmarkIcon(landmark.landmark_type) }
        );

        marker.bindPopup(`
          <div class="landmark-popup">
            <h3 class="font-semibold text-sm mb-2">${landmark.name}</h3>
            <p class="text-xs text-gray-600 mb-1"><strong>Typ:</strong> ${getLandmarkTypeLabel(landmark.landmark_type)}</p>
            ${landmark.description ? `<p class="text-xs text-gray-700 mb-2">${landmark.description}</p>` : ''}
            ${landmark.historical_significance ? `<p class="text-xs text-blue-600 italic">${landmark.historical_significance}</p>` : ''}
          </div>
        `);

        layerGroup.addLayer(marker);
      });
    }

    layerGroup.addTo(map);

    return () => {
      map.removeLayer(layerGroup);
    };
  }, [map, enabledItems, isVisible]);

  return null;
};

// Helper functions
const getRoadTypeLabel = (type: string) => {
  const labels = {
    rullstensas: 'Rullstensås (huvudväg)',
    halvag: 'Hålväg',
    vintervag: 'Vinterväg/isväg',
    bro: 'Bro',
    vadstalle: 'Vadställe',
    knutpunkt: 'Knutpunkt'
  };
  return labels[type as keyof typeof labels] || type;
};

const getImportanceLabel = (importance: string) => {
  const labels = {
    low: 'Låg',
    medium: 'Medel',
    high: 'Hög',
    critical: 'Kritisk'
  };
  return labels[importance as keyof typeof labels] || importance;
};

const getLandmarkTypeLabel = (type: string) => {
  const labels = {
    bridge: 'Bro',
    ford: 'Vadställe',
    trading_post: 'Handelsplats',
    resting_place: 'Rastplats',
    junction: 'Knutpunkt',
    runestone: 'Runsten',
    boundary: 'Gräns'
  };
  return labels[type as keyof typeof labels] || type;
};