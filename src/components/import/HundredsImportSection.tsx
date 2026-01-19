
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useHundredImport } from '@/hooks/import/useHundredImport';
import { Landmark, Loader2 } from 'lucide-react';

export const HundredsImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const { isImporting, importResult, importHundreds } = useHundredImport();

  const handleImport = () => {
    if (sqlData.trim()) {
      importHundreds(sqlData);
    }
  };

  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Landmark className="h-5 w-5" />
          Importera Härader (Hundreds)
        </CardTitle>
        <CardDescription className="text-slate-400">
          Klistra in SQL-data för svenska härader (`hundreds`) för att importera dem till databasen.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Klistra in SQL-data här..."
          value={sqlData}
          onChange={(e) => setSqlData(e.target.value)}
          className="min-h-[200px] bg-slate-800 border-slate-600 text-white font-mono"
          disabled={isImporting}
        />
        <Button onClick={handleImport} disabled={isImporting || !sqlData.trim()}>
          {isImporting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Importerar...
            </>
          ) : 'Starta Import'}
        </Button>

        {isImporting && (
           <div className="flex items-center gap-2 p-4 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
             <Loader2 className="h-5 w-5 animate-spin" />
             <span>Importerar härader, detta kan ta en stund...</span>
           </div>
        )}

        {importResult && !isImporting && (
          <div className={`p-4 rounded-md border ${importResult.success ? 'bg-green-900/20 border-green-500/30 text-green-300' : 'bg-red-900/20 border-red-500/30 text-red-300'}`}>
            <h4 className="font-semibold mb-2">{importResult.success ? 'Import Lyckades' : 'Import Misslyckades'}</h4>
            <p className="text-sm">{importResult.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
