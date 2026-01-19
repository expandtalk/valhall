
import React from 'react';
import { ImportResult } from "@/types/import";

interface ImportResultDisplayProps {
  result: ImportResult;
}

export const ImportResultDisplay: React.FC<ImportResultDisplayProps> = ({ result }) => {
  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-3">Import Resultat</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{result.total}</div>
          <div className="text-xs text-slate-400">Totalt testade</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{result.imported}</div>
          <div className="text-xs text-slate-400">Skulle importeras direkt</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">{result.staged}</div>
          <div className="text-xs text-slate-400">Skulle gå till staging</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{result.errors}</div>
          <div className="text-xs text-slate-400">Fel</div>
        </div>
      </div>
      
      <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 mb-4">
        <p className="text-blue-300 text-sm">
          💡 <strong>Test genomfört!</strong> Detta var bara en simulering - ingen data har sparats ännu. 
          {result.imported > 0 && ' Klicka på "Kör Full Import" för att faktiskt spara data till databasen.'}
        </p>
      </div>
      
      {result.conflicts.length > 0 && (
        <div>
          <h5 className="text-white font-semibold mb-2">Konflikter som kräver granskning:</h5>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {result.conflicts.slice(0, 10).map((conflict, index) => (
              <div key={index} className="text-xs text-slate-300 bg-black/30 p-2 rounded">
                {conflict}
              </div>
            ))}
            {result.conflicts.length > 10 && (
              <div className="text-xs text-slate-400">
                ... och {result.conflicts.length - 10} fler
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
