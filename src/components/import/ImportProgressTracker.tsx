
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, Database } from "lucide-react";

interface ImportStats {
  totalRecords: number;
  processed: number;
  imported: number;
  staged: number;
  errors: number;
  currentRecord?: string;
}

interface ImportProgressTrackerProps {
  stats: ImportStats;
  isActive: boolean;
}

export const ImportProgressTracker: React.FC<ImportProgressTrackerProps> = ({ 
  stats, 
  isActive 
}) => {
  const progressPercentage = stats.totalRecords > 0 
    ? (stats.processed / stats.totalRecords) * 100 
    : 0;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Database className="h-5 w-5" />
          Import Progress
          {isActive && (
            <Badge variant="secondary" className="bg-blue-600 text-white">
              Aktiv
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isActive && stats.currentRecord && (
          <div className="text-sm">
            <span className="text-slate-300">Bearbetar: </span>
            <span className="text-white font-mono">{stats.currentRecord}</span>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-300">Framsteg</span>
            <span className="text-white">
              {stats.processed} / {stats.totalRecords} ({progressPercentage.toFixed(1)}%)
            </span>
          </div>
          <Progress value={progressPercentage} className="bg-slate-700" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-slate-300">Importerade:</span>
            <span className="text-green-400 font-semibold">{stats.imported}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-orange-400" />
            <span className="text-slate-300">Staging:</span>
            <span className="text-orange-400 font-semibold">{stats.staged}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-slate-300">Fel:</span>
            <span className="text-red-400 font-semibold">{stats.errors}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Database className="h-4 w-4 text-blue-400" />
            <span className="text-slate-300">Totalt:</span>
            <span className="text-blue-400 font-semibold">{stats.totalRecords}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
