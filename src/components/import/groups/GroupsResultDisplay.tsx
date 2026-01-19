
import React from 'react';
import { GroupImportResult } from './types';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface GroupsResultDisplayProps {
  result: GroupImportResult | null;
}

export const GroupsResultDisplay: React.FC<GroupsResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="bg-black/20 rounded p-4 space-y-4">
      <h4 className="text-white font-semibold">Importresultat</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 bg-green-500/10 p-3 rounded">
          <CheckCircle className="h-5 w-5 text-green-400" />
          <div>
            <div className="font-bold text-white">{result.success}</div>
            <div className="text-xs text-slate-300">Lyckade</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-red-500/10 p-3 rounded">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div>
            <div className="font-bold text-white">{result.errors}</div>
            <div className="text-xs text-slate-300">Fel</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-yellow-500/10 p-3 rounded">
          <XCircle className="h-5 w-5 text-yellow-400" />
          <div>
            <div className="font-bold text-white">{result.skipped}</div>
            <div className="text-xs text-slate-300">Överhoppade</div>
          </div>
        </div>
      </div>
      {result.errorMessages.length > 0 && (
        <div>
          <h5 className="text-red-400 font-semibold mb-2">Felmeddelanden</h5>
          <div className="max-h-40 overflow-y-auto bg-black/30 p-2 rounded space-y-1">
            {result.errorMessages.map((msg, i) => (
              <p key={i} className="text-xs text-red-300 font-mono">
                {msg}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
