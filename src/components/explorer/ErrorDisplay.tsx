
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ onRetry }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white/10 backdrop-blur-md border-white/20 rounded-lg">
        <div className="p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Databasanslutning misslyckades</h3>
          <p className="text-slate-300 mb-4">
            Kunde inte ansluta till Supabase-databasen. Kontrollera konsollen för mer information.
          </p>
          <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
            Försök igen
          </Button>
        </div>
      </div>
    </div>
  );
};
