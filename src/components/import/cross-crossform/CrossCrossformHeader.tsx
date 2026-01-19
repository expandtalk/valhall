
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';

export const CrossCrossformHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <FileText className="h-5 w-5" />
        Cross-Crossform Import
      </CardTitle>
      <p className="text-slate-300 text-sm">
        Importera kopplingstabell mellan crosses och crossforms från MySQL-format
      </p>
    </CardHeader>
  );
};
