
import { useMemo } from 'react';

interface UseMapCountsProps {
  inscriptionsWithCoords: any[];
  germanicGroups: any[];
  findCount: number;
  selectedTimePeriod: string;
  vikingFortresses: any[];
  filteredCities: any[];
  vikingRegions: any[];
  isVikingMode: boolean;
}

export const useMapCounts = ({
  inscriptionsWithCoords,
  germanicGroups,
  findCount,
  selectedTimePeriod,
  vikingFortresses,
  filteredCities,
  vikingRegions,
  isVikingMode
}: UseMapCountsProps) => {
  // Count total locations - include archaeological finds and filter Viking content by timeline period correctly
  const totalLocations = inscriptionsWithCoords.length + germanicGroups.length + findCount +
    (selectedTimePeriod === 'viking_age' ? vikingFortresses.length + filteredCities.length + vikingRegions.length : 0);

  // Count geographic areas including Germanic language branches in both modes
  const geoCount = useMemo(() => {
    if (isVikingMode && selectedTimePeriod === 'viking_age') {
      const realms = new Set([
        ...inscriptionsWithCoords
          .map(i => i.country)
          .filter(realm => realm && typeof realm === 'string' && realm.trim() !== ''),
        ...vikingFortresses
          .map(f => f.country)
          .filter(country => country && typeof country === 'string' && country.trim() !== ''),
        ...filteredCities
          .map(c => c.country)
          .filter(country => country && typeof country === 'string' && country.trim() !== ''),
        ...vikingRegions
          .map(r => r.category)
          .filter(category => category && typeof category === 'string' && category.trim() !== ''),
        ...germanicGroups
          .map(g => g.languageBranch)
          .filter(branch => branch && typeof branch === 'string' && branch.trim() !== ''),
        // Archaeological finds don't have country property, so we'll use a placeholder
        'Archaeological Sites'
      ]);
      return realms.size;
    } else {
      const countries = new Set([
        ...inscriptionsWithCoords
          .map(i => i.country)
          .filter(country => country && typeof country === 'string' && country.trim() !== ''),
        ...germanicGroups
          .map(g => g.languageBranch)
          .filter(branch => branch && typeof branch === 'string' && branch.trim() !== ''),
        // Archaeological finds placeholder
        'Archaeological Sites'
      ]);
      return countries.size;
    }
  }, [inscriptionsWithCoords, isVikingMode, vikingFortresses, filteredCities, vikingRegions, germanicGroups, findCount, selectedTimePeriod]);

  return {
    totalLocations,
    geoCount
  };
};
