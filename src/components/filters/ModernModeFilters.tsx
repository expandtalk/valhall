
import React from 'react';
import { RegionFilter } from "./RegionFilter";
import { CountryFilter } from "./CountryFilter";
import { PeriodFilter } from "./PeriodFilter";
import { StatusFilter } from "./StatusFilter";
import { ObjectTypeFilter } from "./ObjectTypeFilter";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollArea } from "@/components/ui/scroll-area";

// Country-specific landscapes
const LANDSCAPES_BY_COUNTRY: Record<string, Record<string, string>> = {
  'SE': {
    'uppland': 'Uppland',
    'gotland': 'Gotland',
    'blekinge': 'Blekinge',
    'vastergotland': 'Västergötland',
    'ostergotland': 'Östergötland',
    'smaland': 'Småland',
    'skane': 'Skåne',
    'halland': 'Halland',
    'bohuslan': 'Bohuslän',
    'dalsland': 'Dalsland',
    'varmland': 'Värmland',
    'narke': 'Närke',
    'sodermanland': 'Södermanland',
    'vastmanland': 'Västmanland',
    'dalarna': 'Dalarna',
    'gavleborg': 'Gävleborg',
    'vasternorrland': 'Västernorrland',
    'jamtland': 'Jämtland',
    'harjedalen': 'Härjedalen',
    'angermanland': 'Ångermanland',
    'medelpad': 'Medelpad',
    'halsingland': 'Hälsingland',
    'gastrikland': 'Gästrikland'
  },
  'DR': {
    'jylland': 'Jylland',
    'fyn': 'Fyn',
    'sjaelland': 'Sjælland',
    'bornholm': 'Bornholm'
  },
  'N': {
    'ostfold': 'Østfold',
    'akershus': 'Akershus',
    'hedmark': 'Hedmark',
    'oppland': 'Oppland',
    'buskerud': 'Buskerud',
    'vestfold': 'Vestfold',
    'telemark': 'Telemark',
    'aust-agder': 'Aust-Agder',
    'vest-agder': 'Vest-Agder',
    'rogaland': 'Rogaland',
    'hordaland': 'Hordaland',
    'sogn-og-fjordane': 'Sogn og Fjordane',
    'more-og-romsdal': 'Møre og Romsdal',
    'sor-trondelag': 'Sør-Trøndelag',
    'nord-trondelag': 'Nord-Trøndelag',
    'nordland': 'Nordland',
    'troms': 'Troms',
    'finnmark': 'Finnmark'
  },
  'IS': {
    'vestfirdir': 'Vestfirðir',
    'vestland': 'Vestland',
    'nordurland-vestra': 'Norðurland vestra',
    'nordurland-eystra': 'Norðurland eystra',
    'austurland': 'Austurland',
    'sudurland': 'Suðurland',
    'sudurnes': 'Suðurnes',
    'reykjanes': 'Reykjanes'
  }
};

interface ModernModeFiltersProps {
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
  availableRegions: Record<string, string>;
}

export const ModernModeFilters: React.FC<ModernModeFiltersProps> = ({
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
  availableRegions
}) => {
  const { t } = useLanguage();

  // Get landscapes for the selected country and reset landscape if country changes
  const getAvailableLandscapes = () => {
    if (selectedCountry === 'all') {
      return availableRegions;
    }
    const countryLandscapes = LANDSCAPES_BY_COUNTRY[selectedCountry] || {};
    
    // If the currently selected landscape is not available for the new country, reset it
    if (selectedLandscape !== 'all' && !countryLandscapes[selectedLandscape]) {
      onLandscapeChange('all');
    }
    
    return countryLandscapes;
  };

  const currentLandscapes = getAvailableLandscapes();

  return (
    <ScrollArea className="h-full max-h-80">
      <div className="space-y-4 pr-4">
        {/* Country first, then landscape */}
        <CountryFilter
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
        
        <RegionFilter
          selectedLandscape={selectedLandscape}
          onLandscapeChange={onLandscapeChange}
          availableRegions={currentLandscapes}
          regionLabel={t('landscape')}
        />
        
        <PeriodFilter
          selectedPeriod={selectedPeriod}
          onPeriodChange={onPeriodChange}
        />
        
        <StatusFilter
          selectedStatus={selectedStatus}
          onStatusChange={onStatusChange}
        />
        
        <ObjectTypeFilter
          selectedObjectType={selectedObjectType}
          onObjectTypeChange={onObjectTypeChange}
        />
      </div>
    </ScrollArea>
  );
};
