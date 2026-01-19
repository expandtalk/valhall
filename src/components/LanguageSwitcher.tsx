import React from 'react';
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-600/50">
      <span className="text-xs text-slate-300">EN</span>
      <Switch
        checked={language === 'sv'}
        onCheckedChange={(checked) => setLanguage(checked ? 'sv' : 'en')}
        className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-600 scale-75 mx-1"
      />
      <span className="text-xs text-slate-300">SV</span>
    </div>
  );
};
