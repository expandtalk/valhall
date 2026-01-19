
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Database, FileText } from "lucide-react";

export const FutureOptionsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-white/5 backdrop-blur-md border-white/10 opacity-75">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            <CardTitle className="text-white">2. K-samsök Import</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            Framtida expansion - API under utveckling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-sm mb-4">
            Hämta från Sveriges kulturarvsregister med tusentals runinskriptioner.
          </p>
          <Button disabled className="w-full">
            <Database className="h-4 w-4 mr-2" />
            Kommer snart
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-md border-white/10 opacity-75">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white">3. Manuell Import</CardTitle>
          </div>
          <CardDescription className="text-slate-300">
            CSV/Excel-filer och egen forskningsdata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400 text-sm mb-4">
            Ladda upp dina egna filer med runinskriptioner och forskningsdata.
          </p>
          <Button disabled className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Kommer snart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
