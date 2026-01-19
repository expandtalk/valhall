
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { importCrossCrossformData, previewCrossCrossformConversion } from "@/utils/import/crossCrossformImporter";
import { CrossCrossformHeader } from './cross-crossform/CrossCrossformHeader';
import { CrossCrossformDataInput } from './cross-crossform/CrossCrossformDataInput';
import { CrossCrossformInfoPanel } from './cross-crossform/CrossCrossformInfoPanel';
import { CrossCrossformActionButtons } from './cross-crossform/CrossCrossformActionButtons';
import { CrossCrossformResultDisplay } from './cross-crossform/CrossCrossformResultDisplay';
import { CrossCrossformUsageInfo } from './cross-crossform/CrossCrossformUsageInfo';

export const CrossCrossformImportSection: React.FC = () => {
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; count: number; error?: string } | null>(null);
  
  const { toast } = useToast();
  
  const lineCount = importData.split('\n').filter(line => line.trim()).length;
  const hasData = importData.trim().length > 0;
  
  const handlePreview = () => {
    if (!hasData) {
      toast({
        title: "Ingen data",
        description: "Klistra in MySQL-data först",
        variant: "destructive"
      });
      return;
    }
    
    try {
      previewCrossCrossformConversion(importData);
      toast({
        title: "Preview genererad",
        description: "Kolla konsolen för förhandsvisning av konverteringen"
      });
    } catch (error) {
      toast({
        title: "Preview misslyckades",
        description: error instanceof Error ? error.message : "Okänt fel",
        variant: "destructive"
      });
    }
  };
  
  const handleImport = async () => {
    if (!hasData) {
      toast({
        title: "Ingen data",
        description: "Klistra in MySQL-data först",
        variant: "destructive"
      });
      return;
    }
    
    setIsImporting(true);
    setImportResult(null);
    
    try {
      await importCrossCrossformData(importData);
      
      const successResult = { success: true, count: 0 };
      setImportResult(successResult);
      
      toast({
        title: "Import slutförd!",
        description: "Cross-crossform data har importerats framgångsrikt"
      });
      
    } catch (error) {
      const errorResult = { 
        success: false, 
        count: 0, 
        error: error instanceof Error ? error.message : "Okänt fel" 
      };
      setImportResult(errorResult);
      
      toast({
        title: "Import misslyckades",
        description: error instanceof Error ? error.message : "Okänt fel",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CrossCrossformHeader />
      
      <CardContent className="space-y-4">
        <CrossCrossformDataInput
          importData={importData}
          onChange={setImportData}
          isImporting={isImporting}
          lineCount={lineCount}
        />
        
        <CrossCrossformInfoPanel />
        
        <CrossCrossformActionButtons
          hasData={hasData}
          isImporting={isImporting}
          onPreview={handlePreview}
          onImport={handleImport}
        />
        
        <CrossCrossformResultDisplay importResult={importResult} />
        
        <CrossCrossformUsageInfo />
      </CardContent>
    </Card>
  );
};
