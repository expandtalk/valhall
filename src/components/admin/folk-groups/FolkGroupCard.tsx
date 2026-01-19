
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, Dna, MapPin } from "lucide-react";
import { categories, categoryColors } from './folkGroupFields';

interface FolkGroup {
  id: string;
  name: string;
  name_en: string;
  main_category: string;
  sub_category: string;
  dna_profile: any;
  language_family: string;
  language_subfamily: string;
  active_period_start: number;
  active_period_end: number;
  description: string;
  description_en: string;
  coordinates: any;
  historical_significance: string;
}

interface FolkGroupCardProps {
  group: FolkGroup;
  onEdit: (group: FolkGroup) => void;
  onDelete: (group: FolkGroup) => void;
  isLoading: boolean;
}

export const FolkGroupCard: React.FC<FolkGroupCardProps> = ({
  group,
  onEdit,
  onDelete,
  isLoading
}) => {
  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-lg">{group.name}</CardTitle>
            <p className="text-slate-300 text-sm">{group.name_en}</p>
            <p className="text-slate-400 text-xs">{group.sub_category}</p>
          </div>
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-slate-300 hover:text-white"
              onClick={() => onEdit(group)}
              disabled={isLoading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-red-400 hover:text-red-300"
              onClick={() => onDelete(group)}
              disabled={isLoading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Badge className={categoryColors[group.main_category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}>
          {categories.find(c => c.id === group.main_category)?.name}
        </Badge>
        
        {group.description && (
          <p className="text-slate-300 text-sm">{group.description}</p>
        )}

        {group.language_family && (
          <div className="bg-slate-800/50 rounded p-2">
            <p className="text-slate-400 mb-1 text-xs">Språkfamilj:</p>
            <p className="text-slate-300 text-xs">
              {group.language_family}
              {group.language_subfamily && ` / ${group.language_subfamily}`}
            </p>
          </div>
        )}

        {(group.active_period_start || group.active_period_end) && (
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-300 text-xs flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {group.active_period_start || '?'} - {group.active_period_end || '?'}
              </span>
            </div>
          </div>
        )}

        {group.dna_profile && Object.keys(group.dna_profile).length > 0 && (
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs flex items-center gap-1">
              <Dna className="h-3 w-3" />
              <span>DNA-profil:</span>
            </div>
            <p className="text-slate-300 text-xs">
              {JSON.stringify(group.dna_profile, null, 0)}
            </p>
          </div>
        )}

        {group.coordinates && (
          <div className="bg-slate-800/50 rounded p-2">
            <div className="text-slate-400 mb-1 text-xs">Hemområde:</div>
            <div className="text-slate-300 text-xs flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{group.coordinates}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
