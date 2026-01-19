
import React from 'react';
import { MySQLUriRecord } from './types';

interface UrisParsedDataDisplayProps {
  parsedRecords: MySQLUriRecord[];
}

export const UrisParsedDataDisplay: React.FC<UrisParsedDataDisplayProps> = ({ parsedRecords }) => {
  if (parsedRecords.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-white">Granska Data ({parsedRecords.length} poster)</h3>
      <div className="max-h-60 overflow-y-auto bg-black/30 p-2 rounded-md text-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/20">
              <th className="p-2 text-slate-300">URI ID (kort)</th>
              <th className="p-2 text-slate-300">URI</th>
            </tr>
          </thead>
          <tbody>
            {parsedRecords.slice(0, 100).map((record, index) => (
              <tr key={index} className="border-b border-white/10">
                <td className="p-2 font-mono text-xs text-cyan-300">{record.uriid.substring(0, 15)}...</td>
                <td className="p-2 text-amber-300 text-xs truncate max-w-sm">{record.uri}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {parsedRecords.length > 100 && <p className="text-center text-slate-400 mt-2">...och {parsedRecords.length - 100} till.</p>}
      </div>
    </div>
  );
};
