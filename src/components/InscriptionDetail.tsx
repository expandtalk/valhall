import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  MapPin, 
  Calendar,
  Scroll,
  Eye,
  EyeOff,
  FileText,
  Award,
  Clock,
  Image as ImageIcon,
  CalendarDays,
  Edit
} from "lucide-react";
import { useInscriptionExtendedData } from '@/hooks/useInscriptionExtendedData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { InscriptionName } from "@/components/inscription/InscriptionName";
import { InscriptionEditModal } from "@/components/inscription/InscriptionEditModal";
import { RunicInscription } from "@/types/inscription";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";

interface InscriptionDetailProps {
  inscription: RunicInscription;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate?: (updatedInscription: RunicInscription) => void;
}

export const InscriptionDetail: React.FC<InscriptionDetailProps> = ({ 
  inscription, 
  isExpanded, 
  onToggle,
  onUpdate 
}) => {
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { data: extendedData, isLoading: isLoadingExtendedData } = useInscriptionExtendedData(isExpanded ? inscription.id : null);

  const formatPeriod = () => {
    if (inscription.period_start && inscription.period_end) {
      return `${inscription.period_start}-${inscription.period_end} e.Kr.`;
    }
    return inscription.dating_text || 'Okänd period';
  };

  const getPeriodColor = () => {
    const start = inscription.period_start || 0;
    if (start < 550) return 'bg-purple-500';
    if (start < 800) return 'bg-blue-500';
    if (start < 1100) return 'bg-green-500';
    return 'bg-orange-500';
  };

  const getComplexityColor = () => {
    switch (inscription.complexity_level) {
      case 'complex': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const isComplex = inscription.complexity_level === 'complex' && inscription.text_segments;

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2">
              <InscriptionName 
                inscription={inscription} 
                variant="default"
                showAlternatives={false}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className={`${getPeriodColor()} text-white border-0`}>
                {formatPeriod()}
              </Badge>
              {inscription.rune_type && (
                <Badge variant="secondary" className="text-xs">
                  {inscription.rune_type}
                </Badge>
              )}
              {inscription.complexity_level && (
                <Badge className={`${getComplexityColor()} text-white border-0 text-xs`}>
                  {inscription.complexity_level === 'complex' ? 'Komplex' : 
                   inscription.complexity_level === 'medium' ? 'Medel' : 'Enkel'}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {user && isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditModalOpen(true)}
                className="text-white hover:bg-white/20"
              >
                <Edit className="h-4 w-4 mr-1" />
                Redigera
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-white/20"
            >
              {isExpanded ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  Dölj
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  Visa mer
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic transliteration - always shown */}
        {inscription.transliteration && (
          <div className="p-3 bg-black/20 rounded font-mono text-sm text-slate-200">
            {inscription.transliteration}
          </div>
        )}

        {/* Basic translation - always shown */}
        {inscription.translation_en && (
          <p className="text-slate-300 text-sm italic">
            "{inscription.translation_en}"
          </p>
        )}

        {/* Location and basic info */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {inscription.location && (
            <div className="flex items-center gap-1 text-slate-400">
              <MapPin className="h-3 w-3" />
              {inscription.location}, {inscription.province}
            </div>
          )}
          {inscription.object_type && (
            <div className="flex items-center gap-1 text-slate-400">
              <BookOpen className="h-3 w-3" />
              {inscription.object_type}
            </div>
          )}
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="border-t border-white/20 pt-4 space-y-4">
            {/* Alternative names and signum section */}
            {(inscription.also_known_as?.length || inscription.alternative_signum?.length) && (
              <div>
                <InscriptionName 
                  inscription={inscription} 
                  variant="detailed"
                  showAlternatives={true}
                />
              </div>
            )}
            
            {/* Image Carousel section */}
            <div>
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Bilder
              </h4>
              {isLoadingExtendedData ? (
                <div className="flex space-x-4">
                  <Skeleton className="h-32 w-full max-w-[128px] rounded-lg" />
                  <Skeleton className="h-32 w-full max-w-[128px] rounded-lg hidden md:block" />
                </div>
              ) : extendedData?.images && extendedData.images.length > 0 ? (
                <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-sm">
                  <CarouselContent>
                    {extendedData.images.map((img, index) => (
                      <CarouselItem key={index} className="md:basis-1/2">
                        <div className="p-1">
                          <Card className="bg-black/20">
                            <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden rounded-lg">
                              <img 
                                src={img} 
                                alt={`Bild på ${inscription.signum} ${index + 1}`} 
                                className="w-full h-full object-cover transition-transform hover:scale-105" 
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.onerror = null; 
                                  // Instead of hiding, show a placeholder
                                  target.src = '/placeholder.svg';
                                  target.alt = 'Bild kunde inte laddas';
                                }}
                                onClick={() => window.open(img, '_blank')}
                                style={{ cursor: 'pointer' }}
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm mb-2">Inga bilder tillgängliga för denna inskrift.</p>
                  <p className="text-slate-500 text-xs">
                    Vill du bidra med en bild? Kontakta oss eller använd upload-funktionen.
                  </p>
                </div>
              )}
            </div>

            {/* Dating section */}
            {extendedData?.datings && extendedData.datings.length > 0 && (
               <div className="border-t border-white/10 pt-4">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Detaljerad Datering (från Rundata)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {extendedData.datings.map((datingText, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {datingText}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Existing expanded content based on complexity */}
            <div className="border-t border-white/10 pt-4">
              {isComplex ? (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="overview">Översikt</TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                    <TabsTrigger value="analysis">Analys</TabsTrigger>
                    <TabsTrigger value="context">Kontext</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Grundläggande information
                        </h4>
                        <div className="space-y-1 text-slate-300">
                          <div><strong>Material:</strong> {inscription.material || 'Okänt'}</div>
                          <div><strong>Objekttyp:</strong> {inscription.object_type || 'Okänt'}</div>
                          <div><strong>Stilgrupp:</strong> {inscription.style_group || 'Okänd'}</div>
                          <div><strong>Osäkerhetsnivå:</strong> {inscription.uncertainty_level || 'Okänd'}</div>
                        </div>
                      </div>
                      
                      {inscription.scholarly_notes && (
                        <div>
                          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            Forskningsnoter
                          </h4>
                          <p className="text-slate-300 text-sm">
                            {inscription.scholarly_notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    {inscription.text_segments?.transliteration_lines && (
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Scroll className="h-4 w-4" />
                          Translitteration (rad för rad)
                        </h4>
                        <div className="space-y-1">
                          {inscription.text_segments.transliteration_lines.map((line: string, index: number) => (
                            <div key={index} className="flex gap-3 text-sm">
                              <span className="text-slate-500 w-8 text-right">{index + 1}</span>
                              <span className="font-mono text-slate-200 flex-1">{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {inscription.text_segments?.swedish_lines && (
                      <div>
                        <h4 className="text-white font-semibold mb-3">
                          Svensk översättning (rad för rad)
                        </h4>
                        <div className="space-y-1">
                          {inscription.text_segments.swedish_lines.map((line: string, index: number) => (
                            <div key={index} className="flex gap-3 text-sm">
                              <span className="text-slate-500 w-8 text-right">{index + 1}</span>
                              <span className="text-slate-300 flex-1">{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {inscription.text_segments?.normalized && (
                      <div>
                        <h4 className="text-white font-semibold mb-3">
                          Normaliserad fornnordiska
                        </h4>
                        <div className="p-3 bg-black/20 rounded font-mono text-sm text-slate-200">
                          {inscription.text_segments.normalized}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="analysis" className="space-y-4">
                    {inscription.paleographic_notes && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Paleografiska noter</h4>
                        <p className="text-slate-300 text-sm">
                          {inscription.paleographic_notes}
                        </p>
                      </div>
                    )}
                    
                    {inscription.condition_notes && (
                      <div>
                        <h4 className="text-white font-semibold mb-2">Skick/Tillstånd</h4>
                        <p className="text-slate-300 text-sm">
                          {inscription.condition_notes}
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="context" className="space-y-4">
                    {inscription.historical_context && (
                      <div>
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Historisk kontext
                        </h4>
                        <p className="text-slate-300 text-sm">
                          {inscription.historical_context}
                        </p>
                      </div>
                    )}
                    
                    {inscription.scholarly_notes && (
                      <div>
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Forskningsnoter
                        </h4>
                        <p className="text-slate-300 text-sm">
                          {inscription.scholarly_notes}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1 text-slate-300">
                      <div><strong>Material:</strong> {inscription.material || 'Okänt'}</div>
                      <div><strong>Stilgrupp:</strong> {inscription.style_group || 'Okänd'}</div>
                    </div>
                    <div className="space-y-1 text-slate-300">
                      <div><strong>Land:</strong> {inscription.country || 'Okänt'}</div>
                      <div><strong>Osäkerhet:</strong> {inscription.uncertainty_level || 'Okänd'}</div>
                    </div>
                  </div>
                  
                  {inscription.normalization && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Normalisering</h4>
                      <div className="p-3 bg-black/20 rounded font-mono text-sm text-slate-200">
                        {inscription.normalization}
                      </div>
                    </div>
                  )}
                  
                  {inscription.historical_context && (
                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Historisk kontext
                      </h4>
                      <p className="text-slate-300 text-sm">
                        {inscription.historical_context}
                      </p>
                    </div>
                  )}
                  
                  {inscription.condition_notes && (
                    <div>
                      <h4 className="text-white font-semibold mb-2">Skick/Tillstånd</h4>
                      <p className="text-slate-300 text-sm">
                        {inscription.condition_notes}
                      </p>
                    </div>
                  )}
                  
                  {inscription.scholarly_notes && (
                    <div>
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Forskningsnoter
                      </h4>
                      <p className="text-slate-300 text-sm">
                        {inscription.scholarly_notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      {/* Edit Modal */}
      {user && isAdmin && (
        <InscriptionEditModal
          inscription={inscription}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedInscription) => {
            if (onUpdate) {
              onUpdate(updatedInscription);
            }
            setIsEditModalOpen(false);
          }}
        />
      )}
    </Card>
  );
};
