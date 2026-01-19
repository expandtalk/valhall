
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hash } from "lucide-react";

export const FindnumbersHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Hash className="h-5 w-5 text-yellow-400" />
        <CardTitle className="text-white">Find Number Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera fyndnummer (find numbers) från MySQL `findnumbers`-tabell.
      </CardDescription>
    </CardHeader>
  );
};
