
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelLayoutManager } from './map-config/PanelLayoutManager';
import { PeriodLayerManager } from './map-config/PeriodLayerManager';
import { MapBaseLayerManager } from './map-config/MapBaseLayerManager';
import { HistoricalEventsManager } from './map-config/HistoricalEventsManager';
import { Map, Layers, Clock, MapPin } from 'lucide-react';

export const AdminMapConfiguration: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Map className="h-5 w-5" />
            Kartkonfiguration & Panel Management
          </CardTitle>
          <p className="text-slate-300 text-sm">
            Hantera panel layouts, tidsperiod-specifika lager och historiska kartunderlag
          </p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="panel-layouts" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/60">
              <TabsTrigger value="panel-layouts" className="text-xs">
                <Layers className="h-4 w-4 mr-1" />
                Panel Layouts
              </TabsTrigger>
              <TabsTrigger value="period-layers" className="text-xs">
                <Clock className="h-4 w-4 mr-1" />
                Periodlager
              </TabsTrigger>
              <TabsTrigger value="base-layers" className="text-xs">
                <Map className="h-4 w-4 mr-1" />
                Kartunderlag
              </TabsTrigger>
              <TabsTrigger value="historical-events" className="text-xs">
                <MapPin className="h-4 w-4 mr-1" />
                Historiska händelser
              </TabsTrigger>
            </TabsList>

            <TabsContent value="panel-layouts" className="space-y-4">
              <PanelLayoutManager />
            </TabsContent>

            <TabsContent value="period-layers" className="space-y-4">
              <PeriodLayerManager />
            </TabsContent>

            <TabsContent value="base-layers" className="space-y-4">
              <MapBaseLayerManager />
            </TabsContent>

            <TabsContent value="historical-events" className="space-y-4">
              <HistoricalEventsManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
