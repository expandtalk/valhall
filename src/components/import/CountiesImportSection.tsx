
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Upload, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface MySQLCountyRecord {
  countyid: string;
  countryid: string;
  county: string;
  letter: string | null;
  number: string | null;
}

export const CountiesImportSection: React.FC = () => {
  const [sqlData, setSqlData] = useState('');
  const [parsedRecords, setParsedRecords] = useState<MySQLCountyRecord[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{
    success: number;
    errors: number;
    skipped: number;
    errorMessages: string[];
  } | null>(null);
  const { toast } = useToast();

  const parseCountiesSQL = (sqlData: string): MySQLCountyRecord[] => {
    const records: MySQLCountyRecord[] = [];
    
    console.log('Parsing counties SQL data...');
    
    // Extract INSERT statements for counties table
    const insertMatch = sqlData.match(/INSERT INTO `counties`.*?VALUES\s*(.*?)(?:;|\n\n|$)/s);
    
    if (!insertMatch) {
      console.warn('No counties INSERT statement found in SQL data');
      return records;
    }
    
    const valuesSection = insertMatch[1];
    console.log('Found VALUES section:', valuesSection.substring(0, 200) + '...');
    
    // Parse individual value tuples for counties format
    const tupleRegex = /\(\s*X'([^']+)',\s*X'([^']+)',\s*'([^']+)',\s*(?:'([^']*)'|NULL),\s*(?:'([^']*)'|NULL)\s*\)/g;
    
    let match;
    while ((match = tupleRegex.exec(valuesSection)) !== null) {
      const [, countyid, countryid, county, letter, number] = match;
      
      records.push({
        countyid: `X'${countyid}'`,
        countryid: `X'${countryid}'`,
        county,
        letter: letter || null,
        number: number || null
      });
    }
    
    console.log(`Parsed ${records.length} county records from SQL data`);
    return records;
  };

  const importCounties = async (records: MySQLCountyRecord[]): Promise<{
    success: number;
    errors: number;
    skipped: number;
    errorMessages: string[];
  }> => {
    console.log(`Starting import of ${records.length} counties...`);
    
    let success = 0;
    let errors = 0;
    let skipped = 0;
    const errorMessages: string[] = [];
    
    for (const record of records) {
      try {
        console.log(`Processing county: ${record.county}`);
        
        // Prepare county data for import
        const countyData = {
          countyid: `\\x${record.countyid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
          countryid: `\\x${record.countryid.replace(/^X'/, '').replace(/'$/, '').toLowerCase()}`,
          county: record.county,
          letter: record.letter,
          number: record.number
        };
        
        console.log(`Importing county:`, countyData);
        
        // Insert to counties table
        const { error } = await supabase
          .from('counties')
          .insert(countyData);
        
        if (error) {
          console.error(`Error inserting county:`, error);
          if (error.code === '23505') {
            skipped++;
            errorMessages.push(`County "${record.county}": Already exists (skipped)`);
          } else {
            errors++;
            errorMessages.push(`County "${record.county}": ${error.message}`);
          }
        } else {
          console.log(`Successfully imported county: ${record.county}`);
          success++;
        }
        
      } catch (error) {
        console.error(`Exception processing county:`, error);
        errors++;
        errorMessages.push(`County "${record.county}": ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    console.log(`Import completed: ${success} successful, ${errors} errors, ${skipped} skipped`);
    
    return {
      success,
      errors,
      skipped,
      errorMessages
    };
  };

  const handleParseSql = () => {
    try {
      const records = parseCountiesSQL(sqlData);
      setParsedRecords(records);
      
      toast({
        title: "SQL parsad framgångsrikt",
        description: `Hittade ${records.length} län att importera`,
      });
    } catch (error) {
      console.error('Error parsing SQL:', error);
      toast({
        title: "Fel vid parsning av SQL",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    }
  };

  const handleImportRecords = async () => {
    if (parsedRecords.length === 0) {
      toast({
        title: "Ingen data att importera",
        description: "Parsa SQL-data först",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportResult(null);

    try {
      console.log('🚀 Starting direct import to counties table...');
      
      const result = await importCounties(parsedRecords);
      
      setImportResult(result);
      setImportProgress(100);

      toast({
        title: "Import slutförd",
        description: `${result.success} importerade, ${result.errors} fel, ${result.skipped} överhoppade`,
        variant: result.errors > 0 ? "destructive" : "default"
      });

    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Importfel",
        description: error instanceof Error ? error.message : 'Okänt fel',
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-400" />
          <CardTitle className="text-white">Län Import</CardTitle>
        </div>
        <CardDescription className="text-slate-300">
          Importera län från MySQL-export med koppling till länder
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            MySQL Export Data
          </label>
          <Textarea
            value={sqlData}
            onChange={(e) => setSqlData(e.target.value)}
            placeholder="Klistra in MySQL INSERT statement för counties-tabellen här..."
            className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder-white/50 font-mono text-sm"
            disabled={isImporting}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleParseSql}
            disabled={!sqlData.trim() || isImporting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Info className="h-4 w-4 mr-2" />
            Parsa SQL
          </Button>

          <Button
            onClick={handleImportRecords}
            disabled={parsedRecords.length === 0 || isImporting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Importera till counties
          </Button>
        </div>

        {parsedRecords.length > 0 && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">📋 Parsad data:</h4>
            <Badge className="bg-green-500 text-white border-0 mb-2">
              {parsedRecords.length} län hittade
            </Badge>
            
            <div className="text-sm text-slate-300 space-y-1 max-h-32 overflow-y-auto">
              {parsedRecords.slice(0, 10).map((record, index) => (
                <div key={index} className="bg-black/30 rounded p-2">
                  <div className="text-green-400 text-xs">
                    Län: {record.county}
                  </div>
                  <div className="text-blue-400 text-xs">
                    Bokstav: {record.letter || 'N/A'} | Nummer: {record.number || 'N/A'}
                  </div>
                  <div className="text-slate-400 text-xs">
                    ID: {record.countyid.substring(0, 12)}...
                  </div>
                </div>
              ))}
              {parsedRecords.length > 10 && (
                <div className="text-slate-400 text-center">
                  ...och {parsedRecords.length - 10} till
                </div>
              )}
            </div>
          </div>
        )}

        {isImporting && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2">Importerar till counties...</h4>
            <Progress value={importProgress} className="mb-2" />
            <div className="text-sm text-slate-300">
              {Math.round(importProgress)}% slutfört
            </div>
          </div>
        )}

        {importResult && (
          <div className="bg-black/20 rounded p-4">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Importresultat - counties-tabellen
            </h4>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              <Badge className="bg-green-500 text-white border-0">
                {importResult.success} lyckade
              </Badge>
              <Badge className="bg-red-500 text-white border-0">
                {importResult.errors} fel
              </Badge>
              <Badge className="bg-yellow-500 text-white border-0">
                {importResult.skipped} överhoppade
              </Badge>
            </div>

            {importResult.errorMessages.length > 0 && (
              <div className="mt-3">
                <h5 className="text-red-400 font-semibold mb-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Felmeddelanden:
                </h5>
                <div className="text-xs text-red-300 max-h-32 overflow-y-auto space-y-1">
                  {importResult.errorMessages.slice(0, 10).map((msg, index) => (
                    <div key={index} className="bg-red-500/10 rounded p-1">
                      {msg}
                    </div>
                  ))}
                  {importResult.errorMessages.length > 10 && (
                    <div className="text-red-400">
                      ...och {importResult.errorMessages.length - 10} fler fel
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
