
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2 } from "lucide-react";

export const DatingSourceHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Link2 className="h-5 w-5 text-yellow-400" />
        <CardTitle className="text-white">Dating Source Link Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera kopplingar mellan dateringar och källor från MySQL `dating_source`-tabell.
      </CardDescription>
    </CardHeader>
  );
};
