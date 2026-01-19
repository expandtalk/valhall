import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Plus, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const jellingStonesData = [
  {
    signum: "DR 41",
    transliteration: "kurmr kunukr karthi kubl thausi aft thurui kunu sin",
    normalization: "Gormr konungr gærði kumbl þausi æft Þyri konu sína.",
    translation_en: "Gorm the king made this monument in memory of Thyri his wife.",
    translation_sv: "Gorm konung gjorde detta kummel efter Thyri sin hustru.",
    dating_text: "900-talet",
    period_start: 900,
    period_end: 999,
    location: "Jelling, Danmark",
    province: null,
    country: "DK",
    object_type: "Runsten",
    material: "Granit",
    rune_type: "Yngre Futhark",
    style_group: "Ej fastställt",
    uncertainty_level: "Säker",
    complexity_level: "Enkel",
    text_segments: null,
    scholarly_notes: "Den äldsta av Jellingestenarna, rest av Gorm den gamle till minne av sin hustru Thyri.",
    historical_context: "Gorm den gamle var den förste historiskt belagda kungen av Danmark.",
    paleographic_notes: null,
    k_samsok_uri: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    signum: "DR 42",
    transliteration: "haraltr kunukr bath kaurua kubl thausi aft kurm fathur sin auk aft thaurui muthur sina sa haraltr ias sar uan tanmaurk ala auk nuruiak auk tani karthi kristna",
    normalization: "Haraldr konungr bað gærva kumbl þausi æft Gorm faður sinn ok æft Þyri móður sína. Sá Haraldr iás sér vann Danmörk alla ok Norveg ok dani gærði kristna.",
    translation_en: "Harald king ordered this monument to be made in memory of Gorm his father and in memory of Thyri his mother. That Harald who won for himself all of Denmark and Norway and made the Danes Christian.",
    translation_sv: "Harald kung befallde att detta minnesmärke skulle göras efter Gorm sin fader och efter Thyri sin moder. Den Harald som vann sig hela Danmark och Norge och gjorde danerna kristna.",
    dating_text: "900-talet",
    period_start: 900,
    period_end: 999,
    location: "Jelling, Danmark",
    province: null,
    country: "DK",
    object_type: "Runsten",
    material: "Granit",
    rune_type: "Yngre Futhark",
    style_group: "Ej fastställt",
    uncertainty_level: "Säker",
    complexity_level: "Komplex",
    text_segments: null,
    scholarly_notes: "Den största och mest kända av Jellingestenarna, rest av Harald Blåtand till minne av sina föräldrar Gorm och Thyri. Stenen berättar om Haralds erövring av Danmark och Norge och omvändelsen till kristendomen.",
    historical_context: "Harald Blåtand var kung av Danmark och Norge och introducerade kristendomen i Danmark.",
    paleographic_notes: null,
    k_samsok_uri: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const JellingStonesSection: React.FC = () => {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isImporting, setIsImporting] = useState(false);
  const { toast } = useToast();

  const handleImport = async () => {
    setIsImporting(true);
    setImportStatus('idle');

    try {
      // Check for existing Jelling stones
      const { data: existingStones, error: checkError } = await supabase
        .from('runic_inscriptions')
        .select('signum')
        .in('signum', ['DR 41', 'DR 42']);

      if (checkError) {
        throw checkError;
      }

      const existingSigums = existingStones?.map(stone => stone.signum) || [];
      const stonesToImport = jellingStonesData.filter(stone => 
        !existingSigums.includes(stone.signum)
      );

      if (stonesToImport.length === 0) {
        toast({
          title: "Already imported",
          description: "Jelling Stones are already in the database",
        });
        setImportStatus('success');
        return;
      }

      // Import new stones
      const { error: insertError } = await supabase
        .from('runic_inscriptions')
        .insert(stonesToImport);

      if (insertError) {
        throw insertError;
      }

      setImportStatus('success');
      toast({
        title: "Import successful!",
        description: `Added ${stonesToImport.length} Jelling Stone inscription(s)`,
      });

    } catch (error) {
      console.error('Import error:', error);
      setImportStatus('error');
      toast({
        title: "Import failed",
        description: "Could not import Jelling Stones",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Jelling Stones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-slate-300 text-sm">
            Import the famous Jelling Stones, which tell the story of Denmark's founding and conversion to Christianity.
          </p>
          <Button
            onClick={handleImport}
            disabled={isImporting}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isImporting ? (
              <>
                <Plus className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Import Jelling Stones
              </>
            )}
          </Button>

          {importStatus === 'success' && (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle className="h-4 w-4" />
              Imported Successfully!
            </div>
          )}

          {importStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="h-4 w-4" />
              Import Failed. Please try again.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-sm">
            <div>• <strong>DR 41 (955):</strong> First use of "Denmark" on Danish soil</div>
            <div>• <strong>DR 42 (975):</strong> Denmark's unification and Christianization</div>
            <div>• <strong>Gorm & Tyra:</strong> Denmark's first royal couple</div>
            <div>• <strong>Harald Bluetooth:</strong> Unifier of the kingdom and introducer of Christianity</div>
            <div>• <strong>Historical Significance:</strong> Foundation of the Danish nation</div>
            <div>• <strong>Artistic Elements:</strong> Runes, lion, and crucified Jesus</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
