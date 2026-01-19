
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, MapPin } from "lucide-react";
import { VikingRegion } from '@/utils/vikingRegions/types';

interface VikingRegionCardProps {
  region: VikingRegion;
  categoryColors: Record<string, string>;
  onEdit: (item: VikingRegion) => void;
  onDelete: (item: VikingRegion) => void;
  isLoading: boolean;
}

export const VikingRegionCard: React.FC<VikingRegionCardProps> = ({
  region,
  categoryColors,
  onEdit,
  onDelete,
  isLoading
}) => {
  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-lg">{region.vikingName}</CardTitle>
            <p className="text-slate-300 text-sm">{region.modernName}</p>
            <div className="flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3 text-slate-400" />
              <span className="text-slate-400 text-xs">{region.timeperiod}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-slate-300 hover:text-white"
              onClick={() => onEdit(region)}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-red-400 hover:text-red-300"
              onClick={() => onDelete(region)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge className={categoryColors[region.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
          {region.category}
        </Badge>
        
        <p className="text-slate-300 text-sm">{region.description}</p>
        
        <div className="bg-slate-800/50 rounded p-2">
          <p className="text-slate-400 mb-1 text-xs">Koordinater:</p>
          <div className="text-slate-300 text-xs flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{region.lat}, {region.lng}</span>
          </div>
        </div>
        
        {region.type && (
          <div className="bg-slate-800/50 rounded p-2">
            <p className="text-slate-400 mb-1 text-xs">Typ:</p>
            <p className="text-slate-300 text-xs">{region.type}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
