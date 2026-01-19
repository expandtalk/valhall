
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle, Database } from "lucide-react";
import { StagingStats } from "@/types/staging";

interface StagingStatsCardsProps {
  stats: StagingStats;
}

export const StagingStatsCards: React.FC<StagingStatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Väntar granskning</p>
              <p className="text-2xl font-bold text-orange-400">{stats.pending}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Godkända</p>
              <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Avvisade</p>
              <p className="text-2xl font-bold text-red-400">{stats.rejected}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-400" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Totalt</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Database className="h-8 w-8 text-blue-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
