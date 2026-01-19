
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';

interface ImportResult {
  success: boolean;
  message: string;
  details?: string;
}

const cleanBinaryId = (id: string | null): string | null => {
    if (id && id.startsWith("X'")) {
        return id.substring(2, id.length - 1);
    }
    return id;
};

export const useSwedishLocalityImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const importSwedishLocalities = async (sqlData: string) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      console.log("Starting Swedish locality import...");
      const tables = extractTablesFromSQL(sqlData);
      const herSETable = tables.find(t => t.name.toUpperCase() === 'HER_SE');

      if (!herSETable || herSETable.data.length === 0) {
        throw new Error('Ingen `her_SE` data hittades i SQL-koden.');
      }
      console.log(`Found her_SE table with ${herSETable.data.length} rows.`);

      const recordsToInsert = herSETable.data.map((row: any) => ({
        external_id: cleanBinaryId(row['her_SEid']),
        parish_external_id: cleanBinaryId(row['her_SEparishid']),
        raa_number: row['raänr'] === 'NULL' ? null : row['raänr'],
        fmis_id: row['fmisid'] === 'NULL' ? null : parseInt(row['fmisid'], 10) || null,
        kmr_id: cleanBinaryId(row['kmrid'] === 'NULL' ? null : row['kmrid']),
      })).filter(r => r.external_id && r.parish_external_id);

      if (recordsToInsert.length === 0) {
        throw new Error('Inga giltiga poster att importera hittades.');
      }
      console.log(`Prepared ${recordsToInsert.length} records for upsert.`);

      const { error, count } = await supabase
        .from('swedish_localities')
        .upsert(recordsToInsert, { onConflict: 'external_id' });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      setImportResult({ success: true, message: `${count ?? 0} svenska orter importerades eller uppdaterades.` });
      console.log("Import successful.");

    } catch (error: any) {
      console.error("Import failed:", error);
      setImportResult({ success: false, message: 'Import misslyckades.', details: error.message });
    } finally {
      setIsImporting(false);
    }
  };

  return { isImporting, importResult, importSwedishLocalities, setImportResult };
};
