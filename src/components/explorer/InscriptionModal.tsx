import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInscriptionExtendedData } from '@/hooks/useInscriptionExtendedData';
import { RunicInscription } from '@/types/inscription';
import { Badge } from '@/components/ui/badge';
import { detectSignumPattern } from '@/utils/coordinateMappingEnhanced';
import { InscriptionEditModal } from '@/components/inscription/InscriptionEditModal';
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Edit } from "lucide-react";

interface InscriptionModalProps {
  inscription: RunicInscription;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (updatedInscription: RunicInscription) => void;
}

const DetailItem = ({ label, value }: { label: string, value: React.ReactNode }) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 border-b border-white/10">
      <dt className="font-semibold text-slate-300">{label}</dt>
      <dd className="col-span-2 text-white">{value}</dd>
    </div>
  );
};

export const InscriptionModal: React.FC<InscriptionModalProps> = ({ inscription, isOpen, onClose, onUpdate }) => {
  const { data: extendedData, isLoading: isLoadingExtended } = useInscriptionExtendedData(inscription?.id || null);
  const { user } = useAuth();
  const { isAdmin } = useUserRole();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const {
    signum,
    name,
    name_en,
    coordinates,
    location,
    province,
    country,
    municipality,
    county,
    parish,
    landscape,
    transliteration,
    translation_en,
    translation_sv,
    dating_text,
    material,
    object_type,
    style_group,
    rune_type,
    status,
    scholarly_notes,
    historical_context,
    paleographic_notes,
    condition_notes,
    dimensions,
    current_location,
  } = inscription;

  const signumParts = inscription.signum ? detectSignumPattern(inscription.signum) : null;
  const signumBreakdown = signumParts ? 
    Object.entries(signumParts)
      .filter(([, value]) => value)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
      .join(', ')
    : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            {name ? `${name} (${signum})` : signum}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {location}, {province}, {country}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <dl className="space-y-1">
            <DetailItem label="Namn" value={name} />
            <DetailItem label="Engelsk namn" value={name_en} />
            <DetailItem label="Signum" value={signum} />
            <DetailItem label="Signum Breakdown" value={signumBreakdown} />
            <DetailItem label="Plats" value={location} />
            <DetailItem label="Socken" value={parish} />
            <DetailItem label="Kommun" value={municipality} />
            <DetailItem label="Län" value={county} />
            <DetailItem label="Landskap" value={landscape} />
            <DetailItem label="Land" value={country} />
            <DetailItem 
              label="Koordinater (nuvarande)" 
              value={coordinates ? `${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}` : 'Inga koordinater'} 
            />
            {extendedData?.additionalCoordinates && extendedData.additionalCoordinates.length > 0 && (
              extendedData.additionalCoordinates.map((coord, index) => (
                <DetailItem 
                  key={index}
                  label={coord.source ? `Koordinater (${coord.source})` : `Koordinater (alt ${index + 1})`}
                  value={`${coord.latitude.toFixed(6)}, ${coord.longitude.toFixed(6)}`}
                />
              ))
            )}
            <DetailItem label="Status" value={status ? <Badge variant="outline">{status}</Badge> : null} />
            <DetailItem label="Transliteration" value={transliteration} />
            <DetailItem label="Translation (SV)" value={translation_sv} />
            <DetailItem label="Translation (EN)" value={translation_en} />
            {extendedData?.translations && extendedData.translations.length > 0 && (
              extendedData.translations.map((trans, index) => (
                <DetailItem 
                  key={index} 
                  label={`Översättning (${trans.language.toUpperCase()})`} 
                  value={trans.text} 
                />
              ))
            )}
            <DetailItem label="Dating" value={dating_text} />
            {extendedData?.datings && extendedData.datings.length > 0 && (
              <DetailItem label="Rundata Dating" value={extendedData.datings.join(', ')} />
            )}
            <DetailItem label="Material" value={material} />
            <DetailItem label="Object Type" value={object_type} />
            <DetailItem label="Current Location" value={current_location} />
            <DetailItem label="Dimensions" value={dimensions} />
            <DetailItem label="Rune Type" value={rune_type} />
            <DetailItem label="Style Group" value={style_group} />
            <DetailItem label="Condition" value={condition_notes} />
            <DetailItem label="Scholarly Notes" value={<p className="whitespace-pre-wrap">{scholarly_notes}</p>} />
            <DetailItem label="Historical Context" value={<p className="whitespace-pre-wrap">{historical_context}</p>} />
            <DetailItem label="Paleographic Notes" value={<p className="whitespace-pre-wrap">{paleographic_notes}</p>} />

            {extendedData?.sources && extendedData.sources.length > 0 && (
              <div className="pt-4">
                <h4 className="font-semibold text-slate-300 mb-2">Källor & Externa Länkar</h4>
                <div className="space-y-3">
                  {extendedData.sources.map((source) => (
                    <div key={source.sourceid} className="text-sm p-3 bg-black/20 rounded-md border border-white/10">
                      <p className="font-semibold text-white">
                        {source.title || 'Okänd titel'}
                      </p>
                      <p className="text-slate-400 text-xs">
                        {source.author || 'Okänd författare'}
                        {source.publication_year && ` (${source.publication_year})`}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {source.uris.map((uri, index) => (
                          <li key={index}>
                            <a 
                              href={uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 hover:underline text-xs break-all"
                            >
                              {uri}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4">
              <h4 className="font-semibold text-slate-300 mb-2">Images from Archives</h4>
              {isLoadingExtended ? (
                <p>Loading images...</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {extendedData?.images && extendedData.images.length > 0 ? (
                    extendedData.images.map((img, index) => (
                      <a href={img} target="_blank" rel="noopener noreferrer" key={index}>
                        <img src={img} alt={`${signum} image ${index + 1}`} className="rounded-md object-cover aspect-square hover:opacity-80 transition-opacity" />
                      </a>
                    ))
                  ) : (
                    <p className="text-slate-400">No images found in archives.</p>
                  )}
                </div>
              )}
            </div>
          </dl>
        </ScrollArea>
        <DialogFooter className="flex gap-2">
          {user && isAdmin && (
            <Button 
              onClick={() => setIsEditModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="h-4 w-4 mr-1" />
              Redigera
            </Button>
          )}
          <Button onClick={onClose} variant="outline">Close</Button>
        </DialogFooter>
      </DialogContent>
      
      {/* Edit Modal */}
      {user && isAdmin && (
        <InscriptionEditModal
          inscription={inscription}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedInscription) => {
            // Update the local inscription state immediately
            inscription = updatedInscription;
            if (onUpdate) {
              onUpdate(updatedInscription);
            }
            setIsEditModalOpen(false);
          }}
        />
      )}
    </Dialog>
  );
};
