
import React, { useState } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from '@/contexts/LanguageContext';

// Complete historical periods including the earliest ones
const ALL_HISTORICAL_PERIODS = [
  {
    id: 'paleolithic',
    name: 'Paleolitikum',
    nameEn: 'Paleolithic',
    startYear: -45000,
    endYear: -8000,
    description: 'Äldre stenåldern med jägar-samlargrupper under istiden.',
    descriptionEn: 'Old Stone Age with hunter-gatherer groups during ice age.'
  },
  {
    id: 'mesolithic',
    name: 'Mesolitikum',
    nameEn: 'Mesolithic',
    startYear: -8000,
    endYear: -4000,
    description: 'Mellanstenalder efter istidens slut.',
    descriptionEn: 'Middle Stone Age after end of ice age.'
  },
  {
    id: 'neolithic',
    name: 'Neolitikum',
    nameEn: 'Neolithic',
    startYear: -4000,
    endYear: -1700,
    description: 'Yngre stenåldern med jordbruk och megalitgravar.',
    descriptionEn: 'New Stone Age with agriculture and megalithic tombs.'
  },
  {
    id: 'bronze_age',
    name: 'Bronsålder',
    nameEn: 'Bronze Age',
    startYear: -1700,
    endYear: -500,
    description: 'Nordisk bronsålderkultur med rik metallkonst.',
    descriptionEn: 'Nordic Bronze Age culture with rich metalwork.'
  },
  {
    id: 'pre_roman_iron',
    name: 'Förromersk järnålder',
    nameEn: 'Pre-Roman Iron Age',
    startYear: -500,
    endYear: 1,
    description: 'Tidiga germanska stammar bildas.',
    descriptionEn: 'Early Germanic tribes form.'
  },
  {
    id: 'roman_iron',
    name: 'Romersk järnålder',
    nameEn: 'Roman Iron Age',
    startYear: 1,
    endYear: 400,
    description: 'Kontakt med romerska riket.',
    descriptionEn: 'Contact with Roman Empire.'
  },
  {
    id: 'migration_period',
    name: 'Folkvandringstid',
    nameEn: 'Migration Period',
    startYear: 400,
    endYear: 550,
    description: 'Stora folkvandringar och germanska riken.',
    descriptionEn: 'Great migrations and Germanic kingdoms.'
  },
  {
    id: 'vendel_period',
    name: 'Vendeltid',
    nameEn: 'Vendel Period',
    startYear: 550,
    endYear: 793,
    description: 'Förvikingatid med rika krigargravfynd.',
    descriptionEn: 'Pre-Viking period with rich warrior graves.'
  },
  {
    id: 'viking_age',
    name: 'Vikingatid',
    nameEn: 'Viking Age',
    startYear: 793,
    endYear: 1066,
    description: 'Nordisk expansion och handelsutveckling.',
    descriptionEn: 'Nordic expansion and trade development.'
  }
];

interface TimePeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  className?: string;
}

export const TimePeriodSelector: React.FC<TimePeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useLanguage();
  const selectedPeriodData = ALL_HISTORICAL_PERIODS.find(p => p.id === selectedPeriod);

  const timelineLabel = language === 'sv' ? 'Historisk Tidslinje' : 'Historical Timeline';
  const selectPlaceholder = language === 'sv' ? 'Välj tidsperiod' : 'Select time period';
  const researchNote = language === 'sv' 
    ? 'Baserat på arkeologisk forskning och historiska källor'
    : 'Based on archaeological research and historical sources';

  return (
    <div className={`${className}`}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-between text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 p-2"
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">{timelineLabel}</span>
              {selectedPeriodData && (
                <span className="text-xs text-amber-400">
                  ({language === 'sv' ? selectedPeriodData.name : selectedPeriodData.nameEn})
                </span>
              )}
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-3 pt-2">
          <Select value={selectedPeriod} onValueChange={onPeriodChange}>
            <SelectTrigger className="bg-slate-700/60 border-amber-500/30 text-amber-100 hover:bg-slate-600/60">
              <SelectValue placeholder={selectPlaceholder} />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-amber-500/30 z-50 max-h-60">
              {ALL_HISTORICAL_PERIODS.map((period) => {
                // Ensure period.id is not empty before rendering SelectItem
                if (!period.id || period.id.trim() === '') {
                  console.log('Skipping empty period id:', period);
                  return null;
                }
                return (
                  <SelectItem 
                    key={period.id} 
                    value={period.id} 
                    className="text-amber-100 hover:bg-amber-600/20 focus:bg-amber-600/20"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {language === 'sv' ? period.name : period.nameEn}
                      </span>
                      <span className="text-xs text-amber-300">
                        {period.startYear < 0 ? `${Math.abs(period.startYear)} ${language === 'sv' ? 'f.Kr.' : 'BCE'}` : `${period.startYear} ${language === 'sv' ? 'e.Kr.' : 'CE'}`} - 
                        {period.endYear < 0 ? ` ${Math.abs(period.endYear)} ${language === 'sv' ? 'f.Kr.' : 'BCE'}` : ` ${period.endYear} ${language === 'sv' ? 'e.Kr.' : 'CE'}`}
                      </span>
                    </div>
                  </SelectItem>
                );
              }).filter(Boolean)}
            </SelectContent>
          </Select>

          {selectedPeriodData && (
            <div className="bg-slate-700/40 rounded-md p-3 border border-amber-500/20">
              <h4 className="font-medium text-amber-200 mb-2 text-sm">
                {language === 'sv' ? selectedPeriodData.name : selectedPeriodData.nameEn}
              </h4>
              <p className="text-xs text-amber-100 mb-2">
                {language === 'sv' ? selectedPeriodData.description : selectedPeriodData.descriptionEn}
              </p>
              
              <div className="pt-2 mt-2 border-t border-amber-500/20">
                <p className="text-xs text-amber-400 italic">
                  {researchNote}
                </p>
              </div>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
