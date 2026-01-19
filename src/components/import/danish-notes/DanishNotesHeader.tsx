
import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const DanishNotesHeader: React.FC = () => (
  <CardHeader>
    <div className="flex items-center gap-4">
      <MessageSquareText className="h-8 w-8 text-white" />
      <div>
        <CardTitle className="text-white text-xl">Importera Danska Orters Anteckningar</CardTitle>
        <CardDescription className="text-slate-300">
          Klistra in SQL-data för `her_DK_notes`-tabellen från en Rundata-export.
        </CardDescription>
      </div>
    </div>
  </CardHeader>
);
