
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const DatingHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-400" />
        <CardTitle className="text-white">Dateringar Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera dateringsdata från MySQL dating-tabell
      </CardDescription>
    </CardHeader>
  );
};
