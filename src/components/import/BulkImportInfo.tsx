
import React from 'react';

export const BulkImportInfo: React.FC = () => {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
      <h4 className="text-white font-medium">Funktioner:</h4>
      <ul className="text-slate-300 text-sm space-y-1">
        <li>• <strong>Automatisk SQL-filtrering:</strong> CREATE, INSERT, kommentarer tas bort</li>
        <li>• <strong>Smart konflikthantering:</strong> Dubbletter och problem skickas till staging</li>
        <li>• <strong>Kategori-mappning:</strong> Artefakttyper mappas automatiskt</li>
        <li>• <strong>Validering:</strong> GPS-koordinater och data kontrolleras</li>
        <li>• <strong>TSV-format:</strong> Signum, Transliteration, Plats, Översättning, Datering, Koordinater, Objekttyp</li>
      </ul>
    </div>
  );
};
