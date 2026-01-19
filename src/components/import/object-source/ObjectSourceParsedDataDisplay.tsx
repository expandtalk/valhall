
import React from 'react';
import { MySQLObjectSourceRecord } from './types';
import { ScrollArea } from "@/components/ui/scroll-area";

interface ObjectSourceParsedDataDisplayProps {
  parsedRecords: MySQLObjectSourceRecord[];
}

export const ObjectSourceParsedDataDisplay: React.FC<ObjectSourceParsedDataDisplayProps> = ({ parsedRecords }) => {
  if (parsedRecords.length === 0) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">{parsedRecords.length} poster att importera</h4>
      <ScrollArea className="h-40">
        <div className="font-mono text-xs text-slate-300 space-y-1">
          {parsedRecords.map((record, index) => (
            <p key={index}>
              <span className="text-cyan-400">Obj: {record.objectid.substring(0,8)}...</span>
              <span className="text-white"> -&gt; </span>
              <span className="text-yellow-400">Src: {record.sourceid.substring(0,8)}...</span>
            </p>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
