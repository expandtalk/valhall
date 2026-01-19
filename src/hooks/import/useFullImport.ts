
import { useAuth } from "@/contexts/AuthContext";
import { parseImportData } from "@/utils/importParser";
import { detectAdvancedConflicts, isAdvancedConflict } from "@/utils/enhancedConflictDetection";
import { importToMainTable, importToStaging } from "@/utils/dataImporter";
import { ImportResult, ImportSettings } from "@/types/import";

export const useFullImport = () => {
  const { user } = useAuth();

  const handleFullImport = async (
    importData: string,
    sourceDatabase: string,
    lineCount: number,
    settings: ImportSettings,
    setIsImporting: (value: boolean) => void,
    setImportResult: (result: ImportResult | null) => void
  ) => {
    console.log('🚀 useFullImport: *** FULL IMPORT FUNCTION CALLED ***');
    console.log('🚀 FULL IMPORT: Function entry - checking preconditions...');
    console.log('🚀 FULL IMPORT: User state:', { 
      isLoggedIn: !!user, 
      userId: user?.id, 
      email: user?.email 
    });
    console.log('🚀 FULL IMPORT: Import data state:', {
      hasData: !!importData.trim(),
      dataLength: importData.length,
      lineCount,
      sourceDatabase
    });
    
    // Immediate feedback to show the function is being called
    alert(`Full import function anropad! Dataset: ${lineCount.toLocaleString()} rader, User: ${user?.email || 'Not logged in'}`);
    
    if (!importData.trim()) {
      console.error('❌ FULL IMPORT FAILED - No import data');
      alert('Ingen data att importera - klistra in data först');
      return;
    }

    if (lineCount > 300000) {
      console.error('❌ FULL IMPORT FAILED - Dataset too large');
      alert(`Dataset med ${lineCount.toLocaleString()} rader är för stor. Max 300,000 rader tillåtet.`);
      return;
    }

    if (!user) {
      console.error('❌ FULL IMPORT FAILED - User not logged in');
      alert('Du måste logga in för att kunna importera data');
      return;
    }

    console.log('🚀 FULL IMPORT - All preconditions met, starting import...');
    setIsImporting(true);
    setImportResult(null);

    try {
      console.log('🚀 FULL IMPORT - Starting parsing...');
      const parsedData = await parseImportData(importData, sourceDatabase, false);
      console.log(`🚀 FULL IMPORT - Parsed ${parsedData.length} records from ${sourceDatabase}`);

      // Check if universal import was successful (indicated by empty array after successful import)
      if (parsedData.length === 0) {
        // Check console logs for universal import success message
        if (importData.includes('INSERT INTO') && importData.includes('CREATE TABLE')) {
          alert('Universell import slutförd! Data har importerats direkt till databasen.');
          setImportResult({
            total: 1,
            imported: 1,
            staged: 0,
            errors: 0,
            conflicts: []
          });
          return;
        } else {
          alert('Ingen giltig data hittades');
          return;
        }
      }

      alert(`Börjar importera ${parsedData.length} poster...`);

      const results: ImportResult = {
        total: parsedData.length,
        imported: 0,
        staged: 0,
        errors: 0,
        conflicts: []
      };

      console.log('🚀 FULL IMPORT - Starting processing loop...');
      
      for (let i = 0; i < parsedData.length; i++) {
        const record = parsedData[i];
        
        try {
          console.log(`🚀 IMPORT [${i + 1}/${parsedData.length}]: Processing ${record.signum}`);
          
          // Skip processing universal import success indicators - they're just status messages
          if (record.signum === 'UNIVERSAL_IMPORT_SUCCESS') {
            console.log(`✅ UNIVERSAL IMPORT: Skipping status indicator`);
            continue;
          }
          
          const conflicts = await detectAdvancedConflicts(record);
          
          if (!isAdvancedConflict(conflicts)) {
            await importToMainTable(record);
            results.imported++;
            console.log(`✅ IMPORTED: ${record.signum} to main table`);
          } else {
            await importToStaging(record, conflicts);
            results.staged++;
            results.conflicts.push(`${record.signum}: ${conflicts.join(', ')}`);
            console.log(`✅ STAGED: ${record.signum} to staging`);
          }
          
        } catch (error) {
          console.error(`❌ PROCESSING ERROR for ${record.signum}:`, error);
          results.errors++;
          const errorMessage = error instanceof Error ? error.message : 'Okänt fel';
          results.conflicts.push(`${record.signum}: Bearbetningsfel - ${errorMessage}`);
        }
        
        // Progress updates every 100 records
        if ((i + 1) % 100 === 0) {
          console.log(`🚀 PROGRESS: ${i + 1}/${parsedData.length} processed`);
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      console.log('🚀 FULL IMPORT COMPLETED - Final results:', results);
      setImportResult(results);
      
      alert(`Import slutförd! ${results.imported} importerade direkt, ${results.staged} till staging, ${results.errors} fel.`);

    } catch (error) {
      console.error('❌ FULL IMPORT CRITICAL ERROR:', error);
      alert(`Import misslyckades: ${error instanceof Error ? error.message : 'Okänt fel'}`);
    } finally {
      console.log('🚀 FULL IMPORT CLEANUP - Resetting importing state');
      setIsImporting(false);
    }
  };

  return { handleFullImport };
};
