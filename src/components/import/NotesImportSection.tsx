
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, AlertCircle, FileText } from 'lucide-react';

export const NotesImportSection: React.FC = () => {
  const { toast } = useToast();
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: string[];
    warnings: string[];
  } | null>(null);

  const parseNotesInsertStatement = (sqlData: string) => {
    console.log('Parsing notes SQL data:', sqlData.substring(0, 500));
    
    const valuesMatch = sqlData.match(/VALUES\s*([\s\S]*)/i);
    if (!valuesMatch) {
      throw new Error('Kunde inte hitta VALUES statement i SQL-datan');
    }

    const valuesString = valuesMatch[1];
    const rows: Array<{
      noteid: string;
      objectid: string;
      notes: string;
      lang: string;
    }> = [];

    // Split by parentheses groups
    const lines = valuesString.split('\n');
    let currentRow = '';
    let inRowDefinition = false;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (!trimmedLine || trimmedLine === ';' || trimmedLine === ',') {
        continue;
      }
      
      if (trimmedLine.startsWith('(')) {
        if (inRowDefinition && currentRow) {
          try {
            const parsedRow = parseNotesRowData(currentRow);
            if (parsedRow) rows.push(parsedRow);
          } catch (error) {
            console.warn('Failed to parse row:', currentRow, error);
          }
        }
        currentRow = trimmedLine;
        inRowDefinition = true;
      } else if (inRowDefinition) {
        currentRow += ' ' + trimmedLine;
      }
      
      if (inRowDefinition && (trimmedLine.endsWith('),') || trimmedLine.endsWith(')'))) {
        try {
          const parsedRow = parseNotesRowData(currentRow);
          if (parsedRow) rows.push(parsedRow);
        } catch (error) {
          console.warn('Failed to parse row:', currentRow, error);
        }
        currentRow = '';
        inRowDefinition = false;
      }
    }

    if (inRowDefinition && currentRow) {
      try {
        const parsedRow = parseNotesRowData(currentRow);
        if (parsedRow) rows.push(parsedRow);
      } catch (error) {
        console.warn('Failed to parse final row:', currentRow, error);
      }
    }

    console.log(`Successfully parsed ${rows.length} notes rows`);
    return rows;
  };

  const parseNotesRowData = (rowString: string) => {
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
    
    if (values.length !== 4) {
      throw new Error(`Expected 4 values, got ${values.length}: ${values.join(', ')}`);
    }

    const formatHexToBytea = (hexValue: string) => {
      let hex = hexValue;
      if (hex.startsWith("X'") && hex.endsWith("'")) {
        hex = hex.substring(2, hex.length - 1);
      }
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
      noteid: formatHexToBytea(values[0]),
      objectid: formatHexToBytea(values[1]),
      notes: cleanValue(values[2]) || '',
      lang: cleanValue(values[3]) || 'sv-se'
    };
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      toast({
        title: "Fel",
        description: "Vänligen klistra in SQL INSERT data för notes",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      console.log('Starting notes import process...');
      const parsedRows = parseNotesInsertStatement(importData);
      
      if (parsedRows.length === 0) {
        throw new Error('Inga noter kunde parsas från SQL-datan');
      }

      console.log(`Attempting to import ${parsedRows.length} notes`);

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
              .from('notes')
              .insert({
                noteid: row.noteid,
                objectid: row.objectid,
                notes: row.notes,
                lang: row.lang
              })
              .select()
              .single();

            if (insertError) {
              if (insertError.code === '23505') {
                warnings.push(`Duplicerat note ID hoppades över: ${row.noteid.substring(0, 8)}...`);
              } else {
                errors.push(`Fel vid import av note: ${insertError.message}`);
              }
            } else {
              successCount++;
            }

          } catch (error) {
            errors.push(`Fel vid import av note: ${error instanceof Error ? error.message : 'Okänt fel'}`);
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
          description: `${successCount} noter importerades framgångsrikt`,
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
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <FileText className="h-5 w-5 text-blue-400" />
          Importera Notes Data
        </CardTitle>
        <CardDescription className="text-slate-300">
          Importera noter från Rundata MySQL dump med hex-kodade UUID:er
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!importResults ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="notesImportData" className="text-white">
                SQL INSERT Data för Notes
              </Label>
              <Textarea
                id="notesImportData"
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                placeholder="Klistra in MySQL INSERT INTO `notes` VALUES statement här..."
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
                    <li>Klistra in hela INSERT INTO notes VALUES statement</li>
                    <li>Systemet konverterar automatiskt MySQL hex-värden till PostgreSQL BYTEA</li>
                    <li>Data importeras direkt till notes-tabellen</li>
                    <li>Duplicerade noter hoppas över automatiskt</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
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
                {importResults.success} noter importerades framgångsrikt
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
      </CardContent>
    </Card>
  );
};
