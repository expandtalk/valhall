
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  PlacesHeader,
  PlacesDataInput,
  PlacesUsageInfo,
  PlacesActionButtons,
  PlacesResultDisplay
} from './places';

interface ParsedPlace {
  placeid: string;
  toraid: string | null;
  place: string;
}

interface ImportResults {
  success: number;
  errors: string[];
  warnings: string[];
}

export const PlacesImportSection: React.FC = () => {
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
  
  const parsePlacesInsertStatement = (sqlData: string): ParsedPlace[] => {
    if (!sqlData.toLowerCase().includes('insert into `places`')) {
      throw new Error('Fel SQL-sats. Förväntade "INSERT INTO `places`...".');
    }
    
    const valuesMatch = sqlData.match(/VALUES\s*([\s\S]*)/i);
    if (!valuesMatch) {
      throw new Error('Kunde inte hitta VALUES statement i SQL-datan');
    }

    const valuesString = valuesMatch[1];
    const rows: ParsedPlace[] = [];

    const tuples = valuesString.match(/\([\s\S]*?\)/g);

    if (!tuples) {
      console.warn('No tuples found in VALUES clause');
      return [];
    }

    for (const tuple of tuples) {
        if (!tuple) continue;
      try {
        const values = parseSqlRow(tuple);
        
        if (values.length !== 3) {
          console.warn(`Skipping row with incorrect number of values (${values.length}):`, tuple);
          continue;
        }
        
        const [placeidHex, toraidStr, placeStr] = values;

        const unquote = (s: string) => (s.startsWith("'") && s.endsWith("'")) ? s.slice(1, -1) : s;

        const toraid = unquote(toraidStr) === 'NULL' ? null : unquote(toraidStr);
        const place = unquote(placeStr);

        rows.push({
          placeid: hexToUuid(placeidHex),
          toraid,
          place,
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
        description: "Vänligen klistra in SQL INSERT data för `places`",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      const parsedRows = parsePlacesInsertStatement(importData);
      
      if (parsedRows.length === 0) {
        throw new Error('Inga `places` rader kunde parsas från SQL-datan');
      }

      console.log(`Attempting to import ${parsedRows.length} places`);
      const results: ImportResults = { success: 0, errors: [], warnings: [] };

      const batchSize = 100;
      for (let i = 0; i < parsedRows.length; i += batchSize) {
        const batch = parsedRows.slice(i, i + batchSize);
        const { error: insertError } = await supabase.from('places').insert(batch);
        
        if (insertError) {
          console.error('Batch insert error:', insertError);
          for (const row of batch) {
            const { error: singleError } = await supabase.from('places').insert(row);
            if (singleError) {
              if (singleError.code === '23505') {
                 results.warnings.push(`Duplicerad plats hoppades över: ${row.placeid}`);
              }
              else {
                results.errors.push(`Fel för ${row.placeid}: ${singleError.message}`);
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
          description: `${results.success} platser importerades, ${results.warnings.length} duplicerade hoppades över.`,
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
      <PlacesHeader />
      <CardContent className="space-y-4">
        {!importResults ? (
          <>
            <PlacesDataInput
              importData={importData}
              onChange={setImportData}
              disabled={isImporting}
            />
            <PlacesUsageInfo />
            <PlacesActionButtons
              onImport={handleImport}
              isImporting={isImporting}
              hasData={!!importData.trim()}
            />
          </>
        ) : (
          <PlacesResultDisplay
            importResults={importResults}
            onClose={handleClose}
          />
        )}
      </CardContent>
    </Card>
  );
};
