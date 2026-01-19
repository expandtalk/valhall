
import React from 'react';
import { AlertCircle } from 'lucide-react';

export const CrossCrossformInfoPanel: React.FC = () => {
  return (
    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-blue-300">
          <p className="font-medium mb-1">Konverteringsinfo:</p>
          <ul className="text-xs space-y-1">
            <li>• MySQL binary(16) → PostgreSQL UUID</li>
            <li>• tinyint(1) → boolean</li>
            <li>• Automatisk batch-import (100 rader åt gången)</li>
            <li>• Validering av UUID-format</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
