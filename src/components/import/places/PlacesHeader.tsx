
import React from 'react';
import { MapPin } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";

export const PlacesHeader: React.FC = () => (
  <div className="p-6">
    <div className="flex items-center gap-4">
      <MapPin className="h-8 w-8 text-white" />
      <div>
        <CardTitle className="text-white text-xl">Importera Platser</CardTitle>
        <CardDescription className="text-slate-300">
          Klistra in SQL INSERT-data för `places`-tabellen från en Rundata-export.
        </CardDescription>
      </div>
    </div>
  </div>
);
