
import React from 'react';
import { MySQLSourceRecord } from './types';
import { ScrollArea } from "@/components/ui/scroll-area";

interface SourcesParsedDataDisplayProps {
  parsedRecords: MySQLSourceRecord[];
}

export const SourcesParsedDataDisplay: React.FC<SourcesParsedDataDisplayProps> = ({ parsedRecords }) => {
  if (parsedRecords.length === 0) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">{parsedRecords.length} källor att importera</h4>
      <ScrollArea className="h-40">
        <div className="font-mono text-xs text-slate-300 space-y-1">
          {parsedRecords.map((record, index) => (
            <p key={index}>
              <span className="text-yellow-400">ID: {record.sourceid.substring(0, 8)}...</span>
              <span className="text-white"> - </span>
              <span className="text-cyan-400">Title: {(record.title || 'N/A').substring(0, 40)}...</span>
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
