
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, MapPin } from "lucide-react";
import { VikingLocation } from './types';

interface VikingLocationCardProps {
  location: VikingLocation;
  categoryColors: Record<string, string>;
  onEdit: (item: VikingLocation) => void;
  onDelete: (item: VikingLocation) => void;
  isLoading: boolean;
}

export const VikingLocationCard: React.FC<VikingLocationCardProps> = ({
  location,
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
            <CardTitle className="text-white text-lg">{location.name}</CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span className="text-slate-400 text-xs">{location.lat}, {location.lng}</span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="text-slate-300 hover:text-white"
              onClick={() => onEdit(location)}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-400 hover:text-red-300"
              onClick={() => onDelete(location)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge className={categoryColors[location.category] || 'bg-gray-100 text-gray-800'}>
          {location.category.replace(/_/g, ' ')}
        </Badge>
        <p className="text-slate-300 text-sm">{location.description}</p>
      </CardContent>
    </Card>
  );
};
