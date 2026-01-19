
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "lucide-react";

export const ReferenceUriHeader: React.FC = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Link className="h-5 w-5 text-cyan-400" />
        <CardTitle className="text-white">Reference-URI Link Import</CardTitle>
      </div>
      <CardDescription className="text-slate-300">
        Importera kopplingar mellan källor (references) och URIs från MySQL `reference_uri`-tabell.
      </CardDescription>
    </CardHeader>
  );
};
