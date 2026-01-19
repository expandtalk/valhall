
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formatHexToUUID = (hex: string): string => {
  const cleanedHex = hex.replace(/[^0-9a-fA-F]/g, '');
  if (cleanedHex.length !== 32) {
    throw new Error(`Invalid hex string length for UUID: ${cleanedHex}`);
  }
  return `${cleanedHex.substring(0, 8)}-${cleanedHex.substring(8, 12)}-${cleanedHex.substring(12, 16)}-${cleanedHex.substring(16, 20)}-${cleanedHex.substring(20, 32)}`.toLowerCase();
};

const parseFragmentsSql = (sqlData: string) => {
  const links: { objectid: string; belongsto: string }[] = [];
  // Regex to find all value tuples like (X'...', X'...')
  const valueTupleRegex = /\(X'([0-9A-Fa-f]{32})',X'([0-9A-Fa-f]{32})'\)/g;
  
  let match;
  while ((match = valueTupleRegex.exec(sqlData)) !== null) {
    try {
      const objectIdHex = match[1];
      const belongsToHex = match[2];

      links.push({
        objectid: formatHexToUUID(objectIdHex),
        belongsto: formatHexToUUID(belongsToHex),
      });
    } catch (e) {
      console.warn('Skipping invalid row during parsing:', match[0], e);
    }
  }
  return links;
};

export const useFragmentsImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string; details?: string } | null>(null);

  const importFragments = async (sqlData: string) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      if (!sqlData.includes("INSERT INTO `fragments`")) {
        throw new Error("SQL data does not seem to be for `fragments` table.");
      }

      const linksToInsert = parseFragmentsSql(sqlData);

      if (linksToInsert.length === 0) {
        throw new Error("No valid fragment links found in the provided SQL data. Check format.");
      }
      
      const { error } = await supabase
        .from('fragments')
        .upsert(linksToInsert, { onConflict: 'objectid,belongsto' });

      if (error) {
        throw error;
      }

      const message = `Successfully imported/updated ${linksToInsert.length} fragment links.`;
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

  return { isImporting, importResult, importFragments, setImportResult };
};
