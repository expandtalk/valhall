
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { MySQLDatingSourceRecord } from './types';

interface DatingSourceParsedDataDisplayProps {
  parsedRecords: MySQLDatingSourceRecord[];
}

export const DatingSourceParsedDataDisplay: React.FC<DatingSourceParsedDataDisplayProps> = ({
  parsedRecords
}) => {
  if (parsedRecords.length === 0) return null;

  return (
    <div className="bg-black/20 rounded p-4">
      <h4 className="text-white font-semibold mb-2">📋 Parsad data:</h4>
      <Badge className="bg-blue-500 text-white border-0 mb-2">
        {parsedRecords.length} kopplingar hittade
      </Badge>
      
      <div className="text-sm text-slate-300 space-y-1 max-h-32 overflow-y-auto">
        {parsedRecords.slice(0, 10).map((record, index) => (
          <div key={index} className="bg-black/30 rounded p-2">
            <div className="text-blue-400 text-xs">
              Dating ID: {record.datingid.substring(0, 16)}...
            </div>
            <div className="text-yellow-400 text-xs">
              Source ID: {record.sourceid.substring(0, 16)}...
            </div>
          </div>
        ))}
        {parsedRecords.length > 10 && (
          <div className="text-slate-400 text-center">
            ...och {parsedRecords.length - 10} till
          </div>
        )}
      </div>
    </div>
  );
};
