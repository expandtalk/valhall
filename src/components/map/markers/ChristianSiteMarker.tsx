import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { ChristianSite } from '@/hooks/useChristianSites';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Building2, Cross, Church } from 'lucide-react';

interface ChristianSiteMarkerProps {
  site: ChristianSite;
  icon: L.Icon;
}

const getOrderDisplayName = (order?: string) => {
  const orderNames: Record<string, string> = {
    cistercian: 'Cistercienser',
    benedictine: 'Benediktiner',
    franciscan: 'Franciskaner (Gråbröder)',
    dominican: 'Dominikaner (Svartbröder)',
    birgittine: 'Birgittiner',
    carthusian: 'Kartusianer',
    johanniter: 'Johanniter',
    other: 'Annan orden'
  };
  return order ? orderNames[order] || order : 'Okänd orden';
};

const getTypeDisplayName = (type: string) => {
  const typeNames: Record<string, string> = {
    monastery: 'Kloster',
    church: 'Kyrka',
    holy_place: 'Helig plats',
    bishopric: 'Biskopssäte',
    hospital: 'Hospital'
  };
  return typeNames[type] || type;
};

const getPeriodDisplayName = (period: string) => {
  const periodNames: Record<string, string> = {
    early_christian: 'Tidig kristendom (800-1100)',
    medieval: 'Medeltid (1100-1400)',
    late_medieval: 'Senmedeltid (1400-1500)'
  };
  return periodNames[period] || period;
};

const getStatusDisplayName = (status: string) => {
  const statusNames: Record<string, string> = {
    active: 'Aktiv',
    ruins: 'Ruiner',
    church_remains: 'Kyrkorester',
    historical: 'Historisk',
    archaeological: 'Arkeologisk'
  };
  return statusNames[status] || status;
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'monastery':
      return <Building2 className="h-4 w-4" />;
    case 'church':
      return <Church className="h-4 w-4" />;
    case 'holy_place':
      return <Cross className="h-4 w-4" />;
    case 'bishopric':
      return <Users className="h-4 w-4" />;
    case 'hospital':
      return <Building2 className="h-4 w-4" />;
    default:
      return <Building2 className="h-4 w-4" />;
  }
};

export const ChristianSiteMarker: React.FC<ChristianSiteMarkerProps> = ({ site, icon }) => {
  const [lng, lat] = site.coordinates;

  return (
    <Marker position={[lat, lng]} icon={icon}>
      <Popup maxWidth={350} className="christian-site-popup">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              {getTypeIcon(site.site_type)}
              <CardTitle className="text-lg">{site.name}</CardTitle>
            </div>
            {site.name_en && (
              <CardDescription className="text-sm italic">{site.name_en}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary">
                {getTypeDisplayName(site.site_type)}
              </Badge>
              {site.religious_order && (
                <Badge variant="outline">
                  {getOrderDisplayName(site.religious_order)}
                </Badge>
              )}
              <Badge variant="outline">
                {getPeriodDisplayName(site.period)}
              </Badge>
            </div>

            {site.description && (
              <p className="text-sm text-muted-foreground">{site.description}</p>
            )}

            <div className="space-y-1 text-xs">
              {site.founded_year && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Grundat: {site.founded_year}
                    {site.dissolved_year && ` - Upplöst: ${site.dissolved_year}`}
                  </span>
                </div>
              )}
              
              {site.region && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{site.region}{site.province && `, ${site.province}`}</span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <span className="font-medium">Status:</span>
                <span>{getStatusDisplayName(site.status)}</span>
              </div>
            </div>

            {site.historical_notes && (
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">{site.historical_notes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </Popup>
    </Marker>
  );
};