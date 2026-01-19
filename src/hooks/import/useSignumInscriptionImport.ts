
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { parseComplexRows, parseRowValues } from '@/utils/rundata/rowParser';

interface SignumInscriptionRecord {
  signum_external_id: string;
  inscription_external_id: string;
  canonical: boolean;
}

interface ImportResult {
  success: boolean;
  message: string;
  details?: string;
}

const formatHexToText = (hexValue: string) => {
    let hex = hexValue;
    if (String(hex).startsWith("X'") && String(hex).endsWith("'")) {
      hex = String(hex).substring(2, String(hex).length - 1);
    }
    // Supabase bytea format is \x followed by hex
    return `\\x${hex.toLowerCase()}`;
};

const parseSqlData = (sqlData: string): SignumInscriptionRecord[] => {
    let valuesString;
    const valuesMatch = sqlData.match(/INSERT INTO\s+[`']?signum_inscription[`']?[\s\S]*?VALUES\s*([\s\S]*)/i);

    if (valuesMatch?.[1]) {
        valuesString = valuesMatch[1];
    } else if (sqlData.trim().startsWith('(')) {
        valuesString = sqlData;
    } else {
        throw new Error("Kunde inte hitta VALUES-satsen i SQL-datan. Se till att klistra in antingen hela INSERT-satsen eller bara värdena som börjar med (...)");
    }

    valuesString = valuesString.trim().replace(/;$/, '');
    const rawRows = parseComplexRows(valuesString);
    const records: SignumInscriptionRecord[] = [];

    rawRows.forEach((rowStr) => {
        try {
            const values = parseRowValues(rowStr);
            if (values.length !== 4) {
              console.warn(`Expected 4 values, but got ${values.length} in row: ${rowStr}`);
              return;
            }

            const signumId = values[1];
            const inscriptionId = values[2];
            const canonicalValue = values[3];

            if (!signumId || !inscriptionId) {
                console.warn(`Missing signumid or inscriptionid in row: ${rowStr}`);
                return;
            }

            records.push({
              signum_external_id: formatHexToText(String(signumId)),
              inscription_external_id: formatHexToText(String(inscriptionId)),
              canonical: String(canonicalValue) === '1' || canonicalValue === 1
            });
        } catch(e) {
            console.warn(`Kunde inte parsea rad: ${rowStr}`, e);
        }
    });

    return records;
};


export const useSignumInscriptionImport = () => {
    const [isImporting, setIsImporting] = useState(false);
    const [importResult, setImportResult] = useState<ImportResult | null>(null);
    const { toast } = useToast();

    const importSignumInscriptionLinks = async (sqlData: string) => {
        setIsImporting(true);
        setImportResult(null);

        try {
            const records = parseSqlData(sqlData);
            if (records.length === 0) {
                throw new Error("Inga poster hittades i den angivna SQL-datan.");
            }
            
            const { error } = await supabase.from('signum_inscription_links').upsert(records, {
                onConflict: 'signum_external_id,inscription_external_id'
            });

            if (error) {
                console.error("Supabase error:", error);
                throw new Error(`Supabase fel: ${error.message}`);
            }

            setImportResult({
                success: true,
                message: `Importerade ${records.length} signum-inskriptionslänkar.`
            });
            toast({
                title: "Import Lyckades",
                description: `Importerade ${records.length} poster.`,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Ett okänt fel uppstod";
            setImportResult({
                success: false,
                message: "Importen misslyckades.",
                details: errorMessage,
            });
            toast({
                variant: "destructive",
                title: "Import Misslyckades",
                description: errorMessage,
            });
        } finally {
            setIsImporting(false);
        }
    };

    return { isImporting, importResult, importSignumInscriptionLinks, setImportResult };
};
