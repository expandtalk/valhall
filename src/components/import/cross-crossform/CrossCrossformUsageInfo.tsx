
import React from 'react';

export const CrossCrossformUsageInfo: React.FC = () => {
  return (
    <div className="text-xs text-slate-400 space-y-1">
      <p><strong>Steg:</strong></p>
      <p>1. Klistra in din MySQL INSERT-data ovan</p>
      <p>2. Klicka "Förhandsgranska" för att se konverteringen</p>
      <p>3. Klicka "Importera" för att spara till databasen</p>
    </div>
  );
};
