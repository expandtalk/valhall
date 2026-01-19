
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { extractTablesFromSQL } from '@/utils/rundata/sqlParser';

export const useHundredImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string } | null>(null);

  const importHundreds = async (sqlData: string) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      const tables = extractTablesFromSQL(sqlData);
      const hundredTable = tables.find(t => t.name === 'hundreds');

      if (!hundredTable || hundredTable.data.length === 0) {
        throw new Error("No hundred data found in the provided SQL file. Make sure the SQL contains 'INSERT INTO `hundreds`'.");
      }

      const hundredsToInsert = hundredTable.data.map(row => ({
        external_id: row.hundredid,
        province_external_id: row.provinceid,
        division_external_id: row.divisionid,
        name: row.hundred,
      }));

      const { error } = await supabase
        .from('hundreds')
        .upsert(hundredsToInsert, { onConflict: 'external_id' });

      if (error) {
        throw error;
      }

      const message = `Successfully imported ${hundredsToInsert.length} hundreds.`;
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

  return { isImporting, importResult, importHundreds };
};
