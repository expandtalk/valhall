
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shapes } from "lucide-react";

export const CrossformsHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Shapes className="h-5 w-5 text-purple-400" />
        <CardTitle className="text-white">Korsformer Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera korsformer från MySQL crossforms-tabell (enligt Linn Lager)
      </CardDescription>
    </CardHeader>
  );
};
