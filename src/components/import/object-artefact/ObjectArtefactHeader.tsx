
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from 'lucide-react';

export const ObjectArtefactHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-white">
        <Link className="h-5 w-5 text-purple-400" />
        Importera Object-Artefact Kopplingar
      </CardTitle>
      <CardDescription className="text-slate-300">
        Importera kopplingar mellan objekt och artefakter från Rundata MySQL dump
      </CardDescription>
    </CardHeader>
  );
};
