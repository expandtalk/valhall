
import React from 'react';
import { useParishes } from '@/hooks/useParishes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { zoomToLocation } from '@/utils/mapUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ParishesViewProps {
  onParishSelect?: (parishName: string) => void;
}

export const ParishesView: React.FC<ParishesViewProps> = ({ onParishSelect }) => {
  const { parishes, isLoading } = useParishes();
  const navigate = useNavigate();

  const handleParishClick = (parishName: string) => {
    onParishSelect?.(parishName);
    // Navigate to map with search query for the parish
    navigate(`/?searchQuery=${encodeURIComponent(parishName)}&zoomTo=${encodeURIComponent(parishName)}`);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Parishes (Församlingar)
        </CardTitle>
        <p className="text-slate-300 text-sm">En lista över historiska församlingar i databasen. Klicka på en för att söka efter inskrifter.</p>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <ScrollArea className="h-[600px] pr-4">
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 15 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              <ul className="space-y-1">
                {parishes.map((parish) => (
                  <li key={parish.id}>
                    <button
                      onClick={() => handleParishClick(parish.name)}
                      className="w-full text-left text-white p-2 rounded hover:bg-white/10 transition-colors flex justify-between items-center"
                    >
                      <span>{parish.name}</span>
                      {parish.code && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-slate-400 cursor-help">({parish.code})</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Detta är en historisk administrativ kod för församlingen.</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
