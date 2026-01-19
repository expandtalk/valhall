
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

const parsePlaceParishSql = (sqlData: string) => {
  const links: { place_id: string; parish_external_id: string; is_current: boolean }[] = [];
  // Regex to find all value tuples like (X'...', X'...', X'...', 1)
  const valueTupleRegex = /\(X'[0-9A-Fa-f]{32}',X'([0-9A-Fa-f]{32})',X'([0-9A-Fa-f]{32})',([01])\)/g;
  
  let match;
  while ((match = valueTupleRegex.exec(sqlData)) !== null) {
    try {
      // match[1] is placeid, match[2] is parishid, from the provided SQL
      const placeIdHex = match[1];
      const parishIdHex = match[2];
      const isCurrentFlag = match[3];

      links.push({
        place_id: formatHexToUUID(placeIdHex),
        parish_external_id: formatHexToUUID(parishIdHex), // Assuming parish external_id is also a UUID string
        is_current: isCurrentFlag === '1'
      });
    } catch (e) {
      console.warn('Skipping invalid row during parsing:', match[0], e);
    }
  }
  return links;
};


export const usePlaceParishLinkImport = () => {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{ success: boolean; message: string; details?: string } | null>(null);

  const importPlaceParishLinks = async (sqlData: string) => {
    setIsImporting(true);
    setImportResult(null);

    try {
      if (!sqlData.includes("INSERT INTO `place_parish`")) {
        throw new Error("SQL data does not seem to be for `place_parish` table.");
      }

      const linksToInsert = parsePlaceParishSql(sqlData);

      if (linksToInsert.length === 0) {
        throw new Error("No valid place-parish links found in the provided SQL data. Check format.");
      }
      
      const { error } = await supabase
        .from('place_parish_links')
        .upsert(linksToInsert, { onConflict: 'place_id,parish_external_id' });

      if (error) {
        throw error;
      }

      const message = `Successfully imported/updated ${linksToInsert.length} place-parish links.`;
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

  return { isImporting, importResult, importPlaceParishLinks, setImportResult };
};
