
import React from 'react';
import { Info } from 'lucide-react';

export const SignumInscriptionUsageInfo: React.FC = () => (
  <div className="flex items-start gap-3 text-sm text-slate-400 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
    <span>
      Importera länkar mellan signum och inskrifter genom att klistra in SQL-innehållet från en `signum_inscription`-exportfil. Du kan klistra in hela `INSERT`-satsen eller enbart värderaderna.
    </span>
  </div>
);
