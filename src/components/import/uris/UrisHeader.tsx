
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2 } from "lucide-react";

export const UrisHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Link2 className="h-5 w-5 text-green-400" />
        <CardTitle className="text-white">URI Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera URIs från MySQL `uris`-tabell. Dessa är de faktiska länkarna.
      </CardDescription>
    </CardHeader>
  );
};
