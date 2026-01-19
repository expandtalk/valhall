
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { usePlaceParishLinkImport } from '@/hooks/import/usePlaceParishLinkImport';
import { Loader2, Upload, CheckCircle, XCircle, Link2 } from 'lucide-react';

export const PlaceParishLinksImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const { isImporting, importResult, importPlaceParishLinks, setImportResult } = usePlaceParishLinkImport();

  const handleImport = () => {
    importPlaceParishLinks(sqlData);
  };

  const handleCloseResult = () => {
    setImportResult(null);
    setSqlData('');
  }

  return (
    <Card className="bg-slate-800/60 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Link2 className="h-6 w-6 text-purple-400" />
          Importera Plats-Socken Länkar
        </CardTitle>
        <CardDescription className="text-slate-300">
          Klistra in SQL `INSERT`-satser för `place_parish` från en Rundata-export.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {importResult ? (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Importresultat</h3>
            {importResult.success ? (
               <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>{importResult.message}</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-red-400">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5" />
                  <span>{importResult.message}</span>
                </div>
                <p className="text-xs text-red-300 bg-red-500/10 p-2 rounded-md">{importResult.details}</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={handleCloseResult} variant="outline" className="border-white/20 text-white hover:bg-white/5">Stäng</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-xs text-slate-400 p-4 bg-slate-900/50 rounded-md border border-slate-700">
              <h4 className="font-semibold text-slate-300 mb-2">Instruktioner</h4>
              <p>
                Detta verktyg är designat för att importera data från `INSERT INTO \`place_parish\` ...`-satser.
                Datat kopplar samman platser med församlingar (socknar), vilket är kritiskt för korrekt geografisk placering av runstenar.
              </p>
            </div>
            <div>
              <label htmlFor="place-parish-sql-input" className="block text-sm font-medium text-slate-300 mb-2">
                SQL INSERT Data
              </label>
              <Textarea
                id="place-parish-sql-input"
                placeholder="Klistra in din SQL INSERT-sats för `place_parish` här..."
                value={sqlData}
                onChange={(e) => setSqlData(e.target.value)}
                disabled={isImporting}
                className="h-60 bg-slate-900 border-slate-700 text-white font-mono"
              />
            </div>
            <div className="flex justify-end">
              <Button
                onClick={handleImport}
                disabled={isImporting || !sqlData.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importerar...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Importera Länkar
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
