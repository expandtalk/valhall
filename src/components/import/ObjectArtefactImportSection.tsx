import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ObjectArtefactHeader,
  ObjectArtefactDataInput,
  ObjectArtefactUsageInfo,
  ObjectArtefactActionButtons,
  ObjectArtefactResultDisplay
} from './object-artefact';

interface ImportResults {
  success: number;
  errors: string[];
  warnings: string[];
}

export const ObjectArtefactImportSection: React.FC = () => {
  const { toast } = useToast();
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<ImportResults | null>(null);

  const parseObjectArtefactInsertStatement = (sqlData: string) => {
    console.log('Parsing object_artefact SQL data:', sqlData.substring(0, 500));
    
    if (sqlData.toLowerCase().includes('insert into `objects`')) {
      throw new Error('Fel datatyp. Detta ser ut att vara `objects`-data. Denna importör hanterar `object_artefact`-kopplingar. Import av enbart `objects` stöds inte för närvarande.');
    }
    
    const valuesMatch = sqlData.match(/VALUES\s*([\s\S]*)/i);
    if (!valuesMatch) {
      throw new Error('Kunde inte hitta VALUES statement i SQL-datan');
    }

    const valuesString = valuesMatch[1];
    const rows: Array<{
      objectid: string;
      artefactid: string;
    }> = [];

    // Robust row parsing using regex to find all value tuples like (...)
    const rowPattern = /\(([^)]+)\)/g;
    const valueTuples = valuesString.match(rowPattern);

    if (!valueTuples) {
      console.log('No value tuples found in VALUES string');
      return [];
    }

    for (const tuple of valueTuples) {
      try {
        const parsedRow = parseObjectArtefactRowData(tuple);
        if (parsedRow) rows.push(parsedRow);
      } catch (error) {
        console.warn('Failed to parse row:', tuple, error);
      }
    }

    console.log(`Successfully parsed ${rows.length} object_artefact rows`);
    return rows;
  };

  const parseObjectArtefactRowData = (rowString: string) => {
    let cleanRow = rowString.trim();
    if (cleanRow.startsWith("(")) cleanRow = cleanRow.substring(1);
    if (cleanRow.endsWith("),")) cleanRow = cleanRow.substring(0, cleanRow.length - 2);
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
      i++;
    }
    
    if (current.trim()) {
      values.push(current.trim());
    }
    
    if (values.length !== 2) {
      throw new Error(`Expected 2 values, got ${values.length}: ${values.join(', ')}`);
    }

    const formatHexToBytea = (hexValue: string) => {
      let hex = hexValue;
      if (hex.startsWith("X'") && hex.endsWith("'")) {
        hex = hex.substring(2, hex.length - 1);
      }
      return `\\x${hex.toLowerCase()}`;
    };

    return {
      objectid: formatHexToBytea(values[0]),
      artefactid: formatHexToBytea(values[1])
    };
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      toast({
        title: "Fel",
        description: "Vänligen klistra in SQL INSERT data för object_artefact",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      console.log('Starting object_artefact import process...');
      const parsedRows = parseObjectArtefactInsertStatement(importData);
      
      if (parsedRows.length === 0) {
        throw new Error('Inga object_artefact-kopplingar kunde parsas från SQL-datan');
      }

      console.log(`Attempting to import ${parsedRows.length} object_artefact relationships`);

      let successCount = 0;
      const errors: string[] = [];
      const warnings: string[] = [];

      const batchSize = 10;
      for (let i = 0; i < parsedRows.length; i += batchSize) {
        const batch = parsedRows.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i/batchSize) + 1} (${batch.length} items)`);

        for (const row of batch) {
          try {
            const { error: insertError } = await supabase
              .from('object_artefact')
              .insert({
                objectid: row.objectid,
                artefactid: row.artefactid
              })
              .select()
              .single();

            if (insertError) {
              if (insertError.code === '23505') {
                warnings.push(`Duplicerad koppling hoppades över: ${row.objectid.substring(0, 8)}... - ${row.artefactid.substring(0, 8)}...`);
              } else {
                errors.push(`Fel vid import av koppling: ${insertError.message}`);
              }
            } else {
              successCount++;
            }

          } catch (error) {
            errors.push(`Fel vid import av koppling: ${error instanceof Error ? error.message : 'Okänt fel'}`);
          }
        }
      }

      setImportResults({
        success: successCount,
        errors,
        warnings
      });

      if (successCount > 0) {
        toast({
          title: "Import slutförd",
          description: `${successCount} object-artefakt-kopplingar importerades framgångsrikt`,
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
      <ObjectArtefactHeader />
      
      <CardContent className="space-y-4">
        {!importResults ? (
          <>
            <ObjectArtefactDataInput
              importData={importData}
              onChange={setImportData}
              disabled={isImporting}
            />

            <ObjectArtefactUsageInfo />

            <ObjectArtefactActionButtons
              onImport={handleImport}
              isImporting={isImporting}
              hasData={!!importData.trim()}
            />
          </>
        ) : (
          <ObjectArtefactResultDisplay
            importResults={importResults}
            onClose={handleClose}
          />
        )}
      </CardContent>
    </Card>
  );
};
