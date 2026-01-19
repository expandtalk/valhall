
import { parseImportData } from "@/utils/importParser";
import { detectAdvancedConflicts, isAdvancedConflict } from "@/utils/enhancedConflictDetection";
import { ImportResult, ImportSettings } from "@/types/import";

export const useTestImport = () => {
  const handleTestImport = async (
    importData: string,
    sourceDatabase: string,
    lineCount: number,
    settings: ImportSettings,
    setIsImporting: (value: boolean) => void,
    setImportResult: (result: ImportResult | null) => void
  ) => {
    console.log('🔧 useTestImport: *** TEST FUNCTION CALLED ***');
    console.log('🔧 TEST: Function entry - checking preconditions...');
    
    // Immediate feedback to show the function is being called
    alert(`Test function anropad! Dataset: ${lineCount.toLocaleString()} rader`);
    
    if (!importData.trim()) {
      console.error('❌ TEST FAILED - No import data');
      alert('Ingen data att testa - klistra in data först');
      return;
    }

    console.log('🔧 TEST - Data validation passed, starting test...');
    setIsImporting(true);
    setImportResult(null);

    try {
      // For very large datasets, limit test to first 1000 lines
      const testData = lineCount > 100000 
        ? importData.split('\n').slice(0, 1000).join('\n')
        : importData;
        
      console.log(`🔧 TEST - Using ${lineCount > 100000 ? 'limited' : 'full'} dataset for testing`);
      
      const parsedData = await parseImportData(testData, sourceDatabase, true);
      console.log(`🔧 TEST - Parsed ${parsedData.length} records from ${sourceDatabase}`);

      // Check if universal import was successful (indicated by empty array after successful import)
      if (parsedData.length === 0) {
        if (importData.includes('INSERT INTO') && importData.includes('CREATE TABLE')) {
          alert('Universell import har redan skett! Data har importerats direkt till databasen. Testen visar att importen redan är slutförd.');
          setImportResult({
            total: 1,
            imported: 1,
            staged: 0,
            errors: 0,
            conflicts: []
          });
          return;
        } else {
          alert('Ingen giltig data hittades - kontrollera formatet');
          return;
        }
      }

      // Test more records to give better overview
      const testRecords = parsedData.slice(0, Math.min(50, parsedData.length));
      console.log(`🔧 TEST - Testing ${testRecords.length} records`);
      
      alert(`Börjar testa ${testRecords.length} poster...`);
      
      const results: ImportResult = {
        total: testRecords.length,
        imported: 0,
        staged: 0,
        errors: 0,
        conflicts: []
      };

      for (let i = 0; i < testRecords.length; i++) {
        const record = testRecords[i];
        console.log(`🔧 TEST [${i+1}/${testRecords.length}]: Testing ${record.signum}`);
        
        try {
          const conflicts = await detectAdvancedConflicts(record);
          
          if (!isAdvancedConflict(conflicts)) {
            results.imported++;
            console.log(`✅ TEST: ${record.signum} would be imported directly to main table`);
          } else {
            results.staged++;
            results.conflicts.push(`${record.signum}: ${conflicts.join(', ')}`);
            console.log(`⚠️ TEST: ${record.signum} would go to staging due to: ${conflicts.join(', ')}`);
          }
        } catch (error) {
          console.error(`❌ TEST ERROR for ${record.signum}:`, error);
          results.errors++;
          results.conflicts.push(`${record.signum}: Test error - ${error instanceof Error ? error.message : 'Okänt fel'}`);
        }
      }

      console.log('🔧 TEST COMPLETED - Results:', results);
      setImportResult(results);
      
      // More detailed feedback about what the test means
      const message = `Test slutförd! 

📊 Testresultat för ${results.total} poster:
• ${results.imported} skulle importeras direkt till huvuddatabasen
• ${results.staged} skulle gå till staging för manuell granskning  
• ${results.errors} fel upptäcktes

💡 OBS: Detta var bara en TEST - ingen data har sparats ännu. 
${results.imported > 0 ? 'Klicka på "Kör Full Import" för att faktiskt spara data.' : ''}`;

      alert(message);

    } catch (error) {
      console.error('❌ TEST CRITICAL ERROR:', error);
      alert(`Test misslyckades: ${error instanceof Error ? error.message : 'Okänt fel'}`);
    } finally {
      console.log('🔧 TEST CLEANUP - Resetting importing state');
      setIsImporting(false);
    }
  };

  return { handleTestImport };
};
