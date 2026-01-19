
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, Loader2, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ROMAN_IRON_AGE_INSCRIPTIONS } from "@/data/romanIronAgeInscriptions";
import { InscriptionPreviewCard } from "./InscriptionPreviewCard";
import { ImportStatusDisplay } from "./ImportStatusDisplay";

export const RomanIronAgeSection: React.FC = () => {
  const [isImportingRoman, setIsImportingRoman] = useState(false);
  const [romanImportStatus, setRomanImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleRomanImport = async () => {
    setIsImportingRoman(true);
    setRomanImportStatus('idle');

    try {
      console.log('Starting import of Roman Iron Age inscriptions...');
      
      // Check for existing inscriptions
      const existingCheck = await supabase
        .from('runic_inscriptions')
        .select('signum')
        .in('signum', ROMAN_IRON_AGE_INSCRIPTIONS.map(i => i.signum));

      const newInscriptions = ROMAN_IRON_AGE_INSCRIPTIONS.filter(
        inscription => !existingCheck.data?.some(existing => existing.signum === inscription.signum)
      );

      if (newInscriptions.length === 0) {
        setRomanImportStatus('success');
        toast({
          title: "Alla romerska järnålder-inskriptioner finns redan",
          description: "Inga nya inskriptioner att importera.",
        });
        return;
      }

      const { data, error } = await supabase
        .from('runic_inscriptions')
        .insert(newInscriptions)
        .select();

      if (error) {
        console.error('Roman import error:', error);
        setRomanImportStatus('error');
        toast({
          title: "Import misslyckades",
          description: `Fel: ${error.message}`,
          variant: "destructive"
        });
      } else {
        console.log(`Successfully imported ${data?.length || 0} Roman Iron Age inscriptions`);
        setRomanImportStatus('success');
        toast({
          title: "Import lyckades!",
          description: `Lade till ${data?.length || 0} runinskriptioner från romersk järnålder`,
        });
      }
    } catch (error) {
      console.error('Roman import failed:', error);
      setRomanImportStatus('error');
      toast({
        title: "Import misslyckades",
        description: "Ett oväntat fel inträffade",
        variant: "destructive"
      });
    } finally {
      setIsImportingRoman(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-purple-400" />
          <CardTitle className="text-white">2. ROMERSK JÄRNÅLDER (Alla 67 föremål)</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Alla 67 runfynd från romersk järnålder enligt Runenprojekt Kiel - från 0-410 e.Kr.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROMAN_IRON_AGE_INSCRIPTIONS.slice(0, 9).map((inscription, index) => (
            <div key={index} className="p-3 bg-black/20 rounded border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-semibold text-sm">{inscription.signum}</h4>
                  <Badge className="bg-purple-500 text-white border-0 text-xs">
                    RJÅ
                  </Badge>
                </div>
                <Badge className="bg-orange-500 text-white border-0 text-xs">
                  {inscription.period_start}-{inscription.period_end}
                </Badge>
              </div>
              <p className="text-slate-300 text-sm mb-2 font-mono">
                {inscription.transliteration.length > 30 
                  ? `${inscription.transliteration.substring(0, 30)}...`
                  : inscription.transliteration}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-3 w-3" />
                {inscription.location}, {inscription.country}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {inscription.object_type}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-black/20 rounded p-4">
          <h4 className="text-white font-semibold mb-2">📚 Omfattande forskningsdata</h4>
          <p className="text-slate-300 text-sm mb-2">
            Nu med alla 67 föremål från romersk järnålder! Inkluderar fynd från hela Europa: 
            Sverige, Norge, Danmark, Tyskland, Polen, Ukraina och Nederländerna.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <h5 className="text-amber-400 text-sm font-semibold">🌟 Framstående fynd:</h5>
              <ul className="text-slate-400 text-xs space-y-1">
                <li>• KJ 07: Vimose-kammen (harja, 140-160) - världens äldsta</li>
                <li>• KJ 12: Thorsberg doppsko - komplex tvåradig inskrift</li>
                <li>• KJ 21: Tune-stenen - tidig runstenstext</li>
                <li>• KJ 64: Nydam yxskaft - magisk formel</li>
              </ul>
            </div>
            <div>
              <h5 className="text-amber-400 text-sm font-semibold">🗺️ Geografisk spridning:</h5>
              <ul className="text-slate-400 text-xs space-y-1">
                <li>• Danmark: 35 fynd (Illerup, Vimose, Nydam)</li>
                <li>• Norge: 12 fynd (Tune, Einang, Øvre Stabu)</li>
                <li>• Sverige: 8 fynd (Mos, Dragby, Gårdlösa)</li>
                <li>• Tyskland: 6 fynd + övriga Europa: 6 fynd</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button 
            onClick={handleRomanImport}
            disabled={isImportingRoman}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isImportingRoman ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importerar...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Lägg till alla 67 romerska järnålder-fynd
              </>
            )}
          </Button>

          <ImportStatusDisplay status={romanImportStatus} />
        </div>
      </CardContent>
    </Card>
  );
};
