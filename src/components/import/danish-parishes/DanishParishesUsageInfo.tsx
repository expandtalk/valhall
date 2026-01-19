
import React from 'react';

export const DanishParishesUsageInfo: React.FC = () => (
  <div className="text-xs text-slate-400 p-4 bg-slate-800/50 rounded-md border border-slate-700">
    <h4 className="font-semibold text-slate-300 mb-2">Instruktioner</h4>
    <p>
      Detta verktyg är designat för att importera data från `CREATE TABLE` och `INSERT INTO \`her_DK\` ...`-satser från en Rundata SQL-dump.
    </p>
    <p className="mt-2">
      Verktyget extraherar data från SQL-koden och infogar den i `danish_parishes`-tabellen.
    </p>
  </div>
);
