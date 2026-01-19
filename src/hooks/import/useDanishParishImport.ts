
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';

interface ImportResult {
  success: boolean;
  message: string;
  details?: string;
}

export const useDanishParishImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const importDanishParishes = async (sqlData: string) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      console.log("Starting Danish parish import...");
      const tables = extractTablesFromSQL(sqlData);
      const herDKTable = tables.find(t => t.name.toLowerCase() === 'her_dk');

      if (!herDKTable || herDKTable.data.length === 0) {
        throw new Error('Ingen `her_DK` data hittades i SQL-koden.');
      }
      console.log(`Found her_DK table with ${herDKTable.data.length} rows.`);

      const recordsToInsert = herDKTable.data.map((row: any) => {
        const rawFofmParish = row['fofmparish'];
        const rawLocality = row['locality'];

        return {
          external_id: row['her_DKid'],
          parish_code: row['parishcode'],
          fofm_parish: rawFofmParish === 'NULL' ? null : rawFofmParish,
          locality: rawLocality === 'NULL' ? null : parseInt(rawLocality, 10) || null
        };
      }).filter(r => r.external_id);

      if (recordsToInsert.length === 0) {
        throw new Error('Inga giltiga poster att importera hittades.');
      }
      console.log(`Prepared ${recordsToInsert.length} records for upsert.`);

      const { data, error, count } = await supabase
        .from('danish_parishes')
        .upsert(recordsToInsert, { onConflict: 'external_id' });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setImportResult({ success: true, message: `${count ?? 0} danska socknar importerades eller uppdaterades.` });
      console.log("Import successful.");

    } catch (error: any) {
      console.error("Import failed:", error);
      setImportResult({ success: false, message: 'Import misslyckades.', details: error.message });
    } finally {
      setIsImporting(false);
    }
  };

  return { isImporting, importResult, importDanishParishes, setImportResult };
};
