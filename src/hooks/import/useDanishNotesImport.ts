import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DanishNoteRecord {
  external_id: string; // her_DK_notesid
  object_id: string;
  her_dk_id: string;
  notes: string;
  lang: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  details?: string;
}

const formatHexToBytea = (hexValue: string) => {
    let hex = hexValue;
    if (hex.startsWith("X'") && hex.endsWith("'")) {
      hex = hex.substring(2, hex.length - 1);
    }
    // The foreign key in danish_parishes is text, so we return the text representation
    return `\\x${hex.toLowerCase()}`;
};

const cleanValue = (value: string) => {
    if (value === 'NULL') return null;
    if (value.startsWith("'") && value.endsWith("'")) {
      return value.substring(1, value.length - 1).replace(/\\'/g, "'");
    }
    return value;
};

const parseRowData = (rowString: string): DanishNoteRecord | null => {
    let cleanRow = rowString.trim();
    if (cleanRow.startsWith("(")) cleanRow = cleanRow.substring(1);
    if (cleanRow.endsWith("),") || cleanRow.endsWith(");")) cleanRow = cleanRow.substring(0, cleanRow.length - 2);
    if (cleanRow.endsWith(")")) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    if (cleanRow.endsWith(",")) cleanRow = cleanRow.substring(0, cleanRow.length - 1);

    const values = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';
    let i = 0;

    while (i < cleanRow.length) {
      const char = cleanRow[i];
      if (!inQuotes && (char === "'" || char === '"')) {
        inQuotes = true;
        quoteChar = char;
        current += char;
      } else if (inQuotes && char === quoteChar) {
        if (i + 1 < cleanRow.length && cleanRow[i + 1] === quoteChar) {
          current += char + char; // Escaped quote
          i++;
        } else {
          inQuotes = false;
          current += char;
        }
      } else if (!inQuotes && char === ',') {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
      i++;
    }
    values.push(current.trim());

    if (values.length !== 5) {
      console.warn(`Expected 5 values, but got ${values.length} in row: ${rowString}`);
      return null;
    }

    return {
      external_id: formatHexToBytea(values[0]),
      object_id: formatHexToBytea(values[1]),
      her_dk_id: formatHexToBytea(values[2]),
      notes: cleanValue(values[3]) || '',
      lang: cleanValue(values[4]) || 'sv-se'
    };
};

const parseSqlData = (sqlData: string): DanishNoteRecord[] => {
    let valuesString;
    const valuesMatch = sqlData.match(/INSERT INTO `her_DK_notes` .*?VALUES\s*([\s\S]*)/i);

    if (valuesMatch?.[1]) {
        valuesString = valuesMatch[1];
    } else if (sqlData.trim().startsWith('(')) {
        // Assume data is only the values part
        valuesString = sqlData;
    } else {
        throw new Error("Kunde inte hitta VALUES-satsen i SQL-datan. Se till att klistra in antingen hela INSERT-satsen eller bara värdena som börjar med (...)");
    }

    valuesString = valuesString.trim().replace(/;$/, '');
    const rows: DanishNoteRecord[] = [];
    const rawRows = valuesString.split('\n').filter(line => line.trim().startsWith('('));

    rawRows.forEach((rowStr) => {
        try {
            const parsed = parseRowData(rowStr);
            if(parsed) rows.push(parsed);
        } catch(e) {
            console.warn(`Kunde inte parsea rad: ${rowStr}`, e);
        }
    });

    return rows;
};

export const useDanishNotesImport = () => {
    const [isImporting, setIsImporting] = useState(false);
    const [importResult, setImportResult] = useState<ImportResult | null>(null);
    const { toast } = useToast();

    const importDanishNotes = async (sqlData: string) => {
        setIsImporting(true);
        setImportResult(null);

        try {
            const records = parseSqlData(sqlData);
            if (records.length === 0) {
                throw new Error("Inga poster hittades i den angivna SQL-datan.");
            }
            
            const recordsToInsert = records.map(r => ({
              ...r,
              id: undefined // Let database generate it
            }));

            const { error } = await supabase.from('her_dk_notes').upsert(recordsToInsert, {
                onConflict: 'external_id'
            });

            if (error) {
                console.error("Supabase error:", error);
                throw new Error(`Supabase fel: ${error.message}. Kontrollera att referens-ID:n (her_dk_id) existerar i danish_parishes-tabellen.`);
            }

            setImportResult({
                success: true,
                message: `Importerade ${records.length} anteckningar för danska orter.`
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

    return { isImporting, importResult, importDanishNotes, setImportResult };
};
