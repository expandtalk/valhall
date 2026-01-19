
import React from 'react';

export const FornfyndInfoPanel: React.FC = () => {
  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">🎯 Förbättrad Fornfynd-parser</h4>
      <p className="text-slate-300 text-sm mb-2">
        Denna förbättrade parser extraherar fullständig data från Fornfynd:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div>
          <h5 className="text-amber-400 text-sm font-semibold">📍 Exakta koordinater:</h5>
          <ul className="text-slate-400 text-xs space-y-1">
            <li>• SWEREF 99 TM → WGS84 konvertering</li>
            <li>• Mätmetod och noggrannhet</li>
            <li>• Verkliga GPS-positioner</li>
          </ul>
        </div>
        <div>
          <h5 className="text-amber-400 text-sm font-semibold">🏛️ Detaljerad metadata:</h5>
          <ul className="text-slate-400 text-xs space-y-1">
            <li>• L-nummer för duplikathantering</li>
            <li>• Translitterering av runtext</li>
            <li>• Antikvarisk kommentar</li>
            <li>• Skadestatus och undersökning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
