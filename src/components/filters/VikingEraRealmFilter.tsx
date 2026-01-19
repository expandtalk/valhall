
import React from 'react';
import { Crown } from 'lucide-react';
import { VIKING_ERA_REALMS, VIKING_ERA_CATEGORIES, REALM_CATEGORIES } from '@/constants/vikingEraRealms';
import { SelectFilter } from './SelectFilter';

interface VikingEraRealmFilterProps {
  selectedRealm: string;
  onRealmChange: (value: string) => void;
}

type RealmOption = { value: string; label: string };

export const VikingEraRealmFilter: React.FC<VikingEraRealmFilterProps> = ({
  selectedRealm,
  onRealmChange
}) => {
  const validRealms = Object.entries(VIKING_ERA_REALMS)
    .map(([code, name]) => ({ code: code.trim(), name: (name as string).trim() }))
    .filter(item => item.code && item.name);

  const groupedRealms = validRealms.reduce((groups, { code, name }) => {
    const categoryKey = Object.keys(REALM_CATEGORIES).find(key => REALM_CATEGORIES[key].includes(code)) || 'other';

    if (!groups[categoryKey]) {
      groups[categoryKey] = [];
    }
    groups[categoryKey].push({ value: code, label: name });
    return groups;
  }, {} as Record<string, RealmOption[]>);

  const options = Object.entries(VIKING_ERA_CATEGORIES).map(([categoryId, categoryName]) => {
    const realmsInCategory: RealmOption[] = groupedRealms[categoryId] || [];
    if (realmsInCategory.length === 0) return null;
    
    return {
      label: categoryName,
      options: realmsInCategory
    };
  }).filter((g): g is { label: string; options: RealmOption[] } => g !== null);

  return (
    <SelectFilter
      label={
        <div className="flex items-center gap-1 text-sm font-medium text-amber-400">
          <Crown className="h-4 w-4" />
          Vikingatida riken
        </div>
      }
      value={selectedRealm}
      onValueChange={onRealmChange}
      options={options}
      placeholder="Välj rike/stam"
      showAllOption={{ value: "all", label: "Alla riken och stammar" }}
      triggerClassName="bg-slate-800/80 border-amber-500/30 text-amber-100 hover:bg-slate-700/80"
      contentClassName="bg-slate-800 border-amber-500/30 z-50"
      groupLabelClassName="px-2 py-1 text-xs font-medium text-amber-300 bg-slate-700/50"
      itemClassName="text-amber-100 hover:bg-amber-600/20 focus:bg-amber-600/20 pl-4"
      allItemClassName="text-amber-100 hover:bg-amber-600/20 focus:bg-amber-600/20"
    />
  );
};
