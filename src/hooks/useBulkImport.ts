
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { parseImportData } from "@/utils/importParser";
import { detectConflicts, isSimpleConflict } from "@/utils/conflictDetection";
import { importToMainTable, importToStaging } from "@/utils/dataImporter";
import { ImportResult } from "@/types/import";

export const useBulkImport = () => {
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [currentStatus, setCurrentStatus] = useState('');
  const [filteredLines, setFilteredLines] = useState(0);
  const [validLines, setValidLines] = useState(0);
  const { toast } = useToast();

  // Calculate valid lines when importData changes
  useEffect(() => {
    if (importData.trim()) {
      try {
        const lines = importData.split('\n').filter(line => line.trim());
        
        // Count SQL-like lines
        const sqlLines = lines.filter(line => {
          const trimmed = line.trim().toUpperCase();
          return trimmed.startsWith('CREATE') || trimmed.startsWith('INSERT') || 
                 trimmed.startsWith('--') || trimmed.startsWith('/*') ||
                 trimmed.includes('VARCHAR') || trimmed.includes('UUID') ||
                 trimmed === ';' || trimmed === 'GO';
        });
        
        setFilteredLines(sqlLines.length);
        setValidLines(lines.length - sqlLines.length);
      } catch (error) {
        console.error('Error calculating lines:', error);
        setFilteredLines(0);
        setValidLines(0);
      }
    } else {
      setFilteredLines(0);
      setValidLines(0);
    }
  }, [importData]);

  const handleBulkImport = async () => {
    if (!importData.trim()) {
      toast({
        title: "Ingen data",
        description: "Klistra in importdata först",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setProgress(0);
    setResult(null);
    
    try {
      setCurrentStatus('Parsear data och filtrerar SQL-kommandon...');
      
      const records = await parseImportData(importData, 'Rundata');
      console.log(`Parsed ${records.length} records`);
      
      if (records.length === 0) {
        throw new Error('Ingen giltig rundata hittades. Kontrollera att data är i rätt format.');
      }

      const result: ImportResult = {
        total: records.length,
        imported: 0,
        staged: 0,
        errors: 0,
        conflicts: []
      };

      setCurrentStatus(`Bearbetar ${records.length} inskriptioner...`);

      for (let i = 0; i < records.length; i++) {
        const record = records[i];
        setProgress((i / records.length) * 100);
        setCurrentStatus(`Bearbetar ${record.signum || `record ${i+1}`} (${i + 1}/${records.length})`);

        try {
          const conflicts = await detectConflicts(record);
          
          if (conflicts.length === 0 || (conflicts.length === 1 && isSimpleConflict(conflicts))) {
            await importToMainTable(record);
            result.imported++;
          } else {
            await importToStaging(record, conflicts);
            result.staged++;
            result.conflicts.push(...conflicts);
          }
        } catch (error) {
          console.error(`Fel vid import av ${record.signum}:`, error);
          result.errors++;
        }

        // Add small delay every 10 records to prevent overwhelming the system
        if (i % 10 === 0 && i > 0) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      setProgress(100);
      setCurrentStatus('Import klar!');
      setResult(result);

      toast({
        title: "Import slutförd!",
        description: `${result.imported} importerade, ${result.staged} till staging, ${result.errors} fel`,
      });

    } catch (error) {
      console.error('Bulk import fel:', error);
      setCurrentStatus('Import misslyckades');
      toast({
        title: "Import misslyckades",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return {
    importData,
    setImportData,
    isImporting,
    progress,
    result,
    currentStatus,
    filteredLines,
    validLines,
    handleBulkImport
  };
};
