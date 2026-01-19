
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { useBulkImport } from "@/hooks/useBulkImport";
import { BulkImportProgress } from "./BulkImportProgress";
import { BulkImportResults } from "./BulkImportResults";
import { BulkImportInfo } from "./BulkImportInfo";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const BulkRunicImport: React.FC = () => {
  const {
    importData,
    setImportData,
    isImporting,
    progress,
    result,
    currentStatus,
    filteredLines,
    validLines,
    handleBulkImport
  } = useBulkImport();

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-purple-400" />
          <CardTitle className="text-white">Bulk Import - Alla Runor</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Importera stora mängder runinskriptioner från Rundata eller NIyR format. 
          SQL-kommandon filtreras automatiskt bort.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Import Data
            </label>
            <Textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Klistra in din import data här..."
              className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder-white/50"
              disabled={isImporting}
            />
          </div>

          {validLines > 0 && (
            <div className="text-sm text-slate-300">
              <span className="text-green-400">{validLines} giltiga rader</span>
              {filteredLines > 0 && (
                <span className="text-yellow-400"> • {filteredLines} SQL-rader filtrerade bort</span>
              )}
            </div>
          )}

          <Button
            onClick={handleBulkImport}
            disabled={isImporting || !importData.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {isImporting ? 'Importerar...' : 'Starta Import'}
          </Button>
        </div>

        <BulkImportProgress
          isImporting={isImporting}
          currentStatus={currentStatus}
          progress={progress}
        />

        <BulkImportResults result={result} />

        <BulkImportInfo />
      </CardContent>
    </Card>
  );
};
