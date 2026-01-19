import React, { memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from '@/components/ui/lazy-image';

interface OptimizedCardProps {
  inscription: {
    id: string;
    signum?: string;
    location?: string;
    transliteration?: string;
    translation_en?: string;
    dating_text?: string;
    period_start?: number;
    period_end?: number;
    material?: string;
    object_type?: string;
  };
  isExpanded: boolean;
  onToggleExpanded: (id: string) => void;
  onClick: (inscription: any) => void;
}

export const OptimizedCard = memo<OptimizedCardProps>(({
  inscription,
  isExpanded,
  onToggleExpanded,
  onClick
}) => {
  const handleClick = () => {
    onClick(inscription);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleExpanded(inscription.id);
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 animate-fade-in">
      <CardContent className="p-4" onClick={handleClick}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">
            {inscription.signum || 'Unknown Signum'}
          </h3>
          <button
            onClick={handleToggle}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
        </div>
        
        {inscription.location && (
          <p className="text-sm text-muted-foreground mb-2">
            📍 {inscription.location}
          </p>
        )}
        
        {inscription.transliteration && (
          <p className="text-sm mb-2 font-mono">
            {inscription.transliteration}
          </p>
        )}
        
        {isExpanded && (
          <div className="mt-3 space-y-2 animate-fade-in">
            {inscription.translation_en && (
              <p className="text-sm text-muted-foreground">
                <strong>Translation:</strong> {inscription.translation_en}
              </p>
            )}
            
            {inscription.dating_text && (
              <p className="text-sm text-muted-foreground">
                <strong>Dating:</strong> {inscription.dating_text}
              </p>
            )}
            
            <div className="flex gap-2 flex-wrap">
              {inscription.material && (
                <Badge variant="outline" className="text-xs">
                  {inscription.material}
                </Badge>
              )}
              {inscription.object_type && (
                <Badge variant="outline" className="text-xs">
                  {inscription.object_type}
                </Badge>
              )}
              {inscription.period_start && inscription.period_end && (
                <Badge variant="outline" className="text-xs">
                  {inscription.period_start}-{inscription.period_end}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

OptimizedCard.displayName = 'OptimizedCard';