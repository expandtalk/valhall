
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Layers } from "lucide-react";

export const GroupsHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Layers className="h-5 w-5 text-blue-400" />
        <CardTitle className="text-white">Group Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera grupper från MySQL `groups`-tabell.
      </CardDescription>
    </CardHeader>
  );
};
