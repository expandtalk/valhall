
import React from 'react';
import { MySQLReferenceUriRecord } from './types';

interface ReferenceUriParsedDataDisplayProps {
  parsedRecords: MySQLReferenceUriRecord[];
}

export const ReferenceUriParsedDataDisplay: React.FC<ReferenceUriParsedDataDisplayProps> = ({ parsedRecords }) => {
  if (parsedRecords.length === 0) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">Parsade Kopplingar ({parsedRecords.length})</h4>
      <div className="max-h-48 overflow-y-auto font-mono text-xs text-slate-300 space-y-1">
        {parsedRecords.slice(0, 10).map((record, index) => (
          <p key={index}>{record.referenceid} &lt;-&gt; {record.uriid}</p>
        ))}
        {parsedRecords.length > 10 && <p>...och {parsedRecords.length - 10} till.</p>}
      </div>
    </div>
  );
};
