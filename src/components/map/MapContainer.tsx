
import React from 'react';

interface MapContainerProps {
  mapContainer: React.RefObject<HTMLDivElement>;
}

export const MapContainer: React.FC<MapContainerProps> = ({ mapContainer }) => {
  return (
    <div 
      ref={mapContainer} 
      className="w-full h-[600px] rounded-b-lg relative z-0"
      style={{ 
        minHeight: '600px',
        background: '#f8f9fa'
      }}
    />
  );
};
