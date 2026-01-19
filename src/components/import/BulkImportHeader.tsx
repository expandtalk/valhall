
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export const BulkImportHeader: React.FC = () => {
  return (
    <CardHeader>
      <CardTitle className="text-white flex items-center gap-2">
        <Upload className="h-5 w-5" />
        Signum-fokuserad Import med Förbättrad Validering
      </CardTitle>
      <CardDescription className="text-slate-300">
        Optimerad för signum-validering och befintlig runic_inscriptions-databas
      </CardDescription>
    </CardHeader>
  );
};
