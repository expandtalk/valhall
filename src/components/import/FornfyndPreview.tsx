
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ParsedFornfyndEntry } from "@/utils/fornfyndParser";

interface FornfyndPreviewProps {
  previewData: ParsedFornfyndEntry[];
  parsedCount: number;
}

export const FornfyndPreview: React.FC<FornfyndPreviewProps> = ({ previewData, parsedCount }) => {
  if (previewData.length === 0) return null;

  return (
    <>
      <Badge className="bg-green-500 text-white border-0">
        {parsedCount} poster med exakta koordinater
      </Badge>

      <div className="bg-black/20 rounded p-4">
        <h4 className="text-white font-semibold mb-2">📋 Förhandsgranskning (första 10):</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
          {previewData.map((entry, index) => (
            <div key={index} className="p-2 bg-black/30 rounded text-xs">
              <div className="text-amber-400 font-semibold">{entry.l_number}</div>
              {entry.transliteration && (
                <div className="text-green-400">Runor: {entry.transliteration}</div>
              )}
              <div className="text-slate-300">{entry.municipality}, {entry.parish}</div>
              {entry.coordinates_sweref99 && (
                <div className="text-blue-400">📍 N{entry.coordinates_sweref99.north}, E{entry.coordinates_sweref99.east}</div>
              )}
              <div className="text-slate-400">{entry.cultural_classification}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
