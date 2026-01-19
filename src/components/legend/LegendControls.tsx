import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface LegendControlsProps {
  onShowAll: () => void;
  onHideAll: () => void;
  hasVisibleItems: boolean;
  totalItems: number;
}

export const LegendControls: React.FC<LegendControlsProps> = ({
  onShowAll,
  onHideAll,
  hasVisibleItems,
  totalItems
}) => {
  return (
    <div className="flex gap-2 p-2 border-b border-white/10">
      <Button
        size="sm"
        variant="outline"
        onClick={onShowAll}
        className="flex-1 text-xs bg-blue-600/20 border-blue-400/60 text-blue-100 hover:bg-blue-500/30 hover:border-blue-300/80 font-medium"
        disabled={false}
      >
        <Eye className="h-3 w-3 mr-1" />
        Visa alla
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={onHideAll}
        className="flex-1 text-xs bg-red-600/20 border-red-400/60 text-red-100 hover:bg-red-500/30 hover:border-red-300/80 font-medium"
        disabled={false}
      >
        <EyeOff className="h-3 w-3 mr-1" />
        Dölj alla
      </Button>
    </div>
  );
};