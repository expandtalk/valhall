
import React from 'react';
import { Puzzle } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";

export const FragmentsHeader: React.FC = () => (
  <div className="p-6">
    <div className="flex items-center gap-4">
      <Puzzle className="h-8 w-8 text-white" />
      <div>
        <CardTitle className="text-white text-xl">Importera Fragment</CardTitle>
        <CardDescription className="text-slate-300">
          Klistra in SQL INSERT-data för `fragments`-tabellen från en Rundata-export.
        </CardDescription>
      </div>
    </div>
  </div>
);
