
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { InscriptionPreviewCard } from "./InscriptionPreviewCard";
import { ImportStatusDisplay } from "./ImportStatusDisplay";

// Updated list removing Rök stone (Ög 136) since it's already in system
const CURATED_INSCRIPTIONS = [
  {
    signum: "U 11",
    transliteration: "kuþmuntr × karþi × bru × þesi × aft × þurlef × faþur × sin × han × uas × burini × i × þer(u)× i × barþr",
    normalization: "Guðmundr gerði brú þessa ept Þórleif, faður sinn. Hann vas borinn í Þeru í Bardi.",
    translation_en: "Gudmund made this bridge after Thorleif, his father. He was born in Theru in Bardi.",
    translation_sv: "Gudmund gjorde denna bro efter Torleif, sin fader. Han var född i Theru i Bardi.",
    location: "Orkesta kyrka",
    parish: "Orkesta",
    municipality: "Vallentuna kommun",
    county: "Stockholms län",
    province: "Uppland",
    country: "Sweden",
    period_start: 1000,
    period_end: 1100,
    dating_text: "1000-1100",
    object_type: "Runsten",
    material: "Granit",
    complexity_level: "complex",
    historical_context: "Brobyggnadssten som visar kristet inflytande och kontakter med England.",
    scholarly_notes: "Nämner plats i England, visar viktingatidens internationella kontakter.",
    data_source: "curated_collection"
  },
  {
    signum: "Sö 158",
    transliteration: "holmkiʀ × lit × raisa × staina × þosa × at × faur × sin × saʀ × uarþ × dauþʀ × i × holmlonþi",
    normalization: "Holmgæiʀ lét reisa steina þessa at Faur, son sinn, saʀ varð dauðr í Holmlandi.",
    translation_en: "Holmger had these stones raised in memory of Faur, his son, who died in Holmland.",
    translation_sv: "Holmger lät resa dessa stenar efter Faur, sin son, som dog i Holmland.",
    location: "Ramsund",
    parish: "Jäder",
    municipality: "Eskilstuna kommun",
    county: "Södermanlands län",
    province: "Södermanland", 
    country: "Sweden",
    period_start: 1000,
    period_end: 1100,
    dating_text: "1000-1100",
    object_type: "Runhäll",
    material: "Berg",
    complexity_level: "complex",
    historical_context: "Världsberömd runhäll med Sigurdsristningen som visar Volsungasagan.",
    scholarly_notes: "Visar Sigurd Fafnesbane, Regin och draken Fafner. En av Sveriges mest kända runinskrifter.",
    data_source: "curated_collection"
  },
  {
    signum: "Sö 101",
    transliteration: "tuka × lit × raisa × stain × þonsi × at × þorfast × faþur × sin × auk × at × kybiarþ × bruþur × sin",
    normalization: "Tóka lét reisa stein þenna at Þórfast, faður sinn, ok at Gýbjǫrn, bróður sinn.",
    translation_en: "Toka had this stone raised in memory of Thorfast, his father, and in memory of Gybjorn, his brother.",
    translation_sv: "Toke lät resa denna sten efter Torfast, sin fader, och efter Gybjörn, sin broder.",
    location: "Ramsundsberget",
    parish: "Jäder", 
    municipality: "Eskilstuna kommun",
    county: "Södermanlands län",
    province: "Södermanland",
    country: "Sweden",
    period_start: 1000,
    period_end: 1100,
    dating_text: "1000-1100",
    object_type: "Runhäll",
    material: "Berg",
    complexity_level: "simple",
    historical_context: "Del av Ramsundsristningen, en av Sveriges mest betydelsefulla runinskrifter.",
    scholarly_notes: "Komplement till Sö 158 på samma berghäll med Sigurdsristningen.",
    data_source: "curated_collection"
  },
  {
    signum: "U 489",
    transliteration: "þorkil × auk × sloti × litu × raisa × stain × þansi × at × þara × faþur × þurkair × han × uas × kuþr × þrain",
    normalization: "Þorkell ok Slóði létu reisa stein þenna at Þórgæir, faður þeira. Hann vas goðr þegn.",
    translation_en: "Thorkel and Slode had this stone raised in memory of Thorgair, their father. He was a good thane.",
    translation_sv: "Torkel och Slode lät resa denna sten efter Torgöt, sin fader. Han var en god teg.",
    location: "Harg",
    parish: "Skånela",
    municipality: "Sigtuna kommun", 
    county: "Stockholms län",
    province: "Uppland",
    country: "Sweden",
    period_start: 1000,
    period_end: 1100,
    dating_text: "1000-1100",
    object_type: "Runsten",
    material: "Granit",
    complexity_level: "simple",
    historical_context: "Visar social hierarki genom termen 'goðr þegn' (god teg).",
    scholarly_notes: "Exempel på runstensformel som betonar den dödes goda egenskaper.",
    data_source: "curated_collection"
  }
];

export const QuickStartSection: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleQuickStart = async () => {
    setIsImporting(true);
    setImportStatus('idle');

    try {
      console.log('Starting import of curated inscriptions...');
      
      // Check for existing inscriptions
      const existingCheck = await supabase
        .from('runic_inscriptions')
        .select('signum')
        .in('signum', CURATED_INSCRIPTIONS.map(i => i.signum));

      if (existingCheck.data && existingCheck.data.length > 0) {
        const existingSigma = existingCheck.data.map(r => r.signum).join(', ');
        toast({
          title: "Några inskriptioner finns redan",
          description: `Följande finns redan: ${existingSigma}. Hoppar över duplikater.`,
        });
        
        const newInscriptions = CURATED_INSCRIPTIONS.filter(
          inscription => !existingCheck.data.some(existing => existing.signum === inscription.signum)
        );
        
        if (newInscriptions.length === 0) {
          setImportStatus('success');
          toast({
            title: "Alla inskriptioner finns redan",
            description: "Inga nya inskriptioner att importera.",
          });
          return;
        }
        
        const { data, error } = await supabase
          .from('runic_inscriptions')
          .insert(newInscriptions)
          .select();

        if (error) {
          console.error('Import error:', error);
          setImportStatus('error');
          toast({
            title: "Import misslyckades",
            description: `Fel: ${error.message}`,
            variant: "destructive"
          });
        } else {
          setImportStatus('success');
          toast({
            title: "Import lyckades!",
            description: `Lade till ${newInscriptions.length} nya runinskriptioner`,
          });
        }
      } else {
        const { data, error } = await supabase
          .from('runic_inscriptions')
          .insert(CURATED_INSCRIPTIONS)
          .select();

        if (error) {
          console.error('Import error:', error);
          setImportStatus('error');
          toast({
            title: "Import misslyckades",
            description: `Fel: ${error.message}`,
            variant: "destructive"
          });
        } else {
          console.log(`Successfully imported ${data?.length || 0} inscriptions`);
          setImportStatus('success');
          toast({
            title: "Import lyckades!",
            description: `Lade till ${data?.length || 0} utvalda runinskriptioner`,
          });
        }
      }
    } catch (error) {
      console.error('Import failed:', error);
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
          <CheckCircle className="h-5 w-5 text-green-400" />
          <CardTitle className="text-white">1. SNABBSTART (Utvalda runinskrifter)</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          4 välkända runinskriptioner med detaljerad information - inklusive Ramsundsristningen!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURATED_INSCRIPTIONS.map((inscription, index) => (
            <InscriptionPreviewCard
              key={index}
              inscription={inscription}
              showSpecialNote={inscription.signum === "Sö 158"}
              specialNote="⭐ Världsberömd Sigurdsristning med Volsungasagan!"
            />
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button 
            onClick={handleQuickStart}
            disabled={isImporting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isImporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importerar...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Lägg till (4 utvalda inskriptioner)
              </>
            )}
          </Button>

          <ImportStatusDisplay status={importStatus} />
        </div>
      </CardContent>
    </Card>
  );
};
