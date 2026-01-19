
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookText } from "lucide-react";

export const SourcesHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <BookText className="h-5 w-5 text-yellow-400" />
        <CardTitle className="text-white">Source Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera källor från MySQL `sources`-tabell.
      </CardDescription>
    </CardHeader>
  );
};
