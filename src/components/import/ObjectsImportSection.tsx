import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ObjectsHeader,
  ObjectsDataInput,
  ObjectsUsageInfo,
  ObjectsActionButtons,
  ObjectsResultDisplay
} from './objects';

interface ParsedObject {
  objectid: string;
  placeid: string;
  artefact: string | null;
  material: string | null;
  extant: boolean;
  originallocation: boolean | null;
}

interface ImportResults {
  success: number;
  errors: string[];
  warnings: string[];
}

export const ObjectsImportSection: React.FC = () => {
  const { toast } = useToast();
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<ImportResults | null>(null);

  const hexToUuid = (hex: string): string => {
    let cleanHex = hex.startsWith("X'") && hex.endsWith("'") ? hex.substring(2, hex.length - 1) : hex;
    cleanHex = cleanHex.toLowerCase();
    if (cleanHex.length !== 32) {
        throw new Error(`Invalid hex length for UUID: ${cleanHex.length}`);
    }
    return `${cleanHex.slice(0, 8)}-${cleanHex.slice(8, 12)}-${cleanHex.slice(12, 16)}-${cleanHex.slice(16, 20)}-${cleanHex.slice(20)}`;
  };
  
  const parseSqlRow = (rowString: string): string[] => {
    let cleanRow = rowString.trim();
    if (cleanRow.startsWith("(")) cleanRow = cleanRow.substring(1);
    if (cleanRow.endsWith("),")) cleanRow = cleanRow.substring(0, cleanRow.length - 2);
    if (cleanRow.endsWith(")")) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    if (cleanRow.endsWith(",")) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar: "'" | '"' | '' = '';
    
    for (let i = 0; i < cleanRow.length; i++) {
        const char = cleanRow[i];

        if (!inQuotes && (char === "'" || char === '"')) {
            inQuotes = true;
            quoteChar = char;
            current += char;
        } else if (inQuotes && char === quoteChar) {
            if (i + 1 < cleanRow.length && cleanRow[i + 1] === quoteChar) {
                current += char + char;
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
    }
    
    if (current.trim()) {
        values.push(current.trim());
    }
    
    return values;
  };
  
  const parseObjectsInsertStatement = (sqlData: string): ParsedObject[] => {
    if (!sqlData.toLowerCase().includes('insert into `objects`')) {
      throw new Error('Fel SQL-sats. Förväntade "INSERT INTO `objects`...".');
    }
    
    const valuesMatch = sqlData.match(/VALUES\s*([\s\S]*)/i);
    if (!valuesMatch) {
      throw new Error('Kunde inte hitta VALUES statement i SQL-datan');
    }

    const valuesString = valuesMatch[1];
    const rows: ParsedObject[] = [];

    // Match individual rows (tuples) enclosed in parentheses.
    // This is more robust against formatting variations like newlines and tabs between rows.
    const tuples = valuesString.match(/\([\s\S]*?\)/g);

    if (!tuples) {
      console.warn('No tuples found in VALUES clause');
      return [];
    }

    for (const tuple of tuples) {
        if (!tuple) continue;
      try {
        const values = parseSqlRow(tuple);
        
        if (values.length !== 6) {
          console.warn(`Skipping row with incorrect number of values (${values.length}):`, tuple);
          continue;
        }
        
        const [objectidHex, placeidHex, artefactStr, materialStr, extantStr, originallocStr] = values;

        const unquote = (s: string) => (s.startsWith("'") && s.endsWith("'")) ? s.slice(1, -1) : s;

        const artefact = unquote(artefactStr) === 'NULL' ? null : unquote(artefactStr);
        const material = unquote(materialStr) === 'NULL' ? null : unquote(materialStr);
        const extant = unquote(extantStr) === '1';
        const originallocation = unquote(originallocStr) === 'NULL' ? null : unquote(originallocStr) === '1';

        rows.push({
          objectid: hexToUuid(objectidHex),
          placeid: hexToUuid(placeidHex),
          artefact,
          material,
          extant,
          originallocation,
        });

      } catch (error) {
        console.warn('Failed to parse row, skipping:', tuple, error);
      }
    }
    return rows;
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      toast({
        title: "Fel",
        description: "Vänligen klistra in SQL INSERT data för `objects`",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      console.log('Starting objects import process...');
      const parsedRows = parseObjectsInsertStatement(importData);
      
      if (parsedRows.length === 0) {
        throw new Error('Inga `objects` rader kunde parsas från SQL-datan');
      }

      console.log(`Attempting to import ${parsedRows.length} objects`);
      const results: ImportResults = { success: 0, errors: [], warnings: [] };

      const batchSize = 100;
      for (let i = 0; i < parsedRows.length; i += batchSize) {
        const batch = parsedRows.slice(i, i + batchSize);
        const { error: insertError } = await supabase.from('objects').insert(batch);
        
        if (insertError) {
          console.error('Batch insert error:', insertError);
          for (const row of batch) {
            const { error: singleError } = await supabase.from('objects').insert(row);
            if (singleError) {
              if (singleError.code === '23503') { 
                 results.errors.push(`Fel för ${row.objectid}: Plats-ID (${row.placeid}) existerar inte.`);
              } else if (singleError.code === '23505') {
                 results.warnings.push(`Duplicerat objekt hoppades över: ${row.objectid}`);
              }
              else {
                results.errors.push(`Fel för ${row.objectid}: ${singleError.message}`);
              }
            } else {
              results.success++;
            }
          }
        } else {
          results.success += batch.length;
        }
      }

      setImportResults(results);

      if (results.errors.length === 0) {
        toast({
          title: "Import slutförd",
          description: `${results.success} objekt importerades, ${results.warnings.length} duplicerade hoppades över.`,
        });
      } else {
        toast({
          title: "Import slutförd med fel",
          description: `${results.success} importerades, men ${results.errors.length} fel uppstod. Se resultatpanelen.`,
          variant: "destructive"
        });
      }

    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import misslyckades",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleClose = () => {
    setImportData('');
    setImportResults(null);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <ObjectsHeader />
      <CardContent className="space-y-4">
        {!importResults ? (
          <>
            <ObjectsDataInput
              importData={importData}
              onChange={setImportData}
              disabled={isImporting}
            />
            <ObjectsUsageInfo />
            <ObjectsActionButtons
              onImport={handleImport}
              isImporting={isImporting}
              hasData={!!importData.trim()}
            />
          </>
        ) : (
          <ObjectsResultDisplay
            importResults={importResults}
            onClose={handleClose}
          />
        )}
      </CardContent>
    </Card>
  );
};
