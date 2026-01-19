
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';

interface ImportResult {
  success: boolean;
  message: string;
  details?: string;
}

export const useNorwegianLocalityImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const importNorwegianLocalities = async (sqlData: string) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      console.log("Starting Norwegian locality import...");
      const tables = extractTablesFromSQL(sqlData);
      const herNOTable = tables.find(t => t.name.toUpperCase() === 'HER_NO');

      if (!herNOTable || herNOTable.data.length === 0) {
        throw new Error('Ingen `her_NO` data hittades i SQL-koden.');
      }
      console.log(`Found her_NO table with ${herNOTable.data.length} rows.`);

      const recordsToInsert = herNOTable.data.map((row: any) => ({
        external_id: row['her_NOid'].startsWith("X'") ? row['her_NOid'].substring(2, row['her_NOid'].length - 1) : row['her_NOid'],
        locality: row['locality'] === 'NULL' ? null : parseInt(row['locality'], 10) || null,
      })).filter(r => r.external_id);

      if (recordsToInsert.length === 0) {
        throw new Error('Inga giltiga poster att importera hittades.');
      }
      console.log(`Prepared ${recordsToInsert.length} records for upsert.`);

      const { error, count } = await supabase
        .from('norwegian_localities')
        .upsert(recordsToInsert, { onConflict: 'external_id' });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setImportResult({ success: true, message: `${count ?? 0} norska orter importerades eller uppdaterades.` });
      console.log("Import successful.");

    } catch (error: any) {
      console.error("Import failed:", error);
      setImportResult({ success: false, message: 'Import misslyckades.', details: error.message });
    } finally {
      setIsImporting(false);
    }
  };

  return { isImporting, importResult, importNorwegianLocalities, setImportResult };
};
