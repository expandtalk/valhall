
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { parseFornfyndData, ParsedFornfyndEntry } from "@/utils/fornfyndParser";
import { importFornfyndEntries } from "@/utils/fornfyndImporter";
import { FornfyndImportControls } from "./FornfyndImportControls";
import { FornfyndPreview } from "./FornfyndPreview";
import { FornfyndInfoPanel } from "./FornfyndInfoPanel";

export const FornfyndSection: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [textData, setTextData] = useState('');
  const [parsedCount, setParsedCount] = useState(0);
  const [previewData, setPreviewData] = useState<ParsedFornfyndEntry[]>([]);
  const { toast } = useToast();

  const handleParseData = () => {
    if (!textData.trim()) {
      toast({
        title: "Ingen data",
        description: "Klistra in Fornfynd-data först",
        variant: "destructive"
      });
      return;
    }

    const parsed = parseFornfyndData(textData);
    setPreviewData(parsed.slice(0, 10)); // Show first 10 for preview
    setParsedCount(parsed.length);
    
    toast({
      title: "Data parsed",
      description: `Hittade ${parsed.length} runristningar att importera`,
    });
  };

  const handleImport = async () => {
    if (!textData.trim()) {
      toast({
        title: "Ingen data att importera",
        description: "Klistra in och parsa data först",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportStatus('idle');

    try {
      const parsed = parseFornfyndData(textData);
      const result = await importFornfyndEntries(parsed);

      setImportStatus('success');
      toast({
        title: "Import lyckades!",
        description: result.message,
      });

    } catch (error) {
      console.error('Detailed Fornfynd import failed:', error);
      setImportStatus('error');
      toast({
        title: "Import misslyckades",
        description: `Fel: ${error instanceof Error ? error.message : 'Okänt fel'}`,
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
          <Database className="h-5 w-5 text-blue-400" />
          <CardTitle className="text-white">4. FORNFYND IMPORT - Förbättrad parser</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Importera detaljerad data från Fornfynd med exakta SWEREF 99 TM koordinater och fullständig metadata
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <FornfyndImportControls
          textData={textData}
          onTextDataChange={setTextData}
          onParseData={handleParseData}
          onImport={handleImport}
          isImporting={isImporting}
          parsedCount={parsedCount}
          importStatus={importStatus}
        />

        <FornfyndPreview 
          previewData={previewData}
          parsedCount={parsedCount}
        />

        <FornfyndInfoPanel />
      </CardContent>
    </Card>
  );
};
