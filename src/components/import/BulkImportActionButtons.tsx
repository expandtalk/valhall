
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Loader2, AlertTriangle } from "lucide-react";

interface BulkImportActionButtonsProps {
  isImporting: boolean;
  importData: string;
  lineCount: number;
  onTestImport: () => void;
  onFullImport: () => void;
}

export const BulkImportActionButtons: React.FC<BulkImportActionButtonsProps> = ({
  isImporting,
  importData,
  lineCount,
  onTestImport,
  onFullImport
}) => {
  const handleTestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔧 TEST BUTTON CLICKED - Event triggered');
    console.log('🔧 TEST BUTTON - Current state:', {
      isImporting,
      hasImportData: !!importData.trim(),
      lineCount,
      onTestImport: typeof onTestImport
    });
    
    if (typeof onTestImport !== 'function') {
      console.error('❌ onTestImport is not a function!', onTestImport);
      alert('Fel: onTestImport är inte en funktion');
      return;
    }
    
    try {
      console.log('🔧 TEST BUTTON - Calling onTestImport...');
      onTestImport();
      console.log('🔧 TEST BUTTON - onTestImport called successfully');
    } catch (error) {
      console.error('❌ TEST BUTTON ERROR:', error);
      alert(`Fel vid test: ${error instanceof Error ? error.message : 'Okänt fel'}`);
    }
  };

  const handleFullImportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🚀 FULL IMPORT BUTTON CLICKED - Event triggered');
    console.log('🚀 FULL IMPORT BUTTON - Current state:', {
      isImporting,
      hasImportData: !!importData.trim(),
      lineCount,
      maxLineLimit: lineCount > 300000,
      onFullImport: typeof onFullImport
    });
    
    if (typeof onFullImport !== 'function') {
      console.error('❌ onFullImport is not a function!', onFullImport);
      alert('Fel: onFullImport är inte en funktion');
      return;
    }
    
    try {
      console.log('🚀 FULL IMPORT BUTTON - Calling onFullImport...');
      onFullImport();
      console.log('🚀 FULL IMPORT BUTTON - onFullImport called successfully');
    } catch (error) {
      console.error('❌ FULL IMPORT BUTTON ERROR:', error);
      alert(`Fel vid import: ${error instanceof Error ? error.message : 'Okänt fel'}`);
    }
  };

  return (
    <div className="flex gap-3 relative z-50" style={{ pointerEvents: 'auto' }}>
      <Button 
        onClick={handleTestClick}
        disabled={isImporting || !importData.trim()}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 relative z-10"
        type="button"
        style={{ pointerEvents: 'auto' }}
      >
        {isImporting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Testar...
          </>
        ) : (
          <>
            <AlertTriangle className="h-4 w-4 mr-2" />
            Testa Signum-validering ({lineCount > 100000 ? 'begränsad' : 'normal'})
          </>
        )}
      </Button>

      <Button 
        onClick={handleFullImportClick}
        disabled={isImporting || !importData.trim() || lineCount > 300000}
        variant="outline"
        className="bg-green-600/20 hover:bg-green-600/30 border-green-500/50 text-green-300 disabled:opacity-50 relative z-10"
        type="button"
        style={{ pointerEvents: 'auto' }}
      >
        {isImporting ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Importerar...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Fullständig Import
          </>
        )}
      </Button>
    </div>
  );
};
