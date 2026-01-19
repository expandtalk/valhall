
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { StagingInscription } from "@/types/staging";

interface StagingDetailModalProps {
  selectedItem: StagingInscription | null;
  onApprove: (itemId: string) => void;
  onReject: (itemId: string) => void;
  onClose: () => void;
}

export const StagingDetailModal: React.FC<StagingDetailModalProps> = ({
  selectedItem,
  onApprove,
  onReject,
  onClose
}) => {
  if (!selectedItem) return null;

  const getConflictBadgeColor = (reason: string) => {
    switch (reason) {
      case 'signum_conflict': return 'bg-red-500';
      case 'gps_uncertainty': return 'bg-orange-500';
      case 'dating_vague': return 'bg-yellow-500';
      case 'source_conflict': return 'bg-purple-500';
      case 'duplicate_suspected': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getConflictLabel = (reason: string) => {
    switch (reason) {
      case 'signum_conflict': return 'Signum-konflikt';
      case 'gps_uncertainty': return 'GPS-osäkerhet';
      case 'dating_vague': return 'Vag datering';
      case 'source_conflict': return 'Källkonflikt';
      case 'duplicate_suspected': return 'Möjlig duplikat';
      default: return reason;
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white">Detaljgranskning: {selectedItem.original_signum}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Grunddata</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-300"><span className="text-white">Signum:</span> {selectedItem.original_signum}</p>
              <p className="text-slate-300"><span className="text-white">Källa:</span> {selectedItem.source_database}</p>
              <p className="text-slate-300"><span className="text-white">Plats:</span> {selectedItem.location || 'Okänd'}</p>
              <p className="text-slate-300"><span className="text-white">Datering:</span> {selectedItem.dating_text || 'Okänd'}</p>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Konflikter</h4>
            <div className="space-y-1">
              {selectedItem.conflict_reasons.map((reason, index) => (
                <Badge 
                  key={index}
                  className={`${getConflictBadgeColor(reason)} text-white text-xs mr-1`}
                >
                  {getConflictLabel(reason)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {selectedItem.transliteration && (
          <div>
            <h4 className="text-white font-semibold mb-2">Translitteration</h4>
            <p className="text-slate-300 font-mono bg-black/20 p-2 rounded">{selectedItem.transliteration}</p>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            onClick={() => onApprove(selectedItem.id)}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Godkänn
          </Button>
          <Button
            onClick={() => onReject(selectedItem.id)}
            variant="destructive"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Avvisa
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5"
          >
            Stäng
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
