
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Download, Loader2, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { JARLABANKE_STONES_INSCRIPTIONS } from "@/data/jarlabankeStonesInscriptions";
import { ImportStatusDisplay } from "./ImportStatusDisplay";

export const JarlabankeStonesSection: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleImport = async () => {
    setIsImporting(true);
    setImportStatus('idle');

    try {
      console.log('Starting import of Jarlabanke stones...');
      
      // Check for existing inscriptions
      const existingCheck = await supabase
        .from('runic_inscriptions')
        .select('signum')
        .in('signum', JARLABANKE_STONES_INSCRIPTIONS.map(i => i.signum));

      const newInscriptions = JARLABANKE_STONES_INSCRIPTIONS.filter(
        inscription => !existingCheck.data?.some(existing => existing.signum === inscription.signum)
      );

      if (newInscriptions.length === 0) {
        setImportStatus('success');
        toast({
          title: "Alla Jarlabankestenar finns redan",
          description: "Inga nya inskriptioner att importera.",
        });
        return;
      }

      const { data, error } = await supabase
        .from('runic_inscriptions')
        .insert(newInscriptions)
        .select();

      if (error) {
        console.error('Jarlabanke import error:', error);
        setImportStatus('error');
        toast({
          title: "Import misslyckades",
          description: `Fel: ${error.message}`,
          variant: "destructive"
        });
      } else {
        console.log(`Successfully imported ${data?.length || 0} Jarlabanke stones`);
        setImportStatus('success');
        toast({
          title: "Import lyckades!",
          description: `Lade till ${data?.length || 0} Jarlabankestenar`,
        });
      }
    } catch (error) {
      console.error('Jarlabanke import failed:', error);
      setImportStatus('error');
      toast({
        title: "Import misslyckades",
        description: "Ett oväntat fel inträffade",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-amber-400" />
          <CardTitle className="text-white">3. JARLABANKESTENARNA (15 runstenar)</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Jarlabanke Ingefastssons stengrupp från 1000-talet - en uppländsk stormans familjehistoria i sten
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {JARLABANKE_STONES_INSCRIPTIONS.slice(0, 9).map((inscription, index) => (
            <div key={index} className="p-3 bg-black/20 rounded border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-white font-semibold text-sm">{inscription.signum}</h4>
                  <Badge className="bg-amber-500 text-white border-0 text-xs">
                    Jarlabanke
                  </Badge>
                </div>
                <Badge className="bg-blue-500 text-white border-0 text-xs">
                  {inscription.period_start}-{inscription.period_end}
                </Badge>
              </div>
              <p className="text-slate-300 text-sm mb-2 font-mono">
                {inscription.transliteration && inscription.transliteration.length > 30 
                  ? `${inscription.transliteration.substring(0, 30)}...`
                  : inscription.transliteration || 'Fragmentarisk'}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-3 w-3" />
                {inscription.location}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {inscription.object_type}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-black/20 rounded p-4">
          <h4 className="text-white font-semibold mb-2">🏰 Jarlabanke Ingefastsson</h4>
          <p className="text-slate-300 text-sm mb-2">
            Uppländsk storman från 1000-talet som ägde stora jordegendomar i Vallentuna hundare. 
            En av de första personer från Sverige med utförliga upplysningar från inhemskt källmaterial.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div>
              <h5 className="text-amber-400 text-sm font-semibold">👑 Makt och inflytande:</h5>
              <ul className="text-slate-400 text-xs space-y-1">
                <li>• Ägde hela Täby ensam</li>
                <li>• Kontrollerade Vallentuna hundare</li>
                <li>• Byggde vägar och broar från Täby</li>
                <li>• Anlade tingsplats vid Vallentuna kyrka</li>
              </ul>
            </div>
            <div>
              <h5 className="text-amber-400 text-sm font-semibold">👨‍👩‍👧‍👦 Familjehistoria:</h5>
              <ul className="text-slate-400 text-xs space-y-1">
                <li>• Föräldrar: Ingefast Östensson & Jorun</li>
                <li>• Farmor: Estrid Sigfastsdotter</li>
                <li>• Halvbror: Häming (Ragnfrids son)</li>
                <li>• Hustru: Fastvi, son: Sven</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button 
            onClick={handleImport}
            disabled={isImporting}
            className="bg-amber-600 hover:bg-amber-700"
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importerar...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Lägg till alla 15 Jarlabankestenar
              </>
            )}
          </Button>

          <ImportStatusDisplay status={importStatus} />
        </div>
      </CardContent>
    </Card>
  );
};
