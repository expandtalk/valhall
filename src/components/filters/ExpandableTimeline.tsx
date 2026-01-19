
import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp, Expand } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useLanguage } from '@/contexts/LanguageContext';
import { GERMANIC_TIME_PERIODS, getGroupsByPeriod } from '@/utils/germanicTimeline/timelineData';

interface ExpandableTimelineProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  onMapNavigate?: (lat: number, lng: number, zoom: number) => void;
  className?: string;
}

// Timeline ranges from 12000 BCE to 1066 CE to include all periods
const TIMELINE_START = -12000;
const TIMELINE_END = 1066;
const TIMELINE_RANGE = TIMELINE_END - TIMELINE_START;

// Key Viking events with navigation coordinates
const VIKING_EVENTS = [
  {
    year: 793,
    nameEn: "Lindisfarne",
    nameSv: "Lindisfarne",
    descriptionEn: "Norwegian Vikings attacked the monastery on Holy Island, shocking the Christian world and traditionally marking the beginning of the Viking Age. This raid demonstrated new naval technologies and long-distance coordination that would define the Viking expansion.",
    descriptionSv: "Norska vikingar attackerade klostret på Holy Island, vilket chockade den kristna världen och markerar traditionellt början på vikingatiden. Denna räd visade nya sjöfartsteknologier och långdistanskoordination som skulle definiera vikingaexpansionen.",
    coordinates: { lat: 55.67, lng: -1.79, zoom: 8 }
  },
  {
    year: 845,
    nameEn: "Siege of Paris",
    nameSv: "Belägringen av Paris",
    descriptionEn: "Ragnar Lodbrok led a massive Viking fleet up the Seine River to besiege and plunder Paris. The Frankish king Charles the Bald paid a huge ransom of 7,000 livres of silver to make the Vikings leave, establishing the precedent of paying Danegeld.",
    descriptionSv: "Ragnar Lodbrok ledde en massiv vikingaflotta upp längs Seine för att belägra och plundra Paris. Den frankiske kungen Karl den Skallige betalade en enorm lösensumma på 7 000 livres silver för att få vikingarna att dra sig tillbaka, vilket etablerade precedensen att betala danegäld.",
    coordinates: { lat: 48.8566, lng: 2.3522, zoom: 8 }
  },
  {
    year: 862,
    nameEn: "Rurik Dynasty",
    nameSv: "Rurikdynastin",
    descriptionEn: "Swedish Viking chieftain Rurik established the first Russian dynasty in Novgorod, laying the foundation for what would become Russia. His descendants would rule Russia for over 700 years, showing the lasting political impact of Viking expansion eastward.",
    descriptionSv: "Den svenske vikingahövdingen Rurik etablerade den första ryska dynastin i Novgorod, vilket lade grunden för det som skulle bli Ryssland. Hans ättlingar skulle regera Ryssland i över 700 år, vilket visar den bestående politiska påverkan av vikingaexpansionen österut.",
    coordinates: { lat: 58.5, lng: 31.3, zoom: 7 }
  },
  {
    year: 1000,
    nameEn: "America Discovery",
    nameSv: "Amerikaupptäckten",
    descriptionEn: "Leif Erikson reached America 500 years before Columbus, establishing a settlement in Newfoundland. This achievement demonstrates the extraordinary seafaring skills of the Vikings and their ability to navigate across the Atlantic using primitive but effective navigation techniques.",
    descriptionSv: "Leif Eriksson nådde Amerika 500 år före Columbus och etablerade en bosättning på Newfoundland. Denna bedrift visar vikingars extraordinära sjöfartsfärdigheter och deras förmåga att navigera över Atlanten med primitiva men effektiva navigationstekniker.",
    coordinates: { lat: 51.6, lng: -55.5, zoom: 6 }
  },
  {
    year: 1066,
    nameEn: "Battle of Hastings",
    nameSv: "Slaget vid Hastings",
    descriptionEn: "William the Conqueror's victory at Hastings changed England forever and marks the end of the Viking Age. This Norman conquest, led by descendants of Vikings, ironically ended the era of Viking raids and established a new feudal order in Europe.",
    descriptionSv: "William Erövarens seger vid Hastings förändrade England för alltid och markerar slutet på vikingatiden. Denna normandiska erövring, ledd av vikingaättlingar, avslutade ironiskt nog eran av vikingaräder och etablerade en ny feodal ordning i Europa.",
    coordinates: { lat: 50.9, lng: 0.6, zoom: 8 }
  }
];

export const ExpandableTimeline: React.FC<ExpandableTimelineProps> = ({
  selectedPeriod,
  onPeriodChange,
  onMapNavigate,
  className = ""
}) => {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof VIKING_EVENTS[0] | null>(null);
  
  // Find current period data
  const currentPeriod = GERMANIC_TIME_PERIODS.find(p => p.id === selectedPeriod);
  
  // Auto-expand when period is changed
  useEffect(() => {
    if (selectedPeriod !== 'viking_age') {
      setIsExpanded(true);
    }
  }, [selectedPeriod]);

  // Convert year to slider position (0-100)
  const yearToSliderValue = (year: number): number => {
    return ((year - TIMELINE_START) / TIMELINE_RANGE) * 100;
  };

  // Convert slider position to year
  const sliderValueToYear = (value: number): number => {
    return Math.round(TIMELINE_START + (value / 100) * TIMELINE_RANGE);
  };

  // Get slider range for current period
  const getSliderRange = (): [number, number] => {
    if (!currentPeriod) return [yearToSliderValue(793), yearToSliderValue(1066)];
    return [
      yearToSliderValue(currentPeriod.startYear),
      yearToSliderValue(currentPeriod.endYear)
    ];
  };

  const [sliderValues, setSliderValues] = useState<[number, number]>(getSliderRange());

  // Handle slider change with real-time updates
  const handleSliderChange = (values: number[]) => {
    const newValues: [number, number] = [values[0], values[1]];
    setSliderValues(newValues);
    
    // Find the best matching period for the selected range
    const startYear = sliderValueToYear(newValues[0]);
    const endYear = sliderValueToYear(newValues[1]);
    
    const matchingPeriod = GERMANIC_TIME_PERIODS.find(period => {
      const periodRange = period.endYear - period.startYear;
      const selectedRange = endYear - startYear;
      const startDiff = Math.abs(period.startYear - startYear);
      const endDiff = Math.abs(period.endYear - endYear);
      
      return startDiff <= 100 && endDiff <= 100 && Math.abs(periodRange - selectedRange) <= 200;
    });

    if (matchingPeriod && matchingPeriod.id !== selectedPeriod) {
      onPeriodChange(matchingPeriod.id);
    }
  };

  // Handle event click with map navigation
  const handleEventClick = (event: typeof VIKING_EVENTS[0]) => {
    if (selectedEvent?.year === event.year) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
      if (onMapNavigate) {
        onMapNavigate(event.coordinates.lat, event.coordinates.lng, event.coordinates.zoom);
      }
    }
  };

  // Handle period button click with auto-expand
  const handlePeriodClick = (periodId: string) => {
    onPeriodChange(periodId);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  // Format year for display
  const formatYear = (year: number): string => {
    if (year < 0) {
      return `${Math.abs(year)} ${language === 'sv' ? 'f.Kr.' : 'BCE'}`;
    }
    return `${year} ${language === 'sv' ? 'e.Kr.' : 'CE'}`;
  };

  // Update slider when period changes externally
  useEffect(() => {
    if (currentPeriod) {
      const newRange = getSliderRange();
      setSliderValues(newRange);
    }
  }, [selectedPeriod]);

  const timelineLabel = language === 'sv' ? 'Germansk Tidslinje' : 'Germanic Timeline';
  const currentStartYear = sliderValueToYear(sliderValues[0]);
  const currentEndYear = sliderValueToYear(sliderValues[1]);

  // Get relevant groups for current period
  const relevantGroups = currentPeriod ? getGroupsByPeriod(currentPeriod.id) : [];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Compact header with expand button */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-300" />
            <span className="text-sm font-medium text-amber-300">{timelineLabel}</span>
            {currentPeriod && (
              <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-200">
                {language === 'sv' ? currentPeriod.name : currentPeriod.nameEn || currentPeriod.name}
              </Badge>
            )}
          </div>
          
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-amber-300 hover:text-amber-100">
              <Expand className="h-3 w-3" />
            </Button>
          </CollapsibleTrigger>
        </div>

        {/* Show ALL periods as default but highlight Viking Age as selected */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {GERMANIC_TIME_PERIODS.map((period) => (
              <Button
                key={period.id}
                variant="ghost"
                size="sm"
                onClick={() => handlePeriodClick(period.id)}
                className={`px-2 py-1 text-xs h-auto ${
                  selectedPeriod === period.id
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-slate-700/40 text-amber-200 hover:bg-slate-600/60'
                }`}
              >
                {language === 'sv' ? period.name.split(' ')[0] : (period.nameEn?.split(' ')[0] || period.name.split(' ')[0])}
              </Button>
            ))}
          </div>
        </div>

        <CollapsibleContent className="space-y-3">
          {/* Year range display */}
          <div className="flex justify-between text-xs text-amber-200">
            <span>{formatYear(currentStartYear)}</span>
            <span>{formatYear(currentEndYear)}</span>
          </div>

          {/* Interactive Slider */}
          <div className="relative px-2">
            <Slider
              value={sliderValues}
              onValueChange={handleSliderChange}
              min={0}
              max={100}
              step={0.5}
              className="w-full [&_[role=slider]]:bg-amber-500 [&_[role=slider]]:border-amber-600 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
            
            {/* Event markers */}
            {selectedPeriod === 'viking_age' && (
              <div className="absolute top-0 w-full h-6">
                {VIKING_EVENTS.map((event) => {
                  const position = yearToSliderValue(event.year);
                  
                  return (
                    <div
                      key={event.year}
                      className="absolute top-0 transform -translate-x-1/2"
                      style={{ left: `${Math.max(8, Math.min(92, position))}%` }}
                    >
                      <div className="w-1 h-6 bg-red-400 opacity-60 rounded-full"></div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Timeline markers */}
          <div className="flex justify-between text-xs text-amber-400/60 mt-2">
            <span>{formatYear(TIMELINE_START)}</span>
            <span>0</span>
            <span>{formatYear(TIMELINE_END)}</span>
          </div>

          {/* Viking events buttons (only show during Viking Age) */}
          {selectedPeriod === 'viking_age' && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-amber-300">
                {language === 'sv' ? 'Viktiga händelser:' : 'Key Events:'}
              </h4>
              <div className="flex flex-wrap gap-1">
                {VIKING_EVENTS.map((event) => (
                  <Button
                    key={event.year}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEventClick(event)}
                    className={`px-2 py-1 text-xs h-auto ${
                      selectedEvent?.year === event.year
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-slate-700/40 text-red-200 hover:bg-slate-600/60'
                    }`}
                  >
                    {language === 'sv' ? event.nameSv : event.nameEn} ({event.year})
                  </Button>
                ))}
              </div>
              
              {/* Selected event description - expanded version */}
              {selectedEvent && (
                <div className="text-xs text-amber-100/80 bg-slate-700/20 rounded p-3 space-y-2">
                  <div className="font-medium text-amber-200 mb-1">
                    {language === 'sv' ? selectedEvent.nameSv : selectedEvent.nameEn} ({selectedEvent.year})
                  </div>
                  <div className="leading-relaxed">
                    {language === 'sv' ? selectedEvent.descriptionSv : selectedEvent.descriptionEn}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Germanic groups info for current period */}
          {relevantGroups.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-amber-300">
                {language === 'sv' ? 'Folkgrupper i denna period:' : 'Germanic Groups in this period:'}
              </h4>
              <div className="text-xs text-amber-200/80 bg-slate-700/30 rounded p-2">
                {language === 'sv' ? 'Visar' : 'Shows'} {relevantGroups.length} {language === 'sv' ? 'folkgrupper på kartan' : 'groups on the map'}
              </div>
            </div>
          )}

          {/* Current period description */}
          {currentPeriod && (
            <div className="text-xs text-amber-100/80 bg-slate-700/20 rounded p-3 leading-relaxed">
              {language === 'sv' ? currentPeriod.description : (currentPeriod.descriptionEn || currentPeriod.description)}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
