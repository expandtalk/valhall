
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';

export const useParishImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null);

  const importParishes = async (sqlData: string) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      const tables = extractTablesFromSQL(sqlData);
      const parishTable = tables.find(t => t.name === 'her_SE_parishes');

      if (!parishTable || parishTable.data.length === 0) {
        throw new Error("No parish data found in the provided SQL file. Make sure the SQL contains 'INSERT INTO `her_SE_parishes`'.");
      }

      const parishesToInsert = parishTable.data.map(row => ({
        external_id: row.her_SEparishid,
        code: row.parishcode,
        name: row.raäparish,
      }));

      const { error } = await supabase
        .from('parishes')
        .upsert(parishesToInsert, { onConflict: 'external_id' });

      if (error) {
        throw error;
      }

      const message = `Successfully imported ${parishesToInsert.length} parishes.`;
      setImportResult({ success: true, message });
      toast({
        title: "Import Successful",
        description: message,
      });

    } catch (error) {
      const message = `Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(message, error);
      setImportResult({ success: false, message });
      toast({
        title: "Import Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  return { isImporting, importResult, importParishes };
};
