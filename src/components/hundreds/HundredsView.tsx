
import React from 'react';
import { useHundreds } from '@/hooks/useHundreds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { zoomToLocation } from '@/utils/mapUtils';

interface HundredsViewProps {
  onHundredSelect?: (hundredName: string) => void;
}

export const HundredsView: React.FC<HundredsViewProps> = ({ onHundredSelect }) => {
  const { hundreds, isLoading } = useHundreds();
  const navigate = useNavigate();

  const handleHundredClick = (hundredName: string) => {
    onHundredSelect?.(hundredName);
    // Navigate to map with search query for the hundred
    navigate(`/?searchQuery=${encodeURIComponent(hundredName)}&zoomTo=${encodeURIComponent(hundredName)}`);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Hundreds (Härader)
        </CardTitle>
        <p className="text-slate-300 text-sm">En lista över historiska härader i databasen. Klicka på ett för att söka efter inskrifter.</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 15 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <ul className="space-y-1">
              {hundreds.map((hundred) => (
                <li key={hundred.id}>
                  <button
                    onClick={() => handleHundredClick(hundred.name)}
                    className="w-full text-left text-white p-2 rounded hover:bg-white/10 transition-colors"
                  >
                    {hundred.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
