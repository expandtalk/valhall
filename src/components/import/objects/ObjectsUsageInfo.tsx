
import React from 'react';

export const ObjectsUsageInfo: React.FC = () => (
  <div className="text-xs text-slate-400 p-4 bg-slate-800/50 rounded-md border border-slate-700">
    <h4 className="font-semibold text-slate-300 mb-2">Instruktioner</h4>
    <p>
      Detta verktyg är designat för att importera data från `INSERT INTO \`objects\` ...`-satser från en Rundata SQL-dump.
      Se till att du klistrar in hela SQL-satsen, inklusive `VALUES`-delen.
    </p>
    <p className="mt-2">
      Verktyget kommer att parsa raderna, konvertera UUID-formaten och infoga dem i `objects`-tabellen.
    </p>
  </div>
);
