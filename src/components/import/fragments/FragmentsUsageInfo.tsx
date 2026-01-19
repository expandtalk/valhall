
import React from 'react';

export const FragmentsUsageInfo: React.FC = () => (
  <div className="text-xs text-slate-400 p-4 bg-slate-800/50 rounded-md border border-slate-700">
    <h4 className="font-semibold text-slate-300 mb-2">Instruktioner</h4>
    <p>
      Detta verktyg är designat för att importera data från `INSERT INTO \`fragments\` ...`-satser från en Rundata SQL-dump.
      Detta kopplar samman fragment med deras huvudobjekt.
    </p>
    <p className="mt-2">
      Se till att motsvarande objekt redan finns i `objects`-tabellen innan du kör denna import.
    </p>
  </div>
);
