
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Eye, X } from "lucide-react";
import { GodNameMatch } from "@/utils/godNameUtils";

interface GodSearchResultsProps {
  results: { place: any; matches: GodNameMatch[] }[];
  onPlaceClick: (place: any) => void;
  onClose: () => void;
}

export const GodSearchResults: React.FC<GodSearchResultsProps> = ({
  results,
  onPlaceClick,
  onClose
}) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4 text-green-400" />
          Hittade platser med gudanamn ({results.length})
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-white/10 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {results.map((result, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-3 bg-white/5 rounded hover:bg-white/10 transition-colors border border-green-500/20"
          >
            <div className="flex-1">
              <div className="text-white font-medium">
                {result.place.place}
              </div>
              <div className="text-green-200 text-sm">
                Gudanamn: {result.matches.map(match => 
                  `${match.godName} (${Math.round(match.confidence * 100)}%)`
                ).join(', ')}
              </div>
              {result.place.county && (
                <div className="text-slate-400 text-xs">
                  {result.place.county}
                </div>
              )}
            </div>
            
            <Button
              size="sm"
              onClick={() => onPlaceClick(result.place)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Eye className="h-3 w-3 mr-1" />
              Visa
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-green-200 bg-green-900/20 p-2 rounded">
        💡 Tips: Klicka på "Visa" för att fokusera på platsen på kartan
      </div>
    </div>
  );
};
