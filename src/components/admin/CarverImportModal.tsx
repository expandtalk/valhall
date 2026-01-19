
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, AlertCircle, TestTube } from 'lucide-react';

interface CarverImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: () => void;
}

interface TestResult {
  total: number;
  newCarvers: number;
  existingCarvers: number;
  errors: string[];
  preview: Array<{
    name: string;
    id: string;
    status: 'new' | 'existing' | 'error';
  }>;
}

export const CarverImportModal: React.FC<CarverImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete
}) => {
  const { toast } = useToast();
  const [importData, setImportData] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: string[];
    warnings: string[];
  } | null>(null);

  const parseInsertStatement = (sqlData: string) => {
    console.log('Parsing carver SQL data:', sqlData.substring(0, 500));
    
    // Look for VALUES section
    const valuesMatch = sqlData.match(/VALUES\s*([\s\S]*)/i);
    if (!valuesMatch) {
      throw new Error('Kunde inte hitta VALUES statement i SQL-datan');
    }

    const valuesString = valuesMatch[1];
    console.log('Found values string:', valuesString.substring(0, 200));

    const rows: Array<{
      carverid: string;
      name: string;
    }> = [];

    // Split by parentheses groups
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
        currentRow += ' ' + trimmedLine;
      }
      
      // Check if row is complete
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

    console.log(`Successfully parsed ${rows.length} carver rows`);
    return rows;
  };

  const parseRowData = (rowString: string) => {
    // Remove outer parentheses and trailing comma/semicolon
    let cleanRow = rowString.trim();
    if (cleanRow.startsWith('(')) cleanRow = cleanRow.substring(1);
    if (cleanRow.endsWith('),')) cleanRow = cleanRow.substring(0, cleanRow.length - 2);
    if (cleanRow.endsWith(')')) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    if (cleanRow.endsWith(',')) cleanRow = cleanRow.substring(0, cleanRow.length - 1);
    
    console.log('Parsing carver row:', cleanRow);
    
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
    
    console.log('Parsed carver values:', values);
    
    if (values.length !== 2) {
      throw new Error(`Expected 2 values for carver, got ${values.length}: ${values.join(', ')}`);
    }

    // Convert hex values to UUIDs
    const formatUuid = (hexValue: string) => {
      let hex = hexValue;
      if (hex.startsWith("X'") && hex.endsWith("'")) {
        hex = hex.substring(2, hex.length - 1);
      }
      
      hex = hex.toLowerCase();
      if (hex.length === 32) {
        return [
          hex.substr(0, 8),
          hex.substr(8, 4),
          hex.substr(12, 4),
          hex.substr(16, 4),
          hex.substr(20, 12)
        ].join('-');
      }
      return hex;
    };

    const cleanValue = (value: string) => {
      if (value === 'NULL') return null;
      if (value.startsWith("'") && value.endsWith("'")) {
        return value.substring(1, value.length - 1);
      }
      return value;
    };

    return {
      carverid: formatUuid(values[0]),
      name: cleanValue(values[1]) || 'Okänd runristare'
    };
  };

  const handleTestImport = async () => {
    if (!importData.trim()) {
      toast({
        title: "Fel",
        description: "Vänligen klistra in SQL INSERT data",
        variant: "destructive"
      });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      console.log('Starting carver test import...');
      const parsedRows = parseInsertStatement(importData);
      
      if (parsedRows.length === 0) {
        throw new Error('Inga rader kunde parsas från SQL-datan');
      }

      console.log(`Testing ${parsedRows.length} carvers`);

      const result: TestResult = {
        total: parsedRows.length,
        newCarvers: 0,
        existingCarvers: 0,
        errors: [],
        preview: []
      };

      // Check each carver against existing data
      for (const row of parsedRows) {
        try {
          // Check if carver already exists
          const { data: existingCarver } = await supabase
            .from('carvers')
            .select('id')
            .eq('id', row.carverid)
            .single();

          if (existingCarver) {
            result.existingCarvers++;
            result.preview.push({
              name: row.name,
              id: row.carverid,
              status: 'existing'
            });
          } else {
            result.newCarvers++;
            result.preview.push({
              name: row.name,
              id: row.carverid,
              status: 'new'
            });
          }

        } catch (error) {
          result.errors.push(`Fel vid kontroll av ${row.name}: ${error instanceof Error ? error.message : 'Okänt fel'}`);
          result.preview.push({
            name: row.name,
            id: row.carverid,
            status: 'error'
          });
        }
      }

      setTestResult(result);

      toast({
        title: "Test slutfört",
        description: `${result.newCarvers} nya runristare att importera, ${result.existingCarvers} finns redan`,
      });

    } catch (error) {
      console.error('Carver test error:', error);
      toast({
        title: "Test misslyckades",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleImport = async () => {
    if (!testResult || testResult.newCarvers === 0) {
      toast({
        title: "Fel",
        description: "Kör test först för att se vad som kommer att importeras",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      console.log('Starting actual carver import...');
      const parsedRows = parseInsertStatement(importData);
      
      let successCount = 0;
      const errors: string[] = [];
      const warnings: string[] = [];

      // Only import new carvers
      const newCarvers = testResult.preview.filter(p => p.status === 'new');
      
      for (const previewItem of newCarvers) {
        const row = parsedRows.find(r => r.carverid === previewItem.id);
        if (!row) continue;

        try {
          // Insert the carver
          const { error: insertError } = await supabase
            .from('carvers')
            .insert({
              id: row.carverid,
              name: row.name,
              description: 'Importerad från MySQL data',
              language_code: 'sv-se'
            });

          if (insertError) {
            if (insertError.code === '23505') {
              warnings.push(`Runristare ${row.name} finns redan`);
            } else {
              errors.push(`Fel vid import av ${row.name}: ${insertError.message}`);
            }
          } else {
            successCount++;
          }

        } catch (error) {
          errors.push(`Fel vid import av runristare: ${error instanceof Error ? error.message : 'Okänt fel'}`);
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
          description: `${successCount} runristare importerade framgångsrikt`,
        });
        onImportComplete();
      }

    } catch (error) {
      console.error('Carver import error:', error);
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
    setTestResult(null);
    setImportResults(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-white/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Importera Runristare Data
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!importResults ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="importData" className="text-white">
                  SQL INSERT Data för Runristare
                </Label>
                <Textarea
                  id="importData"
                  value={importData}
                  onChange={(e) => setImportData(e.target.value)}
                  placeholder="Klistra in MySQL INSERT INTO carvers VALUES statement här..."
                  className="bg-white/10 border-white/20 text-white font-mono text-xs h-40"
                  disabled={isImporting || isTesting}
                />
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-300">
                    <p className="font-semibold mb-1">Importinstruktioner:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Klistra in hela INSERT INTO carvers VALUES statement</li>
                      <li>Klicka på "Testa Import" för att se vad som kommer att hända</li>
                      <li>Systemet konverterar automatiskt MySQL hex-värden till UUID:er</li>
                      <li>Format: (X'hexid','namn')</li>
                    </ul>
                  </div>
                </div>
              </div>

              {testResult && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <h3 className="text-green-400 font-semibold mb-2">Testresultat</h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{testResult.newCarvers}</div>
                      <div className="text-sm text-green-300">Nya att importera</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{testResult.existingCarvers}</div>
                      <div className="text-sm text-yellow-300">Finns redan</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">{testResult.errors.length}</div>
                      <div className="text-sm text-red-300">Fel</div>
                    </div>
                  </div>
                  
                  {testResult.preview.length > 0 && (
                    <div className="max-h-40 overflow-y-auto">
                      <h4 className="text-sm font-semibold mb-2">Förhandsvisning (första 10):</h4>
                      {testResult.preview.slice(0, 10).map((item, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs py-1">
                          <span className={`w-2 h-2 rounded-full ${
                            item.status === 'new' ? 'bg-green-400' :
                            item.status === 'existing' ? 'bg-yellow-400' : 'bg-red-400'
                          }`}></span>
                          <span className="font-mono text-gray-400">{item.id.substring(0, 8)}...</span>
                          <span>{item.name}</span>
                        </div>
                      ))}
                      {testResult.preview.length > 10 && (
                        <div className="text-xs text-gray-400 mt-2">
                          ...och {testResult.preview.length - 10} till
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="border-white/20 text-white hover:bg-white/5"
                  disabled={isImporting || isTesting}
                >
                  Avbryt
                </Button>
                <Button
                  onClick={handleTestImport}
                  disabled={isImporting || isTesting || !importData.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isTesting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testar...
                    </>
                  ) : (
                    <>
                      <TestTube className="h-4 w-4 mr-2" />
                      Testa Import
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={isImporting || isTesting || !testResult || testResult.newCarvers === 0}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Importerar...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Kör Import ({testResult?.newCarvers || 0} nya)
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
                  {importResults.success} runristare importerades framgångsrikt
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
