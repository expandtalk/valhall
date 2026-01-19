
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Languages } from "lucide-react";

export const TranslationsHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Languages className="h-5 w-5 text-yellow-400" />
        <CardTitle className="text-white">Translations Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera översättningar från MySQL `translations`-tabell.
      </CardDescription>
    </CardHeader>
  );
};
