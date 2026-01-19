
import React from 'react';
import { MapCore } from './map/MapCore';
import { InteractiveMapProps } from './map/types';

export const InteractiveMap: React.FC<InteractiveMapProps> = (props) => {
  return <MapCore {...props} />;
};
