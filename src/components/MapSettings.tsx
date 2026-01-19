
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Settings, Globe, Satellite } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MapSettingsProps {
  className?: string;
}

export const MapSettings: React.FC<MapSettingsProps> = ({
  className = ""
}) => {
  const [mapProvider, setMapProvider] = useState<'osm' | 'google'>('osm');
  const { toast } = useToast();

  const switchToGoogleMaps = () => {
    console.log('Google Maps integration ready to implement');
    setMapProvider('google');
    toast({
      title: "Map Provider Changed",
      description: "Switched to Google Maps (requires API key configuration)",
    });
  };

  const switchToOpenStreetMap = () => {
    setMapProvider('osm');
    toast({
      title: "Map Provider Changed",
      description: "Switched to OpenStreetMap (free tier)",
    });
  };

  return (
    <Card className={`bg-white/10 backdrop-blur-md border-white/20 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Map Configuration
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-white font-semibold mb-3">Map Provider</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant={mapProvider === 'osm' ? 'default' : 'outline'}
              onClick={switchToOpenStreetMap}
              className={`h-auto p-4 ${
                mapProvider === 'osm' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Globe className="h-6 w-6" />
                <div>
                  <div className="font-semibold">OpenStreetMap</div>
                  <div className="text-xs opacity-75">Free tier</div>
                </div>
                {mapProvider === 'osm' && (
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                )}
              </div>
            </Button>

            <Button
              variant={mapProvider === 'google' ? 'default' : 'outline'}
              onClick={switchToGoogleMaps}
              className={`h-auto p-4 ${
                mapProvider === 'google' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Satellite className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Google Maps</div>
                  <div className="text-xs opacity-75">Requires API key</div>
                </div>
                {mapProvider === 'google' && (
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                )}
              </div>
            </Button>
          </div>
        </div>

        <div className="bg-amber-600/10 p-4 rounded-lg border border-amber-500/20">
          <h4 className="text-amber-300 font-semibold mb-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Configuration Notes
          </h4>
          <ul className="text-amber-200 text-sm space-y-1">
            <li>• OpenStreetMap: Works immediately, no setup required</li>
            <li>• Google Maps: Requires API key configuration in Supabase</li>
            <li>• Map markers are automatically generated from inscription locations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
