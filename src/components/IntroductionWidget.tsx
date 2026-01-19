
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";

interface IntroductionWidgetProps {
  onDismiss: () => void;
}

export const IntroductionWidget: React.FC<IntroductionWidgetProps> = ({ 
  onDismiss
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <Card className="feature-card mb-8 relative max-w-3xl mx-auto">
      <Button
        onClick={onDismiss}
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 h-8 w-8 p-0 text-slate-400 hover:text-white z-10"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <CardContent className="p-8">
        {/* Language Selection - Very Small and Elegant */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 px-2 py-1 bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
              <span className="text-xs text-slate-300 opacity-80">EN</span>
              <Switch
                checked={language === 'sv'}
                onCheckedChange={(checked) => setLanguage(checked ? 'sv' : 'en')}
                className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-600 scale-50 mx-1"
              />
              <span className="text-xs text-slate-300 opacity-80">SV</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
