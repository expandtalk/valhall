
import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ObjectArtefactUsageInfo: React.FC = () => {
  return (
    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-purple-300">
          <p className="font-semibold mb-1">Importinstruktioner:</p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Klistra in hela INSERT INTO object_artefact VALUES statement</li>
            <li>Systemet konverterar automatiskt MySQL hex-värden till PostgreSQL BYTEA</li>
            <li>Data importeras till object_artefact-tabellen (kopplingstabell)</li>
            <li>Duplicerade kopplingar hoppas över automatiskt</li>
            <li>Tabellen skapas automatiskt om den inte finns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
