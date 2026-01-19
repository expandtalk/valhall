
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, AlertCircle } from 'lucide-react';

interface CarverInscriptionImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

export const CarverInscriptionImportModal: React.FC<CarverInscriptionImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const { toast } = useToast();
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: string[];
    warnings: string[];
  } | null>(null);

  const parseInsertStatement = (sqlData: string) => {
    console.log('Parsing SQL data:', sqlData.substring(0, 500));
    
    // Look for VALUES section more robustly
    const valuesMatch = sqlData.match(/VALUES\s*([\s\S]*)/i);
    if (!valuesMatch) {
      throw new Error('Kunde inte hitta VALUES statement i SQL-datan');
    }

    const valuesString = valuesMatch[1];
    console.log('Found values string:', valuesString.substring(0, 200));

    const rows: Array<{
      carverinscriptionid: string;
      carverid: string;
      inscriptionid: string;
      attribution: string;
      certainty: boolean;
      notes: string | null;
      lang: string;
    }> = [];

    // Split by parentheses groups but handle nested parentheses and commas in strings
    const lines = valuesString.split('\n');
    let currentRow = '';
    let inRowDefinition = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Skip empty lines and semicolons
      if (!trimmedLine || trimmedLine === ';' || trimmedLine === ',') {
        continue;
      }
      
      // Start of a new row
      if (trimmedLine.startsWith('(')) {
        if (inRowDefinition && currentRow) {
          // Process the previous row
          try {
            const parsedRow = parseRowData(currentRow);
            if (parsedRow) rows.push(parsedRow);
          } catch (error) {
            console.warn('Failed to parse row:', currentRow, error);
          }
        }
        currentRow = trimmedLine;
        inRowDefinition = true;
      } else if (inRowDefinition) {
        // Continue building the current row
        currentRow += ' ' + trimmedLine;
      }
      
      // Check if row is complete (ends with ),)
      if (inRowDefinition && (trimmedLine.endsWith('),') || trimmedLine.endsWith(')'))) {
        try {
          const parsedRow = parseRowData(currentRow);
          if (parsedRow) rows.push(parsedRow);
        } catch (error) {
          console.warn('Failed to parse row:', currentRow, error);
        }
        currentRow = '';
        inRowDefinition = false;
      }
    }

    // Process the last row if there's one
    if (inRowDefinition && currentRow) {
      try {
        const parsedRow = parseRowData(currentRow);
        if (parsedRow) rows.push(parsedRow);
      } catch (error) {
        console.warn('Failed to parse final row:', currentRow, error);
      }
    }

    console.log(`Successfully parsed ${rows.length} rows`);
    return rows;
  };

  const parseRowData = (rowString: string) => {
    // Remove outer parentheses and trailing comma/semicolon
    let cleanRow = rowString.trim();
    if (cleanRow.startsWith("(")) cleanRow = cleanRow.substring(1);
    if (cleanRow.endsWith("),")) cleanRow = cleanRow.substring(0, cleanRow.length - 2);
    if (cleanRow.endsWith(")")) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    if (cleanRow.endsWith(",")) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    
    console.log('Parsing row:', cleanRow);
    
    // Parse values - handle quoted strings and hex values
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
        // Check for escaped quotes
        if (i + 1 < cleanRow.length && cleanRow[i + 1] === quoteChar) {
          current += char + char;
          i++; // Skip next quote
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
    
    console.log('Parsed values:', values);
    
    if (values.length !== 7) {
      throw new Error(`Expected 7 values, got ${values.length}: ${values.join(', ')}`);
    }

    // Convert hex values to Buffer for BYTEA and clean up the data
    const formatHexToBytea = (hexValue: string) => {
      // Remove X' and ' wrapper
      let hex = hexValue;
      if (hex.startsWith("X'") && hex.endsWith("'")) {
        hex = hex.substring(2, hex.length - 1);
      }
      
      // Return as hex string that will be converted to BYTEA
      return `\\x${hex.toLowerCase()}`;
    };

    const cleanValue = (value: string) => {
      if (value === 'NULL') return null;
      if (value.startsWith("'") && value.endsWith("'")) {
        return value.substring(1, value.length - 1);
      }
      return value;
    };

    return {
      carverinscriptionid: formatHexToBytea(values[0]),
      carverid: formatHexToBytea(values[1]),
      inscriptionid: formatHexToBytea(values[2]),
      attribution: cleanValue(values[3]) || 'attributed',
      certainty: values[4] === '1',
      notes: cleanValue(values[5]),
      lang: cleanValue(values[6]) || 'sv-se'
    };
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      toast({
        title: "Fel",
        description: "Vänligen klistra in SQL INSERT data",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      console.log('Starting import process...');
      const parsedRows = parseInsertStatement(importData);
      
      if (parsedRows.length === 0) {
        throw new Error('Inga rader kunde parsas från SQL-datan');
      }

      console.log(`Attempting to import ${parsedRows.length} carver-inscription relationships`);

      let successCount = 0;
      const errors: string[] = [];
      const warnings: string[] = [];

      // Process in batches to avoid overwhelming the database
      const batchSize = 10;
      for (let i = 0; i < parsedRows.length; i += batchSize) {
        const batch = parsedRows.slice(i, i + batchSize);
        console.log(`Processing batch ${Math.floor(i/batchSize) + 1} (${batch.length} items)`);

        for (const row of batch) {
          try {
            // Convert hex strings to proper format for PostgreSQL BYTEA
            const bytea1 = row.carverinscriptionid;
            const bytea2 = row.carverid;
            const bytea3 = row.inscriptionid;

            // Use the Supabase client to insert data
            const { error: insertError } = await supabase
              .from('carver_inscription')
              .insert({
                carverinscriptionid: bytea1,
                carverid: bytea2,
                inscriptionid: bytea3,
                attribution: row.attribution as 'attributed' | 'signed' | 'similar' | 'signed on pair stone',
                certainty: row.certainty,
                notes: row.notes,
                lang: row.lang
              })
              .select()
              .single();

            if (insertError) {
              // Check if it's a duplicate key error (which we can ignore)
              if (insertError.code === '23505') {
                warnings.push(`Duplicerat ID hoppades över: ${row.carverinscriptionid.substring(0, 8)}...`);
              } else {
                errors.push(`Fel vid import av rad: ${insertError.message}`);
              }
            } else {
              successCount++;
            }

          } catch (error) {
            errors.push(`Fel vid import av rad: ${error instanceof Error ? error.message : 'Okänt fel'}`);
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
          description: `${successCount} kopplingar importerades framgångsrikt`,
        });
        onImportComplete();
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-white/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importera Carver-Inscription Data
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!importResults ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="importData" className="text-white">
                  SQL INSERT Data
                </Label>
                <Textarea
                  id="importData"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Klistra in MySQL INSERT INTO carver_inscription VALUES statement här..."
                  className="bg-white/10 border-white/20 text-white font-mono text-xs h-40"
                  disabled={isImporting}
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-300">
                    <p className="font-semibold mb-1">Importinstruktioner:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Klistra in hela INSERT INTO carver_inscription VALUES statement</li>
                      <li>Systemet konverterar automatiskt MySQL hex-värden till PostgreSQL BYTEA</li>
                      <li>Tabellnamnet är nu carver_inscription (singular)</li>
                      <li>Data importeras direkt till den nya tabellstrukturen</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="border-white/20 text-white hover:bg-white/5"
                  disabled={isImporting}
                >
                  Avbryt
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={isImporting || !importData.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Importerar...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Starta Import
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">Import slutförd</h3>
                <p className="text-green-300">
                  {importResults.success} kopplingar importerades framgångsrikt
                </p>
              </div>

              {importResults.warnings.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <h3 className="text-yellow-400 font-semibold mb-2">Varningar ({importResults.warnings.length})</h3>
                  <div className="max-h-32 overflow-y-auto">
                    {importResults.warnings.map((warning, index) => (
                      <p key={index} className="text-yellow-300 text-sm">{warning}</p>
                    ))}
                  </div>
                </div>
              )}

              {importResults.errors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">Fel ({importResults.errors.length})</h3>
                  <div className="max-h-32 overflow-y-auto">
                    {importResults.errors.map((error, index) => (
                      <p key={index} className="text-red-300 text-sm">{error}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleClose}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Stäng
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
