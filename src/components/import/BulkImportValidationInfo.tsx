
import React from 'react';
import { CheckCircle, AlertCircle } from "lucide-react";

export const BulkImportValidationInfo: React.FC = () => {
  return (
    <>
      <div className="bg-green-600/10 p-4 rounded-lg border border-green-500/20">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
          <div>
            <h4 className="text-green-300 font-semibold mb-2">Förbättrad Signum-validering</h4>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Automatisk normalisering av signum-format (U337 → U 337)</li>
              <li>• Detekterar befintliga signum i din databas</li>
              <li>• Validerar Nordic runic inscription standardformat</li>
              <li>• Hittar liknande signum för att undvika dubbletter</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-blue-300 font-semibold mb-2">Förbättrad säkerhet för din befintliga databas</h4>
            <p className="text-slate-300 text-sm mb-3">
              Eftersom du redan har data i databasen, använder vi förbättrad konfliktdetektering.
            </p>
            <ul className="text-slate-300 text-sm space-y-1">
              <li>• Kontrollerar alla befintliga signum före import</li>
              <li>• Testläge analyserar bara första 50 raderna för snabb validering</li>
              <li>• Dubbletter skickas automatiskt till staging för granskning</li>
              <li>• Batch-processing för stora dataset utan att överbelasta databasen</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
