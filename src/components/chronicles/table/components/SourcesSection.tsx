
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Book } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getReliabilityBadge } from '../utils/badgeUtils';
import { getSectionTitles, getDialogLabels } from '../utils/labelUtils';
import type { HistoricalSource } from '@/hooks/useRoyalChronicles';

interface SourcesSectionProps {
  sources?: HistoricalSource[];
  onSelectItem: (item: any) => void;
}

export const SourcesSection: React.FC<SourcesSectionProps> = ({ sources, onSelectItem }) => {
  const { language } = useLanguage();
  const sectionTitles = getSectionTitles(language);
  const dialogLabels = getDialogLabels(language);

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Book className="h-5 w-5" />
          {sectionTitles.clickableSources}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sources?.map((source) => (
            <Dialog key={source.id}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-auto p-3 text-left justify-start bg-slate-800/60 border-slate-600 hover:bg-slate-700/60"
                  onClick={() => onSelectItem({ type: 'source', data: source })}
                >
                  <div className="space-y-1">
                    <div className="font-medium text-white">{source.title}</div>
                    <div className="flex gap-2">
                      {getReliabilityBadge(source.reliability, language)}
                    </div>
                    <div className="text-xs text-slate-400">{source.author}, {source.written_year}</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    {source.title}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-400">{dialogLabels.author}</div>
                      <div>{source.author}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">{dialogLabels.writtenYear}</div>
                      <div>{source.written_year}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-400">{dialogLabels.language}</div>
                      <div>{source.language}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">{dialogLabels.coversPeriod}</div>
                      <div>{source.covers_period_start}–{source.covers_period_end}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-slate-400">{dialogLabels.reliability}</div>
                    {getReliabilityBadge(source.reliability, language)}
                  </div>

                  {source.description && (
                    <div>
                      <div className="text-sm text-slate-400">{dialogLabels.description}</div>
                      <div className="text-sm">{source.description}</div>
                    </div>
                  )}

                  {source.bias_types && source.bias_types.length > 0 && (
                    <div>
                      <div className="text-sm text-slate-400">{dialogLabels.identifiedBias}</div>
                      <div className="flex flex-wrap gap-1">
                        {source.bias_types.map((bias, index) => (
                          <Badge key={index} variant="outline" className="border-orange-500 text-orange-300 text-xs">
                            {bias}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
