
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Globe, Ship } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

interface GeographyModeToggleProps {
  isVikingMode: boolean;
  onModeChange: (isVikingMode: boolean) => void;
}

export const GeographyModeToggle: React.FC<GeographyModeToggleProps> = ({
  isVikingMode,
  onModeChange
}) => {
  const { t, language, setLanguage } = useLanguage();
  const isSwedish = language === 'sv';

  return (
    <div className="flex items-center justify-between gap-6 p-3 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-lg border border-slate-600/30">
      
      {/* Language Toggle - Consistent blue theme */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-200 font-medium">EN</span>
        <Switch
          checked={isSwedish}
          onCheckedChange={(checked) => setLanguage(checked ? 'sv' : 'en')}
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-500"
        />
        <span className="text-sm text-slate-200 font-medium">SV</span>
      </div>
      
      {/* Geography Mode Toggle - Consistent blue theme */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Globe className={`h-4 w-4 ${!isVikingMode ? 'text-blue-400' : 'text-slate-400'}`} />
          <Label htmlFor="geography-mode" className={`text-sm cursor-pointer font-medium ${!isVikingMode ? 'text-blue-300' : 'text-slate-400'}`}>
            {t('modernGeography')}
          </Label>
        </div>
        
        <Switch
          id="geography-mode"
          checked={isVikingMode}
          onCheckedChange={onModeChange}
          className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-blue-600"
        />
        
        <div className="flex items-center gap-2">
          <Ship className={`h-4 w-4 ${isVikingMode ? 'text-blue-400' : 'text-slate-400'}`} />
          <Label htmlFor="geography-mode" className={`text-sm cursor-pointer font-medium ${isVikingMode ? 'text-blue-300' : 'text-slate-400'}`}>
            {t('vikingWorld')}
          </Label>
        </div>
      </div>
      
    </div>
  );
};
