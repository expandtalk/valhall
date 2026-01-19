
import React from 'react';
import { MySQLTranslationRecord } from './types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TranslationsParsedDataDisplayProps {
  parsedRecords: MySQLTranslationRecord[];
}

export const TranslationsParsedDataDisplay: React.FC<TranslationsParsedDataDisplayProps> = ({ parsedRecords }) => {
  if (parsedRecords.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-white font-semibold">Tolkad Data</h4>
      <ScrollArea className="h-48 w-full rounded-md border border-white/20 p-4">
        <div className="text-xs font-mono text-white/80 space-y-2">
          {parsedRecords.map((record, index) => (
            <div key={index} className="truncate">
              <span>{record.language}:</span> {record.text}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
