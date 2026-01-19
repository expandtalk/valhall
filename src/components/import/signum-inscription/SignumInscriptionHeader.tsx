
import React from 'react';
import { Link2 } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const SignumInscriptionHeader: React.FC = () => (
  <CardHeader>
    <div className="flex items-center gap-4">
      <Link2 className="h-8 w-8 text-white" />
      <div>
        <CardTitle className="text-white text-xl">Importera Signum-Inskriptionslänkar</CardTitle>
        <CardDescription className="text-slate-300">
          Klistra in SQL-data för `signum_inscription`-tabellen från en Rundata-export.
        </CardDescription>
      </div>
    </div>
  </CardHeader>
);
