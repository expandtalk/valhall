
import React from 'react';
import { Globe2 } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const SwedishLocalitiesHeader: React.FC = () => (
  <CardHeader>
    <div className="flex items-center gap-4">
      <Globe2 className="h-8 w-8 text-white" />
      <div>
        <CardTitle className="text-white text-xl">Importera Svenska Orter</CardTitle>
        <CardDescription className="text-slate-300">
          Klistra in SQL-data för `her_SE`-tabellen från en Rundata-export.
        </CardDescription>
      </div>
    </div>
  </CardHeader>
);
