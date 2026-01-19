
import React from 'react';
import { Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Updated countries list to match the runic database conventions
const COUNTRIES = {
  'SE': 'Sweden',
  'DR': 'Denmark', 
  'N': 'Norway',
  'E': 'England',
  'IR': 'Ireland',
  'Sc': 'Scotland',
  'IS': 'Iceland',
  'FI': 'Finland',
  'EE': 'Estonia',
  'LV': 'Latvia',
  'LT': 'Lithuania',
  'DE': 'Germany',
  'NL': 'Netherlands',
  'GB': 'United Kingdom',
  'FR': 'France',
  'RU': 'Russia',
  'UA': 'Ukraine',
  'BY': 'Belarus',
  'PL': 'Poland',
  'CZ': 'Czech Republic',
  'AT': 'Austria',
  'CH': 'Switzerland',
  'IT': 'Italy',
  'GR': 'Greece',
  'TR': 'Turkey',
  'BG': 'Bulgaria',
  'RO': 'Romania',
  'HU': 'Hungary',
  'SK': 'Slovakia',
  'SI': 'Slovenia',
  'HR': 'Croatia',
  'BA': 'Bosnia and Herzegovina',
  'RS': 'Serbia',
  'ME': 'Montenegro',
  'MK': 'North Macedonia',
  'AL': 'Albania',
  'XK': 'Kosovo'
};

interface CountryFilterProps {
  selectedCountry: string;
  onCountryChange: (value: string) => void;
}

export const CountryFilter: React.FC<CountryFilterProps> = ({
  selectedCountry,
  onCountryChange
}) => {
  // Filter out any empty country codes
  const validCountries = Object.entries(COUNTRIES).filter(([code, name]) => {
    return code && code.trim() !== '' && name && name.trim() !== '';
  });

  console.log('CountryFilter: Valid countries:', validCountries);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 text-sm font-medium text-white">
        <Globe className="h-4 w-4" />
        Countries
      </div>
      <Select value={selectedCountry} onValueChange={onCountryChange}>
        <SelectTrigger className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-blue-500">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600 max-h-64 z-50">
          <SelectItem value="all" className="text-white hover:bg-slate-700 focus:bg-slate-700">
            All countries
          </SelectItem>
          {validCountries.map(([code, name]) => (
            <SelectItem 
              key={code} 
              value={code} 
              className="text-white hover:bg-slate-700 focus:bg-slate-700"
            >
              {`${code} - ${name}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
