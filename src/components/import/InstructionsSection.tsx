
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export const InstructionsSection: React.FC = () => {
  return (
    <Card className="bg-white/5 backdrop-blur-md border-white/10">
      <CardContent className="p-6">
        <h3 className="text-white font-semibold mb-3">🎯 Så här kommer du igång:</h3>
        <div className="space-y-2 text-slate-300 text-sm">
          <div><strong>Steg 1:</strong> Klicka "Lägg till (4 utvalda inskriptioner)" för snabbstart</div>
          <div><strong>Steg 2:</strong> Klicka "Lägg till alla 67 romerska järnålder-fynd" för historiska data</div>
          <div><strong>Steg 3:</strong> Klicka "Lägg till alla 15 Jarlabankestenar" för Jarlabankes familjehistoria</div>
          <div><strong>Steg 4:</strong> Klicka "Lägg till Jellingestenarna" för Danmarks kungliga historia</div>
          <div><strong>Steg 5:</strong> Använd "Fornfynd Import" för massimport av upp till 2719 runristningar</div>
          <div><strong>Steg 6:</strong> Gå tillbaka till "Runic Explorer" fliken och utforska!</div>
        </div>
        
        <h4 className="text-white font-semibold mt-4 mb-2">🆕 Nya funktioner:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-sm">
          <div>• <strong>Detaljvy:</strong> Expanderbara kort med mer information</div>
          <div>• <strong>Komplexitetsmarkeringar:</strong> Visar enkla vs komplexa inskriptioner</div>
          <div>• <strong>Familjegrupper:</strong> Jarlabankestenar som sammanhängande samling</div>
          <div>• <strong>Kungliga runstenar:</strong> Jellingestenarna - Danmarks grundande</div>
          <div>• <strong>Forskningskontext:</strong> Historisk bakgrund och analys</div>
          <div>• <strong>Romersk järnålder:</strong> De äldsta runfynden (0-400 e.Kr.)</div>
          <div>• <strong>Massimport:</strong> Fornfynd-integration för 2719 runristningar</div>
        </div>

        <h4 className="text-white font-semibold mt-4 mb-2">👑 Jellingestenarna:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-sm">
          <div>• <strong>DR 41 (955):</strong> Första "Danmark" på dansk mark</div>
          <div>• <strong>DR 42 (975):</strong> Danmarks enande och kristnande</div>
          <div>• <strong>Gorm & Tyra:</strong> Danmarks första kungliga par</div>
          <div>• <strong>Harald Blåtand:</strong> Enare av riket och introducerare av kristendomen</div>
          <div>• <strong>Historisk betydelse:</strong> Grundandet av den danska nationen</div>
          <div>• <strong>Konstnärliga element:</strong> Runor, lejon och korsfäst Jesus</div>
        </div>

        <h4 className="text-white font-semibold mt-4 mb-2">🗃️ Fornfynd-import:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 text-sm">
          <div>• <strong>Strukturerad data:</strong> Automatisk parsing av Fornfynd-format</div>
          <div>• <strong>Geografisk mappning:</strong> Län, kommun, landskap, socken</div>
          <div>• <strong>Antikvarisk klassificering:</strong> Fornlämning, Övrig kulturhistorisk lämning</div>
          <div>• <strong>RAA-integration:</strong> Riksantikvarieämbetets referensnummer</div>
          <div>• <strong>Duplikatskydd:</strong> Intelligent kontroll av befintliga poster</div>
          <div>• <strong>Batchimport:</strong> Effektiv hantering av stora datamängder</div>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/10 rounded border border-yellow-500/20">
          <p className="text-yellow-200 text-sm">
            <strong>👑 Jellingestenarna:</strong> Nu kan du lägga till Danmarks mest berömda runstenar! 
            Dessa kungliga monument berättar historien om Danmarks grundande, första användningen av namnet "Danmark" 
            och konverteringen till kristendomen under Harald Blåtand.
          </p>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 rounded border border-blue-500/20">
          <p className="text-blue-200 text-sm">
            <strong>💾 Fornfynd-integration:</strong> Systemet kan nu hantera massimport från Fornfynds 2719 runristningar! 
            Klistra in textdata och systemet parsar automatiskt geografisk information, lämningsnummer och klassificeringar.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
