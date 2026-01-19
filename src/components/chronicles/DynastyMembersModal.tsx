import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, MapPin, Calendar, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getStatusBadge, isJarl } from './table/utils/badgeUtils';
import { getDialogLabels } from './table/utils/labelUtils';
import type { RoyalDynasty, HistoricalKing } from '@/hooks/useRoyalChronicles';

interface DynastyMembersModalProps {
  dynasty: RoyalDynasty | null;
  members: HistoricalKing[];
  isOpen: boolean;
  onClose: () => void;
}

export const DynastyMembersModal: React.FC<DynastyMembersModalProps> = ({
  dynasty,
  members,
  isOpen,
  onClose
}) => {
  const { language } = useLanguage();
  const dialogLabels = getDialogLabels(language);

  if (!dynasty) return null;

  const sortedMembers = members.sort((a, b) => {
    if (a.reign_start && b.reign_start) {
      return a.reign_start - b.reign_start;
    }
    return 0;
  });

  const kings = sortedMembers.filter(m => m.gender === 'male' && !isJarl(m));
  const queens = sortedMembers.filter(m => m.gender === 'female');
  const jarls = sortedMembers.filter(m => isJarl(m));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {dynasty.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Dynasty Information */}
          <Card className="bg-slate-800/60 border-slate-600">
            <CardContent className="p-4 space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400">{dialogLabels.region}</div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {dynasty.region}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">
                    {language === 'en' ? 'Period' : 'Period'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {dynasty.period_start}–{dynasty.period_end}
                  </div>
                </div>
              </div>
              {dynasty.description && (
                <div>
                  <div className="text-sm text-slate-400">{dialogLabels.description}</div>
                  <div className="text-sm text-slate-300">{dynasty.description}</div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Members by Category */}
          {kings.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Crown className="h-4 w-4" />
                {language === 'en' ? 'Kings' : 'Kungar'} ({kings.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {kings.map(king => (
                  <Card key={king.id} className="bg-slate-800/40 border-slate-600/50">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{king.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {getStatusBadge(king.status, language)}
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 space-y-1">
                        {king.reign_start && king.reign_end && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {king.reign_start}–{king.reign_end}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {king.region}
                        </div>
                      </div>
                      {king.name_variations && king.name_variations.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-slate-500">
                            {language === 'en' ? 'Also known as:' : 'Även känd som:'}
                          </div>
                          <div className="text-xs text-slate-400">
                            {king.name_variations.join(', ')}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {queens.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {language === 'en' ? 'Queens' : 'Drottningar'} ({queens.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {queens.map(queen => (
                  <Card key={queen.id} className="bg-slate-800/40 border-slate-600/50">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{queen.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          {getStatusBadge(queen.status, language)}
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 space-y-1">
                        {queen.reign_start && queen.reign_end && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {queen.reign_start}–{queen.reign_end}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {queen.region}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {jarls.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {language === 'en' ? 'Jarls' : 'Jarlar'} ({jarls.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {jarls.map(jarl => (
                  <Card key={jarl.id} className="bg-slate-800/40 border-slate-600/50">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{jarl.name}</h4>
                        <div className="flex flex-wrap gap-1">
                          <Badge className="bg-purple-600 text-white text-xs">Jarl</Badge>
                          {getStatusBadge(jarl.status, language)}
                        </div>
                      </div>
                      <div className="text-sm text-slate-400 space-y-1">
                        {jarl.reign_start && jarl.reign_end && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {jarl.reign_start}–{jarl.reign_end}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {jarl.region}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {sortedMembers.length === 0 && (
            <div className="text-center text-slate-400 py-8">
              {language === 'en' 
                ? 'No members found for this dynasty.' 
                : 'Inga medlemmar hittades för denna dynasti.'
              }
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};