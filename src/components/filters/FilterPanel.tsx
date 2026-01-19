
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface FilterPanelProps {
  selectedLandscape: string;
  selectedCountry: string;
  selectedPeriod: string;
  selectedStatus: string;
  selectedObjectType: string;
  onLandscapeChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onObjectTypeChange: (value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedLandscape,
  selectedCountry,
  selectedPeriod,
  selectedStatus,
  selectedObjectType,
  onLandscapeChange,
  onCountryChange,
  onPeriodChange,
  onStatusChange,
  onObjectTypeChange,
  onClearFilters,
  activeFiltersCount
}) => {
  const landscapes = [
    { value: 'all', label: 'Alla landskap' },
    { value: 'Uppland', label: 'Uppland' },
    { value: 'Södermanland', label: 'Södermanland' },
    { value: 'Västergötland', label: 'Västergötland' },
    { value: 'Östergötland', label: 'Östergötland' },
    { value: 'Småland', label: 'Småland' },
    { value: 'Skåne', label: 'Skåne' },
    { value: 'Gotland', label: 'Gotland' },
    { value: 'Öland', label: 'Öland' },
    { value: 'Västmanland', label: 'Västmanland' },
    { value: 'Närke', label: 'Närke' },
    { value: 'Värmland', label: 'Värmland' },
    { value: 'Dalarna', label: 'Dalarna' },
    { value: 'Gästrikland', label: 'Gästrikland' },
    { value: 'Hälsingland', label: 'Hälsingland' },
    { value: 'Medelpad', label: 'Medelpad' },
    { value: 'Ångermanland', label: 'Ångermanland' },
    { value: 'Västerbotten', label: 'Västerbotten' },
    { value: 'Norrbotten', label: 'Norrbotten' }
  ];

  const countries = [
    { value: 'all', label: 'Alla länder' },
    { value: 'Sweden', label: 'Sverige' },
    { value: 'Norway', label: 'Norge' },
    { value: 'Denmark', label: 'Danmark' },
    { value: 'Iceland', label: 'Island' },
    { value: 'Finland', label: 'Finland' },
    { value: 'Estonia', label: 'Estland' },
    { value: 'Russia', label: 'Ryssland' },
    { value: 'Ukraine', label: 'Ukraina' },
    { value: 'England', label: 'England' },
    { value: 'Ireland', label: 'Irland' },
    { value: 'Scotland', label: 'Skottland' },
    { value: 'Faroe Islands', label: 'Färöarna' },
    { value: 'Greenland', label: 'Grönland' }
  ];

  const periods = [
    { value: 'all', label: 'Alla perioder' },
    { value: 'early_iron_age', label: 'Förromersk järnålder (500-1 f.Kr.)' },
    { value: 'roman_iron_age', label: 'Romersk järnålder (1-400 e.Kr.)' },
    { value: 'migration_period', label: 'Folkvandringstid (400-550 e.Kr.)' },
    { value: 'vendel_period', label: 'Vendeltid (550-790 e.Kr.)' },
    { value: 'viking_age', label: 'Vikingatid (790-1066 e.Kr.)' },
    { value: 'middle_ages', label: 'Medeltid (1066-1520 e.Kr.)' }
  ];

  const statuses = [
    { value: 'all', label: 'Alla status' },
    { value: 'well_preserved', label: 'Välbevarad' },
    { value: 'damaged', label: 'Skadad' },
    { value: 'fragmentary', label: 'Fragmentarisk' },
    { value: 'lost', label: 'Förlorad' },
    { value: 'underwater', label: 'Under vatten' }
  ];

  const objectTypes = [
    { value: 'all', label: 'Alla objekttyper' },
    { value: 'runestone', label: 'Runsten' },
    { value: 'rune_stick', label: 'Runpinne' },
    { value: 'coin', label: 'Mynt' },
    { value: 'bracteate', label: 'Brakteat' },
    { value: 'weapon', label: 'Vapen' },
    { value: 'jewelry', label: 'Smycke' },
    { value: 'tool', label: 'Verktyg' },
    { value: 'bone', label: 'Ben' },
    { value: 'wood', label: 'Trä' },
    { value: 'metal', label: 'Metall' },
    { value: 'stone', label: 'Sten' },
    { value: 'other', label: 'Annat' }
  ];

  return (
    <div className="space-y-4">
      {/* Clear filters button */}
      {activeFiltersCount > 0 && (
        <div className="flex justify-between items-center">
          <span className="text-white text-sm">
            {activeFiltersCount} aktiva filter
          </span>
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-slate-700/50 flex items-center gap-2"
          >
            <X className="h-3 w-3" />
            Rensa alla
          </Button>
        </div>
      )}

      {/* Landscape Filter */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Landskap</label>
        <Select value={selectedLandscape} onValueChange={onLandscapeChange}>
          <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {landscapes.map(landscape => (
              <SelectItem key={landscape.value} value={landscape.value} className="text-white hover:bg-slate-700">
                {landscape.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Country Filter */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Land</label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {countries.map(country => (
              <SelectItem key={country.value} value={country.value} className="text-white hover:bg-slate-700">
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Period Filter */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Tidsperiod</label>
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {periods.map(period => (
              <SelectItem key={period.value} value={period.value} className="text-white hover:bg-slate-700">
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status Filter */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Status</label>
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {statuses.map(status => (
              <SelectItem key={status.value} value={status.value} className="text-white hover:bg-slate-700">
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Object Type Filter */}
      <div className="space-y-2">
        <label className="text-white text-sm font-medium">Objekttyp</label>
        <Select value={selectedObjectType} onValueChange={onObjectTypeChange}>
          <SelectTrigger className="bg-slate-700/60 border-slate-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {objectTypes.map(type => (
              <SelectItem key={type.value} value={type.value} className="text-white hover:bg-slate-700">
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
