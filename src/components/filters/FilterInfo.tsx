
import React from 'react';

export const FilterInfo: React.FC = () => {
  return (
    <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/20">
      <p className="text-blue-200 text-sm">
        <strong>📚 SRD System:</strong> Signum consists of area designation + sequence number + optional period marker. 
        Example: <code className="bg-black/20 px-1 rounded">U 88</code> = Uppland, number 88, Viking Age. 
        <code className="bg-black/20 px-1 rounded">DR 42</code> = Denmark, number 42. 
        <code className="bg-black/20 px-1 rounded">G 280 M</code> = Gotland, number 280, Medieval.
      </p>
    </div>
  );
};
